#!/usr/bin/env python3
import json
import os
from pathlib import Path

import soundfile as sf

import h5py
import numpy as np


root_dir = Path("../save/music_note")
save_dir = Path("../preprocess")
save_dir.mkdir(parents=True, exist_ok=True)

data_counts = 0


for temp_dir in root_dir.iterdir():
    if not temp_dir.is_dir():
        continue

    song_name = temp_dir.name

    json_path = temp_dir / "notes.json"
    wave_path = temp_dir / f"{song_name}.mp3"

    wave, sr = sf.read(str(wave_path), always_2d=True)

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    for note in data["notes"]:
        # note = data["notes"][1]

        annotations = note["annotations"]
        analysisTracks = note["analysisTracks"]

        start, end = note["start"], note["end"]

        start = float(start)
        end = float(end)
        if end <= start:
            raise ValueError("wtf")
        start_frame = max(0, int(start * sr))
        end_frame = max(start_frame + 1, int(end * sr))
        segment = wave[start_frame:end_frame]


        segment_info = {"song_name": song_name,
                        "start": start,
                        "end": end}

        labels = {"annotations": annotations,
                    "analysisTracks": analysisTracks}

        temp_save_path = save_dir / f"{data_counts}.h5"

        with h5py.File(temp_save_path, "w") as f:
            f.create_dataset("segment", data=segment)  # (L,2)
            f.attrs["song_name"] = song_name
            f.attrs["start"] = start
            f.attrs["end"] = end
            f.attrs["samplerate"] = sr
            f.create_dataset("annotations", data=np.bytes_(json.dumps(annotations)))
            f.create_dataset("analysisTracks", data=np.bytes_(json.dumps(analysisTracks)))
        data_counts += 1

# sf.write(data=segment,samplerate=sr,file="./a.wav")


'''
PREPROCESS_DIR.mkdir(parents=True, exist_ok=True)
SEGMENT_DIR.mkdir(parents=True, exist_ok=True)

with OUT_PATH.open("w", encoding="utf-8") as out:
    for dirpath, _, filenames in os.walk(Path(ROOT_DIR)):
        if "notes.json" not in filenames:
            continue
        notes_path = Path(dirpath) / "notes.json"
        try:
            data = json.loads(notes_path.read_text(encoding="utf-8"))
        except Exception:
            continue

        audio_name = data.get("audio", "")
        audio_path = find_audio_path(dirpath, audio_name)
        if not audio_path:
            continue

        try:
            audio, sr = sf.read(str(audio_path), always_2d=True)
        except Exception:
            continue

        notes = data.get("notes") or []
        base = safe_name(Path(dirpath).name)
        for i, note in enumerate(notes):
            caption = str(note.get("caption", "")).strip()
            start = note.get("start")
            end = note.get("end")
            if start is None or end is None:
                continue
            start = float(start)
            end = float(end)
            if end <= start:
                continue
            start_frame = max(0, int(start * sr))
            end_frame = max(start_frame + 1, int(end * sr))
            segment = audio[start_frame:end_frame]
            segment_name = f"{base}_{i:04d}.wav"
            segment_path = SEGMENT_DIR / segment_name
            try:
                sf.write(str(segment_path), segment, sr)
            except Exception:
                continue

            item = {
                "audio_path": str(segment_path),
                "caption": caption,
                "source_audio": str(audio_path),
                "start": start,
                "end": end,
            }
            out.write(json.dumps(item, ensure_ascii=False) + "\n")
'''