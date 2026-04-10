"""
for detr2
"""

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
    def __init__(self, root_dir, min_pitch=24, max_pitch=107):
        self.paths = sorted(list(Path(root_dir).glob("*.h5")))
        num_pitchs = max_pitch - min_pitch + 1
        
        self.min_pitch = min_pitch
        self.max_pitch = max_pitch
        self.num_pitchs = num_pitchs

    def __len__(self):
        return len(self.paths)

    def __getitem__(self, idx):
        """
            texts: List[str]
            events: (N, 4)
        """
        
        h5_path = self.paths[idx]

        with h5py.File(h5_path, "r") as f:
            audio = f["audio"][:]       # (T,)
            events = f["events"][:]     # (N, 3)
            texts = f["text_vocab"][()]

        print(events.shape)
        # ===== 转 tensor =====
        audio = torch.from_numpy(audio).float()
        startSustain = torch.from_numpy(events[:,:2]).float()
        pitch = torch.from_numpy(events[:,2]).long()
        text_idx = torch.from_numpy(events[:,3]).long()
        texts = [text.decode() for text in texts]
        
        label = [text.split("，")[0] for text in texts]
        
        pitch = self.normalize_pitch(pitch)
        
        target = {
            "start": startSustain[:,0],# (Ne,)
            "sustain": startSustain[:,1], # (Ne,)
            "pitch": pitch[:,], # (Ne,)
            "text": texts,     # List[str] Nt
            "text_idx": text_idx, # (Ne,)
            "label": label,
        }
        
        return audio, target
    def normalize_pitch(self, pitch):
        """
        pitch: (N,) tensor (long)
        """
        neg_mask = (pitch == -1)
        # ===== 2. fold 到合法区间 =====
        valid_mask = ~neg_mask
        p = pitch[valid_mask]
        while True:
            too_low = p < self.min_pitch
            too_high = p > self.max_pitch

            if not (too_low.any() or too_high.any()):
                break

            p[too_low] += 12
            p[too_high] -= 12

        pitch[valid_mask] = p

        # ===== 3. 映射到 index =====
        pitch[valid_mask] = pitch[valid_mask] - self.min_pitch  # → [0, vocab_size-1]

        # ===== 4. -1 → 最后一类 =====
        pitch[neg_mask] = self.num_pitchs
        return pitch

# from torch.utils.data import DataLoader
# dataset = AudioDataset("../preprocess11")
# audio, target = dataset[0]
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

