function getAnalysisRange() {
  if (state.pendingNoteRange) {
    return { start: state.pendingNoteRange.start, end: state.pendingNoteRange.end };
  }
  if (state.activeRegion) {
    return { start: state.activeRegion.start, end: state.activeRegion.end };
  }
  const duration = state.wave?.getDuration?.() || 0;
  return { start: 0, end: duration };
}

function buildMidiFreqs() {
  return buildMidiFreqsRange(24, 107);
}

function buildMidiFreqsRange(minMidi, maxMidi) {
  const freqs = [];
  for (let midi = minMidi; midi <= maxMidi; midi += 1) {
    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    freqs.push({ midi, freq });
  }
  return freqs;
}

function getAnalysisGrid(height) {
  const rows = analysisViewYSpan();
  const binH = height / rows;
  const yForIndex = (i) => height - (i + 1) * binH;
  return { rows, binH, yForIndex };
}

function getAnalysisYOffset() {
  const bar = ui.analysisTimebar?.clientHeight || 0;
  const wave = ui.analysisWave?.clientHeight || 0;
  const gap = 8;
  return bar + wave + gap * 2;
}

function drawPiano(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const height = canvas.clientHeight || 0;
  const width = canvas.clientWidth || 0;
  const offset = getAnalysisYOffset();
  const gridHeight = Math.max(1, height - offset);
  const freqs = buildMidiFreqsRange(state.analysisViewY.min, state.analysisViewY.max);
  canvas.width = width;
  canvas.height = offset + gridHeight;
  const grid = getAnalysisGrid(gridHeight);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#f9f5ea';
  ctx.fillRect(0, 0, width, height);

  const blackSet = new Set([1, 3, 6, 8, 10]);
  freqs.forEach((item, idx) => {
    const y = offset + grid.yForIndex(idx);
    const note = item.midi % 12;
    const isBlack = blackSet.has(note);
    ctx.fillStyle = isBlack ? '#2d1a0f' : '#fdf6e3';
    ctx.fillRect(0, y, isBlack ? width * 0.7 : width, grid.binH);
    ctx.strokeStyle = 'rgba(120, 75, 40, 0.2)';
    ctx.strokeRect(0, y, width, grid.binH);
  });
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

const ROOT_THRESHOLD_SEC = 0.05;

function buildWindow(windowLen, type) {
  const window = new Float32Array(windowLen);
  const denom = Math.max(1, windowLen - 1);
  for (let i = 0; i < windowLen; i += 1) {
    const phase = (2 * Math.PI * i) / denom;
    if (type === 'hann') {
      window[i] = 0.5 - 0.5 * Math.cos(phase);
    } else if (type === 'hamming') {
      window[i] = 0.54 - 0.46 * Math.cos(phase);
    } else {
      window[i] = 1;
    }
  }
  return window;
}

function buildCqtBases(freqs, windowLen, sampleRate, scale) {
  const half = Math.floor(windowLen / 2);
  const t = new Float32Array(windowLen);
  for (let i = 0; i < windowLen; i += 1) {
    t[i] = (i - half) / sampleRate;
  }
  const sinBasis = [];
  const cosBasis = [];
  for (let b = 0; b < freqs.length; b += 1) {
    const freq = freqs[b].freq;
    const sigma = scale / (freq + 1e-6);
    const mask = new Float32Array(windowLen);
    let sum = 0;
    for (let i = 0; i < windowLen; i += 1) {
      const v = Math.exp(-(t[i] * t[i]) / (2 * sigma * sigma));
      mask[i] = v;
      sum += v;
    }
    const norm = sum + 1e-8;
    const sin = new Float32Array(windowLen);
    const cos = new Float32Array(windowLen);
    for (let i = 0; i < windowLen; i += 1) {
      const phase = 2 * Math.PI * freq * t[i];
      const m = mask[i] / norm;
      sin[i] = Math.sin(phase) * m;
      cos[i] = Math.cos(phase) * m;
    }
    sinBasis.push(sin);
    cosBasis.push(cos);
  }
  return { sinBasis, cosBasis };
}

function shiftFreqsByCents(freqs, cents) {
  const factor = Math.pow(2, cents / 1200);
  return freqs.map((item) => ({ freq: item.freq * factor }));
}

function estimateShiftCents(mono, sampleRate, shiftRange = [-50, 50], step = 1) {
  const freqs = buildMidiFreqs();
  let windowLen = Math.max(2, Math.floor(sampleRate * ANALYSIS_CQT_WINDOW_SEC));
  if (windowLen % 2 !== 0) windowLen += 1;
  const stride = Math.max(1, Math.floor(windowLen * ANALYSIS_CQT_STRIDE_RATIO));
  const window = buildWindow(windowLen, ANALYSIS_CQT_WINDOW_TYPE);
  const frames = Math.max(1, Math.floor((mono.length - windowLen) / stride) + 1);
  const bins = freqs.length;
  const low = Math.floor(0.5 * bins);
  const high = Math.floor(0.9 * bins);
  const shifts = [];
  const scores = [];
  const winFrame = new Float32Array(windowLen);

  for (let shift = shiftRange[0]; shift <= shiftRange[1]; shift += step) {
    const shifted = shiftFreqsByCents(freqs, shift);
    const { sinBasis, cosBasis } = buildCqtBases(shifted, windowLen, sampleRate, ANALYSIS_CQT_SCALE);
    const energy = new Float32Array(bins);
    for (let f = 0; f < frames; f += 1) {
      const offset = f * stride;
      for (let i = 0; i < windowLen; i += 1) {
        const idx = offset + i;
        const sample = idx < mono.length ? mono[idx] : 0;
        winFrame[i] = sample * window[i];
      }
      for (let b = 0; b < bins; b += 1) {
        const sin = sinBasis[b];
        const cos = cosBasis[b];
        let sumSin = 0;
        let sumCos = 0;
        for (let i = 0; i < windowLen; i += 1) {
          const v = winFrame[i];
          sumSin += v * sin[i];
          sumCos += v * cos[i];
        }
        const mag = Math.sqrt(sumSin * sumSin + sumCos * sumCos);
        energy[b] += mag;
      }
    }
    let score = 0;
    for (let b = 0; b < bins; b += 1) {
      const mean = energy[b] / frames;
      const weight = mean * mean;
      if (b >= low && b < high) score += weight;
    }
    shifts.push(shift);
    scores.push(score);
  }

  let bestIdx = 0;
  for (let i = 1; i < scores.length; i += 1) {
    if (scores[i] > scores[bestIdx]) bestIdx = i;
  }
  return { bestShift: shifts[bestIdx], shifts, scores };
}

function applyMidiShiftToTracks(semitones) {
  if (!Number.isFinite(semitones) || semitones === 0) return;
  const minMidi = 24;
  const maxMidi = 107;
  state.analysisTracks.forEach((track) => {
    track.notes.forEach((note) => {
      note.midi = clamp(Math.round(note.midi + semitones), minMidi, maxMidi);
    });
  });
}

function drawAnalysisShiftWindow(ctx, width, height) {
  const win = state.analysisShiftWindow;
  if (!win) return;
  const start = win.start;
  const end = win.end;
  if (!Number.isFinite(start) || !Number.isFinite(end)) return;
  const viewStart = state.analysisView.start;
  const viewEnd = state.analysisView.end;
  if (end <= viewStart || start >= viewEnd) return;
  const x0 = timeToX(Math.max(start, viewStart), width);
  const x1 = timeToX(Math.min(end, viewEnd), width);
  const offset = getAnalysisYOffset();
  const gridHeight = Math.max(1, height - offset);
  ctx.save();
  ctx.fillStyle = 'rgba(168, 85, 247, 0.16)';
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
  ctx.lineWidth = 1;
  ctx.fillRect(x0, offset, x1 - x0, gridHeight);
  ctx.strokeRect(x0 + 0.5, offset + 0.5, Math.max(0, x1 - x0 - 1), Math.max(0, gridHeight - 1));
  ctx.restore();
}

function interleaveAudioBuffer(buffer) {
  const channels = buffer.numberOfChannels;
  const length = buffer.length;
  const out = new Float32Array(length * channels);
  const channelData = [];
  for (let c = 0; c < channels; c += 1) channelData.push(buffer.getChannelData(c));
  let idx = 0;
  for (let i = 0; i < length; i += 1) {
    for (let c = 0; c < channels; c += 1) {
      out[idx++] = channelData[c][i];
    }
  }
  return out;
}

function deinterleaveToChannels(interleaved, channels) {
  const frames = Math.floor(interleaved.length / channels);
  const out = [];
  for (let c = 0; c < channels; c += 1) out.push(new Float32Array(frames));
  let idx = 0;
  for (let i = 0; i < frames; i += 1) {
    for (let c = 0; c < channels; c += 1) {
      out[c][i] = interleaved[idx++];
    }
  }
  return out;
}

function concatFloat32(chunks, totalLength) {
  const len = totalLength ?? chunks.reduce((sum, arr) => sum + arr.length, 0);
  const out = new Float32Array(len);
  let offset = 0;
  chunks.forEach((chunk) => {
    out.set(chunk, offset);
    offset += chunk.length;
  });
  return out;
}

function buildHannWindow(length) {
  const window = new Float32Array(length);
  const denom = Math.max(1, length - 1);
  for (let i = 0; i < length; i += 1) {
    window[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / denom);
  }
  return window;
}

function pitchShiftGranularChannels(channels, pitchFactor, grainSize = 2048, hopOut = 512) {
  const length = channels[0].length;
  const outChannels = channels.map(() => new Float32Array(length));
  const norm = new Float32Array(length);
  const window = buildHannWindow(grainSize);
  let inPos = 0;
  for (let outPos = 0; outPos < length; outPos += hopOut) {
    for (let i = 0; i < grainSize; i += 1) {
      const srcIdx = Math.floor(inPos + i);
      const dstIdx = outPos + i;
      if (srcIdx >= length || dstIdx >= length) break;
      const w = window[i];
      norm[dstIdx] += w;
      for (let c = 0; c < channels.length; c += 1) {
        outChannels[c][dstIdx] += channels[c][srcIdx] * w;
      }
    }
    inPos += hopOut * pitchFactor;
  }
  for (let i = 0; i < length; i += 1) {
    if (norm[i] > 1e-6) {
      for (let c = 0; c < outChannels.length; c += 1) {
        outChannels[c][i] /= norm[i];
      }
    }
  }
  return outChannels;
}

function analysisRangeDuration() {
  return Math.max(0, state.analysisRange.end - state.analysisRange.start);
}

function analysisViewDuration() {
  return Math.max(0, state.analysisView.end - state.analysisView.start);
}

function getActiveAnalysisTrack() {
  if (!state.analysisTracks.length) return null;
  let track = state.analysisTracks.find((t) => t.id === state.analysisActiveTrackId);
  if (!track) track = state.analysisTracks[0];
  state.analysisActiveTrackId = track.id;
  return track;
}

function setActiveAnalysisTrack(trackId) {
  state.analysisActiveTrackId = trackId;
  const track = getActiveAnalysisTrack();
  state.analysisNotes = track ? track.notes : [];
  state.analysisSelectedId = null;
  state.analysisSelectedTrackId = null;
  renderAnalysisTracks();
  drawAnalysisNotes();
}

function ensureAnalysisTracks() {
  if (state.analysisTracks.length) {
    const track = getActiveAnalysisTrack();
    state.analysisNotes = track ? track.notes : [];
    return;
  }
  const track = {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name: '音色1',
    type: 'pitch',
    muted: false,
    solo: false,
    notes: []
  };
  state.analysisTracks = [track];
  state.analysisActiveTrackId = track.id;
  state.analysisNotes = track.notes;
}

function getRenderableTracks(options = {}) {
  let tracks = state.analysisTracks || [];
  const soloed = tracks.filter((t) => t.solo);
  if (soloed.length) tracks = soloed;
  tracks = tracks.filter((t) => !t.muted);
  if (!options.renderAll && state.analysisShowActiveOnly && state.analysisActiveTrackId) {
    tracks = tracks.filter((t) => t.id === state.analysisActiveTrackId);
  }
  return tracks;
}

function getTrackColor(idx) {
  const hue = getTrackHue(idx);
  return `hsl(${hue}deg 80% 70%)`;
}

function getTrackHue(idx) {
  return (idx * 47) % 360;
}

function buildTrackFromRel(source, baseStart, index) {
  const name = typeof source?.name === 'string' && source.name.trim()
    ? source.name.trim()
    : `音色${index + 1}`;
  const type = source?.type === 'transient' ? 'transient' : 'pitch';
  const list = Array.isArray(source?.notes) ? source.notes : [];
  const notes = list
    .map((item) => {
      const relStart = Number(item?.startRel ?? item?.start ?? 0);
      const relEnd = Number(item?.endRel ?? item?.end ?? 0);
      const rel = normalizeRegionBounds(relStart, relEnd, Infinity);
      return {
        id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
        start: baseStart + rel.start,
        end: baseStart + rel.end,
        midi: Number(item?.midi ?? 60),
        velocity: clamp(Number(item?.velocity ?? 0.7), 0, 1)
      };
    })
    .filter(Boolean);
  return {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name,
    type,
    muted: false,
    solo: false,
    notes
  };
}

function serializeTrackToRel(track, baseStart) {
  return {
    name: track.name,
    type: track.type,
    notes: track.notes.map((note) => ({
      startRel: note.start - baseStart,
      endRel: note.end - baseStart,
      midi: note.midi,
      velocity: note.velocity ?? 0.7
    }))
  };
}

function loadAnalysisNotesForTarget() {
  const baseStart = state.analysisRange.start || 0;
  let stored = null;
  if (state.analysisTargetIndex !== null && state.notes[state.analysisTargetIndex]) {
    stored = state.notes[state.analysisTargetIndex];
  } else {
    stored = { analysisTracks: state.pendingAnalysisTracks, analysisNotes: state.pendingAnalysisNotes };
  }
  if (Array.isArray(stored.analysisTracks) && stored.analysisTracks.length) {
    state.analysisTracks = stored.analysisTracks.map((t, idx) => buildTrackFromRel(t, baseStart, idx));
  } else if (Array.isArray(stored.analysisNotes) && stored.analysisNotes.length) {
    state.analysisTracks = [
      buildTrackFromRel({ name: '音色1', type: 'pitch', notes: stored.analysisNotes }, baseStart, 0)
    ];
  } else {
    state.analysisTracks = [];
  }
  ensureAnalysisTracks();
  setActiveAnalysisTrack(state.analysisActiveTrackId);
}

function persistAnalysisNotesToTarget() {
  const baseStart = state.analysisRange.start || 0;
  const relTracks = state.analysisTracks.map((t) => serializeTrackToRel(t, baseStart));
  if (state.analysisTargetIndex !== null && state.notes[state.analysisTargetIndex]) {
    state.notes[state.analysisTargetIndex].analysisTracks = relTracks;
    state.notes[state.analysisTargetIndex].analysisNotes = null;
    state.pendingAnalysisTracks = relTracks;
    return;
  }
  state.pendingAnalysisTracks = relTracks;
}

function setAnalysisView(start, end) {
  const rangeStart = state.analysisRange.start;
  const rangeEnd = state.analysisRange.end;
  const minSpan = Math.max(0.2, (rangeEnd - rangeStart) * 0.02);
  let s = start;
  let e = end;
  if (e - s < minSpan) {
    const mid = (s + e) / 2;
    s = mid - minSpan / 2;
    e = mid + minSpan / 2;
  }
  state.analysisView = { start: s, end: e };
  drawAnalysisNotes();
  drawAnalysisSpectrogram();
  drawAnalysisWave();
  updateAnalysisTimeUI();
}

function analysisViewYSpan() {
  return Math.max(1, state.analysisViewY.max - state.analysisViewY.min + 1);
}

function setAnalysisViewY(minMidi, maxMidi) {
  const minLimit = 24;
  const maxLimit = 107;
  let min = Math.round(minMidi);
  let max = Math.max(min + 1, Math.round(maxMidi));
  const span = Math.max(1, max - min);
  if (min < minLimit) {
    min = minLimit;
    max = min + span;
  }
  if (max > maxLimit) {
    max = maxLimit;
    min = max - span;
  }
  min = Math.max(minLimit, Math.min(min, maxLimit - 1));
  max = Math.max(min + 1, Math.min(max, maxLimit));
  state.analysisViewY = { min, max };
  drawPiano(ui.analysisPiano);
  drawAnalysisNotes();
  drawAnalysisSpectrogram();
}

function timeToX(t, width) {
  const dur = analysisViewDuration();
  if (dur <= 0) return 0;
  return ((t - state.analysisView.start) / dur) * width;
}

function xToTime(x, width) {
  const dur = analysisViewDuration();
  if (dur <= 0) return state.analysisView.start;
  const clamped = clamp(x / width, 0, 1);
  return state.analysisView.start + clamped * dur;
}

function yToMidi(y, height) {
  const freqs = buildMidiFreqsRange(state.analysisViewY.min, state.analysisViewY.max);
  const offset = getAnalysisYOffset();
  const gridHeight = Math.max(1, height - offset);
  const grid = getAnalysisGrid(gridHeight);
  const localY = clamp(y - offset, 0, gridHeight);
  const idx = clamp(freqs.length - 1 - Math.floor(localY / grid.binH), 0, freqs.length - 1);
  return freqs[idx].midi;
}

function midiToY(midi, height) {
  const freqs = buildMidiFreqsRange(state.analysisViewY.min, state.analysisViewY.max);
  const idx = freqs.findIndex((f) => f.midi === midi);
  if (idx < 0) return 0;
  const offset = getAnalysisYOffset();
  const gridHeight = Math.max(1, height - offset);
  const grid = getAnalysisGrid(gridHeight);
  return offset + grid.yForIndex(idx);
}

function drawAnalysisNotes() {
  if (!ui.analysisNotes) return;
  const canvas = ui.analysisNotes;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const width = canvas.clientWidth || 0;
  const height = canvas.clientHeight || 0;
  const offset = getAnalysisYOffset();
  const gridHeight = Math.max(1, height - offset);
  const grid = getAnalysisGrid(gridHeight);
  canvas.width = width;
  canvas.height = offset + gridHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const binH = grid.binH;
  // Root thresholds for alignment hint (start only)
  if (state.analysisShowRootThreshold !== false) {
    const rootTrack = (state.analysisTracks || []).find((t) => t.name === "<root>");
    if (rootTrack && Array.isArray(rootTrack.notes)) {
      const eps = ROOT_THRESHOLD_SEC;
      ctx.save();
      ctx.fillStyle = "rgba(251, 191, 36, 0.10)";
      ctx.strokeStyle = "rgba(251, 191, 36, 0.35)";
      rootTrack.notes.forEach((note) => {
        const s0 = note.start - eps;
        const s1 = note.start + eps;
        const leftT = Math.max(state.analysisView.start, Math.min(s0, s1));
        const rightT = Math.min(state.analysisView.end, Math.max(s0, s1));
        if (rightT <= state.analysisView.start || leftT >= state.analysisView.end) return;
        const x0 = timeToX(leftT, width);
        const x1 = timeToX(rightT, width);
        const w = Math.max(1, x1 - x0);
        ctx.fillRect(x0, 0, w, canvas.height);
        ctx.strokeRect(x0 + 0.5, 0.5, Math.max(0, w - 1), canvas.height - 1);
      });
      ctx.restore();
    }
  }
  const tracks = getRenderableTracks();
  tracks.forEach((track, idx) => {
    const hue = getTrackHue(idx);
    track.notes.forEach((note) => {
      if (note.end < state.analysisView.start || note.start > state.analysisView.end) return;
      if (note.midi < state.analysisViewY.min || note.midi > state.analysisViewY.max) return;
      const x0 = timeToX(note.start, width);
      const x1 = timeToX(note.end, width);
      const y0 = midiToY(note.midi, height);
      const w = Math.max(2, x1 - x0);
      const h = binH;
      const amp = clamp(note.velocity || 0.7, 0, 1);
      const alpha = 0.18 + amp * 0.5;
      ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${alpha})`;
      ctx.fillRect(x0, y0, w, h);
      ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${0.6 + amp * 0.4})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      const midY = y0 + h / 2;
      const waveAmp = h * 0.25;
      const steps = Math.max(8, Math.floor(w / 6));
      for (let i = 0; i <= steps; i += 1) {
        const px = x0 + (i / steps) * w;
        const phase = (i / steps) * Math.PI * 2 * 3;
        const py = midY + Math.sin(phase) * waveAmp;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      if (state.analysisSelectedId === note.id && state.analysisSelectedTrackId === track.id) {
        ctx.strokeStyle = '#f97316';
        ctx.strokeRect(x0, y0, w, h);
      }
    });
  });
  drawAnalysisShiftWindow(ctx, width, height);
  drawAnalysisPlayhead();
}

function drawAnalysisPlayhead() {
  if (!ui.analysisNotes || !state.analysisAudio) return;
  const ctx = ui.analysisNotes.getContext('2d');
  if (!ctx) return;
  const width = ui.analysisNotes.width;
  const height = ui.analysisNotes.height;
  const t = state.analysisAudio.currentTime;
  const x = timeToX(t, width);
  ctx.strokeStyle = 'rgba(244,63,94,0.9)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
  ctx.stroke();
}

function updateAnalysisTimeUI() {
  if (!ui.analysisTime || !state.analysisAudio) return;
  const t = state.analysisAudio.currentTime;
  ui.analysisTime.textContent = `${formatSec(t)} / ${formatSec(state.analysisRange.end)}`;
  if (ui.analysisTimeThumb && ui.analysisTimebar) {
    const width = ui.analysisTimebar.clientWidth || 1;
    const x = timeToX(t, width);
    ui.analysisTimeThumb.style.left = `${x}px`;
  }
}

function clampVolume(value, min = 0, max = 1) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function applyAnalysisAudioVolume() {
  if (state.analysisAudio) {
    state.analysisAudio.volume = clampVolume(state.analysisAudioVolume ?? 0.8, 0, 1);
  }
}

function applyAnalysisSynthVolume() {
  if (state.analysisSynth && state.analysisSynth.master) {
    state.analysisSynth.master.gain.value = clampVolume(state.analysisNotesVolume ?? 0.7, 0, 1);
  }
}

function getAnalysisPreviewVolume() {
  return clampVolume(state.analysisPreviewVolume ?? 1, 0, 2);
}

function ensureAnalysisAudio() {
  if (state.analysisAudio) return;
  const audio = new Audio();
  state.analysisAudio = audio;
  applyAnalysisAudioVolume();
  audio.addEventListener('timeupdate', () => {
    if (state.analysisAudio !== audio) return;
    updateAnalysisTimeUI();
    drawAnalysisNotes();
    if (audio.currentTime >= state.analysisRange.end) {
      audio.pause();
      audio.currentTime = state.analysisRange.end;
      stopAnalysisSynth();
      if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
    }
  });
  audio.addEventListener('ended', () => {
    if (state.analysisAudio !== audio) return;
    stopAnalysisSynth();
    if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
  });
}

function setAnalysisAudioSource() {
  ensureAnalysisAudio();
  if (!state.audioBlob) return;
  if (state.audioBlobData) {
    state.audioBlob = new Blob([state.audioBlobData], { type: state.audioBlob.type || 'audio/wav' });
  }
  if (state.analysisAudioUrl) URL.revokeObjectURL(state.analysisAudioUrl);
  const safeBlob = state.audioBlob.slice(0, state.audioBlob.size, state.audioBlob.type || 'audio/wav');
  state.analysisAudioUrl = URL.createObjectURL(safeBlob);
  state.analysisAudio.src = state.analysisAudioUrl;
  applyAnalysisAudioVolume();
  state.analysisAudio.load();
  state.analysisAudio.currentTime = state.analysisView.start || state.analysisRange.start;
  updateAnalysisTimeUI();
}

function resetAnalysisAudio() {
  if (!state.analysisAudio) return;
  try {
    state.analysisAudio.pause();
  } catch {}
  state.analysisAudio.removeAttribute('src');
  state.analysisAudio.load();
  if (state.analysisAudioUrl) URL.revokeObjectURL(state.analysisAudioUrl);
  state.analysisAudioUrl = null;
  state.analysisAudio = null;
}

async function getSafeAudioBlob() {
  if (!state.audioBlob) return null;
  await ensureAudioBlobData();
  if (state.audioBlobData) {
    return new Blob([state.audioBlobData], { type: state.audioBlob?.type || 'audio/wav' });
  }
  try {
    return state.audioBlob.slice(0, state.audioBlob.size, state.audioBlob.type || 'audio/wav');
  } catch {
    return null;
  }
}

function hitTestNote(x, y, width, height) {
  const offset = getAnalysisYOffset();
  const gridHeight = Math.max(1, height - offset);
  if (y < offset || y > offset + gridHeight) return null;
  const grid = getAnalysisGrid(gridHeight);
  const binH = grid.binH;
  const active = getActiveAnalysisTrack();
  const tracks = getRenderableTracks();
  const ordered = active ? [active, ...tracks.filter((t) => t.id !== active.id)] : tracks;
  for (const track of ordered) {
    for (let i = track.notes.length - 1; i >= 0; i -= 1) {
      const note = track.notes[i];
      const x0 = timeToX(note.start, width);
      const x1 = timeToX(note.end, width);
      const y0 = midiToY(note.midi, height);
      const h = binH;
      if (x >= x0 && x <= x1 && y >= y0 && y <= y0 + h) {
        return { track, note, index: i, x0, x1, y0, h };
      }
    }
  }
  return null;
}

function setAnalysisTool(name) {
  state.analysisTool = name;
  if (ui.analysisToolSelect) ui.analysisToolSelect.value = name;
}

function showVelocitySlider(note, x, y) {
  if (!ui.analysisVelocityWrap || !ui.analysisVelocity) return;
  ui.analysisVelocityWrap.style.display = 'block';
  ui.analysisVelocityWrap.style.left = `${x}px`;
  ui.analysisVelocityWrap.style.top = `${y}px`;
  ui.analysisVelocity.value = String(note.velocity ?? 0.7);
  ui.analysisVelocity.oninput = () => {
    note.velocity = parseFloat(ui.analysisVelocity.value);
    drawAnalysisNotes();
  };
}

function hideVelocitySlider() {
  if (!ui.analysisVelocityWrap) return;
  ui.analysisVelocityWrap.style.display = 'none';
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function encodeVarLen(value) {
  let buffer = value & 0x7f;
  const out = [];
  while ((value >>= 7)) {
    buffer <<= 8;
    buffer |= (value & 0x7f) | 0x80;
  }
  while (true) {
    out.push(buffer & 0xff);
    if (buffer & 0x80) buffer >>= 8;
    else break;
  }
  return out;
}

function buildMidiFileBytes() {
  const ppq = 480;
  const tempo = 500000;
  const ticksPerSecond = (ppq * 1000000) / tempo;
  const baseStart = state.analysisRange.start || 0;
  const events = [];
  state.analysisTracks.forEach((track) => {
    track.notes.forEach((note) => {
      const startSec = Math.max(0, note.start - baseStart);
      const endSec = Math.max(startSec + 0.01, note.end - baseStart);
      const startTick = Math.round(startSec * ticksPerSecond);
      const endTick = Math.round(endSec * ticksPerSecond);
      const vel = clamp(Math.round((note.velocity ?? 0.7) * 127), 1, 127);
      const midi = Math.round(note.midi);
      events.push({ tick: startTick, order: 1, data: [0x90, midi, vel] });
      events.push({ tick: endTick, order: 0, data: [0x80, midi, 0] });
    });
  });
  events.sort((a, b) => (a.tick - b.tick) || (a.order - b.order));
  const track = [];
  track.push(0x00, 0xff, 0x51, 0x03, 0x07, 0xa1, 0x20);
  let lastTick = 0;
  events.forEach((evt) => {
    const delta = evt.tick - lastTick;
    track.push(...encodeVarLen(Math.max(0, delta)), ...evt.data);
    lastTick = evt.tick;
  });
  track.push(0x00, 0xff, 0x2f, 0x00);

  const header = [];
  header.push(0x4d, 0x54, 0x68, 0x64);
  header.push(0x00, 0x00, 0x00, 0x06);
  header.push(0x00, 0x00, 0x00, 0x01);
  header.push((ppq >> 8) & 0xff, ppq & 0xff);

  const trackHeader = [];
  trackHeader.push(0x4d, 0x54, 0x72, 0x6b);
  const len = track.length;
  trackHeader.push((len >> 24) & 0xff, (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff);

  return new Uint8Array([...header, ...trackHeader, ...track]);
}

function resizeCanvasToDisplaySize(canvas) {
  if (!canvas) return 0;
  const { clientWidth, clientHeight } = canvas;
  if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
    canvas.width = clientWidth;
    canvas.height = clientHeight;
  }
  return canvas.width;
}

function refreshAnalysisLayout() {
  drawPiano(ui.analysisPiano);
  drawAnalysisSpectrogram();
  drawAnalysisNotes();
  drawAnalysisWave();
  updateAnalysisTimeUI();
}

function renderAnalysisTracks() {
  if (!ui.analysisTrackList) return;
  ui.analysisTrackList.innerHTML = '';
  state.analysisTracks.forEach((track, idx) => {
    const item = document.createElement('div');
    item.className = 'analysis-track';
    if (track.id === state.analysisActiveTrackId) item.classList.add('active');
    item.style.borderColor = getTrackColor(idx);

    const selectBtn = document.createElement('button');
    selectBtn.type = 'button';
    selectBtn.className = 'ghost track-select';
    selectBtn.textContent = `${idx + 1}`;
    selectBtn.style.borderColor = getTrackColor(idx);
    selectBtn.addEventListener('click', () => setActiveAnalysisTrack(track.id));

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'track-name';
    nameInput.value = track.name;
    nameInput.placeholder = '音色描述';
    nameInput.addEventListener('change', () => {
      track.name = nameInput.value.trim() || `音色${idx + 1}`;
    });

    const typeSelect = document.createElement('select');
    typeSelect.className = 'track-type';
    typeSelect.innerHTML = '<option value="pitch">音高</option><option value="transient">瞬态</option>';
    typeSelect.value = track.type;
    typeSelect.addEventListener('change', () => {
      track.type = typeSelect.value === 'transient' ? 'transient' : 'pitch';
    });

    const muteBtn = document.createElement('button');
    muteBtn.type = 'button';
    muteBtn.className = 'ghost track-toggle';
    muteBtn.textContent = 'M';
    muteBtn.classList.toggle('active', track.muted);
    muteBtn.addEventListener('click', () => {
      track.muted = !track.muted;
      renderAnalysisTracks();
      drawAnalysisNotes();
    });

    const soloBtn = document.createElement('button');
    soloBtn.type = 'button';
    soloBtn.className = 'ghost track-toggle';
    soloBtn.textContent = 'S';
    soloBtn.classList.toggle('active', track.solo);
    soloBtn.addEventListener('click', () => {
      track.solo = !track.solo;
      renderAnalysisTracks();
      drawAnalysisNotes();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'ghost track-toggle';
    deleteBtn.textContent = '删';
    deleteBtn.addEventListener('click', () => {
      const idxToRemove = state.analysisTracks.findIndex((t) => t.id === track.id);
      if (idxToRemove >= 0) {
        state.analysisTracks.splice(idxToRemove, 1);
        if (state.analysisActiveTrackId === track.id) {
          const next = state.analysisTracks[idxToRemove] || state.analysisTracks[idxToRemove - 1] || state.analysisTracks[0];
          state.analysisActiveTrackId = next ? next.id : null;
        }
        renderAnalysisTracks();
        drawAnalysisNotes();
      }
    });

    item.appendChild(selectBtn);
    item.appendChild(nameInput);
    item.appendChild(typeSelect);
    item.appendChild(muteBtn);
    item.appendChild(soloBtn);
    item.appendChild(deleteBtn);
    ui.analysisTrackList.appendChild(item);
  });
}

function stopAnalysisSynth() {
  if (!state.analysisSynth) return;
  const { ctx, oscList } = state.analysisSynth;
  oscList.forEach((o) => {
    try {
      o.stop();
    } catch {}
  });
  oscList.length = 0;
  try {
    ctx.close();
  } catch {}
  state.analysisSynth = null;
  state.analysisSynthPlaying = false;
state.analysisShowActiveOnly = false;
}

function playAnalysisNotes(options = {}) {
  stopAnalysisSynth();
  const tracks = getRenderableTracks();
  if (!tracks.length) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscList = [];
  const master = ctx.createGain();
  master.gain.value = clampVolume(state.analysisNotesVolume ?? 0.7, 0, 1);
  master.connect(ctx.destination);
  const now = ctx.currentTime;
  const rangeStart = state.analysisRange.start;
  const rangeEnd = state.analysisRange.end;
  const syncToAudio = !!options.syncToAudio;
  const playbackStart = syncToAudio && state.analysisAudio
    ? clamp(state.analysisAudio.currentTime, rangeStart, rangeEnd)
    : rangeStart;
  const duration = Math.max(0.01, rangeEnd - playbackStart);
  state.analysisSynthStart = performance.now() / 1000;
  state.analysisSynthPlaying = true;
  tracks.forEach((track) => {
    track.notes.forEach((note) => {
      const start = note.start - playbackStart;
      const end = note.end - playbackStart;
      if (end <= 0 || start >= duration) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freq = 440 * Math.pow(2, (note.midi - 69) / 12);
      const vel = clamp(note.velocity || 0.7, 0, 1);
      osc.type = 'sine';
      if (track.type === 'transient') {
        const dur = Math.max(0.05, Math.min(0.25, end - start));
        osc.frequency.setValueAtTime(freq * 2, now + Math.max(0, start));
        osc.frequency.exponentialRampToValueAtTime(
          Math.max(40, freq * 0.3),
          now + Math.max(0, start) + dur
        );
        gain.gain.setValueAtTime(0.2 * vel, now + Math.max(0, start));
        gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0, start) + dur);
        osc.connect(gain).connect(master);
        osc.start(now + Math.max(0, start));
        osc.stop(now + Math.max(0, start) + dur + 0.02);
      } else {
        osc.frequency.value = freq;
        gain.gain.value = 0.15 * vel;
        osc.connect(gain).connect(master);
        osc.start(now + Math.max(0, start));
        osc.stop(now + Math.max(start + 0.01, end));
      }
      oscList.push(osc);
    });
  });
  state.analysisSynth = { ctx, oscList, master };
  const endAt = now + duration + 0.05;
  const tick = () => {
    if (!state.analysisSynthPlaying) return;
    const elapsed = ctx.currentTime - now;
    if (!syncToAudio && state.analysisAudio) {
      state.analysisAudio.currentTime = state.analysisRange.start + elapsed;
    }
    updateAnalysisTimeUI();
    drawAnalysisNotes();
    if (ctx.currentTime >= endAt) {
      stopAnalysisSynth();
      if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function toggleAnalysisPlayback() {
  const source = 'mix';
  if (source === 'notes') {
    if (state.analysisAudio && !state.analysisAudio.paused) state.analysisAudio.pause();
    if (state.analysisSynthPlaying) {
      stopAnalysisSynth();
      if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
    } else {
      playAnalysisNotes();
      if (ui.analysisPlay) ui.analysisPlay.textContent = '暂停';
    }
    return;
  }
  if (source === 'mix') {
    ensureAnalysisAudio();
    if (!state.audioBlob) {
      setStatus('未加载音频，无法播放原音频');
      return;
    }
    if (!state.analysisAudio.src) {
      setAnalysisAudioSource();
    }
    if (state.analysisAudio.readyState === 0) {
      state.analysisAudio.load();
    }
    const isPlaying = (state.analysisAudio && !state.analysisAudio.paused) || state.analysisSynthPlaying;
    if (isPlaying) {
      if (state.analysisAudio) state.analysisAudio.pause();
      stopAnalysisSynth();
      if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
      return;
    }
    const base = clamp(state.analysisAudio.currentTime, state.analysisRange.start, state.analysisRange.end);
    state.analysisAudio.currentTime = base;
    state.analysisAudio.play().catch(() => {
      setStatus('原音频无法播放（音频源不支持或未就绪）');
      if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
    });
    playAnalysisNotes({ syncToAudio: true });
    if (ui.analysisPlay) ui.analysisPlay.textContent = '暂停';
    return;
  }
  ensureAnalysisAudio();
  if (!state.audioBlob) {
    setStatus('未加载音频，无法播放原音频');
    return;
  }
  if (!state.analysisAudio.src) {
    setAnalysisAudioSource();
  }
  if (state.analysisAudio.readyState === 0) {
    state.analysisAudio.load();
  }
  if (state.analysisAudio.paused) {
    stopAnalysisSynth();
    state.analysisAudio.play().catch(() => {
      setStatus('原音频无法播放（音频源不支持或未就绪）');
      if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
    });
    if (ui.analysisPlay) ui.analysisPlay.textContent = '暂停';
    const tick = () => {
      if (!state.analysisAudio || state.analysisAudio.paused) return;
      updateAnalysisTimeUI();
      drawAnalysisNotes();
      if (state.analysisAudio.currentTime >= state.analysisRange.end) {
        state.analysisAudio.pause();
        state.analysisAudio.currentTime = state.analysisRange.end;
        if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  } else {
    state.analysisAudio.pause();
    if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
  }
}

function playNotePreview(midi, velocity = 0.7, type = 'pitch', duration = 0.12) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const freq = 440 * Math.pow(2, (midi - 69) / 12);
  const previewVol = getAnalysisPreviewVolume();
  osc.type = 'sine';
  if (type === 'transient') {
    osc.frequency.setValueAtTime(freq * 2, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.3), ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.18 * clamp(velocity, 0, 1) * previewVol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
  } else {
    osc.frequency.value = freq;
    gain.gain.value = 0.12 * clamp(velocity, 0, 1) * previewVol;
  }
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  const sustain = Math.max(0.06, Math.min(8, duration || 0.12));
  osc.stop(ctx.currentTime + sustain);
  osc.onended = () => ctx.close();
}

function drawAnalysisSpectrogram() {
  if (!ui.analysisSpec || !state.analysisSpecData) return;
  const { matrix, frames, bins, stride, windowLen, sampleRate, offset: rangeOffset } = state.analysisSpecData;
  const canvas = ui.analysisSpec;
  const ctx = canvas.getContext('2d');
  const width = canvas.clientWidth || 0;
  const height = canvas.clientHeight || 0;
  const rangeDur = analysisRangeDuration();
  const viewStart = state.analysisView.start;
  const viewEnd = state.analysisView.end;
  const sens = ANALYSIS_SENSITIVITY;
  if (rangeDur <= 0) return;
  const fullMidiMin = 24;
  const fullMidiMax = 107;
  const fullBins = fullMidiMax - fullMidiMin + 1;
  const viewMin = state.analysisViewY.min;
  const viewMax = state.analysisViewY.max;
  const binStart = clamp(viewMin - fullMidiMin, 0, fullBins - 1);
  const binEnd = clamp(viewMax - fullMidiMin, binStart + 1, fullBins);
  const offset = getAnalysisYOffset();
  const gridHeight = Math.max(1, height - offset);
  const grid = getAnalysisGrid(gridHeight);
  canvas.width = width;
  canvas.height = offset + gridHeight;
  const img = ctx.createImageData(canvas.width, canvas.height);
  for (let f = 0; f < frames; f += 1) {
    const frameTime = rangeOffset + (f * stride + windowLen / 2) / sampleRate;
    if (frameTime < viewStart || frameTime > viewEnd) continue;
    const frameTimeNext = rangeOffset + ((f + 1) * stride + windowLen / 2) / sampleRate;
    const x0 = Math.floor(timeToX(frameTime, width));
    const x1 = Math.max(x0 + 1, Math.floor(timeToX(frameTimeNext, width)));
    for (let b = binStart; b < binEnd; b += 1) {
      const raw = matrix[f][b];
      const v = Math.pow(clamp(raw * sens, 0, 1), 0.5);
      const localIndex = b - binStart;
      const y0 = Math.floor(offset + grid.yForIndex(localIndex));
      const y1 = Math.floor(offset + grid.yForIndex(localIndex - 1));
      const r = Math.min(255, Math.floor(20 + 120 * v));
      const g = Math.min(255, Math.floor(10 + 40 * v));
      const bl = Math.min(255, Math.floor(60 + 195 * v));
      for (let y = y0; y < y1; y += 1) {
        for (let x = x0; x < x1; x += 1) {
          const idx = (y * canvas.width + x) * 4;
          img.data[idx] = r;
          img.data[idx + 1] = g;
          img.data[idx + 2] = bl;
          img.data[idx + 3] = 255;
        }
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  // Draw horizontal lines aligned with piano key rows.
  const rows = analysisViewYSpan();
  if (rows > 0) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= rows; i += 1) {
      const y = Math.floor(offset + grid.yForIndex(i - 1));
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }
}

function drawAnalysisWave() {
  if (!ui.analysisWave || !state.analysisWaveData) return;
  const canvas = ui.analysisWave;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const width = resizeCanvasToDisplaySize(canvas);
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#1f6feb';
  ctx.lineWidth = 1;
  ctx.beginPath();
  const samples = state.analysisWaveData.samples;
  const rate = state.analysisWaveData.sampleRate;
  const rangeStart = state.analysisRange.start;
  const rangeEnd = state.analysisRange.end;
  const offset = state.analysisWaveData.offset || 0;
  let gap = true;
  for (let x = 0; x < width; x += 1) {
    const t = xToTime(x, width);
    if (t < rangeStart || t > rangeEnd) {
      gap = true;
      continue;
    }
    const localT = t - offset;
    const idx = Math.floor(localT * rate);
    const v = samples[idx] || 0;
    const y = (0.5 - v * 0.45) * height;
    if (gap) {
      ctx.moveTo(x, y);
      gap = false;
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

function downsampleLinear(samples, srcRate, dstRate) {
  if (srcRate === dstRate) return samples;
  const ratio = srcRate / dstRate;
  const newLen = Math.floor(samples.length / ratio);
  const out = new Float32Array(newLen);
  for (let i = 0; i < newLen; i += 1) {
    const idx = i * ratio;
    const i0 = Math.floor(idx);
    const i1 = Math.min(samples.length - 1, i0 + 1);
    const t = idx - i0;
    out[i] = samples[i0] * (1 - t) + samples[i1] * t;
  }
  return out;
}

function goertzel(frame, freq, sampleRate) {
  const w = (2 * Math.PI * freq) / sampleRate;
  const cosine = Math.cos(w);
  const coeff = 2 * cosine;
  let s0 = 0;
  let s1 = 0;
  let s2 = 0;
  for (let i = 0; i < frame.length; i += 1) {
    s0 = frame[i] + coeff * s1 - s2;
    s2 = s1;
    s1 = s0;
  }
  return s1 * s1 + s2 * s2 - coeff * s1 * s2;
}

function autocorr(frame, lag) {
  let sum = 0;
  for (let i = 0; i + lag < frame.length; i += 1) {
    sum += frame[i] * frame[i + lag];
  }
  return sum;
}

async function analyzeSpectrogram() {
  if (state.analysisRunning) return;
  if (!state.audioBlob || !ui.analysisSpec || !ui.analysisPiano) return;
  state.analysisRunning = true;
  const safeBlob = await getSafeAudioBlob();
  if (!safeBlob) {
    state.analysisRunning = false;
    setStatus('音频读取失败，无法分析频谱');
    return;
  }
  const range = getAnalysisRange();
  state.analysisRange = { start: range.start, end: range.end };
  state.analysisView = { start: range.start, end: range.end };
  state.analysisViewY = { min: 48, max: 71 };
  const decoded = await decodeAudioBuffer(safeBlob);
  const sr = decoded.sampleRate;
  const ch = decoded.numberOfChannels;
  const startFrame = Math.max(0, Math.floor(range.start * sr));
  const endFrame = Math.min(decoded.length, Math.floor(range.end * sr));
  const len = Math.max(1, endFrame - startFrame);
  const mono = new Float32Array(len);
  for (let c = 0; c < ch; c += 1) {
    const data = decoded.getChannelData(c);
    for (let i = 0; i < len; i += 1) {
      mono[i] += data[startFrame + i] || 0;
    }
  }
  for (let i = 0; i < len; i += 1) mono[i] /= ch;

  state.analysisWaveData = { samples: mono, sampleRate: sr, offset: range.start };

  let windowLen = Math.max(2, Math.floor(sr * ANALYSIS_CQT_WINDOW_SEC));
  if (windowLen % 2 !== 0) windowLen += 1;
  const stride = Math.max(1, Math.floor(windowLen * ANALYSIS_CQT_STRIDE_RATIO));
  const window = buildWindow(windowLen, ANALYSIS_CQT_WINDOW_TYPE);
  const freqs = buildMidiFreqs();
  const bins = freqs.length;
  const { sinBasis, cosBasis } = buildCqtBases(freqs, windowLen, sr, ANALYSIS_CQT_SCALE);
  const frames = Math.max(1, Math.floor((mono.length - windowLen) / stride) + 1);
  const matrix = Array.from({ length: frames }, () => new Float32Array(bins));
  const winFrame = new Float32Array(windowLen);

  for (let f = 0; f < frames; f += 1) {
    const offset = f * stride;
    for (let i = 0; i < windowLen; i += 1) {
      const idx = offset + i;
      const sample = idx < mono.length ? mono[idx] : 0;
      winFrame[i] = sample * window[i];
    }
    let maxVal = 0;
    for (let b = 0; b < bins; b += 1) {
      const sin = sinBasis[b];
      const cos = cosBasis[b];
      let sumSin = 0;
      let sumCos = 0;
      for (let i = 0; i < windowLen; i += 1) {
        const v = winFrame[i];
        sumSin += v * sin[i];
        sumCos += v * cos[i];
      }
      const mag = Math.sqrt(sumSin * sumSin + sumCos * sumCos);
      matrix[f][b] = mag;
      if (mag > maxVal) maxVal = mag;
    }
    if (maxVal > 0) {
      for (let b = 0; b < bins; b += 1) {
        matrix[f][b] = matrix[f][b] / maxVal;
      }
    }
  }

  state.analysisSpecData = {
    matrix,
    frames,
    bins,
    stride,
    windowLen,
    sampleRate: sr,
    offset: range.start
  };
  drawAnalysisSpectrogram();
  drawPiano(ui.analysisPiano);
  drawAnalysisNotes();
  drawAnalysisWave();
  state.analysisRunning = false;
}

async function estimateShiftAndExportWav() {
  if (state.analysisRunning) return;
  if (!state.audioBlob) {
    alert('未加载音频，无法估计移调');
    setStatus('未加载音频，无法估计移调');
    return;
  }
  if (!state.analysisShiftWindow) {
    setAnalysisTool('shift-window');
    alert('请先用“选窗”工具框选片段，完成后再点“自动移调”确认');
    setStatus('请先用“选窗”工具框选片段，完成后再点“自动移调”确认');
    return;
  }
  const safeBlob = await getSafeAudioBlob();
  if (!safeBlob) {
    alert('音频读取失败，无法估计移调');
    setStatus('音频读取失败，无法估计移调');
    return;
  }
  state.analysisRunning = true;
  try {
    const decoded = await decodeAudioBuffer(safeBlob);
    const sr = decoded.sampleRate;
    const duration = decoded.length / sr;
    const rawRange = normalizeRegionBounds(
      state.analysisShiftWindow.start,
      state.analysisShiftWindow.end,
      duration
    );
    const start = Math.max(state.analysisRange.start, rawRange.start);
    const end = Math.min(state.analysisRange.end, rawRange.end);
    const segDur = end - start;
    if (segDur < 0.1) {
      alert('选窗太短，建议至少 0.1 秒');
      setStatus('选窗太短，建议至少 0.1 秒');
      return;
    }
    if (segDur > 6) {
      const okLong = window.confirm('选窗较长，估计移调可能较慢。是否继续？');
      if (!okLong) {
        setStatus('已取消移调');
        return;
      }
    }
    const startFrame = Math.max(0, Math.floor(start * sr));
    const endFrame = Math.min(decoded.length, Math.floor(end * sr));
    const len = Math.max(1, endFrame - startFrame);
    const mono = new Float32Array(len);
    const ch = decoded.numberOfChannels;
    for (let c = 0; c < ch; c += 1) {
      const data = decoded.getChannelData(c);
      for (let i = 0; i < len; i += 1) {
        mono[i] += data[startFrame + i] || 0;
      }
    }
    for (let i = 0; i < len; i += 1) mono[i] /= ch;

    setStatus('正在估计移调...');
    const { bestShift } = estimateShiftCents(mono, sr, [-50, 50], 1);
    const semitones = Math.round(bestShift / 100);
    const summary = `估计移调：${bestShift.toFixed(1)} cents（约 ${semitones} 半音）`;
    if (semitones === 0) {
      alert(`${summary}，无需移调`);
      setStatus(`${summary}，无需移调`);
      return;
    }
    const ok = window.confirm(`${summary}\n是否按该值对整首音频移调并导出 WAV？`);
    if (!ok) {
      setStatus('已取消移调');
      return;
    }
    setStatus('正在移调音频...');
    const pitchFactor = Math.pow(2, bestShift / 1200);
    const channels = [];
    for (let c = 0; c < decoded.numberOfChannels; c += 1) {
      channels.push(decoded.getChannelData(c));
    }
    const shiftedChannels = pitchShiftGranularChannels(channels, pitchFactor);
    setStatus('正在编码 WAV...');
    const wavBlob = new Blob([encodeWav(shiftedChannels, decoded.sampleRate)], { type: 'audio/wav' });
    const base = sanitizeFolderName(stripExtension(state.audioName || 'music'));
    const originalName = state.audioName || `${base}.wav`;
    let exportName = `${base}_shifted.wav`;
    if (state.saveDirectoryHandle) {
      if (/\.wav$/i.test(originalName)) {
        const backupName = await getUniqueFilename(
          state.saveDirectoryHandle,
          appendNameSuffix(originalName, '_orig')
        );
        await writeBlobToDirectory(state.audioBlob, backupName, state.saveDirectoryHandle);
        exportName = originalName;
      } else {
        exportName = await getUniqueFilename(state.saveDirectoryHandle, exportName);
      }
      await writeBlobToDirectory(wavBlob, exportName, state.saveDirectoryHandle);
    } else {
      exportName = `${base}_shifted.wav`;
      downloadBlob(wavBlob, exportName);
    }
    loadAudioBlob(wavBlob, exportName);
    setStatus(`已导出并载入：${exportName}`);
  } catch (err) {
    alert(err?.message || '移调失败');
    setStatus(err?.message || '移调失败');
  } finally {
    state.analysisRunning = false;
  }
}

ui.goAnalysis.addEventListener('click', () => {
  state.analysisRange = getAnalysisRange();
  state.analysisView = { start: state.analysisRange.start, end: state.analysisRange.end };
  state.analysisViewY = { min: 48, max: 71 };
  state.analysisTargetIndex = state.editingNoteIndex !== null ? state.editingNoteIndex : null;
  state.analysisShiftWindow = null;
  state.analysisShiftDrag = null;
  showPage('analysis', 'editor-grow');
  drawPiano(ui.analysisPiano);
  setAnalysisTool('pencil');
  if (ui.analysisRootThresholdToggle) {
    ui.analysisRootThresholdToggle.checked = state.analysisShowRootThreshold !== false;
  }
  if (ui.analysisAudioVolume) ui.analysisAudioVolume.value = String(state.analysisAudioVolume ?? 0.8);
  if (ui.analysisNotesVolume) ui.analysisNotesVolume.value = String(state.analysisNotesVolume ?? 0.7);
  if (ui.analysisPreviewVolume) ui.analysisPreviewVolume.value = String(state.analysisPreviewVolume ?? 1);
  applyAnalysisAudioVolume();
  applyAnalysisSynthVolume();
  setAnalysisAudioSource();
  loadAnalysisNotesForTarget();
  renderAnalysisTracks();
  drawAnalysisNotes();
  drawAnalysisSpectrogram();
  drawAnalysisWave();
  analyzeSpectrogram();
});
ui.analysisBack.addEventListener('click', () => {
  persistAnalysisNotesToTarget();
  if (state.saveDirectoryHandle) {
    autoSaveProjectSilently();
    setStatus('扒谱已保存到 notes.json');
  } else {
    setStatus('扒谱已保存到当前片段（未选择保存目录）');
  }
  resetAnalysisAudio();
  showPage('editor', 'editor-grow');
  hideVelocitySlider();
  stopAnalysisSynth();
});

if (ui.analysisNotes && window.ResizeObserver) {
  const ro = new ResizeObserver(() => {
    if (!pages.analysis.classList.contains('active')) return;
    refreshAnalysisLayout();
  });
  ro.observe(ui.analysisNotes);
  ro.observe(ui.analysisPiano);
}
if (ui.analysisToolSelect) {
  ui.analysisToolSelect.addEventListener('change', () => {
    setAnalysisTool(ui.analysisToolSelect.value || 'pencil');
  });
}
if (ui.analysisAddTrack) {
  ui.analysisAddTrack.addEventListener('click', () => {
    ensureAnalysisTracks();
    const name = window.prompt('轨道名称（音色描述）', `音色${state.analysisTracks.length + 1}`);
    if (name === null) return;
    const track = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      name: name.trim() || `音色${state.analysisTracks.length + 1}`,
      type: 'pitch',
      muted: false,
      solo: false,
      notes: []
    };
    state.analysisTracks.push(track);
    setActiveAnalysisTrack(track.id);
    renderAnalysisTracks();
    drawAnalysisNotes();
  });
}
if (ui.analysisTimeZoomIn) {
  ui.analysisTimeZoomIn.addEventListener('click', () => {
    const zoom = 1.2;
    const span = analysisViewDuration() / zoom;
    const center = state.analysisAudio ? state.analysisAudio.currentTime : (state.analysisView.start + state.analysisView.end) / 2;
    setAnalysisView(center - span / 2, center + span / 2);
  });
}
  if (ui.analysisTimeZoomOut) {
    ui.analysisTimeZoomOut.addEventListener('click', () => {
      const zoom = 1.2;
      const span = analysisViewDuration() * zoom;
      const center = state.analysisAudio ? state.analysisAudio.currentTime : (state.analysisView.start + state.analysisView.end) / 2;
      setAnalysisView(center - span / 2, center + span / 2);
    });
  }
if (ui.analysisFreqZoomIn) {
  ui.analysisFreqZoomIn.addEventListener('click', () => {
    const zoom = 1.2;
    const span = analysisViewYSpan() / zoom;
    const center = (state.analysisViewY.min + state.analysisViewY.max) / 2;
    setAnalysisViewY(center - span / 2, center + span / 2);
  });
}
  if (ui.analysisFreqZoomOut) {
    ui.analysisFreqZoomOut.addEventListener('click', () => {
      const zoom = 1.2;
      const span = analysisViewYSpan() * zoom;
      const center = (state.analysisViewY.min + state.analysisViewY.max) / 2;
      setAnalysisViewY(center - span / 2, center + span / 2);
    });
  }
  window.addEventListener('resize', () => {
    if (!pages.analysis.classList.contains('active')) return;
    refreshAnalysisLayout();
  });
ui.analysisPlay.addEventListener('click', () => {
  toggleAnalysisPlayback();
});
if (ui.analysisShowActiveOnly) {
  ui.analysisShowActiveOnly.addEventListener('change', () => {
    state.analysisShowActiveOnly = !!ui.analysisShowActiveOnly.checked;
    if (ui.analysisNotes) {
      const ctx = ui.analysisNotes.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, ui.analysisNotes.width, ui.analysisNotes.height);
    }
    drawAnalysisNotes();
  });
}
if (ui.analysisAudioVolume) {
  ui.analysisAudioVolume.addEventListener('input', () => {
    state.analysisAudioVolume = parseFloat(ui.analysisAudioVolume.value || '0.8');
    applyAnalysisAudioVolume();
  });
}
if (ui.analysisNotesVolume) {
  ui.analysisNotesVolume.addEventListener('input', () => {
    state.analysisNotesVolume = parseFloat(ui.analysisNotesVolume.value || '0.7');
    applyAnalysisSynthVolume();
  });
}
if (ui.analysisPreviewVolume) {
  ui.analysisPreviewVolume.addEventListener('input', () => {
    state.analysisPreviewVolume = parseFloat(ui.analysisPreviewVolume.value || '1');
  });
}

if (ui.analysisRootThresholdToggle) {
  ui.analysisRootThresholdToggle.addEventListener('change', () => {
    state.analysisShowRootThreshold = !!ui.analysisRootThresholdToggle.checked;
    drawAnalysisNotes();
  });
}

if (ui.analysisSaveNotes) {
  ui.analysisSaveNotes.addEventListener('click', async () => {
    persistAnalysisNotesToTarget();
    if (state.saveDirectoryHandle) {
      await autoSaveProjectSilently();
      setStatus('扒谱已保存到 notes.json');
    } else {
      setStatus('扒谱已保存到当前片段（未选择保存目录）');
    }
  });
}
if (ui.analysisExportMidi) {
  ui.analysisExportMidi.addEventListener('click', () => {
    const bytes = buildMidiFileBytes();
    const base = sanitizeFolderName(stripExtension(state.audioName || 'music'));
    downloadBlob(new Blob([bytes], { type: 'audio/midi' }), `${base}_analysis.mid`);
  });
}
if (ui.analysisAutoShift) {
  ui.analysisAutoShift.addEventListener('click', () => {
    estimateShiftAndExportWav();
  });
}
if (ui.analysisClearShiftWindow) {
  ui.analysisClearShiftWindow.addEventListener('click', () => {
    state.analysisShiftWindow = null;
    state.analysisShiftDrag = null;
    drawAnalysisNotes();
    setStatus('已清除选窗');
  });
}
ui.analysisTimebar.addEventListener('pointerdown', (evt) => {
  if (!state.analysisAudio) return;
  const rect = ui.analysisTimebar.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const t = xToTime(x, rect.width);
  state.analysisAudio.currentTime = clamp(t, state.analysisRange.start, state.analysisRange.end);
  updateAnalysisTimeUI();
  drawAnalysisNotes();
});

document.addEventListener('keydown', (evt) => {
  if (!pages.analysis.classList.contains('active')) return;
  if (evt.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(evt.target.tagName)) return;
  if (evt.code === 'Space') {
    evt.preventDefault();
    toggleAnalysisPlayback();
  }
  if (evt.code === 'Backspace' || evt.code === 'Delete') {
    if (state.analysisSelectedId && state.analysisSelectedTrackId) {
      const track = state.analysisTracks.find((t) => t.id === state.analysisSelectedTrackId);
      if (track) {
        track.notes = track.notes.filter((n) => n.id !== state.analysisSelectedId);
      }
      state.analysisSelectedId = null;
      state.analysisSelectedTrackId = null;
      drawAnalysisNotes();
    }
  }
});

if (ui.analysisNotes) {
  ui.analysisNotes.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
  });
  ui.analysisNotes.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    const rect = ui.analysisNotes.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const dx = evt.deltaX;
    const dy = evt.deltaY;
    if (dx !== 0) {
      const dt = (dx / width) * analysisViewDuration();
      setAnalysisView(state.analysisView.start + dt, state.analysisView.end + dt);
    }
    if (dy !== 0) {
      const rows = analysisViewYSpan();
      const dmidi = (dy / height) * rows;
      setAnalysisViewY(state.analysisViewY.min - dmidi, state.analysisViewY.max - dmidi);
    }
  }, { passive: false });
  ui.analysisNotes.addEventListener('pointerdown', (evt) => {
    if (!ui.analysisNotes) return;
    const rect = ui.analysisNotes.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    const offset = getAnalysisYOffset();
    if (y < offset) return;
    hideVelocitySlider();
    if (state.analysisTool === 'shift-window') {
      const startTime = xToTime(x, width);
      state.analysisShiftWindow = { start: startTime, end: startTime };
      state.analysisShiftDrag = { startTime };
      drawAnalysisNotes();
      return;
    }
    const hit = hitTestNote(x, y, width, height);
    if (evt.button === 2 && hit) {
      setActiveAnalysisTrack(hit.track.id);
      state.analysisSelectedId = hit.note.id;
      state.analysisSelectedTrackId = hit.track.id;
      showVelocitySlider(hit.note, rect.left + x, rect.top + y - 40);
      drawAnalysisNotes();
      return;
    }
    if (state.analysisTool === 'eraser') {
      if (hit) {
        setActiveAnalysisTrack(hit.track.id);
        hit.track.notes.splice(hit.index, 1);
        drawAnalysisNotes();
      }
      return;
    }
    if (state.analysisTool === 'select') {
      if (hit) {
        setActiveAnalysisTrack(hit.track.id);
        state.analysisSelectedId = hit.note.id;
        state.analysisSelectedTrackId = hit.track.id;
        playNotePreview(hit.note.midi, hit.note.velocity, hit.track.type, Math.max(0.06, hit.note.end - hit.note.start));
        const edge = 6;
        let mode = 'move';
        if (Math.abs(x - hit.x0) <= edge) mode = 'resize-left';
        if (Math.abs(x - hit.x1) <= edge) mode = 'resize-right';
        state.analysisDrag = {
          id: hit.note.id,
          trackId: hit.track.id,
          mode,
          startX: x,
          startY: y,
          start: hit.note.start,
          end: hit.note.end,
          midi: hit.note.midi,
          lastMidi: hit.note.midi
        };
        drawAnalysisNotes();
      } else {
        state.analysisSelectedId = null;
        state.analysisSelectedTrackId = null;
        state.analysisDrag = {
          id: null,
          mode: 'pan',
          startX: x,
          startY: y,
          viewStart: state.analysisView.start,
          viewEnd: state.analysisView.end,
          viewMin: state.analysisViewY.min,
          viewMax: state.analysisViewY.max
        };
        drawAnalysisNotes();
      }
      return;
    }
    if (state.analysisTool === 'pencil') {
      if (hit) {
        setActiveAnalysisTrack(hit.track.id);
        state.analysisSelectedId = hit.note.id;
        state.analysisSelectedTrackId = hit.track.id;
        playNotePreview(hit.note.midi, hit.note.velocity, hit.track.type, Math.max(0.06, hit.note.end - hit.note.start));
        const edge = 6;
        let mode = 'move';
        if (Math.abs(x - hit.x0) <= edge) mode = 'resize-left';
        if (Math.abs(x - hit.x1) <= edge) mode = 'resize-right';
        state.analysisDrag = {
          id: hit.note.id,
          trackId: hit.track.id,
          mode,
          startX: x,
          startY: y,
          start: hit.note.start,
          end: hit.note.end,
          midi: hit.note.midi,
          lastMidi: hit.note.midi
        };
        drawAnalysisNotes();
      } else {
        ensureAnalysisTracks();
        const activeTrack = getActiveAnalysisTrack();
        const startTime = xToTime(x, width);
        const midi = yToMidi(y, height);
        const note = {
          id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
          start: startTime,
          end: startTime + 0.05,
          midi,
          velocity: 0.7
        };
        activeTrack.notes.push(note);
        state.analysisSelectedId = note.id;
        state.analysisSelectedTrackId = activeTrack.id;
        playNotePreview(note.midi, note.velocity, activeTrack.type, Math.max(0.06, note.end - note.start));
        state.analysisDrag = {
          id: note.id,
          trackId: activeTrack.id,
          mode: 'create',
          startX: x,
          startY: y,
          lastMidi: note.midi
        };
        drawAnalysisNotes();
      }
    }
  });

  ui.analysisNotes.addEventListener('pointermove', (evt) => {
    if (state.analysisShiftDrag) {
      const rect = ui.analysisNotes.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const width = rect.width;
      const endTime = xToTime(x, width);
      state.analysisShiftWindow.end = endTime;
      drawAnalysisNotes();
      return;
    }
    if (!state.analysisDrag) return;
    const rect = ui.analysisNotes.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    const drag = state.analysisDrag;
    if (drag.mode === 'pan') {
      const dt = xToTime(drag.startX, width) - xToTime(x, width);
      const dy = y - drag.startY;
      const rows = analysisViewYSpan();
      const offset = getAnalysisYOffset();
      const gridHeight = Math.max(1, height - offset);
      const midiPerPx = rows / gridHeight;
      const dmidi = dy * midiPerPx;
      setAnalysisView(drag.viewStart + dt, drag.viewEnd + dt);
      setAnalysisViewY(drag.viewMin + dmidi, drag.viewMax + dmidi);
      return;
    }
    const track = state.analysisTracks.find((t) => t.id === drag.trackId);
    const note = track ? track.notes.find((n) => n.id === drag.id) : null;
    if (!note) return;
    if (drag.mode === 'create') {
      const t = xToTime(x, width);
      note.end = Math.max(t, note.start + 0.02);
    } else if (drag.mode === 'move') {
      const dt = xToTime(x, width) - xToTime(drag.startX, width);
      const dmidi = yToMidi(y, height) - yToMidi(drag.startY, height);
      note.start = drag.start + dt;
      note.end = drag.end + dt;
      note.midi = drag.midi + dmidi;
      if (note.midi !== drag.lastMidi) {
        playNotePreview(note.midi, note.velocity, track?.type || 'pitch', Math.max(0.06, note.end - note.start));
        drag.lastMidi = note.midi;
      }
    } else if (drag.mode === 'resize-left') {
      const t = xToTime(x, width);
      note.start = Math.min(t, note.end - 0.02);
    } else if (drag.mode === 'resize-right') {
      const t = xToTime(x, width);
      note.end = Math.max(t, note.start + 0.02);
    }
    drawAnalysisNotes();
  });

  const finishDrag = () => {
    if (state.analysisShiftDrag) {
      const range = normalizeRegionBounds(
        state.analysisShiftWindow.start,
        state.analysisShiftWindow.end,
        state.analysisRange.end
      );
      if (range.end - range.start < 0.05) {
        state.analysisShiftWindow = null;
      } else {
        state.analysisShiftWindow = range;
      }
      state.analysisShiftDrag = null;
      drawAnalysisNotes();
      return;
    }
    if (!state.analysisDrag) return;
    state.analysisDrag = null;
  };
  ui.analysisNotes.addEventListener('pointerup', finishDrag);
  ui.analysisNotes.addEventListener('pointerleave', finishDrag);
}
