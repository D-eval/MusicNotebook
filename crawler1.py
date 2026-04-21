#!/usr/bin/env python3
import os
import re
import sys
from urllib.parse import parse_qs, urlparse

import requests

HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://music.163.com/"
}


def sanitize_filename(name: str) -> str:
    return re.sub(r'[\\/:*?"<>|]', "_", name).strip() or "song"


def extract_song_id(song_url: str) -> str:
    song_url = song_url.strip().replace("/#", "")
    parsed = urlparse(song_url)

    query_id = parse_qs(parsed.query).get("id", [])
    if query_id and query_id[0].isdigit():
        return query_id[0]

    match = re.search(r"(?:id=|/song\\?id=)(\\d+)", song_url)
    if match:
        return match.group(1)

    raise ValueError("无法从链接中提取歌曲 id")


def try_get_song_name(song_id: str) -> str:
    api = f"https://music.163.com/api/song/detail/?ids=[{song_id}]"
    try:
        resp = requests.get(api, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        songs = data.get("songs") or []
        if songs and isinstance(songs[0], dict):
            return sanitize_filename(str(songs[0].get("name", "")).strip())
    except Exception:
        pass
    return f"{song_id}"


def download_song(song_url: str) -> str:
    song_id = extract_song_id(song_url)
    song_name = try_get_song_name(song_id)
    music_url = f"http://music.163.com/song/media/outer/url?id={song_id}.mp3"

    response = requests.get(music_url, headers=HEADERS, timeout=30, allow_redirects=True)
    response.raise_for_status()

    content_type = (response.headers.get("Content-Type") or "").lower()
    if "audio" not in content_type and not response.content.startswith(b"ID3"):
        raise RuntimeError("下载失败：可能是 VIP/无版权歌曲，或链接不可直链下载")

    desktop = os.path.join(os.path.expanduser("~"), "Desktop")
    target_dir = os.path.join(desktop, "music")
    os.makedirs(target_dir, exist_ok=True)
    target_path = os.path.join(target_dir, f"{song_name}.mp3")

    with open(target_path, "wb") as f:
        f.write(response.content)
    return target_path


def main() -> int:
    if len(sys.argv) > 1:
        song_url = sys.argv[1]
    else:
        song_url = input("请输入网易云单曲链接: ").strip()

    if not song_url:
        print("未输入链接")
        return 1

    try:
        saved = download_song(song_url)
        print(f"下载成功: {saved}")
        return 0
    except Exception as exc:
        print(f"下载失败: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
