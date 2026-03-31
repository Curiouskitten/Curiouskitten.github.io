---
title: '软件测试必备:linux常用命令'
date: 2022-01-03 10:21:57
tags: linux
cover: /img/linux.jpeg
---
常用的linux命令，大部分也适用于unix类系统，比如mac os

<!-- more -->
## 文件与目录
### cd
访问目录
``` bash
cd opt
#访问当前目录下的opt目录
cd ..
#返回上一级目录
cd ../..
#返回上两集目录
cd ~
#进入个人主目录
```

### pwd
显示工作路径

### ls
查看目录中的文件
``` bash
ls
#查看当前目录中的文件
ls -l  
#显示文件和目录的详细资料，也可使用ll
ls -a 
#显示隐藏文件
ls *[0-9]* 
#显示包含数字的文件名和目录名
ls -lh
#显示权限
```

### mkdir
创建目录
``` bash
mkdir dir1
#创建一个名为dir1的目录
mkdir dir1 dir2 
#同时创建两个目录，若dir1已存在
mkdir -p /tmp/dir1/dir2 
#创建一个目录树
```

### rmdir
删除目录
``` bash
rmdir dir1
#删除名为dir1的目录
```
### rm
删除
``` bash
rm -f file1 
#删除一个名为file1的文件
rm -rf dir1 
#删除一个叫做 'dir1' 的目录并同时删除其内容
rm -rf dir1 dir2 
#同时删除两个目录及它们的内容
```
rm -rf /  高危操作，懂得都懂

### mv
重命名/移动
``` bash
mv dir1 new_dir 
#移动dir1至new_dir下；若new_dir不存在则重命名dir1文件为new_dir
```

### cp 
复制
``` bash
cp file1 file2 
#复制file1并命名为file2
cp dir/* . 
#复制一个目录下的所有文件到当前工作目录
cp -a /tmp/dir1 . 
#复制一个目录到当前工作目录
cp -a dir1 dir2 
#复制目录dir1并命名为dir2
```


## 用户与群组
### useradd
创建新用户
``` bash
useradd zhangsan
#创建名为zhangsan的用户
```

passwd + 用户名：设置用户密码
``` bash
passwd zhangsan
```
若passwd后面什么都不跟，则系统默认更改root用户的登录密码

设置普通用户的登录期限
``` bash
useradd -e 2022-12-31 zhangsan
```

### usermod
修改用户信息
``` bash 
usermod -e 2023-12-31 zhangsan
#修改zhangsan的登录期限
usermod -d /home/hnlinux root
#修改登录目录
usermod -u 777 root
#修改用户的uid
usermod -l zhangsan xiaogang
#修改zhangsan的用户名为xiaogang
#-l:--login 
usermod -g 578 newgroup
#修改用户的gid，578组一定要存在
#-g:--gid
usermod -aG usertest zhangsan
#将zhangsan加入usertest组
#-a：--append；-G:--groups
kill -9 -u zhangsan
#杀死zhangsan执行的所有进程
usermod -L zhangsan
#锁定用户密码
#-L:--lock
usermod -u zhangsan
#解锁用户密码
#-U:--unlock
```
使用usermod修改信息时需要保证被修改的用户没有在系统中执行任何程序;usermod不允许修改正在线上的使用者账号名称

### userdel 
删除用户账号
``` bash
userdel -r zhangsan
#删除用户zhangsan及其相关文件
userdel zhangsan
#仅删除zhangsan不删除其相关文件
```

### groupadd 
创建用户组
用于创建新的工作组，新工作组中的信息将被添加至系统文件中
相关文件：
/etc/group 组账户信息
/etc/gshadow 安全组账户信息
/etc/login.defs Shadow 密码套件配置
``` bash
groupadd -g 344 grouptest
#创建新组名为grouptest，指定组ID：344；/etc/group文件中生成一个gid为344的项目
```

### groupmod 
修改组信息
``` bash
groupmod -n grouptest newgroupname
#修改grouptest组名为newgroupname

groupmod -g 444 grouptest
#修改组grouptest的gid为444
```

### groupdel 
删除组
``` bash
groupdel grouptest
#删除组grouptes
```
组中含有用户时，不能直接删除组，只能先删除组中的用户再删除组

