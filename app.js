const TAG_OPTIONS = [
  { value: 'rising', label: '上升' },
  { value: 'stable', label: '稳定' },
  { value: 'syncopation', label: '切分音' },
  { value: 'swing', label: 'swing' },
  { value: 'free', label: '随意' },
  { value: 'unclear', label: '不明显' },
  { value: 'atmosphere', label: '氛围感' },
  { value: 'fullness', label: '饱满感' },
  { value: 'looping', label: '循环感' },
  { value: 'kick-snare', label: 'kick-snare' },
  { value: 'small-perc', label: '小打击乐' },
  { value: 'ethnic-perc', label: '民族打击乐' },
  { value: 'electric-bass', label: '电 bass' },
  { value: 'slap-bass', label: 'slap bass' },
  { value: 'growl-bass', label: 'growl bass' },
  { value: 'pad', label: 'pad' },
  { value: 'chord', label: 'chord' },
  { value: 'vocal', label: 'vocal' },
  { value: 'noise', label: 'noise' },
  { value: 'fx', label: 'fx' },
  { value: 'low', label: '低' },
  { value: 'mid', label: '中' },
  { value: 'high', label: '高' },
  { value: 'dry', label: 'dry' },
  { value: 'wet', label: 'wet' },
  { value: 'wide', label: 'wide' }
];

const pages = {
  home: document.getElementById('homePage'),
  toc: document.getElementById('tocPage'),
  record: document.getElementById('recordPage'),
  trim: document.getElementById('trimPage'),
  notes: document.getElementById('notesPage'),
  editor: document.getElementById('noteEditorPage'),
  analysis: document.getElementById('analysisPage')
};

const ui = {
  settingsBtn: document.getElementById('settingsBtn'),
  settingsPanel: document.getElementById('settingsPanel'),
  defaultPathHint: document.getElementById('defaultPathHint'),
  changeSaveDir: document.getElementById('changeSaveDir'),
  startGuideInSettings: document.getElementById('startGuideInSettings'),
  openNotebookBook: document.getElementById('openNotebookBook'),
  playlistList: document.getElementById('playlistList'),
  songListTitle: document.getElementById('songListTitle'),
  songList: document.getElementById('songList'),
  createNewMusic: document.getElementById('createNewMusic'),
  createPlaylist: document.getElementById('createPlaylist'),
  importPlaylistFolder: document.getElementById('importPlaylistFolder'),
  backToTocFromNotes: document.getElementById('backToTocFromNotes'),
  projectFilesInput: document.getElementById('projectFilesInput'),
  inlineImportAudio: document.getElementById('inlineImportAudio'),
  noteContextMenu: document.getElementById('noteContextMenu'),
  menuPlayNote: document.getElementById('menuPlayNote'),
  menuEditNote: document.getElementById('menuEditNote'),
  menuDeleteNote: document.getElementById('menuDeleteNote'),
  tocContextMenu: document.getElementById('tocContextMenu'),
  tocMenuOpen: document.getElementById('tocMenuOpen'),
  tocMenuRename: document.getElementById('tocMenuRename'),
  tocMenuDelete: document.getElementById('tocMenuDelete'),
  sourceActionModal: document.getElementById('sourceActionModal'),
  modalCopyToNotebook: document.getElementById('modalCopyToNotebook'),
  modalMoveToNotebook: document.getElementById('modalMoveToNotebook'),
  createNoteFromRegion: document.getElementById('createNoteFromRegion'),
  backToWave: document.getElementById('backToWave'),
  editorTimeInfo: document.getElementById('editorTimeInfo'),
  addTagToNote: document.getElementById('addTagToNote'),
  selectedTags: document.getElementById('selectedTags'),
  songCaption: document.getElementById('songCaption'),
  addSongTag: document.getElementById('addSongTag'),
  songTags: document.getElementById('songTags'),
  tagPickerModal: document.getElementById('tagPickerModal'),
  tagPickerList: document.getElementById('tagPickerList'),
  closeTagPicker: document.getElementById('closeTagPicker'),
  guideOverlay: document.getElementById('guideOverlay'),
  guideSpotlight: document.getElementById('guideSpotlight'),
  guideTitle: document.getElementById('guideTitle'),
  guideBody: document.getElementById('guideBody'),
  guideStep: document.getElementById('guideStep'),
  guideClose: document.getElementById('guideClose'),
  startRecord: document.getElementById('startRecord'),
  stopRecord: document.getElementById('stopRecord'),
  toNotesAfterRecord: document.getElementById('toNotesAfterRecord'),
  recordStatus: document.getElementById('recordStatus'),
  trimPlayPause: document.getElementById('trimPlayPause'),
  toggleTrimCreateRegion: document.getElementById('toggleTrimCreateRegion'),
  clearTrimRegion: document.getElementById('clearTrimRegion'),
  trimTimeInfo: document.getElementById('trimTimeInfo'),
  trimGain: document.getElementById('trimGain'),
  trimGainInfo: document.getElementById('trimGainInfo'),
  applyTrim: document.getElementById('applyTrim'),
  skipTrim: document.getElementById('skipTrim'),
  wavePlayKey: document.getElementById('wavePlayKey'),
  waveLeftKey: document.getElementById('waveLeftKey'),
  waveRightKey: document.getElementById('waveRightKey'),
  waveZoomInKey: document.getElementById('waveZoomInKey'),
  waveZoomOutKey: document.getElementById('waveZoomOutKey'),
  zoomInfo: document.getElementById('zoomInfo'),
  timeInfo: document.getElementById('timeInfo'),
  addEditorAnnotation: document.getElementById('addEditorAnnotation'),
  goAnalysis: document.getElementById('goAnalysis'),
  analysisBack: document.getElementById('analysisBack'),
  analysisSpec: document.getElementById('analysisSpec'),
  analysisPiano: document.getElementById('analysisPiano'),
  analysisNotes: document.getElementById('analysisNotes'),
  analysisWave: document.getElementById('analysisWave'),
  analysisPlay: document.getElementById('analysisPlay'),
  analysisTime: document.getElementById('analysisTime'),
  analysisTimebar: document.getElementById('analysisTimebar'),
  analysisTimeThumb: document.getElementById('analysisTimeThumb'),
  analysisVelocityWrap: document.getElementById('analysisVelocityWrap'),
  analysisVelocity: document.getElementById('analysisVelocity'),
  analysisAudioVolume: document.getElementById('analysisAudioVolume'),
  analysisNotesVolume: document.getElementById('analysisNotesVolume'),
  analysisPreviewVolume: document.getElementById('analysisPreviewVolume'),
  analysisChannelMode: document.getElementById('analysisChannelMode'),
  analysisMetronomeMute: document.getElementById('analysisMetronomeMute'),
  analysisMetronomeSolo: document.getElementById('analysisMetronomeSolo'),
  analysisDownbeatCalibrate: document.getElementById('analysisDownbeatCalibrate'),
  analysisMetronomeBpm: document.getElementById('analysisMetronomeBpm'),
  analysisMetronomeSignature: document.getElementById('analysisMetronomeSignature'),
  analysisMetronomeOffset: document.getElementById('analysisMetronomeOffset'),
  analysisGridDivision: document.getElementById('analysisGridDivision'),
  analysisActionMenu: document.getElementById('analysisActionMenu'),
  analysisActionRun: document.getElementById('analysisActionRun'),
  analysisLeftToolSelect: document.getElementById('analysisLeftToolSelect'),
  analysisRightToolSelect: document.getElementById('analysisRightToolSelect'),
  analysisRootThresholdToggle: document.getElementById('analysisRootThresholdToggle'),
  analysisBeatThresholdToggle: document.getElementById('analysisBeatThresholdToggle'),
  analysisTrackList: document.getElementById('analysisTrackList'),
  analysisAddTrack: document.getElementById('analysisAddTrack'),
  analysisShowActiveOnly: document.getElementById('analysisShowActiveOnly'),
  annotationList: document.getElementById('annotationList'),
  editorWaveOverlay: document.getElementById('editorWaveOverlay'),
  editorAnnotationHighlights: document.getElementById('editorAnnotationHighlights'),
  editorWaveSelection: document.getElementById('editorWaveSelection'),
  editorWavePlay: document.getElementById('editorWavePlay'),
  caption: document.getElementById('caption'),
  notesDurationSummary: document.getElementById('notesDurationSummary'),
  notesList: document.getElementById('notesList')
};

const state = {
  mediaRecorder: null,
  displayStream: null,
  chunks: [],
  audioBlob: null,
  audioBlobData: null,
  audioBlobDataPromise: null,
  audioUrl: null,
  audioName: 'song.wav',
  sourceAudioBlob: null,
  sourceAudioName: '',
  sourceParentDirHandle: null,
  sourceFileName: '',
  playlists: [{ name: '默认', songs: [] }],
  selectedPlaylist: '默认',
  notes: [],
  wave: null,
  editorWave: null,
  trimWave: null,
  activeRegion: null,
  trimRegion: null,
  saveDirectoryHandle: null,
  zoomPxPerSec: 80,
  loopRegionPlayback: false,
  trimCreateMode: false,
  pendingTrimStart: null,
  pendingNoteRange: null,
  selectedTagsDraft: [],
  pendingAnnotations: [],
  songTagsDraft: [],
  songCaptionDraft: '',
  tagPickerTarget: 'note',
  timingEditNoteIndex: null,
  editingNoteIndex: null,
  menuNoteIndex: null,
  menuTocTarget: null,
  editorPreviewUrl: null,
  editorActiveRegion: null,
  editorActiveRange: null,
  editorActiveAnnotationIndex: null,
  timingEditAnnotationIndex: null,
  editingAnnotationIndex: null,
  analysisRunning: false,
  analysisNotes: [],
  analysisRange: { start: 0, end: 0 },
  analysisView: { start: 0, end: 0 },
  analysisViewY: { min: 48, max: 71 },
  analysisTool: 'pencil',
  analysisSelectedId: null,
  analysisSelectedTrackId: null,
  analysisShowRootThreshold: true,
  analysisShowBeatThreshold: false,
  analysisTracks: [],
  analysisActiveTrackId: null,
  analysisTargetIndex: null,
  pendingAnalysisNotes: [],
  pendingAnalysisTracks: [],
  pendingAnalysisMetronome: null,
  analysisDrag: null,
  analysisShiftWindow: null,
  analysisShiftDrag: null,
  analysisAudio: null,
  analysisAudioUrl: null,
  analysisSpecData: null,
  analysisWaveData: null,
  analysisSynth: null,
  analysisSynthStart: 0,
  analysisSynthPlaying: false,
  analysisAudioVolume: 0.8,
  analysisNotesVolume: 0.7,
  analysisPreviewVolume: 1.0,
  analysisChannelMode: 'sum',
  analysisMetronomeBpm: 120,
  analysisMetronomeSignature: '4/4',
  analysisMetronomeOffset: 0,
  analysisGridDivision: '16',
  analysisDownbeatCalibrating: false,
  analysisDownbeatFirst: null,
  analysisDownbeatSecond: null,
  analysisMetronomeMuted: false,
  analysisMetronomeSolo: false,
  analysisMetronome: null,
  guideActive: false,
  guideStepIndex: 0,
  guideReturnPage: 'toc',
  isModifierPanning: false,
  panStartX: 0,
  panStartScrollLeft: 0,
  suppressRegionCreate: false
};

const ACTIVE_REGION_ID = 'active-region';
const NOTE_REGION_PREFIX = 'note-region-';
const TRIM_REGION_ID = 'trim-region';
const MIN_REGION_SECONDS = 0.03;
const MIN_ZOOM_PX_PER_SEC = 1;
const ANALYSIS_SENSITIVITY = 1.6;
const ANALYSIS_CQT_WINDOW_SEC = 0.2;
const ANALYSIS_CQT_STRIDE_RATIO = 0.125;
const ANALYSIS_CQT_WINDOW_TYPE = 'hann';
const ANALYSIS_CQT_SCALE = 7;
const MAX_ZOOM_PX_PER_SEC = 2000;
const PROJECT_AUDIO_DIR = 'audio';
const PROJECT_NOTES_DIR = 'notes';
const PROJECT_AUDIO_EXT = '.mp3';

function showPage(name, animClass = '') {
  Object.values(pages).forEach((p) => p.classList.remove('active'));
  const page = pages[name];
  page.classList.add('active');
  if (animClass) {
    page.classList.remove('turn-next', 'turn-prev', 'editor-grow');
    page.classList.add(animClass);
    setTimeout(() => page.classList.remove(animClass), 460);
  }
}

function turnPage(name, direction = 'next') {
  showPage(name, direction === 'prev' ? 'turn-prev' : 'turn-next');
}

function getDefaultNotebookHint() {
  const isWin = /win/i.test(navigator.platform || navigator.userAgent);
  return isWin ? '%USERPROFILE%\\music_note' : '~/music_note';
}

function setDefaultPathHint() {
  const name = state.saveDirectoryHandle?.name || getDefaultNotebookHint();
  ui.defaultPathHint.textContent = `保存目录：${name}`;
}

function formatSec(sec) {
  const s = Math.max(0, sec || 0);
  const m = Math.floor(s / 60);
  const r = (s % 60).toFixed(2).padStart(5, '0');
  return `${String(m).padStart(2, '0')}:${r}`;
}

function normalizeRegionBounds(start, end, duration) {
  const d = Number.isFinite(duration) ? duration : Infinity;
  const s = Math.max(0, Math.min(Number(start) || 0, d));
  const e = Math.max(0, Math.min(Number(end) || 0, d));
  return { start: Math.min(s, e), end: Math.max(s, e) };
}

function seekWaveTo(seconds) {
  if (!state.wave || !state.wave.isReady) return;
  const duration = state.wave.getDuration() || 0;
  if (duration <= 0) return;
  const s = Math.max(0, Math.min(seconds || 0, duration));
  state.wave.seekTo(s / duration);
}

function setStatus(text) {
  ui.recordStatus.textContent = `状态：${text}`;
}

function setModeButton(button, text, on) {
  button.textContent = `${text}：${on ? '开' : '关'}`;
  button.classList.toggle('active-mode', on);
}

function updateSavePathInfo() {
  setDefaultPathHint();
}

