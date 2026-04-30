import torch.nn.functional as F
import torch
import random

# ===== 1. 加噪声 =====
def add_noise(audio, level=0.01):
    noise = torch.randn_like(audio) * level
    return audio + noise


# ===== 2. 失真 =====
def add_distortion(audio, gain=5.0):
    return torch.tanh(audio * gain)


# ===== 3. 混响（简单版IR）=====
def add_reverb(audio, decay=0.3, sr=44100):
    L = int(0.03 * sr)  # 30ms impulse
    ir = torch.exp(-torch.linspace(0, decay, L, device=audio.device))
    ir = ir / ir.sum()

    audio = audio.transpose(0, 1)  # (C, T)
    audio = F.conv1d(
        audio.unsqueeze(0),
        ir.view(1, 1, -1).repeat(audio.shape[0], 1, 1),
        padding=L//2,
        groups=audio.shape[0]
    )[0]
    return audio.transpose(0, 1)


# ===== 4. pitch shift（关键）=====
def pitch_shift_audio(audio, n_steps, sr=44100):
    import librosa
    import numpy as np

    audio_np = audio.cpu().numpy()

    # ===== 处理多通道 =====
    if audio_np.ndim == 2:
        shifted = []
        for ch in range(audio_np.shape[1]):
            shifted_ch = librosa.effects.pitch_shift(
                audio_np[:, ch], sr=sr, n_steps=n_steps
            )
            shifted.append(shifted_ch)
        shifted = np.stack(shifted, axis=1)
    else:
        shifted = librosa.effects.pitch_shift(
            audio_np, sr=sr, n_steps=n_steps
        )

    return torch.tensor(shifted, dtype=audio.dtype, device=audio.device)

def pitch_shift_target(target, n_steps):
    # root / tonic
    target["root"] = (target["root"] + n_steps) % 12
    target["tonic"] = (target["tonic"] + n_steps) % 12

    # chord (N, 12) → rotate
    chord = target["chord"]
    
    print(chord.shape)
    print(n_steps)
    
    chord = torch.roll(chord, shifts=n_steps, dims=1)
    target["chord"] = chord

    return target

def apply_augmentation(audio, target, cfg, sr):
    # ===== pitch shift（先做）=====
    if cfg.aug_pitch_shift and random.random() < 0.3:
        n_steps = random.randint(*cfg.aug_pitch_shift_range)
        if n_steps != 0:
            audio = pitch_shift_audio(audio, n_steps, sr)
            target = pitch_shift_target(target, n_steps)

    # # ===== noise =====
    # if cfg.aug_noise and random.random() < 0.1:
    #     audio = add_noise(audio, cfg.aug_noise_level)

    # # ===== distortion =====
    # if cfg.aug_distortion and random.random() < 0.1:
    #     audio = add_distortion(audio, cfg.aug_distortion_gain)

    # # ===== reverb =====
    # if cfg.aug_reverb and random.random() < 0.1:
    #     audio = add_reverb(audio, cfg.aug_reverb_decay, sr)

    return audio, target