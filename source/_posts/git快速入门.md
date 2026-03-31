---
title: git快速入门
date: 2021-12-23 01:21:48
tags: git
cover: /img/git2.png
---

简单的git操作指南
## 安装git
git支持多操作系统，包括macos，windows，linux

## 创建新仓库
本地创建新的文件夹，打开并执行
``` bash
git init
```

## 检出仓库
创建一个本地的克隆仓库
``` bash
git clone /path/to/repository
```
若克隆的是远程服务器上的仓库，则命令：
``` bash
git clone username@host:/path/to/repository
```


## 工作流
本地仓库由三部分组成：
1.工作目录:持有实际文件
｜
｜add
｜

2.暂存区(index)：一个缓存区域，临时保存你的改动
｜
｜commit
｜
3.HEAD：指向最后一次提交的结果

## 添加和提交
提交更改-将内容添加至暂存区，使用命令：
``` bash
git add filename
#or
git add *
```
这是git基本工作流程的第一步；
提交实际改动，使用命令：
``` bash
git commit -m "代码提交信息"
```
至此，你的改动已经提交到了HEAD，但是还没有传到远程仓库

## 推动改动
将存在本地仓库的HEAD的改动，提交至远程仓库，执行命令：
``` bash
git push origin master
```
此处的master为主干名称，可以换成想要推送的任何分支

如果还没有克隆现有仓库，并打算将你的仓库连接到某个远程服务器，使用如下命令添加：
``` bash
git remote add origin <server>
```
如此，就能将改动推送至所添加的服务器上

## 分支
分支是用来将特性开发绝缘开来的，在创建仓库的时候，master是默认的分支，在其他分支上进行开发，完成后再将它们合并到主分支上，也称之为合主干

创建一个叫做“feature_x”的分支。并切换过去：
``` bash
git checkout -b feature_x
```
切换回主干：
``` bash 
git checkout master
```
将新建的分支删除：
``` bash
git branch -d feature_x
```
本地创建的分支除非被推送到远程仓库，否则该分支不为他人可见，推送分支
``` bash
git push origin <branch>
```

## 更新与合并
更新本地仓库，执行命令：
``` bash
git pull
```
在你的工作目录中 获取（fetch） 并 合并（merge） 远端的改动。
要合并其他分支到你的当前分支（例如 master），执行：
``` bash
git merge <branch>
```
在这两种情况下，git 都会尝试去自动合并改动。遗憾的是，这可能并非每次都成功，并可能出现冲突（conflicts）。 这时候就需要你修改这些文件来手动合并这些冲突（conflicts）。改完之后，你需要执行如下命令以将它们标记为合并成功：
``` bash
git add <filename>
```
在合并改动之前，你可以使用如下命令预览差异：
``` bash
git diff <source_branch> <target_branch>
```

## 标签
为软件发布创建标签是推荐的。这个概念早已存在，在SVN中也有。可以执行如下命令创建一个叫做 1.0.0 的标签：
``` bash
git tag 1.0.0 1b2e1d63ff
```
1b2e1d63ff 是你想要标记的提交ID的前10位字符。可以使用下列命令获取提交 ID：
``` bash
git log
```
你也可以少写一点提交ID前几位，只要它的指向具有唯一性。

## 替换本地改动
假如你操作失误，可以使用如下命令替换掉本地改动：
``` bash
git checkout -- <filename>
```
此命令会使用 HEAD 中的最新内容替换掉你的工作目录中的文件。已添加到暂存区的改动以及新文件都不会受到影响。

假如你想丢弃你在本地的所有改动与提交，可以到服务器上获取最新的版本历史，并将你本地主分支指向它：
``` bash
git fetch origin
git reset --hard origin/master
```
## 其他
内建的图形化 git：
``` bash
gitk
```
彩色的 git 输出：
``` bash
git config color.ui true
```
显示历史记录时，每个提交的信息只显示一行：
``` bash
git config format.pretty oneline
```
交互式添加文件到暂存区：
``` bash
git add -i
```