function makeTimestampFilename() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(
    now.getMinutes()
  )}${pad(now.getSeconds())}.wav`;
}

function stripExtension(filename) {
  const i = filename.lastIndexOf('.');
  return i > 0 ? filename.slice(0, i) : filename;
}

function sanitizeFolderName(name) {
  const cleaned = (name || 'music').replace(/[\\/:*?"<>|]/g, '_').replace(/\s+/g, ' ').trim();
  return cleaned || 'music';
}

function appendNameSuffix(filename, suffix) {
  const i = filename.lastIndexOf('.');
  if (i > 0) {
    return `${filename.slice(0, i)}${suffix}${filename.slice(i)}`;
  }
  return `${filename}${suffix}`;
}

async function getUniqueFilename(dirHandle, desired) {
  if (!dirHandle) return desired;
  let name = desired;
  for (let i = 0; i < 100; i += 1) {
    try {
      await dirHandle.getFileHandle(name);
      name = appendNameSuffix(desired, `_${i + 1}`);
    } catch {
      return name;
    }
  }
  return `${Date.now()}_${desired}`;
}

function setSourceAudio(blob, name, meta = {}) {
  state.sourceAudioBlob = blob;
  state.sourceAudioName = name || 'original.wav';
  state.sourceParentDirHandle = meta.parentDirHandle || null;
  state.sourceFileName = meta.fileName || state.sourceAudioName;
}

async function ensureAudioBlobData() {
  if (state.audioBlobData) return state.audioBlobData;
  if (state.audioBlobDataPromise) return state.audioBlobDataPromise;
  if (!state.audioBlob) return null;
  state.audioBlobDataPromise = state.audioBlob
    .arrayBuffer()
    .then((ab) => {
      state.audioBlobData = ab;
      state.audioBlob = new Blob([ab], { type: state.audioBlob?.type || 'audio/wav' });
      state.audioBlobDataPromise = null;
      return ab;
    })
    .catch(() => {
      state.audioBlobDataPromise = null;
      return null;
    });
  return state.audioBlobDataPromise;
}

function normalizeNote(note) {
  const start = Number(note.start || 0);
  const end = Number(note.end || 0);
  let tags = [];
  if (Array.isArray(note.tags)) {
    tags = note.tags.filter((v) => typeof v === 'string');
  } else if (note.tags && typeof note.tags === 'object') {
    tags = Object.values(note.tags)
      .flat()
      .filter((v) => typeof v === 'string');
  }
  const annotations = Array.isArray(note.annotations)
    ? note.annotations
        .map((item) => {
          const relStart = Number(item?.startRel ?? item?.start ?? 0);
          const relEnd = Number(item?.endRel ?? item?.end ?? 0);
          const absStart = Number(item?.startAbs ?? start + relStart);
          const absEnd = Number(item?.endAbs ?? start + relEnd);
          const text = typeof item?.text === 'string' ? item.text.trim() : '';
          if (!text) return null;
          const rel = normalizeRegionBounds(relStart, relEnd, Infinity);
          const abs = normalizeRegionBounds(absStart, absEnd, Infinity);
          return {
            startRel: rel.start,
            endRel: rel.end,
            startAbs: abs.start,
            endAbs: abs.end,
            text
          };
        })
        .filter(Boolean)
    : [];
  let analysisTracks = Array.isArray(note.analysisTracks)
    ? note.analysisTracks
        .map((track, idx) => {
          const name = typeof track?.name === 'string' && track.name.trim()
            ? track.name.trim()
            : `音色${idx + 1}`;
          const type = track?.type === 'transient' ? 'transient' : 'pitch';
          const notes = Array.isArray(track?.notes)
            ? track.notes
                .map((item) => {
                  const relStart = Number(item?.startRel ?? item?.start ?? 0);
                  const relEnd = Number(item?.endRel ?? item?.end ?? 0);
                  const midi = Number(item?.midi ?? 60);
                  const velocity = clamp(Number(item?.velocity ?? 0.7), 0, 1);
                  const rel = normalizeRegionBounds(relStart, relEnd, Infinity);
                  return {
                    startRel: rel.start,
                    endRel: rel.end,
                    midi,
                    velocity
                  };
                })
                .filter(Boolean)
            : [];
          return { name, type, notes };
        })
        .filter(Boolean)
    : [];
  if (!analysisTracks.length && Array.isArray(note.analysisNotes)) {
    analysisTracks = [
      {
        name: '音色1',
        type: 'pitch',
        notes: note.analysisNotes
          .map((item) => {
            const relStart = Number(item?.startRel ?? item?.start ?? 0);
            const relEnd = Number(item?.endRel ?? item?.end ?? 0);
            const midi = Number(item?.midi ?? 60);
            const velocity = clamp(Number(item?.velocity ?? 0.7), 0, 1);
            const rel = normalizeRegionBounds(relStart, relEnd, Infinity);
            return {
              startRel: rel.start,
              endRel: rel.end,
              midi,
              velocity
            };
          })
          .filter(Boolean)
      }
    ];
  }
  const analysisMetronomeRaw = note?.analysisMetronome && typeof note.analysisMetronome === 'object'
    ? note.analysisMetronome
    : null;
  const analysisMetronome = {
    bpm: Math.round(Math.max(1, Math.min(400, Number(analysisMetronomeRaw?.bpm ?? 120) || 120)) * 100) / 100,
    signature: typeof analysisMetronomeRaw?.signature === 'string' ? analysisMetronomeRaw.signature : '4/4',
    offset: Number(analysisMetronomeRaw?.offset ?? 0) || 0,
    gridDivision: typeof analysisMetronomeRaw?.gridDivision === 'string' ? analysisMetronomeRaw.gridDivision : '16',
    muted: !!analysisMetronomeRaw?.muted,
    solo: !!analysisMetronomeRaw?.solo
  };
  return {
    start,
    end,
    tags: Array.from(new Set(tags)),
    caption: typeof note.caption === 'string' ? note.caption : '',
    annotations,
    analysisTracks,
    analysisMetronome
  };
}

async function pickSaveDirectory() {
  if (!window.showDirectoryPicker) {
    alert('当前浏览器不支持目录选择。');
    return false;
  }
  try {
    const baseHandle = await window.showDirectoryPicker({ startIn: 'documents' });
    state.saveDirectoryHandle = await resolveNotebookDirectoryHandle(baseHandle);
    updateSavePathInfo();
    return true;
  } catch {
    return false;
  }
}

async function resolveNotebookDirectoryHandle(baseHandle) {
  if (!baseHandle) return null;
  if (baseHandle.name === 'music_note') return baseHandle;

  const directAudio = await getOptionalDirectoryHandle(baseHandle, PROJECT_AUDIO_DIR);
  const directNotes = await getOptionalDirectoryHandle(baseHandle, PROJECT_NOTES_DIR);
  if (directAudio || directNotes) return baseHandle;
  try {
    await baseHandle.getFileHandle('playlist.json');
    return baseHandle;
  } catch {}

  return baseHandle.getDirectoryHandle('music_note', { create: true });
}

async function ensureNotebookDirectory() {
  if (state.saveDirectoryHandle) return true;
  return false;
}

function isAudioFileName(name) {
  return /\.(wav|mp3|m4a|ogg|flac)$/i.test(name || '');
}

function isMp3FileName(name) {
  return /\.mp3$/i.test(name || '');
}

async function listSongDirectories() {
  if (!state.saveDirectoryHandle) return [];
  const songs = new Set();
  const { audioDir } = await getProjectSubdirs(state.saveDirectoryHandle, { create: false });
  if (audioDir) {
    for await (const entry of audioDir.values()) {
      if (entry.kind !== 'file' || !isAudioFileName(entry.name)) continue;
      songs.add(sanitizeFolderName(stripExtension(entry.name)));
    }
  }

  // Legacy layout fallback:
  // - music_note/{song_name}/{song_name}.mp3
  // - music_note/{song_name}/audio/{song_name}.mp3
  for await (const entry of state.saveDirectoryHandle.values()) {
    if (entry.kind !== 'directory') continue;
    if (entry.name === PROJECT_AUDIO_DIR || entry.name === PROJECT_NOTES_DIR) continue;

    let hasAudio = false;
    for await (const child of entry.values()) {
      if (child.kind === 'file' && isAudioFileName(child.name)) {
        hasAudio = true;
        break;
      }
    }
    if (!hasAudio) {
      const legacyAudioDir = await getOptionalDirectoryHandle(entry, PROJECT_AUDIO_DIR);
      if (legacyAudioDir) {
        for await (const child of legacyAudioDir.values()) {
          if (child.kind === 'file' && isAudioFileName(child.name)) {
            hasAudio = true;
            break;
          }
        }
      }
    }
    if (hasAudio) songs.add(sanitizeFolderName(entry.name));
  }

  return Array.from(songs).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

async function loadPlaylists() {
  if (!state.saveDirectoryHandle) {
    state.playlists = [{ name: '默认', songs: [] }];
    state.selectedPlaylist = '默认';
    return;
  }

  const songDirs = await listSongDirectories();
  let raw = null;
  try {
    const fileHandle = await state.saveDirectoryHandle.getFileHandle('playlist.json');
    const file = await fileHandle.getFile();
    raw = JSON.parse(await file.text());
  } catch {
    raw = null;
  }

  let playlists = Array.isArray(raw?.playlists) ? raw.playlists : [];
  playlists = playlists
    .map((p) => ({
      name: String(p?.name || '').trim(),
      songs: Array.isArray(p?.songs) ? p.songs.filter((s) => typeof s === 'string') : []
    }))
    .filter((p) => p.name);

  if (!playlists.length) playlists = [{ name: '默认', songs: [] }];
  if (!playlists.find((p) => p.name === '默认')) playlists.unshift({ name: '默认', songs: [] });

  // Avoid wiping playlist memberships when song scan fails.
  if (!songDirs.length) {
    state.playlists = playlists;
    if (!playlists.find((p) => p.name === state.selectedPlaylist)) {
      state.selectedPlaylist = playlists[0].name;
    }
    return;
  }

  const known = new Set(songDirs);
  playlists.forEach((p) => {
    p.songs = Array.from(new Set(p.songs)).filter((s) => known.has(s));
  });
  const included = new Set(playlists.flatMap((p) => p.songs));
  const defaultPlaylist = playlists.find((p) => p.name === '默认');
  songDirs.forEach((s) => {
    if (!included.has(s)) defaultPlaylist.songs.push(s);
  });

  state.playlists = playlists;
  if (!playlists.find((p) => p.name === state.selectedPlaylist)) {
    state.selectedPlaylist = playlists[0].name;
  }
  await savePlaylists();
}

async function savePlaylists() {
  if (!state.saveDirectoryHandle) return;
  await saveTextFileToDirectory(
    'playlist.json',
    JSON.stringify({ playlists: state.playlists }, null, 2),
    state.saveDirectoryHandle
  );
}

async function getOptionalDirectoryHandle(parentDir, name) {
  try {
    return await parentDir.getDirectoryHandle(name);
  } catch {
    return null;
  }
}

async function getProjectSubdirs(projectDir, options = {}) {
  const create = !!options.create;
  let audioDir = null;
  let notesDir = null;
  if (create) {
    audioDir = await projectDir.getDirectoryHandle(PROJECT_AUDIO_DIR, { create: true });
    notesDir = await projectDir.getDirectoryHandle(PROJECT_NOTES_DIR, { create: true });
  } else {
    audioDir = await getOptionalDirectoryHandle(projectDir, PROJECT_AUDIO_DIR);
    notesDir = await getOptionalDirectoryHandle(projectDir, PROJECT_NOTES_DIR);
  }
  return { audioDir, notesDir };
}

function getProjectAudioFilename(songName) {
  return `${songName}${PROJECT_AUDIO_EXT}`;
}

function getProjectNotesFilename(songName) {
  return `${songName}.json`;
}

async function readProjectNotesData(projectDir, songName = '') {
  const { notesDir } = await getProjectSubdirs(projectDir, { create: false });
  if (!notesDir) return null;
  const normalizedSongName = sanitizeFolderName(songName || '');
  const notesFilename = normalizedSongName ? getProjectNotesFilename(normalizedSongName) : '';
  const preferredAudioName = normalizedSongName ? getProjectAudioFilename(normalizedSongName) : '';
  if (notesFilename) {
    try {
      const notesHandle = await notesDir.getFileHandle(notesFilename);
      return JSON.parse(await (await notesHandle.getFile()).text());
    } catch {}
  }
  if (!preferredAudioName) return null;
  for await (const entry of notesDir.values()) {
    if (entry.kind !== 'file' || !/\.json$/i.test(entry.name)) continue;
    try {
      const parsed = JSON.parse(await (await entry.getFile()).text());
      const audioName = typeof parsed?.audio === 'string' ? parsed.audio.trim() : '';
      if (!audioName) continue;
      if (audioName === preferredAudioName || audioName.toLowerCase() === preferredAudioName.toLowerCase()) {
        return parsed;
      }
    } catch {}
  }
  return null;
}

async function readSongStats(songFolderName) {
  if (!state.saveDirectoryHandle) {
    return { commentLen: 0, noteCount: 0, segmentDurationSec: 0, markedNoteCount: 0, longSegmentCount: 0 };
  }
  try {
    const parsed = await readProjectNotesData(state.saveDirectoryHandle, songFolderName);
    if (!parsed || typeof parsed !== 'object') {
      return { commentLen: 0, noteCount: 0, segmentDurationSec: 0, markedNoteCount: 0, longSegmentCount: 0 };
    }
    const notes = Array.isArray(parsed?.notes) ? parsed.notes : [];
    const songText = typeof parsed?.song?.caption === 'string' ? parsed.song.caption : '';
    const noteTextLen = notes.reduce((sum, n) => sum + (typeof n?.caption === 'string' ? n.caption.length : 0), 0);
    const noteCount = notes.length;
    const segmentDurationSec = notes.reduce((sum, n) => {
      const start = Number(n?.start ?? 0);
      const end = Number(n?.end ?? start);
      return sum + Math.max(0, end - start);
    }, 0);
    const longSegmentCount = notes.reduce((sum, n) => {
      const start = Number(n?.start ?? 0);
      const end = Number(n?.end ?? start);
      return sum + (Math.max(0, end - start) > 5 ? 1 : 0);
    }, 0);
    const markedNoteCount = notes.reduce((sum, n) => {
      const tracks = Array.isArray(n?.analysisTracks) ? n.analysisTracks : [];
      const trackNotes = tracks.reduce((trackSum, t) => {
        const list = Array.isArray(t?.notes) ? t.notes : [];
        return trackSum + list.length;
      }, 0);
      return sum + trackNotes;
    }, 0);
    return { commentLen: songText.length + noteTextLen, noteCount, segmentDurationSec, markedNoteCount, longSegmentCount };
  } catch {
    return { commentLen: 0, noteCount: 0, segmentDurationSec: 0, markedNoteCount: 0, longSegmentCount: 0 };
  }
}

async function renamePlaylist(name) {
  const current = state.playlists.find((p) => p.name === name);
  if (!current) return;
  const asked = window.prompt('歌单重命名', name);
  if (asked === null) return;
  const next = asked.trim();
  if (!next || next === name) return;
  if (state.playlists.some((p) => p.name === next)) {
    alert('歌单名已存在');
    return;
  }
  current.name = next;
  if (state.selectedPlaylist === name) state.selectedPlaylist = next;
  await savePlaylists();
  await refreshTocList();
}

async function renameSongFolder(songName) {
  if (!state.saveDirectoryHandle) return;
  const asked = window.prompt('歌曲重命名', songName);
  if (asked === null) return;
  const next = sanitizeFolderName(asked.trim());
  if (!next || next === songName) return;
  const existingSongs = await listSongDirectories();
  if (existingSongs.includes(next)) {
    alert('同名歌曲已存在');
    return;
  }

  try {
    const { audioDir, notesDir } = await getProjectSubdirs(state.saveDirectoryHandle, { create: true });
    const normalizedSongName = sanitizeFolderName(songName);
    const targetAudioName = getProjectAudioFilename(next);
    const targetNotesName = getProjectNotesFilename(next);
    let sourceAudioEntry = null;
    for await (const entry of audioDir.values()) {
      if (entry.kind !== 'file' || !isAudioFileName(entry.name)) continue;
      if (sanitizeFolderName(stripExtension(entry.name)) === normalizedSongName) {
        sourceAudioEntry = entry;
        break;
      }
    }
    if (!sourceAudioEntry) {
      alert('未找到要重命名的音频');
      return;
    }

    const sourceAudioFile = await sourceAudioEntry.getFile();
    const audioSaved = await writeBlobToDirectory(sourceAudioFile, targetAudioName, audioDir);
    if (!audioSaved) {
      alert('重命名歌曲失败');
      return;
    }
    if (sourceAudioEntry.name !== targetAudioName) {
      await audioDir.removeEntry(sourceAudioEntry.name);
    }

    let sourceNotesEntry = null;
    let sourceNotesParsed = null;
    for await (const entry of notesDir.values()) {
      if (entry.kind !== 'file' || !/\.json$/i.test(entry.name)) continue;
      try {
        const parsed = JSON.parse(await (await entry.getFile()).text());
        const audioName = typeof parsed?.audio === 'string' ? parsed.audio.trim() : '';
        const exactByName = entry.name === getProjectNotesFilename(normalizedSongName);
        const exactByAudio = audioName && audioName.toLowerCase() === getProjectAudioFilename(normalizedSongName).toLowerCase();
        if (exactByName || exactByAudio) {
          sourceNotesEntry = entry;
          sourceNotesParsed = parsed;
          break;
        }
      } catch {}
    }

    const notesPayload =
      sourceNotesParsed && typeof sourceNotesParsed === 'object'
        ? { ...sourceNotesParsed, audio: targetAudioName }
        : { audio: targetAudioName, song: { tags: [], caption: '' }, notes: [] };
    await saveTextFileToDirectory(targetNotesName, JSON.stringify(notesPayload, null, 2), notesDir);
    if (sourceNotesEntry && sourceNotesEntry.name !== targetNotesName) {
      await notesDir.removeEntry(sourceNotesEntry.name);
    }

    state.playlists.forEach((p) => {
      p.songs = p.songs.map((s) => (s === songName ? next : s));
    });
    await savePlaylists();
    await refreshTocList();
  } catch {
    alert('重命名歌曲失败');
  }
}

async function deletePlaylist(name) {
  const playlist = state.playlists.find((p) => p.name === name);
  if (!playlist) return;
  if (name === '默认') {
    alert('默认歌单不能删除');
    return;
  }
  const ok = window.confirm(`删除歌单“${name}”？`);
  if (!ok) return;
  state.playlists = state.playlists.filter((p) => p.name !== name);
  if (!state.playlists.find((p) => p.name === '默认')) state.playlists.unshift({ name: '默认', songs: [] });
  if (!state.playlists.find((p) => p.name === state.selectedPlaylist)) state.selectedPlaylist = '默认';
  await savePlaylists();
  await refreshTocList();
}

async function deleteSongFromCurrentPlaylist(songName) {
  const playlist = state.playlists.find((p) => p.name === state.selectedPlaylist);
  if (!playlist) return;
  const ok = window.confirm(`从歌单“${playlist.name}”移除“${songName}”？`);
  if (!ok) return;
  playlist.songs = playlist.songs.filter((s) => s !== songName);
  await savePlaylists();
  await refreshTocList();
}

function openTocMenu(evt, type, name) {
  evt.preventDefault();
  evt.stopPropagation();
  state.menuTocTarget = { type, name };
  ui.tocContextMenu.style.left = `${evt.clientX}px`;
  ui.tocContextMenu.style.top = `${evt.clientY}px`;
  ui.tocContextMenu.style.display = 'flex';
}

const BEGINNER_GUIDE_STEPS = [
  {
    page: 'toc',
    target: '#importPlaylistFolder',
    title: '导入歌单',
    body: '请点击“导入歌单”。完成该操作后会自动进入下一步。',
    event: 'guide-import-playlist-click'
  },
  {
    page: 'toc',
    target: '#createNewMusic',
    title: '新建音乐',
    body: '请点击“新建音乐”进入片段页。完成后自动下一步。',
    event: 'guide-create-music-click'
  },
  {
    page: 'notes',
    target: '#createNoteFromRegion',
    title: '创建大于5秒片段',
    body: '先在波形里框选一个片段，再点击“+”。\n只有片段长度 >= 5 秒才算完成本步。',
    event: 'guide-create-segment-at-least-5s'
  },
  {
    page: 'editor',
    target: '#goAnalysis',
    title: '进入扒谱页',
    body: '请点击“扒谱”进入扒谱页。完成后自动下一步。',
    event: 'guide-enter-analysis-click'
  },
  {
    page: 'analysis',
    target: '.analysis-toolbar',
    title: '扒谱页：顶部工具栏',
    body: '请在顶部工具栏任意点击一次（播放/音量/工具等）。',
    event: 'guide-analysis-toolbar-interact'
  },
  {
    page: 'analysis',
    target: '.analysis-metronome-panel',
    title: '扒谱页：节拍器区',
    body: '请在节拍器区域任意操作一次（BPM/拍号/网格/重拍标定）。',
    event: 'guide-analysis-metronome-interact'
  },
  {
    page: 'analysis',
    target: '#analysisTrackList',
    title: '扒谱页：轨道区',
    body: '请在轨道区点选一次轨道（或轨道按钮）。',
    event: 'guide-analysis-tracklist-interact'
  },
  {
    page: 'analysis',
    target: '#analysisNotes',
    title: '创建音符',
    body: '请将左键设为“铅笔”，并在音符画布空白处创建一个音符。',
    event: 'guide-analysis-note-created'
  },
  {
    page: 'analysis',
    target: '#analysisNotes',
    title: '编辑音符',
    body: '请选中一个音符后拖动或拉伸它（移动/改时值均可）。',
    event: 'guide-analysis-note-edited'
  }
];

function getCurrentPageName() {
  if (pages.home.classList.contains('active')) return 'home';
  if (pages.toc.classList.contains('active')) return 'toc';
  if (pages.record.classList.contains('active')) return 'record';
  if (pages.trim.classList.contains('active')) return 'trim';
  if (pages.notes.classList.contains('active')) return 'notes';
  if (pages.editor.classList.contains('active')) return 'editor';
  if (pages.analysis.classList.contains('active')) return 'analysis';
  return 'toc';
}

function getGuideTargetRect(selector) {
  const el = document.querySelector(selector);
  if (!el) return null;
  try {
    el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
  } catch {}
  const rect = el.getBoundingClientRect();
  if (!rect || rect.width <= 0 || rect.height <= 0) return null;
  return rect;
}

function renderBeginnerGuideStep() {
  if (!state.guideActive) return;
  const step = BEGINNER_GUIDE_STEPS[state.guideStepIndex];
  if (!step) return;
  if (step.page && getCurrentPageName() !== step.page) {
    showPage(step.page);
  }
  const rect = getGuideTargetRect(step.target) || {
    left: window.innerWidth * 0.2,
    top: window.innerHeight * 0.2,
    width: window.innerWidth * 0.6,
    height: window.innerHeight * 0.4
  };
  const pad = 8;
  const left = Math.max(4, rect.left - pad);
  const top = Math.max(4, rect.top - pad);
  const width = Math.min(window.innerWidth - left - 4, rect.width + pad * 2);
  const height = Math.min(window.innerHeight - top - 4, rect.height + pad * 2);
  ui.guideSpotlight.style.left = `${left}px`;
  ui.guideSpotlight.style.top = `${top}px`;
  ui.guideSpotlight.style.width = `${width}px`;
  ui.guideSpotlight.style.height = `${height}px`;
  ui.guideTitle.textContent = step.title;
  ui.guideBody.textContent = step.body;
  ui.guideStep.textContent = `步骤 ${state.guideStepIndex + 1} / ${BEGINNER_GUIDE_STEPS.length}`;
}

function tryAdvanceBeginnerGuide(eventName) {
  if (!state.guideActive) return;
  const step = BEGINNER_GUIDE_STEPS[state.guideStepIndex];
  if (!step || step.event !== eventName) return;
  if (state.guideStepIndex >= BEGINNER_GUIDE_STEPS.length - 1) {
    closeBeginnerGuide();
    return;
  }
  state.guideStepIndex += 1;
  requestAnimationFrame(renderBeginnerGuideStep);
}

function closeBeginnerGuide() {
  state.guideActive = false;
  ui.guideOverlay.classList.remove('open');
  if (state.guideReturnPage) showPage(state.guideReturnPage);
}

function startBeginnerGuide() {
  state.guideReturnPage = getCurrentPageName();
  state.guideActive = true;
  state.guideStepIndex = 0;
  ui.guideOverlay.classList.add('open');
  requestAnimationFrame(renderBeginnerGuideStep);
}

async function refreshTocList() {
  ui.playlistList.innerHTML = '';
  ui.songList.innerHTML = '';
  if (!state.saveDirectoryHandle) {
    const li = document.createElement('li');
    li.textContent = '请在右上角设置保存目录';
    ui.playlistList.appendChild(li);
    ui.songListTitle.textContent = '目录';
    const tip = document.createElement('li');
    tip.textContent = '先设置保存目录，再开始导入歌单/新建音乐';
    ui.songList.appendChild(tip);
    return;
  }

  await loadPlaylists();
  ui.songListTitle.textContent = `${state.selectedPlaylist} / 目录`;

  if (!state.playlists.length) {
    const li = document.createElement('li');
    li.textContent = '暂无歌单';
    ui.playlistList.appendChild(li);
    return;
  }

  const allSongsInAllPlaylists = Array.from(new Set(state.playlists.flatMap((p) => p.songs || [])));
  const songStatsEntries = await Promise.all(
    allSongsInAllPlaylists.map(async (songName) => [songName, await readSongStats(songName)])
  );
  const songStatsMap = new Map(songStatsEntries);
  const overallStats = allSongsInAllPlaylists.reduce(
    (acc, songName) => {
      const st = songStatsMap.get(songName) || {
        segmentDurationSec: 0,
        markedNoteCount: 0,
        longSegmentCount: 0
      };
      acc.segmentDurationSec += Number(st.segmentDurationSec || 0);
      acc.markedNoteCount += Number(st.markedNoteCount || 0);
      acc.longSegmentCount += Number(st.longSegmentCount || 0);
      return acc;
    },
    { segmentDurationSec: 0, markedNoteCount: 0, longSegmentCount: 0 }
  );
  ui.songListTitle.textContent = `${state.selectedPlaylist} / 目录`;

  const overallLi = document.createElement('li');
  const overallRow = document.createElement('div');
  overallRow.className = 'toc-row toc-overall-row';
  const overallText = document.createElement('span');
  overallText.className = 'toc-overall-text';
  overallText.textContent =
    `总体统计：段落${overallStats.segmentDurationSec.toFixed(2)}s · 音符${overallStats.markedNoteCount} · >5秒片段${overallStats.longSegmentCount}`;
  overallRow.appendChild(overallText);
  overallLi.appendChild(overallRow);
  ui.playlistList.appendChild(overallLi);

  state.playlists.forEach((playlist) => {
    const playlistSongs = Array.from(new Set(playlist.songs || []));
    const playlistStats = playlistSongs.reduce(
      (acc, songName) => {
        const st = songStatsMap.get(songName) || {
          segmentDurationSec: 0,
          markedNoteCount: 0,
          longSegmentCount: 0
        };
        acc.segmentDurationSec += Number(st.segmentDurationSec || 0);
        acc.markedNoteCount += Number(st.markedNoteCount || 0);
        acc.longSegmentCount += Number(st.longSegmentCount || 0);
        return acc;
      },
      { segmentDurationSec: 0, markedNoteCount: 0, longSegmentCount: 0 }
    );

    const li = document.createElement('li');
    const row = document.createElement('div');
    row.className = 'toc-row';
    const openBtn = document.createElement('button');
    openBtn.type = 'button';
    openBtn.className = 'toc-item name-btn';
    openBtn.textContent = `${playlist.name} (${playlistSongs.length})`;
    const meta = document.createElement('span');
    meta.className = 'toc-meta';
    meta.textContent =
      `段落${playlistStats.segmentDurationSec.toFixed(2)}s · 音符${playlistStats.markedNoteCount} · >5秒片段${playlistStats.longSegmentCount}`;
    openBtn.addEventListener('click', async () => {
      state.selectedPlaylist = playlist.name;
      await refreshTocList();
    });
    row.addEventListener('contextmenu', (evt) => openTocMenu(evt, 'playlist', playlist.name));
    row.appendChild(openBtn);
    row.appendChild(meta);
    li.appendChild(row);
    ui.playlistList.appendChild(li);
  });

  const active = state.playlists.find((p) => p.name === state.selectedPlaylist) || state.playlists[0];
  const songs = Array.from(new Set(active.songs));
  if (!songs.length) {
    const li = document.createElement('li');
    li.textContent = '该歌单暂无歌曲';
    ui.songList.appendChild(li);
    return;
  }

  for (const songName of songs) {
    const li = document.createElement('li');
    const row = document.createElement('div');
    row.className = 'toc-row';
    const openBtn = document.createElement('button');
    openBtn.type = 'button';
    openBtn.className = 'toc-item name-btn';
    const {
      segmentDurationSec,
      markedNoteCount,
      longSegmentCount
    } = songStatsMap.get(songName) || await readSongStats(songName);
    openBtn.textContent = songName;
    const meta = document.createElement('span');
    meta.className = 'toc-meta';
    meta.textContent = `段落${segmentDurationSec.toFixed(2)}s · 音符${markedNoteCount} · >5秒片段${longSegmentCount}`;
    openBtn.addEventListener('click', async () => {
      await openSongFromNotebook(songName);
    });
    row.addEventListener('contextmenu', (evt) => openTocMenu(evt, 'song', songName));
    row.appendChild(openBtn);
    row.appendChild(meta);
    li.appendChild(row);
    ui.songList.appendChild(li);
  }
}

function getOrCreatePlaylist(name) {
  let playlist = state.playlists.find((p) => p.name === name);
  if (!playlist) {
    playlist = { name, songs: [] };
    state.playlists.push(playlist);
  }
  return playlist;
}

async function createPlaylistFromPrompt() {
  if (!state.saveDirectoryHandle) {
    const ok = await pickSaveDirectory();
    if (!ok) return;
  }
  const asked = window.prompt('新建歌单名', '新歌单');
  if (asked === null) return;
  const name = asked.trim();
  if (!name) return;
  if (state.playlists.some((p) => p.name === name)) {
    alert('歌单名已存在');
    return;
  }
  state.playlists.push({ name, songs: [] });
  state.selectedPlaylist = name;
  await savePlaylists();
  await refreshTocList();
}

async function importPlaylistFolder() {
  if (!window.showDirectoryPicker) {
    alert('当前浏览器不支持目录选择');
    return;
  }
  if (!state.saveDirectoryHandle) {
    const ok = await pickSaveDirectory();
    if (!ok) return;
  }

  let importDir;
  try {
    importDir = await window.showDirectoryPicker({ startIn: 'music' });
  } catch {
    return;
  }

  const suggested = importDir.name || '导入歌单';
  const asked = window.prompt('导入为歌单名', suggested);
  if (asked === null) return;
  const playlistName = asked.trim() || suggested;

  const playlist = getOrCreatePlaylist(playlistName);
  const allSongs = new Set(state.playlists.flatMap((p) => p.songs || []));
  const { audioDir, notesDir } = await getProjectSubdirs(state.saveDirectoryHandle, { create: true });
  let importedCount = 0;
  let skippedCount = 0;
  for await (const entry of importDir.values()) {
    // Import playlist from exactly: {dir}/*.mp3 (non-recursive).
    if (entry.kind !== 'file' || !isMp3FileName(entry.name)) continue;
    const audioFile = await entry.getFile();
    const base = sanitizeFolderName(stripExtension(entry.name));
    const sameSongRegex = new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:_\\d+)?$`);
    const existsInOtherPlaylist = Array.from(allSongs).some((name) => sameSongRegex.test(name));
    if (existsInOtherPlaylist) {
      skippedCount += 1;
      continue;
    }
    let folder = base;
    let n = 2;
    while (true) {
      try {
        await audioDir.getFileHandle(getProjectAudioFilename(folder));
        folder = `${base}_${n++}`;
      } catch {
        break;
      }
    }
    const targetAudioName = getProjectAudioFilename(folder);
    await writeBlobToDirectory(audioFile, targetAudioName, audioDir);
    await saveTextFileToDirectory(
      getProjectNotesFilename(folder),
      JSON.stringify(
        {
          audio: targetAudioName,
          song: { tags: [], caption: '' },
          notes: []
        },
        null,
        2
      ),
      notesDir
    );
    if (!playlist.songs.includes(folder)) playlist.songs.push(folder);
    allSongs.add(folder);
    importedCount += 1;
  }
  state.selectedPlaylist = playlist.name;
  await savePlaylists();
  await refreshTocList();
  alert(`导入完成：新增 ${importedCount} 首，跳过 ${skippedCount} 首（其他歌单已存在）`);
}

