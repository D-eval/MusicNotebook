import torch
from torch.utils.data import Dataset
import h5py
from pathlib import Path


def to_device(batch, device):
    if torch.is_tensor(batch):
        return batch.to(device)
    elif isinstance(batch, dict):
        return {
            k: to_device(v, device)
            for k, v in batch.items()
            if k != "text_ori"  # ⚠️ 非 tensor 跳过
        } | {
            "text_ori": batch["text_ori"]
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
        }

        # -------- chord_stacks --------
        g = f["chord_stacks"]

        start_arr = g["start"][:]
        sustain_arr = g["sustain"][:]
        root_arr = g["root"][:]
        tonic_arr = g["tonic"][:]
        chord_arr = g["chord"][:]
        mask_arr = g["mask"][:]

        N, K = chord_arr.shape

        chord_stacks = []
        for i in range(N):
            valid_len = int(mask_arr[i].sum())

            chord = chord_arr[i, :valid_len].tolist()

            chord_stacks.append({
                "start": float(start_arr[i]),
                "sustain": float(sustain_arr[i]),
                "root": int(root_arr[i]),
                "tonic": int(tonic_arr[i]),
                "chord": chord
            })

    return segment_wave, chord_stacks, meta


import torch

def collate_fn(batch):
    audios = []
    targets = []

    lengths = []

    # -------- 收集 --------
    for audio, target in batch:
        audio = torch.as_tensor(audio, dtype=torch.float32)
        audios.append(audio)
        targets.append(target)
        lengths.append(audio.shape[0])

    # -------- padding --------
    max_len = max(lengths)
    B = len(audios)

    padded_audios = torch.zeros(B, max_len, dtype=torch.float32)
    valid_mask = torch.zeros(B, max_len, dtype=torch.bool)

    for i, audio in enumerate(audios):
        L = audio.shape[0]
        padded_audios[i, :L] = audio
        valid_mask[i, :L] = 1

    return padded_audios, targets, valid_mask


# 数据要经过 preprocess0.py 的加工
class AudioDataset(Dataset):
    def __init__(self, root_dir):
        self.paths = sorted(list(Path(root_dir).glob("*.h5")))

    def __len__(self):
        return len(self.paths)

    def __getitem__(self, idx):
        h5_path = self.paths[idx]

        audio, target, meta = load_h5(h5_path)
        
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
# loader = DataLoader(
#     dataset,
#     batch_size=2,
#     shuffle=True,
#     # num_workers=4,
#     collate_fn=collate_fn,
#     pin_memory=True
# )

# for audios, targets, valid_mask in loader:
#     # audios: (B, T)
#     # targets: list[dict]
#     print(valid_mask.shape)
