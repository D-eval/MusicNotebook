import torch
from transformers import Cnn8RnnSoundEventDetection
import librosa
import soundfile as sf
import inspect

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = Cnn8RnnSoundEventDetection.from_pretrained(
    "wsntxxn/cnn8rnn-audioset-sed",
    trust_remote_code=True
).to(device)

wav1, sr1 = sf.read("/Users/broyou/Desktop/笔记本/保存/music_note/Akibare/Akibare.mp3")
wav1 = librosa.resample(wav1, orig_sr=sr1, target_sr=model.config.sample_rate)
wav1 = wav1.mean(0) if wav1.size(0) > 1 else wav1[0]

wav1 = torch.from_numpy(wav1).to(device)
wav1 = wav1.to(torch.float32)

wav2, sr2 = sf.read("'/Users/broyou/Desktop/笔记本/保存/music_note/ALONE to ALONE (feat. lasah)/ALONE to ALONE (feat. lasah).mp3'")
wav2 = librosa.resample(wav2, orig_sr=sr2, target_sr=model.config.sample_rate)
wav2 = wav2.mean(0) if wav2.size(0) > 1 else wav2[0]

wav_batch = torch.nn.utils.rnn.pad_sequence([wav1], batch_first=True)

with torch.no_grad():
    output = model(waveform=wav_batch)
    # output: {
    #     "framewise_output": (2, 447, n_frames),
    #     "clipwise_output": (2, 447)
    # }

# classes is in `model.classes`
# for example, the probability sequence of male speech is:
male_speech_prob = output[:, model.classes.index("Male speech, man speaking"), :]
# 这个就是backbone
