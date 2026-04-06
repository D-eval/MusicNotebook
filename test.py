
import numpy as np

import sys
sys.path.append("/Users/broyou/Desktop/music_proj/music-detr")

from spec.cqt import estimate_shift

from read1 import AudioDataset


dataset = AudioDataset("../preprocess11")

audio, events, texts = dataset[0]


best_shift, shifts, scores = estimate_shift(audio[None, :])

