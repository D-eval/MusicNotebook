"""
{
    legal (1):
        {
            is_music: (1) bool
        }
    chord (N1):
        {
            anchor: (N1, 2),
            root: (N1,),
            chord: (N1, 12),
            tonic: (N1,),
        }
    chord_before Optional[(1)]:
        {
            exist: (1,),
            sustain: (1,) or None,
            root: (1, 13) or None,
            chord: (1, 12) or None,
            tonic: (1, 13) or None,
        }
    beat (N2):
        {
            beat: (N2, 1), float
            is_downbeata: (N2, 1), bool
        }
    metronome (1):
        {
            bpm: (1,), float
            offset: (1,), float
            is_4beat: (1,), bool
        }
}
"""


import torch
from torch.utils.data import Dataset
import h5py
from pathlib import Path
import random

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
            "signature": f.attrs["signature"],
        }

        # -------- chord_stacks --------
        g = f["chord_stacks"]

        start_arr = g["start"][:] # (N,)
        sustain_arr = g["sustain"][:] # (N,)
        root_arr = g["root"][:] # (N,)
        tonic_arr = g["tonic"][:] # (N,)
        chord_arr = g["chord"][:] # (N, 12)
        
        beat_arr = g["beat"][:] # (N2,) float
        downbeat_arr = g["downbeat"][:] # (N2,) bool

        N, K = chord_arr.shape
        assert K==12
        
        target = {
            "chord": {
                "start": torch.tensor(start_arr)[:, None],  # (N, 1)
                "sustain": torch.tensor(sustain_arr)[:, None],  # (N, 1)
                "root": torch.tensor(root_arr), # (N)
                "chord": torch.tensor(chord_arr), # (N, 12)
                "tonic": torch.tensor(tonic_arr), # (N)
            },
            "beat": {
                "beat": torch.tensor(beat_arr)[:,None], # (N2, 1)
                "is_downbeat": torch.tensor(downbeat_arr)[:,None].float(), # (N2, 1)
            },
            "metronome": {
                "bpm": torch.tensor(meta["bpm"]), # (1,)
                "offset": torch.tensor(meta["bpm_offset"]), # (1,)
                "is_4beat": torch.tensor(meta["signature"].split("/")[0]=="4"), # (1,)
            }
        }
    # List[ Dict ] * Ne
    return segment_wave, target, meta


def cut_sample(wav, target, sr, start=None, duration=5.0):
    """
    重写版本：
    1. anchor = [start, sustain]
    2. 过滤掉窗口外的 chord
    3. 新增 chord_before
    """

    T = wav.shape[0]
    L = int(duration * sr)
    assert T >= L, f"got {T}, sec:{T/sr}"

    # -------- 随机裁剪 --------
    start_idx = random.randint(0, T - L - 1) if start is None else int(start * sr)
    end_idx = start_idx + L
    assert end_idx <= T

    wav_cut = wav[start_idx:end_idx]

    # -------- 时间换算 --------
    start_sec = start_idx / sr
    end_sec = end_idx / sr

    chord = target["chord"]

    start_all = chord["start"]
    sustain_all = chord["sustain"]
    end_all = start_all + sustain_all

    # -------- 分类 --------
    # 1. 在窗口内的 chord
    valid_mask = (start_all >= start_sec) & (start_all <= end_sec)
    valid_mask = valid_mask.squeeze(-1)
    # 2. before chord（跨越左边界）
    before_mask = (start_all < start_sec) & (end_all > start_sec)

    # -------- 处理 valid chord --------
    chord_valid = {}
    if valid_mask.sum() > 0:
        chord_valid["start"] = chord["start"][valid_mask].clone()
        chord_valid["sustain"] = chord["sustain"][valid_mask].clone()
        chord_valid["root"] = chord["root"][valid_mask].clone()
        chord_valid["chord"] = chord["chord"][valid_mask].clone()
        chord_valid["tonic"] = chord["tonic"][valid_mask].clone()

        # start 平移
        chord_valid["start"][:, 0] -= start_sec
    else:
        chord_valid = {
            "start": torch.zeros((0, 1)),
            "sustain": torch.zeros((0, 1)),
            "root": torch.zeros((0,), dtype=torch.long),
            "chord": torch.zeros((0, 12)),
            "tonic": torch.zeros((0,), dtype=torch.long),
        }

    # -------- 处理 chord_before（只保留一个）--------
    if before_mask.sum() > 0:
        # 选最靠近窗口的那个（最大 start）
        idx = torch.argmax(start_all[before_mask])

        before_indices = torch.where(before_mask)[0]
        idx = before_indices[idx]

        before_start = start_all[idx]
        before_end = end_all[idx]

        chord_before = {
            "exist": torch.tensor([1.0]),
            "sustain": torch.tensor([before_end - start_sec]),
            "root": chord["root"][idx][None],
            "chord": chord["chord"][idx][None],
            "tonic": chord["tonic"][idx][None],
        }
    else:
        chord_before = {
            "exist": torch.tensor([0.0]),
        }

    # -------- beat 过滤 --------
    beat = target["beat"]
    beat_mask = (beat["beat"].squeeze(-1) >= start_sec) & (beat["beat"].squeeze(-1) <= end_sec)

    beat_cut = {
        "beat": beat["beat"][beat_mask] - start_sec,
        "is_downbeat": beat["is_downbeat"][beat_mask]
    }

    # -------- metronome 不变 --------
    target_cut = {
        "chord": chord_valid,
        "chord_before": chord_before,
        "beat": beat_cut,
        "metronome": target["metronome"],
    }

    return wav_cut, target_cut, (start_idx, end_idx)


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
    def __init__(self, root_dir):
        self.paths = sorted(list(Path(root_dir).glob("*.h5")))

    def __len__(self):
        return len(self.paths)

    def __getitem__(self, idx):
        h5_path = self.paths[idx]

        audio, target, meta = load_h5(h5_path)
        audio, target, _ = cut_sample(audio, target, meta["samplerate"])
        audio = torch.tensor(audio)
        audio_sum = audio.mean(-1)
        audio_minus = 0.5 * (audio[...,1] - audio[...,0])
        audio = torch.stack([audio_sum, audio_minus], dim=-1)
        
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

# for audios, targets in loader:
#     # audios: (B, T)
#     # targets: list[dict]
#     print(audios.shape)