###chage 
``` bash
chage -E 2022-12-28 zhangsan
#设置zhangsna的密码于2022年12月30日过期
chage -l 3 zhangsan
#设置zhangsan的密码从过期开始算起，3天不修改则密码失效
```
密码过期&密码失效
过期：密码到指定失效时间，系统会认为密码不安全，于是将密码设置为过期状态，用户登录时，提示用户进行密码修改
失效：用户密码失效后在指定时间内未进行修改，则系统将改密码设置为失效状态，用户则无法通过此密码登录


## 文件搜索
### find
``` bash
find / -name file1 
#从 '/' 开始进入根文件系统搜索文件和目录
find / -user user1 
#搜索属于用户 'user1' 的文件和目录
find /home/user1 -name \*.bin 
#在目录 '/ home/user1' 中搜索带有'.bin' 结尾的文件
find /usr/bin -type f -atime +100 
#搜索在过去100天内未被使用过的执行文件
find /usr/bin -type f -mtime -10 
#搜索在10天内被创建或者修改过的文件
find / -name \*.rpm -exec chmod 755 '{}' \; 
#搜索以 '.rpm' 结尾的文件并定义其权限
find / -xdev -name \*.rpm 
#搜索以 '.rpm' 结尾的文件，忽略光驱、捷盘等可移动设备
```
### whereis
只能用于查找符合条件的二进制文件、源代码文件和man手册页
``` bash
whereid bash
#查找bash的位置
```

### which
在环境变量$PATH设置的目录中寻找符合条件的文件
``` bash
which bash
#寻找bash文件并显示其绝对路径
```

## 文件权限
### chmod
+ 设置权限
- 取消权限
此命令对root无效
``` bash
chmod ugo+rwx directory1 
#设置目录为所有人(u)、群组(g)以及其他人(o)以读（r ）、写(w)和执行(x)的权限
chmod go-rwx directory1 
#删除群组(g)与其他人(o)对目录的读写执行权限
```
修改权限的两种方式：
1.字母：r-可读；w-可写；x-可执行；
2.数字：
0:---
1:--x
2:-w-
3:-wx
4:r--
5:r-x
6:rw-
7:rwx
ll or ls -l查看文件属性
``` bssh
[alicedeMBP:blog alice0711]$ ls -l
-rw-r--r--    1 alice0711  staff       0 12  9 02:30 _config.landscape.yml
```
以上文件属性 -|rw-|r--|r-- 以｜为分隔符，依次为：文件类型[-代表文件；d代表目录]｜文件所有者权限｜文件所有者所在组的用户权限｜其他用户权限

``` bash
chmod u=rwx file1
#将file1的用户权限修改为可读可写可执行
chomd 777 file1
#将file2的用户，群组，其他用户的权限都修改为可读可写可执行
```

### chown
修改文件所有者
``` bash 
chown user1 file1 
#改变一个文件的所有人
chown -R user1 directory1 
#改变directory1目录下所有文件，目录的所有者为user1
```

### chgrp
修改文件的群组
``` bash
chgrp group1 file1
#将file1所属群组修改为group1
```

## 查看文件内容
``` bash 
cat file1 
#从第一个字节开始正向查看文件的内容
tac file1 
#从最后一行开始反向查看一个文件的内容
more file1 
#查看一个长文件的内容
less file1 
#类似于 'more' 命令，但是它允许在文件中和正向操作一样的反向操作
head -2 file1 
#查看一个文件的前两行
tail -2 file1 
#查看一个文件的最后两行
tail -f /var/log/messages 
#实时查看被添加到一个文件中的内容,tailf
```

