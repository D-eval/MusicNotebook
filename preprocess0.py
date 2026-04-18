"""
这个文件是为了整理成
annotations
analysisTracks
"""

import json
import os
from pathlib import Path
import librosa

import soundfile as sf

import h5py
import numpy as np
import subprocess
from chord import Chord

threshold = 0.05

import h5py
import numpy as np

def save_h5(temp_save_path, chord_stacks, segment_wave, 
            song_name, start, duration, sr):
    """
    chord_stacks: List[Dict {
        start: float
        sustain: float
        root: int
        tonic: int
        chord: List[int] 0~11
    }] Ne
    segment_wave: (L,)
    """

    N = len(chord_stacks)
    # chord (N, 12)
    # -------- 处理 chord（变长 → padding）--------

    chord_arr = np.zeros((N, 12), dtype=np.int32)

    start_arr = np.zeros(N, dtype=np.float32)
    sustain_arr = np.zeros(N, dtype=np.float32)
    root_arr = np.zeros(N, dtype=np.int32)
    tonic_arr = np.zeros(N, dtype=np.int32)

    for i, c in enumerate(chord_stacks):
        chord_arr[i, c["chord"]] = 1
        start_arr[i] = c["start"]
        sustain_arr[i] = c["sustain"]
        root_arr[i] = c["root"]
        tonic_arr[i] = c["tonic"]

    # -------- 写入 HDF5 --------
    with h5py.File(temp_save_path, "w") as f:
        # segment
        f.create_dataset("segment", data=np.asarray(segment_wave, dtype=np.float32))

        # attrs
        f.attrs["song_name"] = song_name
        f.attrs["start"] = start
        f.attrs["sustain"] = duration
        f.attrs["samplerate"] = sr

        # chord group
        g = f.create_group("chord_stacks")
        g.create_dataset("start", data=start_arr)
        g.create_dataset("sustain", data=sustain_arr)
        g.create_dataset("root", data=root_arr)
        g.create_dataset("tonic", data=tonic_arr)
        g.create_dataset("chord", data=chord_arr)




def convert_to_wav(path):
    wav_path = path.replace(".mp3", ".wav")
    subprocess.run(
        f'ffmpeg -y -i "{path}" "{wav_path}"',
        shell=True
    )
    return wav_path


def get_timbre_idx(tracks, name):
    root_idx_lst = [i for i in range(len(tracks)) if tracks[i]['name']==name]
    if len(root_idx_lst) == 1:
        root_idx = root_idx_lst[0]
        return root_idx
    else:
        return None

root_dir = Path("../save/music_note")
save_dir = Path("../preprocess0")
save_dir.mkdir(parents=True, exist_ok=True)

data_counts = 0

samplerate = 44100

for temp_dir in root_dir.iterdir():
    if not temp_dir.is_dir():
        continue
    if ".git" in str(temp_dir):
        continue

    song_name = temp_dir.name

    json_path = temp_dir / "notes.json"
    wave_path = temp_dir / f"{song_name}.mp3"

    try:
        wave, sr = librosa.load(str(wave_path), sr=samplerate, mono=False)
    except Exception as e:
        print(f"⚠️ librosa failed → try ffmpeg: {e}")
        wav_path = convert_to_wav(str(wave_path))
        wave, sr = librosa.load(str(wav_path), sr=samplerate, mono=False)

    wave = wave.T  # (C, T) → (T, C)

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # wave = wave.mean(-1)

    total_time = wave.shape[0] / sr

    segment_idx = 0

    for segment_idx in range(len(data['notes'])):

        segment_start = data['notes'][segment_idx]['start']
        segment_end = data['notes'][segment_idx]['end']
        segment_duration = segment_end - segment_start

        print(segment_duration)
        if segment_duration <= 5:
            continue

        segment_start_idx = int(segment_start * sr)
        segment_end_idx = int(segment_end * sr)

        segment_wave = wave[segment_start_idx:segment_end_idx]

        data['notes'][segment_idx]['analysisTracks'].__len__()

        # track_id = 0
        # data['notes'][segment_idx]['analysisTracks'][track_id]['name']
        # data['notes'][segment_idx]['analysisTracks'][track_id]['type']
        # data['notes'][segment_idx]['analysisTracks'][track_id]['notes']
        # note_idx = 0
        # data['notes'][segment_idx]['analysisTracks'][track_id]['notes'][note_idx]

        tracks = data['notes'][segment_idx]['analysisTracks']


        root_idx = get_timbre_idx(tracks, '<root>')
        if root_idx is None:
            continue
        chord_idx = get_timbre_idx(tracks, '<chord>')
        tonic_idx = get_timbre_idx(tracks, '<tonic>')


        root_notes = tracks[root_idx]['notes']
        chord_notes = tracks[chord_idx]['notes']
        tonic_notes = tracks[tonic_idx]['notes']


        chord_stacks = []

        for stack_idx in range(len(root_notes)):

            root_note = root_notes[stack_idx]['midi'] % 12

            start = root_notes[stack_idx]['startRel']
            duration = root_notes[stack_idx]['endRel'] - start
            chord = [root_note]

            for chord_note in chord_notes:
                temp_start = chord_note['startRel']
                if start-threshold <= temp_start <= start+threshold:
                    temp_pitch = chord_note['midi'] % 12
                    chord.append(temp_pitch) if temp_pitch not in chord else None

            tonic_note = [tonic_note['midi']%12 for tonic_note in tonic_notes if start-threshold <= tonic_note['startRel'] <= start+threshold][0]

            chord += [tonic_note] if tonic_note not in chord else []

            chord_stacks += [{
                "start": start,
                "sustain": duration,
                "root": root_note, # int 0~11
                "tonic": tonic_note, # int 0~11
                "chord": chord, # List int 0~11
            }]

        temp_save_path = save_dir / f"{data_counts}.h5"

        save_h5(temp_save_path,
                chord_stacks,
                segment_wave,
                data['audio'],
                segment_start,
                segment_duration,
                sr)
        data_counts += 1
print("ok")

# [{'root':}]