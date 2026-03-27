
import h5py
import json
import librosa
from pathlib import Path
import numpy as np

from transformers import AutoTokenizer, AutoModel
import torch


tokenizer = AutoTokenizer.from_pretrained("BAAI/bge-small-zh-v1.5")
model = AutoModel.from_pretrained("BAAI/bge-small-zh-v1.5")

root_dir = Path("../preprocess1")
save_dir = Path("../preprocess2")
save_dir.mkdir(parents=True, exist_ok=True)

for h5_path in root_dir.glob('*.h5'):
    with h5py.File(h5_path, "r") as f:
        audio = f["audio"][:]
        label_group = f["label"]
        starts = label_group["start"][:]
        durations = label_group["duration"][:]
        tones = label_group["tone"][:]
        texts = label_group["text"][:]

    texts = [text.decode() for text in texts]
    inputs = tokenizer(texts, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    emb = outputs.last_hidden_state[:, 0]  # CLS # (B, L, D)
    emb = emb.detach().numpy()
    file_name = h5_path.name
    save_path = save_dir / file_name
    with h5py.File(save_path, "w") as f:
        f.create_dataset("audio", data=audio)

        g = f.create_group("label")
        g.create_dataset("start", data=starts)
        g.create_dataset("duration", data=durations)
        g.create_dataset("tone", data=tones)
        g.create_dataset("text", data=emb)
        g.create_dataset("textGT", data=texts)
    print(file_name)
