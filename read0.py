import torch
from torch.utils.data import Dataset
import h5py
from pathlib import Path
import random
import math
from data_arg import apply_augmentation

def to_device(batch, device):
    if torch.is_tensor(batch):
        return batch.to(device)
    elif isinstance(batch, dict):
        return {
            k: to_device(v, device)
            for k, v in batch.items()
        }
    elif isinstance(batch, list):
        return [to_device(x, device) for x in batch]
    else:
        return batch


def load_h5(temp_save_path):
    """
    return:
        segment_wave
        chord_stacks (List[dict])
        meta (dict)
    """

    with h5py.File(temp_save_path, "r") as f:
        # -------- segment --------
        segment_wave = f["segment"][:]

        # -------- attrs --------
        meta = {
            "song_name": f.attrs["song_name"],
            "start": f.attrs["start"],
            "sustain": f.attrs["sustain"],
            "samplerate": f.attrs["samplerate"],
            "bpm": f.attrs["bpm"],
            "bpm_offset": f.attrs["bpm_offset"],
        }

        # -------- chord_stacks --------
        g = f["chord_stacks"]

        start_arr = g["start"][:] # (N,)
        sustain_arr = g["sustain"][:] # (N,)
        root_arr = g["root"][:] # (N,)
        tonic_arr = g["tonic"][:] # (N,)
        chord_arr = g["chord"][:] # (N, 12)
        
        beat_arr = g["beat"][:] # (beat,) float
        downbeat_arr = g["downbeat"][:].astype(float) # (beat,) bool

        N, K = chord_arr.shape
        assert K==12
        
        target = {
            "start": start_arr,
            "sustain": sustain_arr,
            "root": root_arr,
            "tonic": tonic_arr,
            "chord": chord_arr,
            "beat": beat_arr,
            "downbeat": downbeat_arr,
        }
    # List[ Dict ] * Ne
    return segment_wave, target, meta

def dict_concat(dict1, dict2):
    """
    合并两个 dict，相同 key 对应的值会被合并成 list
    """
    result = {}
    for k, v in dict1.items():
        assert dict2.get(k) is not None
        new_v = torch.concat([v, dict2[k]], dim=0)
        result[k] = new_v
    return result

not_time_len_key_lst = [
    "beat",
    "downbeat",
]

def capture_time(target, start_sec, end_sec):
    valid_bool = (start_sec <= target['start']) * (target['start']<= end_sec)
    before_bool = (target['start'] < start_sec) *  (start_sec <= target['start'] + target['sustain'])
    target_valid = {k: torch.tensor(v[valid_bool]) for k, v in target.items() if k not in not_time_len_key_lst}
    target_before = {k: torch.tensor(v[before_bool]) for k, v in target.items() if k not in not_time_len_key_lst}
    
    ## begin ai
    # 原始数据
    start_all = torch.tensor(target["start"])
    sustain_all = torch.tensor(target["sustain"])

    # before mask
    before_start = start_all[before_bool]
    before_sustain = sustain_all[before_bool]

    # 原事件结束时间
    before_end = before_start + before_sustain

    # 截断后的 sustain
    new_sustain = torch.minimum(before_end, torch.tensor(end_sec)) - torch.tensor(start_sec)

    # 更新
    target_before["start"] = torch.zeros_like(new_sustain)  # 全部从0开始
    target_before["sustain"] = new_sustain
    ## end ai
    
    target_valid["before"] = torch.zeros(valid_bool.sum())
    target_before["before"] = torch.ones(before_bool.sum())
    new_target = dict_concat(target_valid, target_before)
    new_target['start'] -= start_sec
    
    for k in not_time_len_key_lst:
        new_target[k] = target[k]
    return new_target

def cut_sample(wav, target, sr, start=None, duration=5):
    T = wav.shape[0]
    L = int(duration * sr)
    assert T>L, f"got {T}, sec:{T/sr}"
    start_idx = random.randint(0, T - L -1) if start is None else int(start * sr)
    end_idx = start_idx + L
    assert end_idx <= T-1
    wav_cut = wav[start_idx:end_idx]
    target_cut = capture_time(target, start_idx / sr, end_idx / sr)
    return wav_cut, target_cut


import torch

def collate_fn(batch):
    audios = []
    targets = []

    # -------- 收集 --------
    for audio, target in batch:
        audio = torch.as_tensor(audio, dtype=torch.float32)
        audios.append(audio)
        targets.append(target)
    
    audios = torch.stack(audios, dim=0)
    # List[ List [ Dict ] Ne ] B
    return audios, targets


# 数据要经过 preprocess0.py 的加工
class AudioDataset(Dataset):
    def __init__(self, root_dir, cfg):
        self.paths = sorted(list(Path(root_dir).glob("*.h5")))
        self.cfg = cfg
    def __len__(self):
        return len(self.paths)

    def __getitem__(self, idx):
        h5_path = self.paths[idx]

        audio, target, meta = load_h5(h5_path)
        while 1:
            new_audio, new_target = cut_sample(audio, target, meta["samplerate"])
            if len(new_target['start']) > 0:
                break
        audio = new_audio
        target = new_target

        audio = torch.tensor(audio)
        
        
        audio, target = apply_augmentation(audio, target, self.cfg, meta["samplerate"])
        
        
        audio_sum = audio.mean(-1)
        audio_minus = 0.5 * (audio[...,1] - audio[...,0])
        audio = torch.stack([audio_sum, audio_minus], dim=-1)
        
        target['bpm'] = torch.tensor(math.log(meta['bpm']))
        target['offset'] = torch.tensor(meta['bpm_offset'])
        
        return audio, target
    
    def get_pitch_stats(self, verbose=True):
        """
        遍历整个 dataset，统计 pitch 的 min / max / unique
        """
        pitch_min = None
        pitch_max = None
        pitch_set = set()

        for i, path in enumerate(self.paths):
            try:
                with h5py.File(path, "r") as f:
                    tones = f["label"]["tone"][:]  # numpy array (N,)
            except Exception as e:
                print(f"❌ failed to read {path}: {e}")
                continue

            if len(tones) == 0:
                continue

            local_min = tones.min()
            local_max = tones.max()

            if pitch_min is None:
                pitch_min = local_min
                pitch_max = local_max
            else:
                pitch_min = min(pitch_min, local_min)
                pitch_max = max(pitch_max, local_max)

            pitch_set.update(tones.tolist())

            if verbose and i % 100 == 0:
                print(f"[{i}/{len(self.paths)}] current range: {pitch_min} ~ {pitch_max}")

        print("\n===== Pitch Stats =====")
        print(f"min pitch: {pitch_min}")
        print(f"max pitch: {pitch_max}")
        print(f"unique pitch count: {len(pitch_set)}")

        # 可选：打印所有类别
        sorted_pitch = sorted(pitch_set)
        print(f"unique pitch values:\n{sorted_pitch}")

        self.pitch_min = pitch_min
        self.mitch_max = pitch_max
        
        return pitch_min, pitch_max, sorted_pitch


# from torch.utils.data import DataLoader
# dataset = AudioDataset("../preprocess0")
# h5_path = dataset.paths[0]
# audio, target, meta = load_h5(h5_path)


# loader = DataLoader(
#     dataset,
#     batch_size=2,
#     shuffle=True,
#     # num_workers=4,
#     collate_fn=collate_fn,
#     pin_memory=True
# )

# for epoch in range(2):
#     for audios, targets in loader:
#         # audios: (B, T)
#         # targets: list[dict]
#         print(audios.shape)