async function writeBlobToDirectory(blob, filename, dirHandle = state.saveDirectoryHandle) {
  if (!dirHandle) return false;
  try {
    const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
    return true;
  } catch {
    return false;
  }
}

async function saveTextFileToDirectory(filename, text, dirHandle = state.saveDirectoryHandle) {
  if (!dirHandle) return false;
  try {
    const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(text);
    await writable.close();
    return true;
  } catch {
    return false;
  }
}

function removeRegionById(regionId) {
  if (!state.wave) return;
  const region = state.wave.regions.list[regionId];
  if (region) region.remove();
}

function clearActiveRegion() {
  if (!state.wave) return;
  Object.values(state.wave.regions.list).forEach((region) => {
    if (!region.id.startsWith(NOTE_REGION_PREFIX)) region.remove();
  });
  state.activeRegion = null;
  state.loopRegionPlayback = false;
}

function applyWaveZoom(nextZoom) {
  state.zoomPxPerSec = Math.max(MIN_ZOOM_PX_PER_SEC, Math.min(MAX_ZOOM_PX_PER_SEC, nextZoom));
  if (state.wave) state.wave.zoom(state.zoomPxPerSec);
  ui.zoomInfo.textContent = `缩放: ${Math.round(state.zoomPxPerSec)}`;
  renderNoteMarkers();
}

