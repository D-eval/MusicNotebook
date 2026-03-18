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
  analysisPlayback: document.getElementById('analysisPlayback'),
  analysisTimeZoomOut: document.getElementById('analysisTimeZoomOut'),
  analysisTimeZoomIn: document.getElementById('analysisTimeZoomIn'),
  analysisFreqZoomOut: document.getElementById('analysisFreqZoomOut'),
  analysisFreqZoomIn: document.getElementById('analysisFreqZoomIn'),
  analysisSaveNotes: document.getElementById('analysisSaveNotes'),
  analysisExportMidi: document.getElementById('analysisExportMidi'),
  analysisToolSelect: document.getElementById('analysisToolSelect'),
  analysisTrackList: document.getElementById('analysisTrackList'),
  analysisAddTrack: document.getElementById('analysisAddTrack'),
  annotationList: document.getElementById('annotationList'),
  editorWaveOverlay: document.getElementById('editorWaveOverlay'),
  editorAnnotationHighlights: document.getElementById('editorAnnotationHighlights'),
  editorWaveSelection: document.getElementById('editorWaveSelection'),
  editorWavePlay: document.getElementById('editorWavePlay'),
  caption: document.getElementById('caption'),
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
  analysisTracks: [],
  analysisActiveTrackId: null,
  analysisTargetIndex: null,
  pendingAnalysisNotes: [],
  pendingAnalysisTracks: [],
  analysisDrag: null,
  analysisAudio: null,
  analysisAudioUrl: null,
  analysisSpecData: null,
  analysisWaveData: null,
  analysisSynth: null,
  analysisSynthStart: 0,
  analysisSynthPlaying: false,
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
const MAX_ZOOM_PX_PER_SEC = 2000;

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
                  const midi = clamp(Number(item?.midi ?? 60), 24, 107);
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
            const midi = clamp(Number(item?.midi ?? 60), 24, 107);
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
  return {
    start,
    end,
    tags: Array.from(new Set(tags)),
    caption: typeof note.caption === 'string' ? note.caption : '',
    annotations,
    analysisTracks
  };
}

async function pickSaveDirectory() {
  if (!window.showDirectoryPicker) {
    alert('当前浏览器不支持目录选择。');
    return false;
  }
  try {
    const baseHandle = await window.showDirectoryPicker({ startIn: 'documents' });
    state.saveDirectoryHandle = await baseHandle.getDirectoryHandle('music_note', { create: true });
    updateSavePathInfo();
    return true;
  } catch {
    return false;
  }
}

async function ensureNotebookDirectory() {
  if (state.saveDirectoryHandle) return true;
  return false;
}

function isAudioFileName(name) {
  return /\.(wav|mp3|m4a|ogg|flac)$/i.test(name || '');
}

