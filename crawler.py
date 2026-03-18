#!/usr/bin/env python3
import csv
import os
import sys
import requests
from lxml import etree
from tkinter import Tk, Label, Entry, Listbox, Button, END, W, E

headers = {
    "User-Agent": "fill your user agent here"
}

song_names = []
song_ids = []
entry = None
text = None
root = None


def download_song():
    url = entry.get().strip()
    if not url:
        text.insert(END, "请输入歌单URL")
        text.see(END)
        return
    url = url.replace("/#", "")
    try:
        response = requests.get(url, headers=headers, timeout=20)
    except Exception as exc:
        text.insert(END, f"请求失败: {exc}")
        text.see(END)
        return

    html = etree.HTML(response.text)
    music_label_list = html.xpath('//a[contains(@href,"/song?")]')
    if not music_label_list:
        text.insert(END, "未找到歌曲链接")
        text.see(END)
        return

    for music_label in music_label_list:
        href = music_label.xpath('./@href')
        name_node = music_label.xpath('./text()')
        if not href or not name_node:
            continue
        music_id = href[0].split("=")[-1]
        music_name = name_node[0].strip()
        if not music_id or not music_name:
            continue
        song_names.append(music_name)
        song_ids.append(music_id)

        music_url = f"http://music.163.com/song/media/outer/url?id={music_id}"
        try:
            music = requests.get(music_url, headers=headers, timeout=20)
        except Exception as exc:
            text.insert(END, f"下载失败: {music_name} ({exc})")
            text.see(END)
            continue

        try:
            desktop_path = os.path.join(os.path.expanduser("~"), "Desktop")
            music_folder = os.path.join(desktop_path, "music")
            os.makedirs(music_folder, exist_ok=True)
            file_path = os.path.join(music_folder, f"{music_name}.mp3")
            with open(file_path, "wb") as file:
                file.write(music.content)
            text.insert(END, f"正在下载: {music_name}")
            text.see(END)
            text.update()
        except Exception as exc:
            text.insert(END, f"写入失败: {music_name} ({exc})")
            text.see(END)
            continue


def export_csv():
    if not song_names:
        return
    desktop_path = os.path.join(os.path.expanduser("~"), "Desktop")
    filename = os.path.join(desktop_path, "output.csv")
    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["song_name", "song_id"])
        for name, sid in zip(song_names, song_ids):
            writer.writerow([name, sid])
    print(f"数据已成功写入 {filename}")


def pause():
    print("结束下载")
    if root:
        root.destroy()


def main():
    global root, entry, text
    root = Tk()
    root.title("网易云音乐")
    root.geometry("850x600+380+230")

    label = Label(root, text="请输入歌单URL：", font=("Microsoft YaHei", 15))
    label.grid()
    entry = Entry(root, font=("Microsoft YaHei", 35))
    entry.grid(row=0, column=1)
    text = Listbox(root, font=("SimHei", 20), width=60, height=16)
    text.grid(row=1, columnspan=2)
    button1 = Button(root, text="开始下载", command=download_song, font=("SimHei", 20))
    button1.grid(row=2, column=0, sticky=W)
    button2 = Button(root, text="退出", command=pause, font=("SimHei", 20))
    button2.grid(row=2, column=1, sticky=E)

    root.mainloop()
    export_csv()


if __name__ == "__main__":
    sys.exit(main())
