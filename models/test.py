
import h5py
import json

'''
temp_save_path = '/Users/broyou/Desktop/笔记本/preprocess2/4.h5'
with h5py.File(temp_save_path, "r") as f:
    segment = f["segment"][:]  # ⚡ 超快
    song_name = f.attrs["song_name"]
    start = f.attrs["start"]
    end = f.attrs["end"]
    sr = f.attrs["samplerate"]
    annotations = json.loads(f["annotations"][()].decode())
    analysisTracks = json.loads(f["analysisTracks"][()].decode())
'''
# use detr
# every slot predict a represent
# contains midi note and timbre text description

# midi
# 1. tone
# start, end, tone, description

# 2. toneless
# start, end, description

# 每个 slot 预测 existence, start, duration, clarity, tone represent, timbre represent
# clarity 决定 tone 预测是否被应用

# timbre represent 和 timbre description gt 进行对齐

from transformers import ASTForAudioClassification
from transformers import ASTConfig, ASTModel
from transformers import AutoFeatureExtractor
import torch
import librosa
import inspect
# inspect.getfile(ModuleName)

configuration = ASTConfig()
feature_extractor = AutoFeatureExtractor.from_pretrained("MIT/ast-finetuned-audioset-10-10-0.4593")
model = ASTModel.from_pretrained("MIT/ast-finetuned-audioset-10-10-0.4593", attn_implementation="sdpa", dtype=torch.float32)



from read import AudioDataset, collate_fn
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
sr = 16000

for segment, labels in loader:
    break

# backbone -> detr -> slot
segment = segment.mean(-1)
segment = librosa.resample(segment, orig_sr=sr, target_sr=16000)
segment = torch.from_numpy(segment)

inputs = feature_extractor(segment, sampling_rate=16000, return_tensors="pt")

outputs = model(**inputs)

input_values = inputs['input_values']

embedding_output = model.embeddings(input_values)

h = outputs.last_hidden_state

h = h[:,2:] # remove cls and distillation tokens




# h[:,0,:] cls
# h[:,1,:] distillation

# idx_pred = logits.argmax()
# model.config.id2label[idx_pred.item()]
# loss:

# hungarian matching
# timbre represent -> text represent
# then 

# 1. existence loss
# loss = |existence_pred - hungarian_matching|

# 2. alignment loss
# loss = |timbre represent - text represent|

# 3. boundary boxes
# 3.1 start, duration
# loss = |start - start_pred| + |duration - duration_pred|
# 3.2 clarity
# loss = |clarity_pred - clarity_gt|

# 3.3 tone
# tone predictor
# loss = CE(tone_pred, tone_gt) * clarity_gt


# tone metric:
