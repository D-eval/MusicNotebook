#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path


def migrate_one_song(
    song_name: str,
    old_music_note_dir: Path,
    new_music_note_dir: Path,
    dry_run: bool = False,
) -> list[str]:
    logs: list[str] = []

    old_song_audio_dir = old_music_note_dir / song_name / "audio"
    old_song_notes_dir = old_music_note_dir / song_name / "notes"
    old_audio_file = old_song_audio_dir / f"{song_name}.mp3"
    old_notes_file = old_song_notes_dir / "notes.json"

    new_audio_dir = new_music_note_dir / "audio"
    new_notes_dir = new_music_note_dir / "notes"
    new_audio_file = new_audio_dir / f"{song_name}.mp3"
    new_notes_file = new_notes_dir / f"{song_name}.json"

    if not old_audio_file.exists() and not old_notes_file.exists():
        return logs

    logs.append(f"[{song_name}]")
    if not dry_run:
        new_audio_dir.mkdir(parents=True, exist_ok=True)
        new_notes_dir.mkdir(parents=True, exist_ok=True)

    if old_audio_file.exists():
        if new_audio_file.exists():
            logs.append(f"  - skip audio (target exists): {new_audio_file}")
        else:
            logs.append(f"  - move audio: {old_audio_file} -> {new_audio_file}")
            if not dry_run:
                shutil.move(str(old_audio_file), str(new_audio_file))
    else:
        logs.append(f"  - missing audio: {old_audio_file}")

    if old_notes_file.exists():
        if new_notes_file.exists():
            logs.append(f"  - skip notes (target exists): {new_notes_file}")
        else:
            logs.append(f"  - move notes: {old_notes_file} -> {new_notes_file}")
            if not dry_run:
                shutil.move(str(old_notes_file), str(new_notes_file))
                try:
                    payload = json.loads(new_notes_file.read_text(encoding="utf-8"))
                    payload["audio"] = f"{song_name}.mp3"
                    new_notes_file.write_text(
                        json.dumps(payload, ensure_ascii=False, indent=2),
                        encoding="utf-8",
                    )
                    logs.append(f"  - rewrite notes.audio -> {song_name}.mp3")
                except Exception as exc:
                    logs.append(f"  - warn: failed to rewrite json ({exc})")
    else:
        logs.append(f"  - missing notes: {old_notes_file}")

    return logs


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Move old layout:\n"
            "  {old_dir}/music_note/{music_name}/audio/{music_name}.mp3\n"
            "  {old_dir}/music_note/{music_name}/notes/notes.json\n"
            "to new layout:\n"
            "  {new_dir}/music_note/audio/{music_name}.mp3\n"
            "  {new_dir}/music_note/notes/{music_name}.json"
        )
    )
    parser.add_argument("old_dir", help="Old root directory (parent of music_note)")
    parser.add_argument("new_dir", help="New root directory (parent of music_note)")
    parser.add_argument("--dry-run", action="store_true", help="Only print actions, do not move files")
    args = parser.parse_args()

    old_music_note_dir = (Path(args.old_dir).expanduser().resolve() / "music_note")
    new_music_note_dir = (Path(args.new_dir).expanduser().resolve() / "music_note")

    if not old_music_note_dir.exists() or not old_music_note_dir.is_dir():
        raise SystemExit(f"Invalid old music_note dir: {old_music_note_dir}")

    song_dirs = [p for p in old_music_note_dir.iterdir() if p.is_dir() and p.name not in {"audio", "notes"}]
    all_logs: list[str] = []
    changed = 0

    for song_dir in sorted(song_dirs, key=lambda p: p.name.lower()):
        logs = migrate_one_song(song_dir.name, old_music_note_dir, new_music_note_dir, dry_run=args.dry_run)
        if logs:
            changed += 1
            all_logs.extend(logs)

    if all_logs:
        print("\n".join(all_logs))
    print(
        f"\nDone. {'Planned' if args.dry_run else 'Moved'} "
        f"{changed} song(s) from {old_music_note_dir} to {new_music_note_dir}"
    )


if __name__ == "__main__":
    main()


"""
python3 migrate_storage_layout.py /Users/broyou/Desktop/music_proj/musicNotebook/save /Users/broyou/Desktop/music_proj/musicNotebook/new --dry-run
python3 migrate_storage_layout.py /Users/broyou/Desktop/music_proj/musicNotebook/save /Users/broyou/Desktop/music_proj/musicNotebook/new
"""
