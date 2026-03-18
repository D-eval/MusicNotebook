#!/usr/bin/env python3
import json
from pathlib import Path

import torch
from torch.utils.data import Dataset


class MusicNotesDataset(Dataset):
    def __init__(self, jsonl_path, load_audio=False, sample_rate=16000):
        path = Path(jsonl_path)
        if path.is_dir():
            path = path / "dataset.jsonl"
        self.jsonl_path = path
        self.load_audio = load_audio
        self.sample_rate = sample_rate
        self.items = []
        with self.jsonl_path.open("r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                self.items.append(json.loads(line))

        self._torchaudio = None
        if self.load_audio:
            try:
                import torchaudio  # type: ignore
                self._torchaudio = torchaudio
            except Exception:
                self._torchaudio = None

    def __len__(self):
        return len(self.items)

    def __getitem__(self, idx):
        item = self.items[idx]
        audio_path = item["audio_path"]
        caption = item.get("caption", "")

        if not self.load_audio:
            return {
                "audio_path": audio_path,
                "caption": caption,
            }

        try:
            import soundfile as sf  # type: ignore
        except Exception as exc:
            raise RuntimeError("soundfile is required for audio loading") from exc
        data, sr = sf.read(audio_path, always_2d=True)
        waveform = torch.from_numpy(data).T.contiguous()
        if sr != self.sample_rate:
            if not self._torchaudio:
                raise RuntimeError("torchaudio is required for resampling")
            waveform = self._torchaudio.functional.resample(waveform, sr, self.sample_rate)
            sr = self.sample_rate
        segment = waveform
        return {
            "audio": segment,
            "sample_rate": sr,
            "caption": caption,
        }

dataset =   MusicNotesDataset(jsonl_path="./preprocess/dataset.jsonl", load_audio=True, sample_rate=16000)
loader = torch.utils.data.DataLoader(dataset, batch_size=1, shuffle=False, num_workers=0)

start_time = torch.cuda.Event(enable_timing=True) if torch.cuda.is_available() else None
end_time = torch.cuda.Event(enable_timing=True) if torch.cuda.is_available() else None
import time

if start_time and end_time:
    start_time.record()
else:
    t0 = time.time()

for _ in loader:
    print(_)

if start_time and end_time:
    end_time.record()
    torch.cuda.synchronize()
    elapsed_ms = start_time.elapsed_time(end_time)
    print(f"elapsed_ms: {elapsed_ms:.2f}")
else:
    t1 = time.time()
    print(f"elapsed_s: {t1 - t0:.3f}")
