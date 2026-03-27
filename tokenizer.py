
import torch
import math
import numpy as np

import scipy.io.wavfile

ts = np.arange(0, 1, 1/16000)

y = np.sin(2 * np.pi * 440 * ts)

scipy.io.wavfile.write("a.wav", 16000, y)


def build_note_frequencies():
    """
    C2 (MIDI=36) 到 B6 (MIDI=95)，共60个
    """
    midi = torch.arange(36, 96)  # [36, ..., 95]
    freqs = 440.0 * (2.0 ** ((midi - 69) / 12.0))
    return freqs  # (60,)


def standard_proj(
    audio,
    sr=16000,
    hop=160,
    window=1024,
    mode="fft",  # "fft" or "proj"
    window_type="hann",
):
    """
    audio: (T,) or (B, T)
    return: (num_frames, 60) or (B, num_frames, 60)
    """

    if audio.dim() == 1:
        audio = audio.unsqueeze(0)  # (1, T)

    B, T = audio.shape

    # ===== window =====
    if window_type == "hann":
        win = torch.hann_window(window, device=audio.device)
    elif window_type == "hamming":
        win = torch.hamming_window(window, device=audio.device)
    else:
        raise ValueError

    # ===== padding（保证 (T+window)//hop）=====
    pad = window
    audio = torch.nn.functional.pad(audio, (0, pad))

    # ===== unfold 成帧 =====
    frames = audio.unfold(dimension=1, size=window, step=hop)  # (B, n_frames, window)
    frames = frames * win  # 加窗

    B, n_frames, W = frames.shape

    # ===== 频率 =====
    freqs = build_note_frequencies().to(audio.device)  # (60,)
    F = freqs.shape[0]

    # ===== 方法1：FFT =====
    if mode == "fft":
        spec = torch.fft.rfft(frames, dim=-1)  # (B, n_frames, W//2+1)

        freqs_fft = torch.fft.rfftfreq(W, d=1.0 / sr).to(audio.device)

        # 找最近频点
        idx = torch.argmin(
            torch.abs(freqs_fft.unsqueeze(0) - freqs.unsqueeze(1)), dim=1
        )  # (60,)

        # gather
        out = spec[..., idx]  # (B, n_frames, 60)

        out = torch.abs(out)

    # ===== 方法2：直接 sin/cos 投影 =====
    elif mode == "proj":
        t = torch.arange(W, device=audio.device) / sr  # (W,)

        cos_bank = torch.cos(2 * math.pi * freqs.unsqueeze(1) * t)  # (60, W)
        sin_bank = torch.sin(2 * math.pi * freqs.unsqueeze(1) * t)  # (60, W)

        # reshape
        frames = frames.reshape(B * n_frames, W)

        real = torch.matmul(frames, cos_bank.T)  # (B*n_frames, 60)
        imag = torch.matmul(frames, sin_bank.T)

        out = torch.sqrt(real**2 + imag**2)

        out = out.reshape(B, n_frames, F)

    else:
        raise ValueError

    if out.shape[0] == 1:
        out = out.squeeze(0)  # (n_frames, 60)

    return out


'''
audio = torch.randn(16000 * 5)  # 5秒

feat = standard_proj(
    audio,
    sr=16000,
    hop=160,       # 100 fps
    window=1024,
    mode="proj",   # 或 "fft"
)

'''