async function listSongDirectories() {
  if (!state.saveDirectoryHandle) return [];
  const dirs = [];
  for await (const entry of state.saveDirectoryHandle.values()) {
    if (entry.kind !== 'directory') continue;
    let hasAudio = false;
    for await (const child of entry.values()) {
      if (child.kind === 'file' && isAudioFileName(child.name)) {
        hasAudio = true;
        break;
      }
    }
    if (hasAudio) dirs.push(entry.name);
  }
  dirs.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
  return dirs;
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

async function readSongCommentLength(songFolderName) {
  if (!state.saveDirectoryHandle) return 0;
  try {
    const dirHandle = await state.saveDirectoryHandle.getDirectoryHandle(songFolderName);
    const notesHandle = await dirHandle.getFileHandle('notes.json');
    const parsed = JSON.parse(await (await notesHandle.getFile()).text());
    const songText = typeof parsed?.song?.caption === 'string' ? parsed.song.caption : '';
    const noteTextLen = Array.isArray(parsed?.notes)
      ? parsed.notes.reduce((sum, n) => sum + (typeof n?.caption === 'string' ? n.caption.length : 0), 0)
      : 0;
    return songText.length + noteTextLen;
  } catch {
    return 0;
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
  try {
    await state.saveDirectoryHandle.getDirectoryHandle(next);
    alert('同名歌曲已存在');
    return;
  } catch {}

  try {
    const oldDir = await state.saveDirectoryHandle.getDirectoryHandle(songName);
    const newDir = await state.saveDirectoryHandle.getDirectoryHandle(next, { create: true });
    for await (const entry of oldDir.values()) {
      if (entry.kind !== 'file') continue;
      const src = await entry.getFile();
      await writeBlobToDirectory(src, entry.name, newDir);
    }
    await state.saveDirectoryHandle.removeEntry(songName, { recursive: true });
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

async function refreshTocList() {
  ui.playlistList.innerHTML = '';
  ui.songList.innerHTML = '';
  if (!state.saveDirectoryHandle) {
    const li = document.createElement('li');
    li.textContent = '请在右上角设置保存目录';
    ui.playlistList.appendChild(li);
    ui.songListTitle.textContent = '目录';
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

  state.playlists.forEach((playlist) => {
    const li = document.createElement('li');
    const row = document.createElement('div');
    row.className = 'toc-row';
    const openBtn = document.createElement('button');
    openBtn.type = 'button';
    openBtn.className = 'toc-item name-btn';
    openBtn.textContent = `${playlist.name} (${playlist.songs.length})`;
    openBtn.addEventListener('click', async () => {
      state.selectedPlaylist = playlist.name;
      await refreshTocList();
    });
    row.addEventListener('contextmenu', (evt) => openTocMenu(evt, 'playlist', playlist.name));
    row.appendChild(openBtn);
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
    const commentLen = await readSongCommentLength(songName);
    openBtn.textContent = songName;
    const meta = document.createElement('span');
    meta.className = 'toc-meta';
    meta.textContent = `${commentLen}字`;
    openBtn.addEventListener('click', async () => {
      const dirHandle = await state.saveDirectoryHandle.getDirectoryHandle(songName);
      await openNotesFromDirectoryHandle(dirHandle);
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
  for await (const entry of importDir.values()) {
    if (entry.kind !== 'file' || !isAudioFileName(entry.name)) continue;
    const audioFile = await entry.getFile();
    const base = sanitizeFolderName(stripExtension(entry.name));
    let folder = base;
    let n = 2;
    while (true) {
      try {
        await state.saveDirectoryHandle.getDirectoryHandle(folder);
        folder = `${base}_${n++}`;
      } catch {
        break;
      }
    }
    const songDir = await state.saveDirectoryHandle.getDirectoryHandle(folder, { create: true });
    await writeBlobToDirectory(audioFile, entry.name, songDir);
    await saveTextFileToDirectory(
      'notes.json',
      JSON.stringify(
        {
          audio: entry.name,
          song: { tags: [], caption: '' },
          notes: []
        },
        null,
        2
      ),
      songDir
    );
    if (!playlist.songs.includes(folder)) playlist.songs.push(folder);
  }
  state.selectedPlaylist = playlist.name;
  await savePlaylists();
  await refreshTocList();
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

function getRenderableTracks() {
  const solos = state.analysisTracks.filter((t) => t.solo);
  const base = solos.length ? solos : state.analysisTracks;
  return base.filter((t) => !t.muted);
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
        midi: clamp(Number(item?.midi ?? 60), 24, 107),
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
  const min = clamp(Math.round(minMidi), 24, 107);
  const max = clamp(Math.round(maxMidi), min + 1, 107);
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
  const tracks = state.analysisTracks.length ? state.analysisTracks : [];
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

function ensureAnalysisAudio() {
  if (state.analysisAudio) return;
  const audio = new Audio();
  state.analysisAudio = audio;
  audio.addEventListener('timeupdate', () => {
    if (state.analysisAudio !== audio) return;
    updateAnalysisTimeUI();
    drawAnalysisNotes();
    if (audio.currentTime >= state.analysisRange.end) {
      audio.pause();
      audio.currentTime = state.analysisRange.end;
      if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
    }
  });
  audio.addEventListener('ended', () => {
    if (state.analysisAudio !== audio) return;
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
      const midi = clamp(Math.round(note.midi), 24, 107);
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

    item.appendChild(selectBtn);
    item.appendChild(nameInput);
    item.appendChild(typeSelect);
    item.appendChild(muteBtn);
    item.appendChild(soloBtn);
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
}

function playAnalysisNotes() {
  stopAnalysisSynth();
  const tracks = getRenderableTracks();
  if (!tracks.length) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscList = [];
  const now = ctx.currentTime;
  const rangeStart = state.analysisRange.start;
  const rangeEnd = state.analysisRange.end;
  const duration = Math.max(0.01, rangeEnd - rangeStart);
  state.analysisSynthStart = performance.now() / 1000;
  state.analysisSynthPlaying = true;
  tracks.forEach((track) => {
    track.notes.forEach((note) => {
      const start = note.start - rangeStart;
      const end = note.end - rangeStart;
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
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + Math.max(0, start));
        osc.stop(now + Math.max(0, start) + dur + 0.02);
      } else {
        osc.frequency.value = freq;
        gain.gain.value = 0.15 * vel;
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + Math.max(0, start));
        osc.stop(now + Math.max(start + 0.01, end));
      }
      oscList.push(osc);
    });
  });
  state.analysisSynth = { ctx, oscList };
  const endAt = now + duration + 0.05;
  const tick = () => {
    if (!state.analysisSynthPlaying) return;
    const elapsed = ctx.currentTime - now;
    if (state.analysisAudio) {
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
  const source = ui.analysisPlayback?.value || 'audio';
  if (source === 'notes') {
    if (state.analysisSynthPlaying) {
      stopAnalysisSynth();
      if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
    } else {
      playAnalysisNotes();
      if (ui.analysisPlay) ui.analysisPlay.textContent = '暂停';
    }
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

function playNotePreview(midi, velocity = 0.7, type = 'pitch') {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const freq = 440 * Math.pow(2, (midi - 69) / 12);
  osc.type = 'sine';
  if (type === 'transient') {
    osc.frequency.setValueAtTime(freq * 2, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.3), ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.18 * clamp(velocity, 0, 1), ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
  } else {
    osc.frequency.value = freq;
    gain.gain.value = 0.12 * clamp(velocity, 0, 1);
  }
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.12);
  osc.onended = () => ctx.close();
}

function drawAnalysisSpectrogram() {
  if (!ui.analysisSpec || !state.analysisSpecData) return;
  const { matrix, frames, bins } = state.analysisSpecData;
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
    const frameTime = state.analysisRange.start + (f / frames) * rangeDur;
    if (frameTime < viewStart || frameTime > viewEnd) continue;
    const frameTimeNext = state.analysisRange.start + ((f + 1) / frames) * rangeDur;
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

  const targetRate = 11025;
  const samples = downsampleLinear(mono, sr, targetRate);
  state.analysisWaveData = { samples: mono, sampleRate: sr, offset: range.start };

  const windowSize = 2048;
  const hop = 512;
  const frames = Math.max(1, Math.floor((samples.length - windowSize) / hop));
  const freqs = buildMidiFreqs();
  const bins = freqs.length;
  const matrix = Array.from({ length: frames }, () => new Float32Array(bins));

  for (let f = 0; f < frames; f += 1) {
    const offset = f * hop;
    const frame = samples.slice(offset, offset + windowSize);
    let maxVal = 0;
    for (let b = 0; b < bins; b += 1) {
      const freq = freqs[b].freq;
      const val = goertzel(frame, freq, targetRate);
      matrix[f][b] = val;
      if (val > maxVal) maxVal = val;
    }
    if (maxVal > 0) {
      for (let b = 0; b < bins; b += 1) {
        matrix[f][b] = matrix[f][b] / maxVal;
      }
    }
  }

  state.analysisSpecData = { matrix, frames, bins };
  drawAnalysisSpectrogram();
  drawPiano(ui.analysisPiano);
  drawAnalysisNotes();
  drawAnalysisWave();
  state.analysisRunning = false;
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

function makeNotesJson() {
  return {
    audio: state.audioName || 'song.wav',
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
        : []
    }))
  };
}

async function autoSaveProjectSilently() {
  if (!state.audioBlob) return;
  if (!state.saveDirectoryHandle) return;

  await ensureAudioBlobData();
  const audioName = state.audioName || 'song.wav';
  const folderName = sanitizeFolderName(stripExtension(audioName));
  const projectDir = await state.saveDirectoryHandle.getDirectoryHandle(folderName, { create: true });
  const audioBlob = state.audioBlobData
    ? new Blob([state.audioBlobData], { type: state.audioBlob?.type || 'audio/wav' })
    : state.audioBlob;
  await writeBlobToDirectory(audioBlob, audioName, projectDir);
  await saveTextFileToDirectory('notes.json', JSON.stringify(makeNotesJson(), null, 2), projectDir);
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
  const projectDir = await state.saveDirectoryHandle.getDirectoryHandle(folderName, { create: true });

  const audioBlob = state.audioBlobData
    ? new Blob([state.audioBlobData], { type: state.audioBlob?.type || 'audio/wav' })
    : state.audioBlob;
  const audioSaved = await writeBlobToDirectory(audioBlob, audioName, projectDir);
  const notesSaved = await saveTextFileToDirectory('notes.json', JSON.stringify(makeNotesJson(), null, 2), projectDir);

  let sourceMsg = '未处理原音频';
  const action = await askSourceActionWithModal();
  if (state.sourceAudioBlob && state.sourceAudioName && action !== 'skip') {
    const sourceSaved = await writeBlobToDirectory(state.sourceAudioBlob, state.sourceAudioName, projectDir);
    if (sourceSaved) {
      if (action === 'move') {
        let removed = false;
        const canRemove =
          state.sourceParentDirHandle &&
          state.sourceFileName &&
          state.sourceParentDirHandle !== projectDir;
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
    alert(`已保存到目录：${folderName}/\n- ${audioName}\n- notes.json\n${sourceMsg}`);
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

async function openNotesFromDirectoryHandle(dirHandle) {
  try {
    let notes = [];
    let notesAudioName = '';
    let songInfo = { tags: [], caption: '' };
    const audioFiles = [];

    for await (const entry of dirHandle.values()) {
      if (entry.kind !== 'file') continue;
      const lower = entry.name.toLowerCase();
      if (lower === 'notes.json') {
        const f = await entry.getFile();
        const parsed = JSON.parse(await f.text());
        notes = Array.isArray(parsed.notes) ? parsed.notes.map(normalizeNote) : [];
        notesAudioName = typeof parsed.audio === 'string' ? parsed.audio : '';
        if (parsed.song && typeof parsed.song === 'object') {
          songInfo = {
            tags: Array.isArray(parsed.song.tags) ? parsed.song.tags.filter((v) => typeof v === 'string') : [],
            caption: typeof parsed.song.caption === 'string' ? parsed.song.caption : ''
          };
        }
        continue;
      }
      if (/\.(wav|mp3|m4a|ogg|flac)$/i.test(entry.name)) {
        audioFiles.push(entry);
      }
    }

    const picked =
      audioFiles.find((h) => h.name === notesAudioName) ||
      audioFiles.find((h) => h.name.toLowerCase() === notesAudioName.toLowerCase()) ||
      audioFiles[0];

    if (!picked) {
      alert('目录中没有可用音频文件');
      return;
    }

    const file = await picked.getFile();
    setSourceAudio(file, file.name, { parentDirHandle: dirHandle, fileName: picked.name });
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
    console.error('打开目录失败', dirHandle);
    alert('打开目录失败');
  }
}

function renderNotes() {
  ui.notesList.innerHTML = '';
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

    const title = document.createElement('div');
    title.innerHTML = `<strong>#${idx + 1}</strong> [${note.start.toFixed(2)} - ${note.end.toFixed(2)}] ${
      note.caption || ''
    }`;
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
      : []
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
    state.notes.splice(state.menuNoteIndex, 1);
    renderNotes();
  }
  hideContextMenu();
});
ui.goAnalysis.addEventListener('click', () => {
  state.analysisRange = getAnalysisRange();
  state.analysisView = { start: state.analysisRange.start, end: state.analysisRange.end };
  state.analysisViewY = { min: 48, max: 71 };
  state.analysisTargetIndex = state.editingNoteIndex !== null ? state.editingNoteIndex : null;
  showPage('analysis', 'editor-grow');
  drawPiano(ui.analysisPiano);
  setAnalysisTool('pencil');
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
if (ui.analysisPlayback) {
  ui.analysisPlayback.addEventListener('change', () => {
    if (ui.analysisPlayback.value === 'notes') {
      if (state.analysisAudio && !state.analysisAudio.paused) {
        state.analysisAudio.pause();
      }
      if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
    } else {
      stopAnalysisSynth();
      if (ui.analysisPlay) ui.analysisPlay.textContent = '播放';
    }
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
        playNotePreview(hit.note.midi, hit.note.velocity, hit.track.type);
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
        playNotePreview(hit.note.midi, hit.note.velocity, hit.track.type);
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
        playNotePreview(note.midi, note.velocity, activeTrack.type);
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
      note.midi = clamp(drag.midi + dmidi, 24, 107);
      if (note.midi !== drag.lastMidi) {
        playNotePreview(note.midi, note.velocity, track?.type || 'pitch');
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
    if (!state.analysisDrag) return;
    state.analysisDrag = null;
  };
  ui.analysisNotes.addEventListener('pointerup', finishDrag);
  ui.analysisNotes.addEventListener('pointerleave', finishDrag);
}
ui.tocMenuOpen.addEventListener('click', async () => {
  const t = state.menuTocTarget;
  if (!t) return;
  if (t.type === 'playlist') {
    state.selectedPlaylist = t.name;
    await refreshTocList();
  } else if (t.type === 'song' && state.saveDirectoryHandle) {
    const dirHandle = await state.saveDirectoryHandle.getDirectoryHandle(t.name);
    await openNotesFromDirectoryHandle(dirHandle);
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