function panWaveBy(secondsDelta) {
  if (!state.wave || !state.wave.isReady) return;
  const current = state.wave.getCurrentTime() || 0;
  seekWaveTo(current + secondsDelta);
}

function moveWaveViewportTo(seconds) {
  if (!state.wave || !state.wave.isReady) return;
  const wrapper = state.wave.drawer?.wrapper;
  if (!wrapper) return;
  const targetX = Math.max(0, (seconds || 0) * state.zoomPxPerSec - wrapper.clientWidth * 0.35);
  wrapper.scrollLeft = targetX;
}

async function playRegionRange(region) {
  if (!state.wave || !region) return;
  const r = normalizeRegionBounds(region.start, region.end, state.wave.getDuration() || Infinity);
  if (r.end - r.start < MIN_REGION_SECONDS) return;
  state.loopRegionPlayback = false;
  seekWaveTo(r.start);
  if (state.wave.isPlaying()) state.wave.pause();
  try {
    await state.wave.play(r.start, r.end);
  } catch {
    seekWaveTo(r.start);
    await state.wave.play();
  }
}

function attachCenterPlayHandle(region) {
  const el = region?.element;
  if (!el) return;
  const old = el.querySelector('.region-center-play');
  if (old) old.remove();
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'region-center-play';
  btn.title = '播放选框';
  btn.textContent = '▶';
  btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    await playRegionRange(region);
  });
  el.appendChild(btn);
}

function renderActiveRegion(start, end) {
  if (!state.wave || !state.wave.isReady) return;
  const duration = state.wave.getDuration() || Infinity;
  const range = normalizeRegionBounds(start, end, duration);
  if (range.end - range.start < MIN_REGION_SECONDS) return;
  clearActiveRegion();
  state.activeRegion = state.wave.addRegion({
    id: ACTIVE_REGION_ID,
    start: range.start,
    end: range.end,
    color: 'rgba(31,111,235,0.22)',
    drag: true,
    resize: true
  });
  attachCenterPlayHandle(state.activeRegion);
}

function renderNoteRegions() {
  if (!state.wave || !state.wave.isReady) return;
  Object.values(state.wave.regions.list).forEach((region) => {
    if (region.id.startsWith(NOTE_REGION_PREFIX)) region.remove();
  });
  state.notes.forEach((note, idx) => {
    state.wave.addRegion({
      id: `${NOTE_REGION_PREFIX}${idx}`,
      start: note.start,
      end: note.end,
      color: 'rgba(251,146,60,0.18)',
      drag: false,
      resize: false
    });
  });
}

function renderNoteMarkers() {
  if (!state.wave || !state.wave.isReady || !state.notes.length) return;
  state.notes.forEach((note, idx) => {
    const region = state.wave.regions.list[`${NOTE_REGION_PREFIX}${idx}`];
    if (!region || !region.element) return;

    const oldText = region.element.querySelector('.note-text');
    if (oldText) oldText.remove();
    const noteText = document.createElement('span');
    noteText.className = 'note-text';
    const width = Math.max(0, region.element.getBoundingClientRect().width - 24);
    const maxChars = Math.max(3, Math.floor(width / 7));
    const raw = (note.caption || '').trim() || `[${(note.tags || []).join(', ')}]`;
    noteText.textContent = raw.length > maxChars ? `${raw.slice(0, maxChars - 1)}…` : raw;
    region.element.appendChild(noteText);

    const old = region.element.querySelector('.marker');
    if (old) old.remove();

    const marker = document.createElement('span');
    marker.className = 'marker';
    marker.title = `便签 #${idx + 1}`;

    marker.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      renderActiveRegion(note.start, note.end);
      state.menuNoteIndex = idx;
      ui.noteContextMenu.style.left = `${event.clientX}px`;
      ui.noteContextMenu.style.top = `${event.clientY}px`;
      ui.noteContextMenu.style.display = 'flex';
    });

    region.element.appendChild(marker);
  });
}

function formatEditorTime() {
  if (!state.editorWave) return;
  const c = state.editorWave.getCurrentTime();
  const d = state.editorWave.getDuration();
  ui.editorTimeInfo.textContent = `${formatSec(c)} / ${formatSec(d)}`;
}

function initEditorWave() {
  if (state.editorWave) return;
  const editorRegions = WaveSurfer.regions.create({
    dragSelection: {
      slop: 2,
      color: 'rgba(34,197,94,0.2)'
    }
  });
  state.editorWave = WaveSurfer.create({
    container: '#editorWaveform',
    waveColor: '#b7c8ff',
    progressColor: '#1f6feb',
    cursorColor: '#ff4d4f',
    responsive: true,
    height: 240,
    normalize: false,
    plugins: [editorRegions]
  });
  state.editorWave.on('ready', () => {
    formatEditorTime();
    renderEditorAnnotationHighlights();
  });
  state.editorWave.on('seek', formatEditorTime);
  state.editorWave.on('audioprocess', formatEditorTime);
  state.editorWave.on('region-created', (region) => {
    const duration = state.editorWave.getDuration() || Infinity;
    const range = normalizeRegionBounds(region.start, region.end, duration);
    if (range.end - range.start < MIN_REGION_SECONDS) {
      region.remove();
      return;
    }
    if (typeof region.update === 'function') {
      region.update({ start: range.start, end: range.end });
    }
    Object.values(state.editorWave.regions.list).forEach((r) => {
      if (r.id !== region.id) r.remove();
    });
    state.editorActiveRegion = region;
    if (region.element) {
      region.element.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
      region.element.style.border = '1px dashed rgba(22, 163, 74, 0.8)';
    }
  });
  state.editorWave.on('region-updated', (region) => {
    const duration = state.editorWave.getDuration() || Infinity;
    const range = normalizeRegionBounds(region.start, region.end, duration);
    if (range.end - range.start < MIN_REGION_SECONDS) return;
    state.editorActiveRegion = region;
    if (region.element) {
      region.element.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
      region.element.style.border = '1px dashed rgba(22, 163, 74, 0.8)';
    }
  });
  setupEditorOverlay();
}

async function loadEditorPreviewSegment(start, end) {
  if (!state.audioBlob) return;
  initEditorWave();
  const segment = await applyTrimAndGain(state.audioBlob, start, end, 1);
  if (state.editorPreviewUrl) URL.revokeObjectURL(state.editorPreviewUrl);
  state.editorPreviewUrl = URL.createObjectURL(segment);
  if (state.editorWave?.regions) {
    Object.values(state.editorWave.regions.list).forEach((region) => region.remove());
  }
  state.editorActiveRegion = null;
  state.editorActiveRange = null;
  state.editorActiveAnnotationIndex = null;
  if (ui.editorWaveSelection) ui.editorWaveSelection.style.display = 'none';
  renderEditorAnnotationHighlights();
  state.editorWave.load(state.editorPreviewUrl);
}

function formatWaveTime() {
  if (!state.wave) return;
  const c = state.wave.getCurrentTime();
  const d = state.wave.getDuration();
  ui.timeInfo.textContent = `${formatSec(c)} / ${formatSec(d)}`;
}

function initWave() {
  if (state.wave) return;
  state.wave = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#94bfff',
    progressColor: '#1f6feb',
    cursorColor: '#ff4d4f',
    responsive: true,
    height: 150,
    normalize: false,
    minPxPerSec: state.zoomPxPerSec,
    scrollParent: true,
    plugins: [
      WaveSurfer.regions.create({
        dragSelection: {
          slop: 2,
          color: 'rgba(31,111,235,0.20)'
        }
      })
    ]
  });

  state.wave.on('ready', () => {
    ui.zoomInfo.textContent = `缩放: ${Math.round(state.zoomPxPerSec)}`;
    formatWaveTime();
    renderNoteRegions();
    renderNoteMarkers();
    if (state.activeRegion) {
      renderActiveRegion(state.activeRegion.start, state.activeRegion.end);
    }
  });

  state.wave.on('seek', formatWaveTime);
  state.wave.on('audioprocess', () => {
    formatWaveTime();
    if (state.loopRegionPlayback && state.activeRegion) {
      const c = state.wave.getCurrentTime();
      if (c >= state.activeRegion.end) {
        state.wave.play(state.activeRegion.start, state.activeRegion.end);
      }
    }
  });

  state.wave.on('region-created', (region) => {
    if (region.id.startsWith(NOTE_REGION_PREFIX)) return;
    if (state.suppressRegionCreate || state.isModifierPanning) {
      region.remove();
      return;
    }
    const duration = state.wave.getDuration() || Infinity;
    const range = normalizeRegionBounds(region.start, region.end, duration);
    if (range.end - range.start < MIN_REGION_SECONDS) {
      region.remove();
      return;
    }
    if (typeof region.update === 'function') {
      region.update({ start: range.start, end: range.end });
    }
    Object.values(state.wave.regions.list).forEach((r) => {
      if (r.id.startsWith(NOTE_REGION_PREFIX)) return;
      if (r.id !== region.id) r.remove();
    });
    state.activeRegion = region;
    attachCenterPlayHandle(region);
  });

  state.wave.on('region-updated', (region) => {
    if (!region.id.startsWith(NOTE_REGION_PREFIX)) {
      const duration = state.wave.getDuration() || Infinity;
      const range = normalizeRegionBounds(region.start, region.end, duration);
      if (range.end - range.start < MIN_REGION_SECONDS) return;
      state.activeRegion = region;
      attachCenterPlayHandle(region);
    }
  });

  state.wave.on('region-click', (region) => {
    if (region.id.startsWith(NOTE_REGION_PREFIX)) {
      return;
    }
    Object.values(state.wave.regions.list).forEach((r) => {
      if (r.id.startsWith(NOTE_REGION_PREFIX)) return;
      if (r.id !== region.id) r.remove();
    });
    state.activeRegion = region;
  });

  state.wave.on('region-dblclick', (region, evt) => {
    evt.stopPropagation();
    if (region.id === ACTIVE_REGION_ID) {
      renderActiveRegion(region.start, region.end);
      state.loopRegionPlayback = true;
      seekWaveTo(region.start);
      state.wave.play(region.start, region.end);
    }
  });

  const wrapper = state.wave.drawer.wrapper;
  // Keep native horizontal scrollbar visible for manual panning.
  wrapper.style.overflowX = 'scroll';
  wrapper.style.overflowY = 'hidden';
  wrapper.addEventListener('click', (evt) => {
    if (evt.button !== 0) return;
    if (state.isModifierPanning) return;
    const inRegion = evt.target.closest('.wavesurfer-region');
    const inMarker = evt.target.closest('.marker');
    if (!inRegion && !inMarker) {
      if (state.timingEditNoteIndex !== null && state.activeRegion) {
        const idx = state.timingEditNoteIndex;
        if (state.notes[idx]) {
          const range = normalizeRegionBounds(
            state.activeRegion.start,
            state.activeRegion.end,
            state.wave?.getDuration() || Infinity
          );
          if (range.end - range.start >= MIN_REGION_SECONDS) {
            const note = state.notes[idx];
            const oldStart = note.start;
            const oldEnd = note.end;
            let newStart = range.start;
            let newEnd = range.end;
            const newDuration = newEnd - newStart;
            const annotations = Array.isArray(note.annotations) ? note.annotations : [];
            const absList = annotations.map((item) => ({
              startAbs: item.startAbs ?? oldStart + (item.startRel || 0),
              endAbs: item.endAbs ?? oldStart + (item.endRel || 0)
            }));
            const hasOutside = absList.some(
              (item) => item.startAbs < newStart || item.endAbs > newEnd
            );
            if (hasOutside && newDuration < oldEnd - oldStart) {
              const minAbs = Math.min(...absList.map((item) => item.startAbs));
              const maxAbs = Math.max(...absList.map((item) => item.endAbs));
              const ok = window.confirm(
                '片段缩短会导致标记超出范围，是否将片段起点贴合到最早标记起点？'
              );
              if (ok) {
                newStart = minAbs;
                newEnd = Math.max(newEnd, maxAbs);
              }
            }
            note.start = newStart;
            note.end = newEnd;
            const base = note.start;
            if (annotations.length) {
              note.annotations = annotations.map((item) => {
                const startAbs = item.startAbs ?? oldStart + (item.startRel || 0);
                const endAbs = item.endAbs ?? oldStart + (item.endRel || 0);
                return {
                  ...item,
                  startAbs,
                  endAbs,
                  startRel: startAbs - base,
                  endRel: endAbs - base
                };
              });
            }
            renderNotes();
          }
        }
        state.timingEditNoteIndex = null;
      }
      clearActiveRegion();
    }
  });

  wrapper.addEventListener('mousedown', (evt) => {
    const withModifier = evt.metaKey || evt.ctrlKey;
    if (evt.button !== 0 || !withModifier) return;
    state.isModifierPanning = true;
    state.suppressRegionCreate = true;
    state.panStartX = evt.clientX;
    state.panStartScrollLeft = wrapper.scrollLeft;
    wrapper.style.cursor = 'grabbing';
    evt.preventDefault();
  });

  const stopModifierPan = () => {
    if (!state.isModifierPanning && !state.suppressRegionCreate) return;
    state.isModifierPanning = false;
    wrapper.style.cursor = '';
    setTimeout(() => {
      state.suppressRegionCreate = false;
    }, 0);
  };

  wrapper.addEventListener('mousemove', (evt) => {
    if (!state.isModifierPanning) return;
    const dx = evt.clientX - state.panStartX;
    wrapper.scrollLeft = state.panStartScrollLeft - dx;
    evt.preventDefault();
  });
  wrapper.addEventListener('mouseup', stopModifierPan);
  wrapper.addEventListener('mouseleave', stopModifierPan);

  wrapper.addEventListener(
    'wheel',
    (evt) => {
      if (!state.wave || !state.wave.isReady) return;
      evt.preventDefault();
      const delta = evt.deltaY > 0 ? -8 : 8;
      applyWaveZoom(state.zoomPxPerSec + delta);
    },
    { passive: false }
  );
}

