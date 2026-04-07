import h5py
import json
import librosa
from pathlib import Path
import math

import numpy as np

def save_to_h5(data, h5_path):
    audio = np.asarray(data["audio"], dtype=np.float32)
    labels = data["label"]

    starts = np.array([x["start"] for x in labels], dtype=np.float32)
    durations = np.array([x["duration"] for x in labels], dtype=np.float32)
    tones = np.array([x["tone"] for x in labels], dtype=np.int32)

    text_dtype = h5py.string_dtype(encoding="utf-8")
    texts = np.array([x["text"] for x in labels], dtype=object)

    with h5py.File(h5_path, "w") as f:
        f.create_dataset("audio", data=audio)

        g = f.create_group("label")
        g.create_dataset("start", data=starts)
        g.create_dataset("duration", data=durations)
        g.create_dataset("tone", data=tones)
        g.create_dataset("text", data=texts, dtype=text_dtype)


def in_seg(start_second, seg_start_second, seg_end_second):
    return seg_start_second <= start_second <= seg_end_second


target_samplerate = 44100

windows_duration = 3 # s

root_dir = Path("../preprocess")
save_dir = Path("../preprocess1")
save_dir.mkdir(parents=True, exist_ok=True)

windows_len = windows_duration * target_samplerate

data_counts = 0

for temp_save_path in root_dir.glob('*.h5'):
    file_name = temp_save_path.name
    
    with h5py.File(temp_save_path, "r") as f:
        segment = f["segment"][:]  # ⚡ 超快
        song_name = f.attrs["song_name"]
        start = f.attrs["start"]
        end = f.attrs["end"]
        sr = f.attrs["samplerate"]
        annotations = json.loads(f["annotations"][()].decode())
        analysisTracks = json.loads(f["analysisTracks"][()].decode())
    # assert 0
    # analysisTracks: List[{name:text, type:has_pitch, notes:pitch}]
    segment = segment.mean(-1)
    segment = librosa.resample(segment, orig_sr=sr, target_sr=target_samplerate)

    segment_len = len(segment)
    
    num_segseg = math.ceil(segment_len / windows_len)
    
    if num_segseg <= 1: # 比 5s 短的都不要了
        continue
    
    # 先取前面的
    start_idx_lst = np.arange(0, segment_len, windows_len)[:-1].tolist()
    start_idx_lst.append(segment_len - windows_len)
    
    for start_idx in start_idx_lst:
        end_idx = start_idx + windows_len
        
        start_second = start_idx / target_samplerate
        end_second = end_idx / target_samplerate
        
        # if end_idx >= segment_len:
        #     raise ValueError("wtf")
        
        # seg, tone_lst, toneless_lst
        segseg = segment[start_idx:end_idx]
        seg_notes = []
           
        for ann in annotations:
            startRel = ann['startRel']
            endRel = ann['endRel']
            if not in_seg(startRel, start_second, end_second):
                if in_seg(start_second, startRel, endRel):
                    # 如果 segment 的 start 包含在 ann 里
                    seg_endRel = min(endRel, end_second)
                    seg_duration = seg_endRel - start_second
                    new_ann = {"start": seg_startRel,
                            "duration": seg_duration,
                            "text": text,
                            "tone": -1}
                    seg_notes.append(new_ann)
                else:
                    continue
            else:
                text = ann['text']
                
                seg_startRel = startRel - start_second
                seg_endRel = endRel - start_second
                seg_endRel = windows_duration if seg_endRel >= windows_duration else seg_endRel
                seg_duration = seg_endRel - seg_startRel
                
                new_ann = {"start": seg_startRel,
                        "duration": seg_duration,
                        "text": text,
                        "tone": -1}
                seg_notes.append(new_ann)

        
        for timbre in analysisTracks:
            text = timbre['name']
            need_tone = timbre['type'] == "pitch"

            for note in timbre['notes']:
                startRel = note['startRel']
                endRel = note['endRel']
                tone = note['midi'] if need_tone else -1
                
                if not in_seg(startRel, start_second, end_second):
                    if in_seg(start_second, startRel, endRel):
                        # 如果 segment 的 start 包含在 ann 里
                        seg_endRel = min(endRel, end_second)
                        seg_duration = seg_endRel - start_second
                        new_ann = {"start": seg_startRel,
                                "duration": seg_duration,
                                "text": text,
                                "tone": tone}
                        seg_notes.append(new_ann)
                    else:
                        continue
                else:
                    seg_startRel = startRel - start_second
                    seg_endRel = endRel - start_second
                    seg_endRel = windows_duration if seg_endRel >= windows_duration else seg_endRel
                    seg_duration = seg_endRel - seg_startRel

                    
                    new_ann = {"start": seg_startRel,
                                "duration": seg_duration,
                                "text": text,
                                "tone": tone}
                    seg_notes.append(new_ann)
        # save
        data = {
            "audio": segseg,
            "label": seg_notes
        }
        path = save_dir / f"{data_counts}.h5"
        save_to_h5(data, path)
        data_counts += 1
