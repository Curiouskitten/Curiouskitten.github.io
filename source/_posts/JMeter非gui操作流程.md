---
title: jmeter非GUI操作流程
date: 2021-12-13 00:02:57
tags: jmeter
description: 工作中曾接触和使用到的压测方式
cover: /img/jmeter.jpeg

---
工作中曾接触和使用到的压测方式

<!-- more -->
服务器上环境搭建
1.jmeter 版本：apache-jmeter-5.2.1
2.插件：serverAgent-2.2.3
默认端口：4444
重新分配端口：./startAgent.sh --tcp-port  3307 --udp-port 3308 --sysinfo
3.本地写好步骤
4.使用filezilla将写好的脚本上传至服务器（注意ip和端口使用内网ip+端口，注意区分管理系统后台还是小程序后台，测试IP：172.19.40.211;端口：8082（管理系统后台）；8081（小程序后台））
5.执行脚本：jmeter -n -t tuangou_test02.jmx -l test004.jtl -e -o tuangoutestreport
6.将 tuangoutestreport下载至本机使用html打开
7.mysql数据库查询最大连接数：show variables like 'max_connections'
8.修改mysql数据库最大连接数：set global max_connections = 151;
9.服务器上查看运行中的端口号：netstat -ntlp
10.运行serverAgent：./startAgent.sh 或者 nohup ./startAgent.sh & ，把Agent服务放到后台并且不挂起。
11.使配置文件生效:source profile
12.jtl文件的查看方式，gui界面下，使用查看结果树，聚合报告
13.从数据库中导出用户数据
14.使用插件PerfMon Metrics Collector进行服务器资源监控，在进行非gui执行之前需要配置输出的file，注意不能与最终输出的测试结果jtl文件相同，可以是csv也可以是jtl文件

防火墙相关操作
1 、防火墙关闭 -ping 得通
firewall-cmd --add-port=4444/tcp --permanent ## 永久添加 4444 端⼝
firewall-cmd --list-ports ## 列出开放的端⼝
systemctl stop firewalld ## 关闭防火墙
systemctl start firewalld ## 开启防火墙
systemctl status firewalld ## 查看防火墙状态
systemctl restart firewalld ## 重启防火墙

netstat -tunlp##查看端口占用