function loadAudioBlob(blob, name = 'song.wav') {
  if (state.wave && state.wave.isPlaying()) {
    state.wave.stop();
  }
  state.audioBlob = blob;
  state.audioBlobData = null;
  state.audioBlobDataPromise = null;
  ensureAudioBlobData();
  state.audioName = name;
  if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
  state.audioUrl = URL.createObjectURL(blob);

  initWave();
  state.wave.load(state.audioUrl);
  state.loopRegionPlayback = false;
  state.activeRegion = null;
  updateInlineImportVisibility();
}

function updateInlineImportVisibility() {
  const hidden = Boolean(state.audioBlob);
  if (!ui.inlineImportAudio) return;
  ui.inlineImportAudio.style.display = hidden ? 'none' : 'inline-flex';
}

function hideContextMenu() {
  if (ui.noteContextMenu) ui.noteContextMenu.style.display = 'none';
  if (ui.tocContextMenu) ui.tocContextMenu.style.display = 'none';
  state.menuNoteIndex = null;
  state.menuTocTarget = null;
}

function askSourceActionWithModal() {
  return new Promise((resolve) => {
    ui.sourceActionModal.classList.add('open');

    const onCopy = () => {
      cleanup();
      resolve('copy');
    };
    const onMove = () => {
      cleanup();
      resolve('move');
    };
    const cleanup = () => {
      ui.sourceActionModal.classList.remove('open');
      ui.modalCopyToNotebook.removeEventListener('click', onCopy);
      ui.modalMoveToNotebook.removeEventListener('click', onMove);
    };

    ui.modalCopyToNotebook.addEventListener('click', onCopy);
    ui.modalMoveToNotebook.addEventListener('click', onMove);
  });
}

function resetNotebookState() {
  if (state.audioUrl) {
    URL.revokeObjectURL(state.audioUrl);
    state.audioUrl = null;
  }
  state.audioBlob = null;
  state.audioName = 'song.wav';
  state.sourceAudioBlob = null;
  state.sourceAudioName = '';
  state.sourceParentDirHandle = null;
  state.sourceFileName = '';
  state.notes = [];
  state.activeRegion = null;
  state.pendingNoteRange = null;
  state.selectedTagsDraft = [];
  state.pendingAnnotations = [];
  state.editorActiveAnnotationIndex = null;
  state.timingEditAnnotationIndex = null;
  state.editingAnnotationIndex = null;
  state.songTagsDraft = [];
  state.songCaptionDraft = '';
  state.timingEditNoteIndex = null;
  state.editingNoteIndex = null;
  hideContextMenu();
  ui.caption.value = '';
  if (ui.annotationList) ui.annotationList.innerHTML = '';
  if (ui.editorWaveSelection) ui.editorWaveSelection.style.display = 'none';
  ui.songCaption.value = '';
  renderSelectedTags();
  renderSongTags();
  renderNotes();
  if (state.wave) {
    state.wave.empty();
  }
  if (state.editorWave) {
    state.editorWave.empty();
  }
  if (state.editorPreviewUrl) {
    URL.revokeObjectURL(state.editorPreviewUrl);
    state.editorPreviewUrl = null;
  }
  updateInlineImportVisibility();
}

function formatTrimTime() {
  if (!state.trimWave) return;
  const c = state.trimWave.getCurrentTime();
  const d = state.trimWave.getDuration();
  ui.trimTimeInfo.textContent = `${formatSec(c)} / ${formatSec(d)}`;
}

function getTimeFromTrimPointer(evt) {
  if (!state.trimWave) return 0;
  const p = state.trimWave.drawer.handleEvent(evt);
  const d = state.trimWave.getDuration() || 0;
  return Math.max(0, Math.min(d, p * d));
}

function clearTrimRegion() {
  if (!state.trimWave) return;
  const region = state.trimWave.regions.list[TRIM_REGION_ID];
  if (region) region.remove();
  state.trimRegion = null;
  state.pendingTrimStart = null;
}

function renderTrimRegion(start, end) {
  if (!state.trimWave) return;
  clearTrimRegion();
  state.trimRegion = state.trimWave.addRegion({
    id: TRIM_REGION_ID,
    start,
    end,
    color: 'rgba(16,185,129,0.2)',
    drag: true,
    resize: true
  });
}

function initTrimWave() {
  if (state.trimWave) return;
  state.trimWave = WaveSurfer.create({
    container: '#trimWaveform',
    waveColor: '#86efac',
    progressColor: '#10b981',
    cursorColor: '#ff4d4f',
    responsive: true,
    height: 140,
    normalize: false,
    minPxPerSec: 80,
    scrollParent: true,
    plugins: [WaveSurfer.regions.create()]
  });

  state.trimWave.on('ready', formatTrimTime);
  state.trimWave.on('seek', formatTrimTime);
  state.trimWave.on('audioprocess', formatTrimTime);
  state.trimWave.on('region-updated', (region) => {
    if (region.id === TRIM_REGION_ID) state.trimRegion = region;
  });

  const wrapper = state.trimWave.drawer.wrapper;
  wrapper.addEventListener('click', (evt) => {
    if (!state.trimCreateMode || !state.trimWave?.isReady) return;
    evt.preventDefault();
    evt.stopPropagation();
    const t = getTimeFromTrimPointer(evt);
    if (state.pendingTrimStart === null) {
      state.pendingTrimStart = t;
      return;
    }
    const s = Math.min(state.pendingTrimStart, t);
    const e = Math.max(state.pendingTrimStart, t);
    state.pendingTrimStart = null;
    if (e - s < 0.03) return;
    renderTrimRegion(s, e);
    state.trimCreateMode = false;
    setModeButton(ui.toggleTrimCreateRegion, '创建裁剪区', false);
  });
}

function loadTrimBlob(blob) {
  initTrimWave();
  const url = URL.createObjectURL(blob);
  state.trimWave.load(url);
  state.trimWave.once('ready', () => URL.revokeObjectURL(url));
  clearTrimRegion();
  state.trimCreateMode = false;
  setModeButton(ui.toggleTrimCreateRegion, '创建裁剪区', false);
}

async function decodeAudioBuffer(blob) {
  const ab = await blob.arrayBuffer();
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const decoded = await ctx.decodeAudioData(ab.slice(0));
  await ctx.close();
  return decoded;
}

function encodeWav(channels, sampleRate) {
  const numChannels = channels.length;
  const numFrames = channels[0].length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = numFrames * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  let offset = 0;
  const writeText = (text) => {
    for (let i = 0; i < text.length; i += 1) view.setUint8(offset + i, text.charCodeAt(i));
    offset += text.length;
  };

  writeText('RIFF');
  view.setUint32(offset, 36 + dataSize, true);
  offset += 4;
  writeText('WAVE');
  writeText('fmt ');
  view.setUint32(offset, 16, true);
  offset += 4;
  view.setUint16(offset, 1, true);
  offset += 2;
  view.setUint16(offset, numChannels, true);
  offset += 2;
  view.setUint32(offset, sampleRate, true);
  offset += 4;
  view.setUint32(offset, sampleRate * blockAlign, true);
  offset += 4;
  view.setUint16(offset, blockAlign, true);
  offset += 2;
  view.setUint16(offset, bytesPerSample * 8, true);
  offset += 2;
  writeText('data');
  view.setUint32(offset, dataSize, true);
  offset += 4;

  for (let i = 0; i < numFrames; i += 1) {
    for (let c = 0; c < numChannels; c += 1) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }
  return buffer;
}

async function normalizeToWav(blob) {
  const decoded = await decodeAudioBuffer(blob);
  let peak = 0;
  const channels = [];
  for (let c = 0; c < decoded.numberOfChannels; c += 1) {
    const data = decoded.getChannelData(c);
    const out = new Float32Array(data);
    for (let i = 0; i < out.length; i += 1) peak = Math.max(peak, Math.abs(out[i]));
    channels.push(out);
  }
  const gain = peak > 0 ? 0.98 / peak : 1;
  channels.forEach((ch) => {
    for (let i = 0; i < ch.length; i += 1) ch[i] *= gain;
  });
  return new Blob([encodeWav(channels, decoded.sampleRate)], { type: 'audio/wav' });
}

async function applyTrimAndGain(blob, startSec, endSec, gain) {
  const decoded = await decodeAudioBuffer(blob);
  const sr = decoded.sampleRate;
  const start = Math.max(0, Math.min(decoded.duration, startSec));
  const end = Math.max(start, Math.min(decoded.duration, endSec));
  const startFrame = Math.floor(start * sr);
  const endFrame = Math.floor(end * sr);
  const frameCount = Math.max(1, endFrame - startFrame);
  const channels = [];

  for (let c = 0; c < decoded.numberOfChannels; c += 1) {
    const src = decoded.getChannelData(c);
    const out = new Float32Array(frameCount);
    for (let i = 0; i < frameCount; i += 1) {
      const v = (src[startFrame + i] || 0) * gain;
      out[i] = Math.max(-1, Math.min(1, v));
    }
    channels.push(out);
  }

  return new Blob([encodeWav(channels, sr)], { type: 'audio/wav' });
}

async function startRecording() {
  try {
    state.displayStream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
    const audioTracks = state.displayStream.getAudioTracks();
    if (!audioTracks.length) {
      throw new Error('没有获取到系统音频，请共享时勾选系统音频。');
    }

    const stream = new MediaStream(audioTracks);
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : '';

    state.mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    state.chunks = [];
    state.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) state.chunks.push(e.data);
    };

    state.mediaRecorder.onstop = async () => {
      setStatus('处理中（峰值归一化）...');
      const raw = new Blob(state.chunks, { type: state.mediaRecorder.mimeType || 'audio/webm' });
      const normalized = await normalizeToWav(raw);
      const filename = makeTimestampFilename();
      setSourceAudio(normalized, filename);
      loadAudioBlob(normalized, filename);
      loadTrimBlob(normalized);
      setStatus(`录制完成：${filename}，请裁剪并增益`);
      ui.toNotesAfterRecord.disabled = false;
      showPage('trim');
    };

    state.mediaRecorder.start(250);
    setStatus('录制中...请播放音乐');
    ui.startRecord.disabled = true;
    ui.stopRecord.disabled = false;
  } catch (err) {
    setStatus(err.message || '录制失败');
  }
}

function stopRecording() {
  if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') state.mediaRecorder.stop();
  if (state.displayStream) state.displayStream.getTracks().forEach((t) => t.stop());
  ui.startRecord.disabled = false;
  ui.stopRecord.disabled = true;
}

async function applyTrimFlow() {
  if (!state.audioBlob) {
    alert('没有可处理的音频');
    return;
  }
  if (!state.trimWave || !state.trimWave.isReady) {
    alert('音频仍在加载，请稍后再试');
    return;
  }

  const duration = state.trimWave.getDuration() || 0;
  const start = state.trimRegion ? state.trimRegion.start : 0;
  const end = state.trimRegion ? state.trimRegion.end : duration;
  const gain = Number(ui.trimGain.value || 1);

  try {
    const processed = await applyTrimAndGain(state.audioBlob, start, end, gain);
    const suggested = state.audioName || makeTimestampFilename();
    const asked = window.prompt('保存音频文件名（含 .wav）', suggested);
    if (asked === null) return;
    const filename = asked.trim() || suggested;
    loadAudioBlob(processed, filename);
    loadTrimBlob(processed);
    if (state.saveDirectoryHandle) {
      const saved = await writeBlobToDirectory(processed, filename, state.saveDirectoryHandle);
      setStatus(saved ? `已保存裁剪结果：${filename}` : `裁剪完成：${filename}（写入失败）`);
    } else {
      setStatus(`裁剪完成：${filename}（未选择保存路径）`);
    }
  } catch {
    alert('裁剪或增益处理失败');
  }
}

function makeNotesJson(audioNameOverride = null) {
  return {
    audio: audioNameOverride || state.audioName || 'song.wav',
    song: {
      tags: Array.from(state.songTagsDraft),
      caption: (state.songCaptionDraft || '').trim()
    },
    notes: state.notes.map((n) => ({
      start: n.start,
      end: n.end,
      tags: Array.isArray(n.tags) ? n.tags : [],
      caption: n.caption || '',
      annotations: Array.isArray(n.annotations)
        ? n.annotations.map((item) => ({
            startRel: item.startRel,
            endRel: item.endRel,
            startAbs: item.startAbs,
            endAbs: item.endAbs,
            text: item.text || ''
          }))
        : [],
      analysisTracks: Array.isArray(n.analysisTracks)
        ? n.analysisTracks.map((track) => ({
            name: track?.name ?? '',
            type: track?.type === 'transient' ? 'transient' : 'pitch',
            notes: Array.isArray(track?.notes) ? track.notes.map((item) => ({
              startRel: item.startRel ?? 0,
              endRel: item.endRel ?? 0,
              midi: item.midi ?? 60,
              velocity: item.velocity ?? 0.7
            })) : []
          }))
        : [],
      analysisMetronome: {
        bpm: Math.round(Math.max(1, Math.min(400, Number(n?.analysisMetronome?.bpm ?? 120) || 120)) * 100) / 100,
        signature: typeof n?.analysisMetronome?.signature === 'string' ? n.analysisMetronome.signature : '4/4',
        offset: Number(n?.analysisMetronome?.offset ?? 0) || 0,
        gridDivision: typeof n?.analysisMetronome?.gridDivision === 'string' ? n.analysisMetronome.gridDivision : '16',
        muted: !!n?.analysisMetronome?.muted,
        solo: !!n?.analysisMetronome?.solo
      }
    }))
  };
}

