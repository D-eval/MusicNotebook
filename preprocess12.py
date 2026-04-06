"""
一个样本就是一个
text, audio, [[start, duration, pitch], ...]
"""


import h5py
import json
import librosa
from pathlib import Path
import math

import numpy as np

def save_to_h5(data, h5_path):
    """
    将音频和标签保存到 HDF5 文件中。
    
    Args:
        data (dict):
            {
                "audio": (T,),             # 音频一维数组
                "label": {
                    "text": str,           # 文本标签
                    "notes": list[list]    # [[start, duration, pitch], ...]
                }
            }
        h5_path (str): HDF5 文件保存路径
    """
    audio = np.asarray(data["audio"], dtype=np.float32)
    label = data["label"]
    text = label["text"]
    notes = np.asarray(label["notes"], dtype=np.float32)  # 保证是 np.array
    
    with h5py.File(h5_path, "w") as f:
        # 保存音频
        f.create_dataset("audio", data=audio, dtype=np.float32)
        
        # 保存文本 label，可以存成可变长字符串
        dt = h5py.string_dtype(encoding='utf-8')
        f.create_dataset("label/text", data=np.array(text, dtype=dt))
        
        # 保存 notes，二维数组 (N,3)
        f.create_dataset("label/notes", data=notes, dtype=np.float32)


def in_seg(start_second, seg_start_second, seg_end_second):
    return seg_start_second <= start_second <= seg_end_second


target_samplerate = 44100

windows_duration = 3 # s

root_dir = Path("../preprocess")
save_dir = Path("../preprocess12")
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
        # data = {
        #     "audio": segseg, # (T,)
        #     "label": seg_notes # {text:[[start,duration,pitch],...],...}
        # }
        for text, notes in seg_notes.items():
            data = {
                "audio": segseg, # (T,)
                "label": {
                    "text": text,
                    "notes": notes
                }
            }
            path = save_dir / f"{data_counts}.h5"
            save_to_h5(data, path)      
            data_counts += 1