## 编辑文件vi/vim
所有的 Unix Like 系统都会内建 vi 文书编辑器
Vim 是从 vi 发展出来的一个文本编辑器，vi 是老式的字处理器，不过功能已经很齐全了，但是还是有可以进步的地方。
vim 则可以说是程序开发者的一项很好用的工具。连 vim 的[官方网站](http://www.vim.org)自己也说 vim 是一个程序开发工具而不是文字处理软件。

### vi/vim的使用
vi/vim 共分为三种模式，分别是命令模式（Command mode），输入模式（Insert mode）和底线命令模式（Last line mode）。 这三种模式的作用分别是：

#### 命令模式：
用户刚刚启动 vi/vim，便进入了命令模式。
此状态下敲击键盘动作会被Vim识别为命令，而非输入字符。比如我们此时按下i，并不会输入一个字符，i被当作了一个命令。
常用的几个命令：
i 切换到输入模式，以输入字符。
x 删除当前光标所在处的字符。
: 切换到底线命令模式，以在最底一行输入命令。
若想要编辑文本：启动Vim，进入了命令模式，按下i，切换到输入模式。
命令模式只有一些最基本的命令，因此仍要依靠底线命令模式输入更多命令。

#### 输入模式：
在命令模式下按下i就进入了输入模式。
在输入模式中，可以使用以下按键：
字符按键以及Shift组合，输入字符
ENTER，回车键，换行
BACK SPACE，退格键，删除光标前一个字符
DEL，删除键，删除光标后一个字符
方向键，在文本中移动光标
HOME/END，移动光标到行首/行尾
Page Up/Page Down，上/下翻页
Insert，切换光标为输入/替换模式，光标将变成竖线/下划线
ESC，退出输入模式，切换到命令模式

#### 底线命令模式：
在命令模式下按下:（英文冒号）就进入了底线命令模式。
底线命令模式可以输入单个或多个字符的命令，可用的命令非常多。
在底线命令模式中，基本的命令有（已经省略了冒号）：
``` bash
q #退出程序
w #保存文件
wq #保存并退出文件
!q #强制退出，不保存修改
```
搜索替换
``` bash
/word #向光标之下寻找一个名为word的字符串
?word #向光标之上寻找一个名为word的字符串
```
配合n、N按键寻找关键词
/word+n：搜索到一个关键词后，继续向下搜寻关键词；
?word+n：搜索到一个关键词后，继续向上搜索关键词。
N与n相反

``` bash
:2,10s/word1/word2/g
#从第2行至第10行寻找word1，并将word1替换为word2
:3,$s/word1/word2/g
#从第3行至第最后一行寻找word1，并将word1替换为word2
:1,$s/word1/word2/gc 
#or 
:%s/word1/word2/gc
#从第一行到最后一行寻找 word1 字符串，并将该字符串取代为 word2 ！且在取代前显示提示字符给用户确认 (confirm) 是否需要取代!
```
删除、复制与粘贴
x, X
在一行字当中，x 为向后删除一个字符 (相当于 [del] 按键)， X 为向前删除一个字符(相当于 [backspace] 亦即是退格键)
nx	n 
为数字，连续向后删除 n 个字符。举例来说，我要连续删除 10 个字符,『10x』。
dd	
删除游标所在的那一整行c
ndd	
n 为数字。删除光标所在的向下 n 行，例如 20dd 则是删除 20 行
d1G	
删除光标所在到第一行的所有数据
dG	
删除光标所在到最后一行的所有数据
d$	
删除游标所在处，到该行的最后一个字符
d0	
那个是数字的 0 ，删除游标所在处，到该行的最前面一个字符
yy	
复制游标所在的那一行
nyy	n 
为数字。复制光标所在的向下 n 行，例如 20yy 则是复制 20 行
y1G	
复制游标所在行到第一行的所有数据
yG	
复制游标所在行到最后一行的所有数据
y0	
复制光标所在的那个字符到该行行首的所有数据
y$	
复制光标所在的那个字符到该行行尾的所有数据
p, P
p 为将已复制的数据在光标下一行贴上，P 则为贴在游标上一行！ 举例来说，我目前光标在第 20 行，且已经复制了 10 行数据。则按下 p 后，那10行数据会贴在原本的 20 行之后，亦即由 21 行开始贴。但如果是按下 P 呢？ 那么原本的第 20 行会被推到变成 30 行。 (常用)
J	
将光标所在行与下一行的数据结合成同一行
c	
重复删除多个数据，例如向下删除 10 行，[ 10cj ]
u	
复原前一个动作
[Ctrl]+r	
重做上一个动作

按ESC键可随时退出底线命令模式。

## 网络
### ifconfig
``` bash
ifconfig eth0 
#显示一个以太网卡的配置
ifup eth0 
#启用一个 'eth0' 网络设备
ifdown eth0 
#禁用一个 'eth0' 网络设备
ifconfig eth0 192.168.1.1 netmask 255.255.255.0 
#控制IP地址
```

### netstat
``` bash
netstat -tup 
#展示所有进行中的网络连接和他们的PID
#-t:--tcp 显示TCP传输协议的连接状况
#-u:--udp 显示UDP传输协议的连接状况
#-p:--programs 显示正在使用Socket的程序识别码和程序名称
netstat -tupl 
#展示系统中左右监听的网络服务和他们的PID
#-l:--listening:显示监听中的服务器的socket
```
### lsof
查看8080端口号的占用情况
``` bash
losf -i:8080
```
杀死进程
``` bash
kill -9 26993
#杀死pid为26993的进程
```

## 系统信息
``` bash
date 
#显示系统日期
cal 2021 
#显示2021年的日历表
date 123117002021.00 
#设置日期和时间 - 月日时分年.秒
```
``` bash
cat /proc/cpuinfo 
#显示CPU info的信息
cat /proc/interrupts 
#显示中断
cat /proc/meminfo 
#校验内存使用
cat /proc/swaps 
#显示哪些swap被使用
cat /proc/version 
#显示内核的版本
cat /proc/net/dev 
#显示网络适配器及统计
cat /proc/mounts 
#显示已加载的文件系统
lspci -tv 
#罗列 PCI 设备
lsusb -tv 
#显示 USB 设备
```

## 系统关机、重启、登出
### 关机
``` bash
shutdown -h now
#or
init 0
#or
telinit 0
```
``` bash
shutdown -h hours:minutes & 
#按预定时间关闭系统
shutdown -c 
#取消按预定时间关闭系统
```

### 重启
``` bash
shutdown -r now
#or
reboot
```

### 注销
``` bash
logout
```

## 磁盘空间
``` bash
df -h 
#显示已经挂载的分区列表
ls -lSr |more 
#以尺寸大小排列文件和目录
du -sh dir1 
#估算目录dir1已经使用的磁盘空间
du -sk * | sort -rn 
#以容量大小为依据依次显示文件和目录的大小
```

## 打包和压缩文件
``` bash
bunzip2 file1.bz2 
#解压一个叫做 'file1.bz2'的文件
bzip2 file1 
#压缩一个叫做 'file1' 的文件
gunzip file1.gz 
#解压一个叫做 'file1.gz'的文件
gzip file1 
#压缩一个叫做 'file1'的文件
gzip -9 file1 
#最大程度压缩
rar a file1.rar test_file 
#创建一个叫做 'file1.rar' 的包
rar a file1.rar file1 file2 dir1 
#同时压缩 'file1', 'file2' 以及目录 'dir1'
rar x file1.rar 
#解压rar包
unrar x file1.rar 
#解压rar包
tar -cvf archive.tar file1 
#创建一个非压缩的 tarball
tar -cvf archive.tar file1 file2 dir1 
#创建一个包含了 'file1', 'file2' 以及 'dir1'的档案文件
tar -tf archive.tar 
#显示一个包中的内容
tar -xvf archive.tar 
#释放一个包
tar -xvf archive.tar -C /tmp 
#将压缩包释放到 /tmp目录下
tar -cvfj archive.tar.bz2 dir1 
#创建一个bzip2格式的压缩包
tar -xvfj archive.tar.bz2 
#解压一个bzip2格式的压缩包
tar -cvfz archive.tar.gz dir1 
#创建一个gzip格式的压缩包
tar -xvfz archive.tar.gz 
#解压一个gzip格式的压缩包
zip file1.zip file1 
#创建一个zip格式的压缩包
zip -r file1.zip file1 file2 dir1 
#将几个文件和目录同时压缩成一个zip格式的压缩包
unzip file1.zip 
#解压一个zip格式压缩包
```

## yum 软件包升级
``` bash
yum install package_name 
#下载并安装一个rpm包
yum localinstall package_name.rpm 
#将安装一个rpm包，使用你自己的软件仓库为你解决所有依赖关系
yum update package_name.rpm 
#更新当前系统中所有安装的rpm包
yum update package_name 
#更新一个rpm包
yum remove package_name 
#删除一个rpm包
yum list 
#列出当前系统中安装的所有包
yum search package_name 
#在rpm仓库中搜寻软件包
yum clean packages 
#清理rpm缓存删除下载的包
yum clean headers 
#删除所有头文件
yum clean all 
#删除所有缓存的包和头文件
``` 