async function autoSaveProjectSilently() {
  if (!state.audioBlob) return;
  if (!state.saveDirectoryHandle) return;

  await ensureAudioBlobData();
  const audioName = state.audioName || 'song.wav';
  const folderName = sanitizeFolderName(stripExtension(audioName));
  const { audioDir, notesDir } = await getProjectSubdirs(state.saveDirectoryHandle, { create: true });
  const targetAudioName = getProjectAudioFilename(folderName);
  const targetNotesName = getProjectNotesFilename(folderName);
  const audioBlob = state.audioBlobData
    ? new Blob([state.audioBlobData], { type: state.audioBlob?.type || 'audio/wav' })
    : state.audioBlob;
  await writeBlobToDirectory(audioBlob, targetAudioName, audioDir);
  await saveTextFileToDirectory(targetNotesName, JSON.stringify(makeNotesJson(targetAudioName), null, 2), notesDir);
  const playlist = getOrCreatePlaylist(state.selectedPlaylist || '默认');
  if (!playlist.songs.includes(folderName)) playlist.songs.push(folderName);
  await savePlaylists();
  await refreshTocList();
}

async function saveProjectToDirectory() {
  if (!state.audioBlob) {
    alert('没有可保存的音频');
    return;
  }
  if (!state.saveDirectoryHandle) {
    const ok = await pickSaveDirectory();
    if (!ok) return;
  }

  await ensureAudioBlobData();
  const audioName = state.audioName || 'song.wav';
  const folderName = sanitizeFolderName(stripExtension(audioName));
  const { audioDir, notesDir } = await getProjectSubdirs(state.saveDirectoryHandle, { create: true });
  const targetAudioName = getProjectAudioFilename(folderName);
  const targetNotesName = getProjectNotesFilename(folderName);

  const audioBlob = state.audioBlobData
    ? new Blob([state.audioBlobData], { type: state.audioBlob?.type || 'audio/wav' })
    : state.audioBlob;
  const audioSaved = await writeBlobToDirectory(audioBlob, targetAudioName, audioDir);
  const notesSaved = await saveTextFileToDirectory(targetNotesName, JSON.stringify(makeNotesJson(targetAudioName), null, 2), notesDir);

  let sourceMsg = '未处理原音频';
  const action = await askSourceActionWithModal();
  if (state.sourceAudioBlob && state.sourceAudioName && action !== 'skip') {
    const sourceSaved = await writeBlobToDirectory(state.sourceAudioBlob, state.sourceAudioName, audioDir);
    if (sourceSaved) {
      if (action === 'move') {
        let removed = false;
        const canRemove =
          state.sourceParentDirHandle &&
          state.sourceFileName &&
          state.sourceParentDirHandle !== audioDir;
        if (canRemove) {
          try {
            await state.sourceParentDirHandle.removeEntry(state.sourceFileName);
            removed = true;
          } catch {
            removed = false;
          }
        }
        sourceMsg = removed
          ? '已剪切原音频（已从原目录删除）'
          : '已复制原音频，但无法自动删除原文件（请手动删除）';
      } else {
        sourceMsg = '已复制原音频';
      }
    } else {
      sourceMsg = '原音频处理失败';
    }
  }

  if (audioSaved && notesSaved) {
    const playlist = getOrCreatePlaylist(state.selectedPlaylist || '默认');
    if (!playlist.songs.includes(folderName)) playlist.songs.push(folderName);
    await savePlaylists();
    alert(`已保存到目录：music_note/\n- audio/${targetAudioName}\n- notes/${targetNotesName}\n${sourceMsg}`);
    refreshTocList();
  } else {
    alert('保存失败，请检查目录权限后重试');
  }
}

async function importProjectFiles(files) {
  let audioFile = null;
  files.forEach((file) => {
    if (file.type.startsWith('audio/') || /\.(wav|mp3|m4a|ogg|flac)$/i.test(file.name)) audioFile = file;
  });

  if (!audioFile) {
    alert('请导入音频文件');
    return;
  }

  setSourceAudio(audioFile, audioFile.name);
  loadAudioBlob(audioFile, audioFile.name);
  state.notes = [];
  state.songTagsDraft = [];
  state.songCaptionDraft = '';
  ui.songCaption.value = '';
  clearActiveRegion();
  renderSongTags();
  renderNotes();
  initWave();
  turnPage('notes', 'next');
}

async function openSongFromNotebook(songName) {
  try {
    let notes = [];
    let notesAudioName = '';
    let songInfo = { tags: [], caption: '' };
    const parsed = await readProjectNotesData(state.saveDirectoryHandle, songName);
    if (parsed && typeof parsed === 'object') {
      notes = Array.isArray(parsed.notes) ? parsed.notes.map(normalizeNote) : [];
      notesAudioName = typeof parsed.audio === 'string' ? parsed.audio : '';
      if (parsed.song && typeof parsed.song === 'object') {
        songInfo = {
          tags: Array.isArray(parsed.song.tags) ? parsed.song.tags.filter((v) => typeof v === 'string') : [],
          caption: typeof parsed.song.caption === 'string' ? parsed.song.caption : ''
        };
      }
    }

    const audioFiles = [];
    const { audioDir } = await getProjectSubdirs(state.saveDirectoryHandle, { create: false });
    if (audioDir) {
      for await (const entry of audioDir.values()) {
        if (entry.kind !== 'file' || !/\.(wav|mp3|m4a|ogg|flac)$/i.test(entry.name)) continue;
        audioFiles.push({ entry, parentDir: audioDir });
      }
    }

    const defaultAudioName = getProjectAudioFilename(songName);
    const preferAudioName = notesAudioName || defaultAudioName;
    const picked =
      audioFiles.find((h) => h.entry.name === preferAudioName) ||
      audioFiles.find((h) => h.entry.name.toLowerCase() === preferAudioName.toLowerCase()) ||
      audioFiles.find((h) => sanitizeFolderName(stripExtension(h.entry.name)) === sanitizeFolderName(songName)) ||
      audioFiles[0];

    if (!picked) {
      alert('目录中没有可用音频文件');
      return;
    }

    const file = await picked.entry.getFile();
    setSourceAudio(file, file.name, { parentDirHandle: picked.parentDir, fileName: picked.entry.name });
    loadAudioBlob(file, file.name);
    state.notes = notes;
    state.songTagsDraft = Array.from(new Set(songInfo.tags));
    state.songCaptionDraft = songInfo.caption || '';
    ui.songCaption.value = state.songCaptionDraft;
    clearActiveRegion();
    renderSongTags();
    renderNotes();
    initWave();
    turnPage('notes', 'next');
  } catch {
    console.error('打开歌曲失败', songName);
    alert('打开歌曲失败');
  }
}

function renderNotes() {
  ui.notesList.innerHTML = '';
  const totalDurationSec = state.notes.reduce((sum, note) => {
    const dur = Math.max(0, Number(note?.end ?? 0) - Number(note?.start ?? 0));
    return sum + (dur >= 5 ? dur : 0);
  }, 0);
  if (ui.notesDurationSummary) {
    ui.notesDurationSummary.textContent = `总时长(>=5s)：${totalDurationSec.toFixed(2)}s`;
  }
  if (!state.notes.length) {
    const li = document.createElement('li');
    li.textContent = '暂无笔记';
    ui.notesList.appendChild(li);
    renderNoteRegions();
    renderNoteMarkers();
    return;
  }

  state.notes.forEach((note, idx) => {
    const li = document.createElement('li');
    li.className = 'fragment-item';
    const tagsText = Array.isArray(note.tags) && note.tags.length ? note.tags.join(', ') : '无标签';
    const durationSec = Math.max(0, Number(note.end ?? 0) - Number(note.start ?? 0));

    const title = document.createElement('div');
    title.innerHTML = `<strong>#${idx + 1}</strong> [${note.start.toFixed(2)} - ${note.end.toFixed(2)} | ${durationSec.toFixed(2)}s] ${note.caption || ''}`;
    const meta = document.createElement('div');
    meta.className = 'hint';
    meta.textContent = tagsText;

    const actions = document.createElement('div');
    actions.className = 'fragment-actions';
    const btnLocate = document.createElement('button');
    btnLocate.type = 'button';
    btnLocate.textContent = '定位';
    const btnPlay = document.createElement('button');
    btnPlay.type = 'button';
    btnPlay.textContent = '播放';
    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.textContent = '编辑';
    const btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.textContent = '删除';
    const btnTime = document.createElement('button');
    btnTime.type = 'button';
    btnTime.textContent = '改时间';

    const locate = () => {
      if (!state.wave || !state.wave.isReady) return;
      renderActiveRegion(note.start, note.end);
      state.loopRegionPlayback = false;
      seekWaveTo(note.start);
      moveWaveViewportTo(note.start);
      if (state.wave.isPlaying()) state.wave.pause();
    };

    li.addEventListener('click', (evt) => {
      if (evt.target.closest('button')) return;
      locate();
    });
    btnLocate.addEventListener('click', (evt) => {
      evt.stopPropagation();
      locate();
    });
    btnPlay.addEventListener('click', (evt) => {
      evt.stopPropagation();
      if (!state.wave || !state.wave.isReady) return;
      renderActiveRegion(note.start, note.end);
      state.loopRegionPlayback = true;
      seekWaveTo(note.start);
      state.wave.play(note.start, note.end);
    });
    btnEdit.addEventListener('click', (evt) => {
      evt.stopPropagation();
      openEditorForNoteIndex(idx);
    });
    btnDelete.addEventListener('click', (evt) => {
      evt.stopPropagation();
      const ok = window.confirm(`确认删除片段 #${idx + 1} 吗？`);
      if (!ok) return;
      state.notes.splice(idx, 1);
      renderNotes();
    });
    btnTime.addEventListener('click', (evt) => {
      evt.stopPropagation();
      state.timingEditNoteIndex = idx;
      renderActiveRegion(note.start, note.end);
      state.loopRegionPlayback = false;
      seekWaveTo(note.start);
      moveWaveViewportTo(note.start);
      if (state.wave?.isPlaying()) state.wave.pause();
    });

    actions.appendChild(btnLocate);
    actions.appendChild(btnPlay);
    actions.appendChild(btnEdit);
    actions.appendChild(btnDelete);
    actions.appendChild(btnTime);

    li.appendChild(title);
    li.appendChild(meta);
    li.appendChild(actions);
    ui.notesList.appendChild(li);
  });

  renderNoteRegions();
  renderNoteMarkers();
}

function updateEditorSelectionFromRange(range) {
  if (!ui.editorWaveOverlay || !ui.editorWaveSelection || !state.editorWave?.isReady) return;
  if (!range) {
    ui.editorWaveSelection.style.display = 'none';
    return;
  }
  const rect = ui.editorWaveOverlay.getBoundingClientRect();
  const duration = state.editorWave.getDuration() || 0;
  if (duration <= 0 || rect.width <= 0) {
    ui.editorWaveSelection.style.display = 'none';
    return;
  }
  const startPx = (range.start / duration) * rect.width;
  const endPx = (range.end / duration) * rect.width;
  const left = Math.max(0, Math.min(startPx, endPx));
  const width = Math.max(2, Math.min(rect.width, Math.max(startPx, endPx)) - left);
  ui.editorWaveSelection.style.display = 'block';
  ui.editorWaveSelection.style.left = `${left}px`;
  ui.editorWaveSelection.style.width = `${width}px`;
}

function getEditorRangeFromSelectionElement() {
  if (!ui.editorWaveOverlay || !ui.editorWaveSelection || !state.editorWave?.isReady) return null;
  if (ui.editorWaveSelection.style.display === 'none') return null;
  const overlayRect = ui.editorWaveOverlay.getBoundingClientRect();
  const selRect = ui.editorWaveSelection.getBoundingClientRect();
  const duration = state.editorWave.getDuration() || 0;
  if (duration <= 0 || overlayRect.width <= 0) return null;
  const left = Math.max(0, selRect.left - overlayRect.left);
  const right = Math.min(overlayRect.width, selRect.right - overlayRect.left);
  const start = (left / overlayRect.width) * duration;
  const end = (right / overlayRect.width) * duration;
  const range = normalizeRegionBounds(start, end, duration);
  if (range.end - range.start < MIN_REGION_SECONDS) return null;
  return range;
}

function renderEditorAnnotationHighlights() {
  if (!ui.editorAnnotationHighlights || !ui.editorWaveOverlay || !state.editorWave?.isReady) return;
  ui.editorAnnotationHighlights.innerHTML = '';
  if (state.timingEditAnnotationIndex !== null) return;
  if (!state.pendingAnnotations.length) return;
  const rect = ui.editorWaveOverlay.getBoundingClientRect();
  const duration = state.editorWave.getDuration() || 0;
  if (duration <= 0 || rect.width <= 0) return;
  state.pendingAnnotations.forEach((item) => {
    const startPx = (item.startRel / duration) * rect.width;
    const endPx = (item.endRel / duration) * rect.width;
    const left = Math.max(0, Math.min(startPx, endPx));
    const width = Math.max(2, Math.min(rect.width, Math.max(startPx, endPx)) - left);
    const block = document.createElement('div');
    block.className = 'editor-annotation-highlight';
    block.style.left = `${left}px`;
    block.style.width = `${width}px`;
    if (item.text) {
      const label = document.createElement('div');
      label.className = 'editor-annotation-label';
      label.textContent = item.text;
      block.appendChild(label);
    }
    ui.editorAnnotationHighlights.appendChild(block);
  });
}

