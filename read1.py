import torch
from torch.utils.data import Dataset
import h5py
from pathlib import Path


def collate_fn(batch):
    audios = []
    events = []
    texts = []

    for audio, event, text in batch:
        audios.append(audio)
        events.append(event)
        texts.append(text)

    audios = torch.stack(audios, dim=0)  # (B, T)
    
    return audios, events, texts


class AudioDataset(Dataset):
    def __init__(self, root_dir):
        self.paths = sorted(list(Path(root_dir).glob("*.h5")))

    def __len__(self):
        return len(self.paths)

    def __getitem__(self, idx):
        h5_path = self.paths[idx]

        with h5py.File(h5_path, "r") as f:
            audio = f["audio"][:]       # (T,)
            events = f["events"][:]     # (N, 3)
            texts = f["text_vocab"][()]

        # ===== 转 tensor =====
        audio = torch.from_numpy(audio).float()
        events = torch.from_numpy(events).float()
        texts = [text.decode() for text in texts]
        
        return audio, events, texts


# from torch.utils.data import DataLoader
# dataset = AudioDataset("../preprocess11")
# audio, events, texts = dataset[0]
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

