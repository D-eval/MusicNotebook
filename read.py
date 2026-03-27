import torch
from torch.utils.data import Dataset
import h5py
from pathlib import Path


def collate_fn(batch):
    audios = []
    targets = []

    for audio, target in batch:
        audios.append(audio)
        targets.append(target)

    audios = torch.stack(audios, dim=0)  # (B, T)

    return audios, targets


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

        boxes = torch.stack([starts, durations], dim=1)  # (N, 2)

        target = {
            "boxes": boxes,          # (N, 2)
            "tones": tones,         # (N,)
            "text_emb": text_emb,     # (N, D)
            "text": text
        }

        return audio, target


from torch.utils.data import DataLoader
dataset = AudioDataset("/Users/broyou/Desktop/笔记本/preprocess2")
loader = DataLoader(
    dataset,
    batch_size=2,
    shuffle=True,
    # num_workers=4,
    collate_fn=collate_fn,
    pin_memory=True
)

for audios, targets in loader:
    # audios: (B, T)
    # targets: list[dict]
    for t in targets:
        print(t["boxes"].shape)      # (N, 2)
        print(t["text_emb"].shape)   # (N, D)
        print(t['text'])