function setupEditorOverlay() {
  if (!ui.editorWaveOverlay || !ui.editorWaveSelection) return;
  if (ui.editorWaveOverlay.dataset.bound === '1') return;
  ui.editorWaveOverlay.dataset.bound = '1';

  let dragging = false;
  let startX = 0;
  let activeMode = '';
  let originLeft = 0;
  let originWidth = 0;
  let ignoreClickUntil = 0;

  const clearSelection = () => {
    if (ui.editorWaveSelection) ui.editorWaveSelection.style.display = 'none';
    state.editorActiveRange = null;
    state.editorActiveAnnotationIndex = null;
  };

  const applyTimingEditIfNeeded = () => {
    const idx = state.timingEditAnnotationIndex;
    if (idx === null) return;
    const range = state.editorActiveRange || getEditorRangeFromSelectionElement();
    if (!range || !state.pendingAnnotations[idx]) {
      state.timingEditAnnotationIndex = null;
      return;
    }
    const next = normalizeRegionBounds(range.start, range.end, Infinity);
    const item = state.pendingAnnotations[idx];
    item.startRel = next.start;
    item.endRel = next.end;
    const base = state.pendingNoteRange?.start || 0;
    item.startAbs = base + item.startRel;
    item.endAbs = base + item.endRel;
    state.timingEditAnnotationIndex = null;
    state.editorActiveRange = { start: next.start, end: next.end };
    updateEditorSelectionFromRange(state.editorActiveRange);
    renderAnnotationList();
    renderEditorAnnotationHighlights();
  };

  const seekEditorToClientX = (clientX) => {
    if (!state.editorWave?.isReady || !ui.editorWaveOverlay) return;
    const rect = ui.editorWaveOverlay.getBoundingClientRect();
    const duration = state.editorWave.getDuration() || 0;
    if (duration <= 0 || rect.width <= 0) return;
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    state.editorWave.seekTo(x / rect.width);
  };

  const updateSelection = (x1, x2) => {
    const rect = ui.editorWaveOverlay.getBoundingClientRect();
    const left = Math.max(0, Math.min(x1, x2) - rect.left);
    const right = Math.min(rect.width, Math.max(x1, x2) - rect.left);
    const width = Math.max(0, right - left);
    ui.editorWaveSelection.style.display = 'block';
    ui.editorWaveSelection.style.left = `${left}px`;
    ui.editorWaveSelection.style.width = `${width}px`;
    return { left, width, rectWidth: rect.width };
  };

  if (ui.editorWavePlay) {
    ui.editorWavePlay.addEventListener('click', (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      if (!state.editorWave || !state.editorWave.isReady) return;
      if (!state.editorActiveRange) return;
      state.editorWave.play(state.editorActiveRange.start, state.editorActiveRange.end);
    });
  }

  const getMinPx = () => {
    if (!state.editorWave?.isReady || !ui.editorWaveOverlay) return 6;
    const duration = state.editorWave.getDuration() || 0;
    const rect = ui.editorWaveOverlay.getBoundingClientRect();
    if (duration <= 0 || rect.width <= 0) return 6;
    return Math.max(6, (MIN_REGION_SECONDS / duration) * rect.width);
  };

  ui.editorWaveOverlay.addEventListener('pointerdown', (evt) => {
    if (evt.button !== 0) return;
    if (evt.target !== ui.editorWaveOverlay) return;
    if (state.timingEditAnnotationIndex !== null) {
      applyTimingEditIfNeeded();
      clearSelection();
      seekEditorToClientX(evt.clientX);
      return;
    }
    dragging = true;
    startX = evt.clientX;
    activeMode = 'create';
    ui.editorWaveOverlay.setPointerCapture(evt.pointerId);
    updateSelection(startX, startX + 1);
    evt.preventDefault();
  });

  ui.editorWaveOverlay.addEventListener('pointermove', (evt) => {
    if (!dragging) return;
    if (activeMode === 'create') {
      updateSelection(startX, evt.clientX);
    }
    evt.preventDefault();
  });

  const finish = (evt) => {
    if (!dragging) return;
    dragging = false;
    ui.editorWaveOverlay.releasePointerCapture(evt.pointerId);
    if (activeMode === 'create') {
      const { left, width, rectWidth } = updateSelection(startX, evt.clientX);
      if (width < getMinPx() || !state.editorWave?.isReady) {
        clearSelection();
        return;
      }
      const duration = state.editorWave.getDuration() || 0;
      const start = (left / rectWidth) * duration;
      const end = ((left + width) / rectWidth) * duration;
      const range = normalizeRegionBounds(start, end, duration);
      if (range.end - range.start < MIN_REGION_SECONDS) {
        clearSelection();
        return;
      }
      state.editorActiveRange = range;
      state.editorActiveAnnotationIndex = null;
      updateEditorSelectionFromRange(range);
      ignoreClickUntil = Date.now() + 200;
    }
    activeMode = '';
  };

  ui.editorWaveOverlay.addEventListener('pointerup', finish);
  ui.editorWaveOverlay.addEventListener('pointercancel', finish);
  ui.editorWaveOverlay.addEventListener('click', (evt) => {
    if (dragging) return;
    if (Date.now() < ignoreClickUntil) return;
    if (evt.target === ui.editorWaveOverlay) {
      applyTimingEditIfNeeded();
      clearSelection();
      seekEditorToClientX(evt.clientX);
    }
  });

  ui.editorWaveSelection.addEventListener('pointerdown', (evt) => {
    evt.stopPropagation();
    if (evt.target === ui.editorWavePlay) return;
    if (!state.editorWave?.isReady || !ui.editorWaveOverlay) return;
    const rect = ui.editorWaveOverlay.getBoundingClientRect();
    const sel = ui.editorWaveSelection.getBoundingClientRect();
    const withinLeft = Math.abs(evt.clientX - sel.left) <= 6;
    const withinRight = Math.abs(evt.clientX - sel.right) <= 6;
    originLeft = sel.left - rect.left;
    originWidth = sel.width;
    if (withinLeft) {
      activeMode = 'resize-left';
      ui.editorWaveSelection.style.cursor = 'ew-resize';
    } else if (withinRight) {
      activeMode = 'resize-right';
      ui.editorWaveSelection.style.cursor = 'ew-resize';
    } else {
      activeMode = 'move';
      ui.editorWaveSelection.style.cursor = 'grabbing';
    }
    dragging = true;
    startX = evt.clientX;
    ui.editorWaveSelection.setPointerCapture(evt.pointerId);
    evt.preventDefault();
  });
  ui.editorWaveSelection.addEventListener('pointermove', (evt) => {
    if (!ui.editorWaveOverlay) return;
    const rect = ui.editorWaveOverlay.getBoundingClientRect();
    const dx = evt.clientX - startX;
    const minPx = getMinPx();
    if (dragging && activeMode === 'move') {
      const left = Math.max(0, Math.min(rect.width - originWidth, originLeft + dx));
      ui.editorWaveSelection.style.left = `${left}px`;
    } else if (dragging && activeMode === 'resize-left') {
      const newLeft = Math.max(0, Math.min(originLeft + dx, originLeft + originWidth - minPx));
      const newWidth = Math.max(minPx, originWidth + (originLeft - newLeft));
      ui.editorWaveSelection.style.left = `${newLeft}px`;
      ui.editorWaveSelection.style.width = `${newWidth}px`;
    } else if (dragging && activeMode === 'resize-right') {
      const newWidth = Math.max(minPx, Math.min(rect.width - originLeft, originWidth + dx));
      ui.editorWaveSelection.style.width = `${newWidth}px`;
    } else {
      const sel = ui.editorWaveSelection.getBoundingClientRect();
      const withinLeft = Math.abs(evt.clientX - sel.left) <= 6;
      const withinRight = Math.abs(evt.clientX - sel.right) <= 6;
      ui.editorWaveSelection.style.cursor = withinLeft || withinRight ? 'ew-resize' : 'grab';
    }
    evt.preventDefault();
  });
  ui.editorWaveSelection.addEventListener('pointerup', (evt) => {
    if (!dragging || !ui.editorWaveOverlay) return;
    dragging = false;
    ui.editorWaveSelection.releasePointerCapture(evt.pointerId);
    ui.editorWaveSelection.style.cursor = 'grab';
    const rect = ui.editorWaveOverlay.getBoundingClientRect();
    const sel = ui.editorWaveSelection.getBoundingClientRect();
    const left = sel.left - rect.left;
    const width = sel.width;
    const duration = state.editorWave.getDuration() || 0;
    const start = (left / rect.width) * duration;
    const end = ((left + width) / rect.width) * duration;
    const range = normalizeRegionBounds(start, end, duration);
    state.editorActiveRange = range;
    activeMode = '';
    ignoreClickUntil = Date.now() + 200;
  });
  ui.editorWaveSelection.addEventListener('click', (evt) => {
    if (evt.target === ui.editorWavePlay) return;
    evt.stopPropagation();
    seekEditorToClientX(evt.clientX);
  });
}

function renderAnnotationList() {
  if (!ui.annotationList) return;
  ui.annotationList.innerHTML = '';
  if (!state.pendingAnnotations.length) return;
  state.pendingAnnotations.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'annotation-item';
    if (state.editorActiveAnnotationIndex === idx) row.classList.add('active');
    const time = document.createElement('span');
    time.className = 'mono';
    time.textContent = `${formatSec(item.startRel)} - ${formatSec(item.endRel)}`;
    const actions = document.createElement('div');
    actions.className = 'annotation-actions';
    const btnLocate = document.createElement('button');
    btnLocate.type = 'button';
    btnLocate.className = 'ghost';
    btnLocate.textContent = '定位';
    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.className = 'ghost';
    btnEdit.textContent = '编辑';
    const btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.className = 'ghost';
    btnDelete.textContent = '删除';
    const btnTime = document.createElement('button');
    btnTime.type = 'button';
    btnTime.className = 'ghost';
    btnTime.textContent = '改时间';
    actions.appendChild(btnLocate);
    actions.appendChild(btnEdit);
    actions.appendChild(btnDelete);
    actions.appendChild(btnTime);

    const selectRange = () => {
      state.editorActiveAnnotationIndex = idx;
      state.editorActiveRange = { start: item.startRel, end: item.endRel };
      updateEditorSelectionFromRange(state.editorActiveRange);
      renderAnnotationList();
    };
    btnLocate.addEventListener('click', (evt) => {
      evt.stopPropagation();
      selectRange();
    });
    btnEdit.addEventListener('click', (evt) => {
      evt.stopPropagation();
      selectRange();
      state.editingAnnotationIndex = idx;
      renderAnnotationList();
    });
    btnDelete.addEventListener('click', (evt) => {
      evt.stopPropagation();
      state.pendingAnnotations.splice(idx, 1);
      if (state.editorActiveAnnotationIndex === idx) {
        state.editorActiveAnnotationIndex = null;
        state.editorActiveRange = null;
        if (ui.editorWaveSelection) ui.editorWaveSelection.style.display = 'none';
      }
      renderAnnotationList();
      renderEditorAnnotationHighlights();
    });
    btnTime.addEventListener('click', (evt) => {
      evt.stopPropagation();
      if (state.timingEditAnnotationIndex !== idx) {
        state.timingEditAnnotationIndex = null;
      }
      state.timingEditAnnotationIndex = idx;
      state.editorActiveAnnotationIndex = idx;
      state.editorActiveRange = { start: item.startRel, end: item.endRel };
      updateEditorSelectionFromRange(state.editorActiveRange);
      renderEditorAnnotationHighlights();
      renderAnnotationList();
    });
    row.addEventListener('click', (evt) => {
      if (evt.target.closest('button') || evt.target.closest('input')) return;
      state.editorActiveAnnotationIndex = idx;
      state.editorActiveRange = { start: item.startRel, end: item.endRel };
      updateEditorSelectionFromRange(state.editorActiveRange);
      renderAnnotationList();
    });
    row.appendChild(time);
    row.appendChild(actions);
    ui.annotationList.appendChild(row);

    if (item.text) {
      const textRow = document.createElement('div');
      textRow.className = 'annotation-text';
      textRow.textContent = item.text;
      ui.annotationList.appendChild(textRow);
    }

    if (state.editingAnnotationIndex === idx) {
      const editRow = document.createElement('div');
      editRow.className = 'annotation-edit';
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = '标记说明';
      input.value = item.text || '';
      input.addEventListener('input', () => {
        item.text = input.value;
      });
      input.addEventListener('blur', () => {
        state.editingAnnotationIndex = null;
        renderAnnotationList();
      });
      editRow.appendChild(input);
      ui.annotationList.appendChild(editRow);
      setTimeout(() => {
        input.focus();
        input.select();
      }, 0);
    }
  });
  renderEditorAnnotationHighlights();
}

function addEditorAnnotation() {
  if (!state.editorWave || !state.editorWave.isReady) return;
  if (!state.pendingNoteRange) {
    alert('请先选择便签片段');
    return;
  }
  if (!state.editorActiveRange) {
    alert('请先在便签波形中框选一个标注范围');
    return;
  }
  const localRange = state.editorActiveRange;
  state.pendingAnnotations.push({
    startRel: localRange.start,
    endRel: localRange.end,
    startAbs: (state.pendingNoteRange?.start || 0) + localRange.start,
    endAbs: (state.pendingNoteRange?.start || 0) + localRange.end,
    text: ''
  });
  state.editorActiveAnnotationIndex = state.pendingAnnotations.length - 1;
  state.editorActiveRange = { start: localRange.start, end: localRange.end };
  updateEditorSelectionFromRange(state.editorActiveRange);
  renderAnnotationList();
  renderEditorAnnotationHighlights();
}

function renderSelectedTags() {
  ui.selectedTags.innerHTML = '';
  state.selectedTagsDraft.forEach((tag) => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.textContent = tag;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'x';
    remove.onclick = () => {
      state.selectedTagsDraft = state.selectedTagsDraft.filter((t) => t !== tag);
      renderSelectedTags();
    };
    pill.appendChild(remove);
    ui.selectedTags.appendChild(pill);
  });
}

function renderSongTags() {
  ui.songTags.innerHTML = '';
  state.songTagsDraft.forEach((tag) => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.textContent = tag;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'x';
    remove.onclick = () => {
      state.songTagsDraft = state.songTagsDraft.filter((t) => t !== tag);
      renderSongTags();
    };
    pill.appendChild(remove);
    ui.songTags.appendChild(pill);
  });
}

function closeTagPicker() {
  ui.tagPickerModal.classList.remove('open');
}

function openTagPicker(target) {
  state.tagPickerTarget = target;
  ui.tagPickerList.innerHTML = '';
  TAG_OPTIONS.forEach((t) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ghost';
    btn.textContent = `${t.label} (${t.value})`;
    btn.addEventListener('click', () => {
      if (state.tagPickerTarget === 'song') {
        if (!state.songTagsDraft.includes(t.value)) state.songTagsDraft.push(t.value);
        renderSongTags();
      } else {
        if (!state.selectedTagsDraft.includes(t.value)) state.selectedTagsDraft.push(t.value);
        renderSelectedTags();
      }
      closeTagPicker();
    });
    ui.tagPickerList.appendChild(btn);
  });
  ui.tagPickerModal.classList.add('open');
}

function openEditorWithCurrentRegion() {
  if (!state.activeRegion) {
    alert('请现在波形中框选一个片段');
    return;
  }
  state.editingNoteIndex = null;
  state.pendingNoteRange = {
    ...normalizeRegionBounds(
      Number(state.activeRegion.start),
      Number(state.activeRegion.end),
      state.wave?.getDuration() || Infinity
    )
  };
  ui.caption.value = '';
  state.selectedTagsDraft = [];
  state.pendingAnnotations = [];
  state.pendingAnalysisNotes = [];
  state.pendingAnalysisTracks = [];
  state.pendingAnalysisMetronome = {
    bpm: 120,
    signature: '4/4',
    offset: 0,
    gridDivision: '16',
    muted: false,
    solo: false
  };
  state.editorActiveAnnotationIndex = null;
  state.editingAnnotationIndex = null;
  state.timingEditAnnotationIndex = null;
  renderSelectedTags();
  if (ui.editorWaveSelection) ui.editorWaveSelection.style.display = 'none';
  renderEditorAnnotationHighlights();
  renderAnnotationList();
  loadEditorPreviewSegment(state.pendingNoteRange.start, state.pendingNoteRange.end);
  showPage('editor', 'editor-grow');
}

