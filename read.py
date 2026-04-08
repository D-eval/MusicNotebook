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


def collate_fn(batch):
    audios = []
    targets = []

    for audio, target in batch:
        audios.append(audio)
        targets.append(target)

    audios = torch.stack(audios, dim=0)  # (B, T)

    return audios, targets

# 数据要经过 preprocess2.py 的加工
class AudioDataset(Dataset):
    def __init__(self, root_dir):
        self.paths = sorted(list(Path(root_dir).glob("*.h5")))

    def __len__(self):
        return len(self.paths)

    def __getitem__(self, idx):
        h5_path = self.paths[idx]

        with h5py.File(h5_path, "r") as f:
            audio = f["audio"][:]

            label_group = f["label"]
            starts = label_group["start"][:]
            durations = label_group["duration"][:]
            tones = label_group["tone"][:]
            text_emb = label_group["text"][:]   # (N, D)
            text = label_group["textGT"][:]

        # 转 tensor
        audio = torch.tensor(audio, dtype=torch.float32)

        starts = torch.tensor(starts, dtype=torch.float32)
        durations = torch.tensor(durations, dtype=torch.float32)
        tones = torch.tensor(tones, dtype=torch.long)
        text_emb = torch.tensor(text_emb, dtype=torch.float32)

        target = {
            "start": starts,# (N,)
            "sustain": durations, # (N,)
            "pitch": tones,         # (N,)
            "text": text_emb,     # (N, D)
            "text_ori": text
        }

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
# dataset = AudioDataset("/Users/broyou/Desktop/笔记本/preprocess2")
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
#     for t in targets:
#         print(t["boxes"].shape)      # (N, 2)
#         print(t["text_emb"].shape)   # (N, D)
#         print(t['text'])

