# simp

来，我教你怎么用，

首先你最好有一个chrome浏览器，

然后你打开哪个 index.html

这个用来标注音乐，

当然你需要先把音乐下载到本地，

如果你不会下载，你可以运行crawler.py直接爬歌单

好了，现在假设你已经构建好了数据集，

接下来你要分别运行 `preprocess.py` `preprocess1.py` 和 `preprocess2.py`

你可能需要在这三个文件里改一下路径，

其中 `preprocess.py` 的功能是，把你标注的段落切分成数据，

`preprocess1.py` 的功能是，把这些音频整理成特定长度，如 `5秒` ，

`preprocess2.py` 的功能是，把文本通过一个文本编码器编码成句子向量，

我选的是 `BAAI/bge-small-zh-v1.5` ，你可以换成别的，

你也需要注意，在标注的时候，每个片段都要大于 5秒，

最后就可以用 read.py 加载Dataset类了。
