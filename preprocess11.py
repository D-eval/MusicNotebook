import h5py
import json
import librosa
from pathlib import Path
import math

import numpy as np

def save_to_h5(data, h5_path):
    """
    data = {
        "audio": (T,),
        "label": {text: [[start,duration,pitch], ...]}
    }
    """
    audio = np.asarray(data["audio"], dtype=np.float32)
    label = data["label"]

    # ===== 1. 构建 text vocab =====
    texts = list(label.keys())
    text2id = {t: i for i, t in enumerate(texts)}

    # ===== 2. flatten events =====
    events = []
    for text, notes in label.items():
        tid = text2id[text]
        for note in notes:
            start, duration, pitch = note
            events.append([start, duration, pitch, tid])

    if len(events) == 0:
        events = np.zeros((0, 4), dtype=np.float32)
    else:
        events = np.array(events, dtype=np.float32)

    # ===== 3. 保存 =====
    with h5py.File(h5_path, "w") as f:
        f.attrs["format"] = "note_events_v2"
        f.attrs["columns"] = ["start", "duration", "pitch", "text_id"]

        # audio
        f.create_dataset("audio", data=audio, compression="gzip")

        # events
        f.create_dataset("events", data=events, compression="gzip")

        # text vocab（关键）
        dt = h5py.string_dtype(encoding="utf-8")
        text_arr = np.array(texts, dtype=dt)
        f.create_dataset("text_vocab", data=text_arr)


def in_seg(start_second, seg_start_second, seg_end_second):
    return seg_start_second <= start_second <= seg_end_second


target_samplerate = 44100

windows_duration = 3 # s

root_dir = Path("../preprocess")
save_dir = Path("../preprocess11")
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
    # return:
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
        seg_notes = {} # {"piano":[[start, duration, pitch],...]}
           
        for ann in annotations:
            startRel = ann['startRel']
            endRel = ann['endRel']
            if not in_seg(startRel, start_second, end_second):
                continue
            
            text = ann['text']
            
            seg_startRel = startRel - start_second
            seg_endRel = endRel - start_second
            seg_endRel = windows_duration if seg_endRel >= windows_duration else seg_endRel
            seg_duration = seg_endRel - seg_startRel
            
            if seg_notes.get(text):
                seg_notes[text].append([seg_startRel, seg_duration, -1])
            else:
                seg_notes[text] = [[seg_startRel, seg_duration, -1]]
        
        for timbre in analysisTracks:
            text = timbre['name']
            need_tone = timbre['type'] == "pitch"

            for note in timbre['notes']:
                startRel = note['startRel']
                endRel = note['endRel']
                if not in_seg(startRel, start_second, end_second):
                    continue

                seg_startRel = startRel - start_second
                seg_endRel = endRel - start_second
                seg_endRel = windows_duration if seg_endRel >= windows_duration else seg_endRel
                seg_duration = seg_endRel - seg_startRel

                tone = note['midi'] if need_tone else -1
                    
                if seg_notes.get(text):
                    seg_notes[text].append([seg_startRel, seg_duration, tone])
                else:
                    seg_notes[text] = [[seg_startRel, seg_duration, tone]]
                    
        # save
        data = {
            "audio": segseg, # (T,)
            "label": seg_notes # {text:[[start,duration,pitch],...],...}
        }
        path = save_dir / f"{data_counts}.h5"
        save_to_h5(data, path)
        data_counts += 1