function openEditorForNoteIndex(index) {
  const note = state.notes[index];
  if (!note) return;
  state.editingNoteIndex = index;
  state.pendingNoteRange = { start: note.start, end: note.end };
  ui.caption.value = note.caption || '';
  state.selectedTagsDraft = Array.isArray(note.tags) ? Array.from(note.tags) : [];
  state.pendingAnnotations = Array.isArray(note.annotations)
    ? note.annotations.map((item) => ({
        startRel: item.startRel ?? (item.startAbs ?? 0) - note.start,
        endRel: item.endRel ?? (item.endAbs ?? 0) - note.start,
        startAbs: item.startAbs ?? note.start + (item.startRel ?? 0),
        endAbs: item.endAbs ?? note.start + (item.endRel ?? 0),
        text: item.text || ''
      }))
    : [];
  state.pendingAnalysisTracks = Array.isArray(note.analysisTracks)
    ? note.analysisTracks.map((track) => ({
        name: track?.name ?? '',
        type: track?.type === 'transient' ? 'transient' : 'pitch',
        notes: Array.isArray(track?.notes) ? track.notes.map((item) => ({
          startRel: item.startRel ?? 0,
          endRel: item.endRel ?? 0,
          midi: item.midi ?? 60,
          velocity: item.velocity ?? 0.7
        })) : []
      }))
    : [];
  state.pendingAnalysisMetronome = {
    bpm: Math.round(Math.max(1, Math.min(400, Number(note?.analysisMetronome?.bpm ?? 120) || 120)) * 100) / 100,
    signature: typeof note?.analysisMetronome?.signature === 'string' ? note.analysisMetronome.signature : '4/4',
    offset: Number(note?.analysisMetronome?.offset ?? 0) || 0,
    gridDivision: typeof note?.analysisMetronome?.gridDivision === 'string' ? note.analysisMetronome.gridDivision : '16',
    muted: !!note?.analysisMetronome?.muted,
    solo: !!note?.analysisMetronome?.solo
  };
  state.editorActiveAnnotationIndex = null;
  state.editingAnnotationIndex = null;
  state.timingEditAnnotationIndex = null;
  renderSelectedTags();
  if (ui.editorWaveSelection) ui.editorWaveSelection.style.display = 'none';
  renderEditorAnnotationHighlights();
  renderAnnotationList();
  loadEditorPreviewSegment(note.start, note.end);
  showPage('editor', 'editor-grow');
}

function saveNoteEntry(nextPage = 'notes') {
  if (!state.pendingNoteRange) {
    alert('请先创建便签并编辑内容');
    return;
  }

  const next = {
    start: state.pendingNoteRange.start,
    end: state.pendingNoteRange.end,
    tags: Array.from(state.selectedTagsDraft),
    caption: ui.caption.value.trim(),
    annotations: Array.isArray(state.pendingAnnotations)
      ? state.pendingAnnotations.map((item) => ({
          startRel: item.startRel,
          endRel: item.endRel,
          startAbs: state.pendingNoteRange.start + item.startRel,
          endAbs: state.pendingNoteRange.start + item.endRel,
          text: item.text || ''
        }))
      : [],
    analysisTracks: Array.isArray(state.pendingAnalysisTracks)
      ? state.pendingAnalysisTracks.map((track) => ({
          name: track?.name ?? '',
          type: track?.type === 'transient' ? 'transient' : 'pitch',
          notes: Array.isArray(track?.notes) ? track.notes.map((item) => ({
            startRel: item.startRel ?? 0,
            endRel: item.endRel ?? 0,
            midi: item.midi ?? 60,
            velocity: item.velocity ?? 0.7
          })) : []
        }))
      : [],
    analysisMetronome: {
      bpm: Math.round(Math.max(1, Math.min(400, Number(state.pendingAnalysisMetronome?.bpm ?? 120) || 120)) * 100) / 100,
      signature: typeof state.pendingAnalysisMetronome?.signature === 'string' ? state.pendingAnalysisMetronome.signature : '4/4',
      offset: Number(state.pendingAnalysisMetronome?.offset ?? 0) || 0,
      gridDivision: typeof state.pendingAnalysisMetronome?.gridDivision === 'string' ? state.pendingAnalysisMetronome.gridDivision : '16',
      muted: !!state.pendingAnalysisMetronome?.muted,
      solo: !!state.pendingAnalysisMetronome?.solo
    }
  };

  if (state.editingNoteIndex !== null && state.notes[state.editingNoteIndex]) {
    state.notes[state.editingNoteIndex] = next;
  } else {
    state.notes.push(next);
  }

  state.pendingNoteRange = null;
  state.selectedTagsDraft = [];
  state.pendingAnnotations = [];
  state.pendingAnalysisNotes = [];
  state.pendingAnalysisTracks = [];
  state.pendingAnalysisMetronome = null;
  state.editorActiveAnnotationIndex = null;
  state.timingEditAnnotationIndex = null;
  state.editingAnnotationIndex = null;
  state.editingNoteIndex = null;
  ui.caption.value = '';
  if (ui.editorWaveSelection) ui.editorWaveSelection.style.display = 'none';
  renderEditorAnnotationHighlights();
  renderAnnotationList();
  renderSelectedTags();
  renderNotes();
  if (nextPage === 'toc') {
    turnPage('toc', 'prev');
  } else if (nextPage === 'notes') {
    turnPage('notes', 'prev');
  } else {
    showPage(nextPage);
  }
}

async function ensureWaveReady() {
  if (!state.wave || !state.wave.isReady) {
    alert('请先导入或录制音频');
    return false;
  }
  const ac = state.wave.backend?.ac;
  if (ac && ac.state === 'suspended') {
    try {
      await ac.resume();
    } catch {
      // ignore and continue
    }
  }
  return true;
}

async function toggleWavePlayback() {
  const ready = await ensureWaveReady();
  if (!ready) return;

  if (state.wave.isPlaying()) {
    state.loopRegionPlayback = false;
    state.wave.pause();
    return;
  }

  state.loopRegionPlayback = false;
  await state.wave.play();
}

ui.settingsBtn.addEventListener('click', (evt) => {
  evt.stopPropagation();
  ui.settingsPanel.classList.toggle('open');
});
if (ui.startGuideInSettings) {
  ui.startGuideInSettings.addEventListener('click', () => {
    ui.settingsPanel.classList.remove('open');
    startBeginnerGuide();
  });
}
ui.changeSaveDir.addEventListener('click', async () => {
  const ok = await pickSaveDirectory();
  if (ok) refreshTocList();
  ui.settingsPanel.classList.remove('open');
});
ui.openNotebookBook.addEventListener('click', async () => {
  if (!state.saveDirectoryHandle) {
    const wantSet = window.confirm('建议先设置笔记保存目录（music_note）。是否现在设置？');
    if (wantSet) {
      const ok = await pickSaveDirectory();
      if (!ok) return;
    }
  }
  await refreshTocList();
  turnPage('toc', 'next');
});
ui.createPlaylist.addEventListener('click', createPlaylistFromPrompt);
ui.importPlaylistFolder.addEventListener('click', importPlaylistFolder);
ui.createNewMusic.addEventListener('click', () => {
  resetNotebookState();
  turnPage('notes', 'next');
  initWave();
});
ui.backToTocFromNotes.addEventListener('click', async () => {
  await autoSaveProjectSilently();
  await refreshTocList();
  turnPage('toc', 'prev');
});
ui.inlineImportAudio.addEventListener('click', () => ui.projectFilesInput.click());
ui.projectFilesInput.addEventListener('change', () => {
  const files = Array.from(ui.projectFilesInput.files || []);
  importProjectFiles(files);
  ui.projectFilesInput.value = '';
});

document.addEventListener('click', (evt) => {
  if (!ui.settingsPanel.classList.contains('open')) return;
  if (evt.target === ui.settingsBtn || ui.settingsPanel.contains(evt.target)) return;
  ui.settingsPanel.classList.remove('open');
});

Array.from(document.querySelectorAll('[data-back-home]')).forEach((btn) => {
  btn.addEventListener('click', () => turnPage('toc', 'prev'));
});

ui.startRecord.addEventListener('click', startRecording);
ui.stopRecord.addEventListener('click', stopRecording);
ui.toNotesAfterRecord.addEventListener('click', () => {
  turnPage('notes', 'next');
  initWave();
});

ui.trimPlayPause.addEventListener('click', () => {
  if (!state.trimWave) return;
  state.trimWave.playPause();
});
ui.toggleTrimCreateRegion.addEventListener('click', () => {
  state.trimCreateMode = !state.trimCreateMode;
  if (!state.trimCreateMode) state.pendingTrimStart = null;
  setModeButton(ui.toggleTrimCreateRegion, '创建裁剪区', state.trimCreateMode);
});
ui.clearTrimRegion.addEventListener('click', clearTrimRegion);
ui.applyTrim.addEventListener('click', applyTrimFlow);
ui.skipTrim.addEventListener('click', () => {
  turnPage('notes', 'next');
  initWave();
});
ui.wavePlayKey.addEventListener('click', () => toggleWavePlayback());
ui.waveLeftKey.addEventListener('click', () => panWaveBy(-2.5));
ui.waveRightKey.addEventListener('click', () => panWaveBy(2.5));
ui.waveZoomInKey.addEventListener('click', () => applyWaveZoom(state.zoomPxPerSec + 24));
ui.waveZoomOutKey.addEventListener('click', () => applyWaveZoom(state.zoomPxPerSec - 24));
ui.trimGain.addEventListener('input', () => {
  ui.trimGainInfo.textContent = `当前增益：${Number(ui.trimGain.value).toFixed(2)}x`;
});

ui.createNoteFromRegion.addEventListener('click', openEditorWithCurrentRegion);
if (ui.addEditorAnnotation) {
if (ui.addEditorAnnotation) {
  ui.addEditorAnnotation.addEventListener('click', addEditorAnnotation);
}
}
ui.backToWave.addEventListener('click', () => {
  if (state.pendingNoteRange) {
    saveNoteEntry();
    return;
  }
  turnPage('notes', 'prev');
});
ui.addTagToNote.addEventListener('click', () => openTagPicker('note'));
ui.addSongTag.addEventListener('click', () => openTagPicker('song'));
ui.closeTagPicker.addEventListener('click', closeTagPicker);
ui.tagPickerModal.addEventListener('click', (evt) => {
  if (evt.target === ui.tagPickerModal) closeTagPicker();
});
if (ui.guideClose) {
  ui.guideClose.addEventListener('click', closeBeginnerGuide);
}
window.addEventListener('resize', () => {
  if (!state.guideActive) return;
  requestAnimationFrame(renderBeginnerGuideStep);
});
if (ui.importPlaylistFolder) {
  ui.importPlaylistFolder.addEventListener('click', () => tryAdvanceBeginnerGuide('guide-import-playlist-click'));
}
if (ui.createNewMusic) {
  ui.createNewMusic.addEventListener('click', () => tryAdvanceBeginnerGuide('guide-create-music-click'));
}
if (ui.createNoteFromRegion) {
  ui.createNoteFromRegion.addEventListener('click', () => {
    const start = Number(state.activeRegion?.start ?? state.pendingNoteRange?.start ?? 0);
    const end = Number(state.activeRegion?.end ?? state.pendingNoteRange?.end ?? start);
    const dur = Math.max(0, end - start);
    if (dur >= 5) {
      tryAdvanceBeginnerGuide('guide-create-segment-at-least-5s');
    } else if (state.guideActive) {
      const step = BEGINNER_GUIDE_STEPS[state.guideStepIndex];
      if (step?.event === 'guide-create-segment-at-least-5s') {
        ui.guideBody.textContent = '当前片段小于 5 秒，请重新框选更长片段后再点“+”。';
      }
    }
  });
}
if (ui.goAnalysis) {
  ui.goAnalysis.addEventListener('click', () => tryAdvanceBeginnerGuide('guide-enter-analysis-click'));
}
document.addEventListener('pointerdown', (evt) => {
  if (!state.guideActive) return;
  const step = BEGINNER_GUIDE_STEPS[state.guideStepIndex];
  if (!step) return;
  const t = evt.target;
  if (step.event === 'guide-analysis-toolbar-interact' && t.closest?.('.analysis-toolbar')) {
    tryAdvanceBeginnerGuide('guide-analysis-toolbar-interact');
  } else if (step.event === 'guide-analysis-metronome-interact' && t.closest?.('.analysis-metronome-panel')) {
    tryAdvanceBeginnerGuide('guide-analysis-metronome-interact');
  } else if (step.event === 'guide-analysis-tracklist-interact' && t.closest?.('#analysisTrackList')) {
    tryAdvanceBeginnerGuide('guide-analysis-tracklist-interact');
  }
}, true);
document.addEventListener('guide-action', (evt) => {
  const type = evt?.detail?.type;
  if (type === 'analysis-note-created') {
    tryAdvanceBeginnerGuide('guide-analysis-note-created');
  } else if (type === 'analysis-note-edited') {
    tryAdvanceBeginnerGuide('guide-analysis-note-edited');
  }
});
ui.songCaption.addEventListener('input', () => {
  state.songCaptionDraft = ui.songCaption.value;
});
ui.menuPlayNote.addEventListener('click', () => {
  if (state.menuNoteIndex !== null) {
    const note = state.notes[state.menuNoteIndex];
    if (note) {
      renderActiveRegion(note.start, note.end);
      state.loopRegionPlayback = true;
      seekWaveTo(note.start);
      state.wave.play(note.start, note.end);
    }
  }
  hideContextMenu();
});
ui.menuEditNote.addEventListener('click', () => {
  if (state.menuNoteIndex !== null) openEditorForNoteIndex(state.menuNoteIndex);
  hideContextMenu();
});
ui.menuDeleteNote.addEventListener('click', () => {
  if (state.menuNoteIndex !== null) {
    const ok = window.confirm(`确认删除片段 #${state.menuNoteIndex + 1} 吗？`);
    if (ok) {
      state.notes.splice(state.menuNoteIndex, 1);
      renderNotes();
    }
  }
  hideContextMenu();
});
ui.tocMenuOpen.addEventListener('click', async () => {
  const t = state.menuTocTarget;
  if (!t) return;
  if (t.type === 'playlist') {
    state.selectedPlaylist = t.name;
    await refreshTocList();
  } else if (t.type === 'song' && state.saveDirectoryHandle) {
    await openSongFromNotebook(t.name);
  }
  hideContextMenu();
});
ui.tocMenuRename.addEventListener('click', async () => {
  const t = state.menuTocTarget;
  if (!t) return;
  if (t.type === 'playlist') await renamePlaylist(t.name);
  if (t.type === 'song') await renameSongFolder(t.name);
  hideContextMenu();
});
ui.tocMenuDelete.addEventListener('click', async () => {
  const t = state.menuTocTarget;
  if (!t) return;
  if (t.type === 'playlist') await deletePlaylist(t.name);
  if (t.type === 'song') await deleteSongFromCurrentPlaylist(t.name);
  hideContextMenu();
});
document.addEventListener('click', () => hideContextMenu());

window.addEventListener('keydown', (event) => {
  if (event.code !== 'Space' && event.key !== ' ') return;
  const tag = event.target?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

  if (pages.trim.classList.contains('active') && state.trimWave) {
    event.preventDefault();
    state.trimWave.playPause();
    return;
  }

  if (pages.editor.classList.contains('active') && state.editorWave) {
    event.preventDefault();
    state.editorWave.playPause();
    return;
  }

  if (!pages.notes.classList.contains('active') || !state.wave) return;
  event.preventDefault();
  toggleWavePlayback();
});

setModeButton(ui.toggleTrimCreateRegion, '创建裁剪区', false);
ui.trimGainInfo.textContent = `当前增益：${Number(ui.trimGain.value).toFixed(2)}x`;
setDefaultPathHint();
updateSavePathInfo();
renderSelectedTags();
renderSongTags();
renderNotes();
