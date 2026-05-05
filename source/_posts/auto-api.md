---
title: python接口自动化框架（Unittest+ddt）
date: 2022-10-23 15:20:54
tags: python 接口自动化
cover: /img/girl_cp.jpg
---
基于Unittest + ddt的接口自动化测试框架，可直接套用，根据实际业务做内容修改

## 目录结构

![catalogue_of_frame](catalogue.jpg)

## 各模块介绍

### Http请求能力封装-http_request.py

引用三方库requests
若本地没有：

```bash
pip install requests
```

```bash
import requests


def send_http_requests(url, method, **kwargs):
    """
    发送http请求
    :param url: 请求url
    :param method: 请求方法
    :param kwargs: 请求参数，headers,cookies,params,data,json...
    :return: 请求结果
    """
    # 统一请求方法格式
    method = method.lower()
    res = getattr(requests, method)(url, **kwargs)
    return res
```

知识点：getattr()--获取类方法
如上代码，获取requests模块下，method方法，跟上对应的参数
当然也可以用最基本的方法使用if的条件语句，判断是何种请求方法走不同分支来处理

### 日志处理：日志器的封装-log_handler.py

引用python自带库logging
具体逻辑：创建一个日志器-->设置日志的打印等级-->创建一个日志处理器-->格式化日志-->将格式化后的日志添加到日志器上

```bash
import logging


def get_logger(name, filename, mode='a', encoding="utf-8", fmt=None, debug=False):
    """
    创建日志器
    :param name: 日志名称
    :param filename: 日志文件名和路径
    :param mode:文件读写类型，默认a-追加
    :param encoding-编码类型
    :param fmt: 日志格式
    :param debug: bool-True：调试模式，False-非调试模式
    :return:
    """
    # 创建一个日志器
    logger = logging.getLogger(name)
    # 设置日志器打印等级--不可省去
    logger.setLevel(logging.DEBUG)
    if debug is True:
        file_level = logging.DEBUG
        console_level = logging.DEBUG
    else:
        file_level = logging.INFO
        console_level = logging.INFO
    if fmt is None:
        fmt = "%(levelname)s:%(asctime)s-[%(filename)s-->line:%(lineno)d]-%(levelname)s:%(message)s"
    # 创建日志处理器
    file_handler = logging.FileHandler(filename=filename, mode=mode, encoding=encoding)
    file_handler.setLevel(file_level)
    console_handler = logging.StreamHandler()
    console_handler.setLevel(console_level)
    # 日志格式化
    formatter = logging.Formatter(fmt=fmt)
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    # 将格式化后的日志处理器添加到日志器上
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    return logger
```

日志的处理登记做成了两类，最详细的console类--debug；相对清晰的文件类--info
补充：logging模块中的日志等级
![logging模块日志等级](loglevel.jpg)

### Excel文件处理器--excel_handler.py

引用三方库：openpyxl
下载指令：

```bash
pip install openpyxl
```

```bash
from openpyxl import load_workbook
from pprint import pprint


def get_exceldata(path, sheetname):
    """
    从excel读取数据
    :param path: excel文件路径
    :param sheetname: 表名
    :return: 从excel中读取的用例
    """
    # read_only-只读，要读取一个excel文件但是又不想改动他.或者表中的数据量很大，需要分段获取，但是使用read_only需要close()
    wb = load_workbook(filename=path, read_only=True)
    sh = wb[sheetname]
    row = sh.max_row
    column = sh.max_column
    # 获取所有key
    keys = []
    for i in range(1, column+1):
        key = sh.cell(1, i).value
        keys.append(key)
    # 获取用例参数
    data = []
    for i in range(2, row+1):
        temp ={}
        for j in range(1, column+1):
            value = sh.cell(i, j).value
            temp[keys[j-1]] = value
        # # 将请求体&预期数据转换成python对象
        # try:
        #     temp['request_data'] = json.loads(temp['request_data'])
        #     temp['expect_data'] = json.loads(temp['expect_data'])
        # except json.decoder.JSONDecodeError:
        #     raise ValueError('用例格式错误！')
        data.append(temp)
    return data
```

在整个自动化运行的过程中，几乎不会对excel文件本身数据做修改，因此此处仅用到获取数据的方法load_workbook；定义一个读取数据的方法即可
Attention：excel文件模版一定要保持干净！！不要存在非必要的空格行or列，上述方法通过获取最大行和最大列来获取目标数据的
我使用的excel的格式：
![excel_form](case_demo.jpg)
则对应上述代码：sheetname=demo
在指定范围的for循环中遵循左开右闭。也就是右边的数实际取值是n-1，所以此处column&row都+1
最终以列表中嵌套字典的方式，获取所有表中的数据，例：
\[{“id”:1,””title”:用例A”…,},{…}]

### 测试报告生成-report_handler.py

用例批量执行后需要一个测试报告直观的查看当前测试套执行结果,现在有很多3方测试模板，比如可以直接下载的BeautifulReport

```bash
from datetime import datetime
from BeautifulReport import BeautifulReport
from library.HTMLTestRunnerNew import HTMLTestRunner


def report(ts, filename, report_dir, theme="theme_default", title=None, description=None, tester=None, _type='br'):
    """
    执行用例并生成用例
    :param ts: 测试套件
    :param filename: 报告文件名
    :param report_dir: 报告文件夹 仅支持BeautifulReport
    :param theme: 主题，仅支持BeautfulReport
    :param title: 报告主题，仅支持HTMLtesterRunner
    :param description: 报告描述
    :param tester: 测试人员，仅支持HTMLtesterRunner
    :param _type: 默认值为bs，表示生产厂BeautifulReport风格的报告
    :return:
    """
    # 生成时间前缀
    time_prefix = datetime.now().strftime("%Y%m%d%H%M%S")
    # 拼接到报告文件名
    filename = "{}_{}".format(time_prefix, filename)
    if _type == "br":
        # 生成BeautifulReport的报告
        br = BeautifulReport(ts)
        br.report(description=description, filename=filename, report_dir= report_dir, theme=theme)
        pass
    else:
        # 生成HTMLtestRunner的报告
        with open(report_dir+filename, "wb") as f:
            runner = HTMLTestRunner(f, title=title, description=description, tester=tester)
            runner.run(ts)
```

### 配置项封装-config_handler.py/settings.py

为了减少不同环境对框架复用性的影响，封装一个动态配置处理器，常见的配置项管理文件类型有：.ini, .yaml, .yml, .cfg, .conf;但为了更加方便的调用和获取数据，我直接使用python文件进行了配置管理；针对ini&yaml类型的数据不做过多的赘述：

```bash
import yaml
from configparser import ConfigParser


def get_config(filename, encoding="utf-8") -> dict:
    # 获取文件后缀名
    suffix = filename.split(".")[-1]
    # 判断配置文件类型
    if suffix in ["ini", "cfg", "cnf"]:
        conf = ConfigParser()
        conf.read(filenames=filename, encoding=encoding)
        # 获取文件中所有key
        data = {}
        for section in conf.sections():
            # 获取对应section下所有value
            values = conf.items(section)
            data[section] = dict(values)
    elif suffix in ["yaml", "yml"]:
        with open(file=filename, mode='r', encoding=encoding) as fb:
            data = yaml.load(stream=fb, Loader=yaml.FullLoader)
    else:
        raise ValueError("不能识别的配置文件后缀")
    return data


class Config:
    def __init__(self, filename, encoding="utf-8"):
        # 初始化
        self.filename = filename
        self.encoding = encoding
        self.suffix = filename.split(".")[-1]
        if self.suffix not in ["ini", "conf", "cnf", "yml", "yaml"]:
            raise ValueError("不能识别的配置文件后缀")

    def __parse_ini(self):
        """
        解析ini文件
        :return:
        """
        conf = ConfigParser()
        conf.read(filenames=self.filename, encoding=self.encoding)
        # 获取文件中所有key
        data = {}
        for section in conf.sections():
            # 获取对应section下所有value
            values = conf.items(section)
            data[section] = dict(values)
        return data

    def __parse_yaml(self):
        """
        解析yaml文件
        :return:
        """
        with open(file=self.filename, mode='r', encoding=self.encoding) as fb:
            data = yaml.load(stream=fb, Loader=yaml.FullLoader)
        return data

    def parse(self):
        """
        解析
        :return:
        """
        if self.suffix in ["yaml", "yml"]:
            return self.__parse_yaml()
        else:
            return self.__parse_ini()
```

.ini文件格式

```bash
[log]
name = "rest_register"

[test_data]

[report]
```

.yaml文件格式

```bash
log:
  name: dpword_test_log
  filename: log/testlog.log
  debug: true
testdata:
  file: data/apicase_lemonregister.xlsx
report:
  filename: testReport/注册接口测试报告.html
  description: 注册模块测试
```

settings.py

```bash
import pymysql
import os
from datetime import datetime


cur_time = datetime.now().strftime("%Y%m%d%H%M")
# os.path.abspath()-->根据当前操作系统获取对应类型的绝对路径
path = os.path.dirname(os.path.abspath(__file__))

# 日志配置
LOG_CONFIG = {
    "name": "通用日志器",
    "filename": os.path.join(path, f"log/{cur_time}testlog.log"),
    "debug": True
}

# 测试用例配置
TEST_DATA = {
    "path": os.path.join(path, "data/apicase_lemonregister.xlsx")
}

# 测试报告配置
REPORT_CONFIG = {
    "description": "注册接口测试",
    "filename": "注册接口测试报告.html",
    "report_dir": os.path.join(path, "testReport"),
    "title": "测试报告",
    "theme": "theme_cyan",
    "_type": "br"
}

# 域名
DOMAIN = {
    "test": "http://api.lemonban.com/futureloan"
}

# 接口配置
INTERFACE = {
    "register": "/member/register",
    "login": "/member/login",
    "recharge": "/member/recharge",
    "add": "/loan/add",
    "audit": "/loan/audit"
}

# 数据库配置
DB_CONFIG = {
    "host": "sh-cynosdbmysql-grp-p8d7farc.sql.tencentcdb.com",
    "port": 29391,
    "user": "root",
    "password": "Deepword2021",
    "charset": "utf8",
    "db": "deepuser",
    "autocommit": True  # 自动提交事务打开，防止mysql可重复读特性
}

DB_CONFIG_LEMON = {
    "host": "api.lemonban.com",
    "port": 3306,
    "user": "future",
    "password": "123456",
    "charset": "utf8",
    "db": "future",
    "autocommit": True,
    "cursorclass": pymysql.cursors.DictCursor  # 设置游标类型，返回不同类型数据
}
```

直接使用python文件管理动态参数的好处就是在执行过程中，python无需再去翻译成自己理解的逻辑再去执行，可以通过字典将不同类型的参数归类，省去了翻译这一步骤。也不容易出现奇怪的非必要的问题。
Attention：settings中的参数key均采用大写字母

### 数据库处理器-db_handler.py

当前数据库的类型非常多，诸如关系型—mysql，非关系型—mongodb，redis等等，此处介绍的是最最最基础也最最最常用的mysql的处理
引用三方库：pymysql
本地没有直接pip：pip install pymysql
简单介绍下pymysql的使用：
1）	创建数据库连接
2）	创建游标对象cursor
3）	执行sql语句
4）	获取结果
5）	关闭数据库连接
具体到代码步骤：
![way_of_pymysql](db_handler.jpg)

如果仅仅通过定义函数的方法，每一次请求mysql都需要如此来一套，创建连接-执行语句-再关闭连接，一旦数据量大起来对mysql的压力会十分大，且浪费时间和资源；为了解决这个问题，通过封装一个数据库处理类，定义一个初始化函数，创建一个连接，可被其他方法共享连接，详细如下：

```bash
import pymysql
import settings


class DB:
    def __init__(self, db_config: dict):
        # 创建&关闭连接是耗时且浪费资源的，封装成类-仅创建一个连接即可调用多个方法，是比较效率的
        self.conn = pymysql.connect(**db_config)

    def __del__(self):
        """
        类运行完毕，关闭数据库链接
        :return:
        """
        self.conn.close()

    def get_one_data(self, sql):
        """
        获取查询结果首个数据
        :param sql: 执行的sql语句
        :return: 查询结果
        """
        with self.conn.cursor() as cursor:
            cursor.execute(sql)
            return cursor.fetchone()

    def get_many_data(self, sql, num: int):
        """
        获取多个查询结果，指定结果数量
        :param sql: 执行的sql语句
        :param num: 指定需要抓取的数据数量-int
        :return:
        """
        with self.conn.cursor() as cursor:
            cursor.execute(sql)
            return cursor.fetchmany(num)

    def get_all_data(self, sql):
        """
        获取所有查询结果
        :param sql: 执行的sql语句
        :return: 指定需要抓去的数据数量
        """
        with self.conn.cursor() as cursor:
            cursor.execute(sql)
            return cursor.fetchall()

    def exist(self, sql):
        """
        查询数据是否存在
        :param sql: 执行的sql语句
        :return: True-数据存在，False-数据不存在
        """
        with self.conn.cursor() as cursor:
            cursor.execute(sql)
            if cursor.fetchone():
                return True
            else:
                return False
```

### 模块初始化-**init**.py

在整个框架的使用中，有些类和方法被频繁的调用，如果每个模块都要重新引用一次，随着模块的增多，代码免不了冗余和繁琐，对被测系统的性能也会带来非必要的压力，例如频繁的调用数据库处理器，即使封装数据库处理模块的时候已经简化了连接数，但是还不够。
**init**.py

```bash
from .log_handler import get_logger
import settings
# from .config_handler import get_config
from .db_handler import DB


# config = get_config("config.yaml")
logger = get_logger(**settings.LOG_CONFIG)
# 实现单项目共享一个连接，提高资源利用率
db_client = DB(settings.DB_CONFIG_LEMON)
```

### 随机数生成

在自动化测试的过程中，随机参数是必不可少的，可以根据一定的规则生成需要的随机数。为此我单独创建了一个模块random_sample.py来统一生成各种随机数

```bash
import random
import string
import time


def get_randomsample(length=64, mode='mix'):
    """
    获取指定长度，指定类型随机数，可指定参数类型
    :param length:
    :param mode:预获取的参数类型，默认mix-大小写英文字母+数字，支持digit：纯数字字符串；letter-纯英文字母
    :return:random_result-自定义随机数
    """
    str_digit = [random.choice(string.digits) for i in range(length)]
    str_mix = [random.choice(string.ascii_letters + string.digits) for i in range(length)]
    str_letter = [random.choice(string.ascii_letters) for i in range(length)]
    if mode == 'mix':
        random_result = ''.join(str_mix)
    elif mode == 'digit':
        random_result = ''.join(str_digit)
    elif mode == 'letter':
        random_result = ''.join(str_letter)
    else:
        random_result = 'Illegal mode'
    return random_result


def get_note(times=50, sleep=5):
    """
    随机获取音符
    :param times:
    :return:
    """
    musical_note = ['do', 'ra', 'mi', 'fa', 'so', 'la', 'si']
    for i in range(times):
        random_note = random.choice(musical_note)
        print(random_note)
        time.sleep(sleep)
```

### 测试数据处理

随机参数已经有单独的模块生成，那么下一步就是用生成的参数动态替换掉每次从excel中获取的参数槽位，因此又增加了一个处理此问题的模块test_data_handler.py

```bash
import random
from common import db_client
import re


def generate_phone():
    """
    生成随机电话号码，要求：1开头，第二位3-9的数字，总共11位
    :return:
    """
    sec_num = str(random.randint(3, 9))
    tail_num = ["1", sec_num]
    for i in range(8):
        ele = str(random.randint(0, 9))
        tail_num.append(ele)
    phone = ''.join(tail_num)
    return phone


def generate_phone2():
    """
    生成随机电话号码
    :return:
    """
    sample = ["135", "136", "137", "138", "139", "158", "159", "188",
              "132", "156", "133", "153", "180", "189"]
    header = random.choice(sample)
    phone_sample = [header]
    for i in range(8):
        ele = str(random.randint(0, 9))
        phone_sample.append(ele)
    phone = ''.join(phone_sample)
    return phone


def generate_no_user_phone(sql="select * from member where mobile_phone = {}"):
    """
    生成库内不存在的随机电话号码，要求：1开头，第二位3-9的数字，总共11位
    :return:
    """
    # 生成随机手机号
    phone = generate_phone2()
    sql = sql.format(phone)
    phone_tuple = db_client.exist(sql)
    while phone_tuple:
        phone = generate_phone2()
    return phone


def replace_by_re(json_str, object):
    args = re.findall("#(.+?)#", json_str)
    for arg in args:
        json_str = json_str.replace("#{}#".format(arg), str(getattr(object, arg)))
    return json_str
```

这个模块除了替换槽位的方法是通用的，其他方法均需要根据实际的业务场景来定义不同的方法。那么这里讲解一下replace_by_re()这个方法。
这里重点引用的方法re – 正则匹配
此处不会详细介绍正则表达式。仅对用到的正则匹配方法做介绍。
re.findall
在字符串中找到正则表达式所匹配的所有子串，并返回一个列表，如果有多个匹配模式，则返回元组列表，如果没有找到匹配的，则返回空列表。
注意： match 和 search 是匹配一次 findall 匹配所有。
语法格式为：
findall(string\[, pos[, endpos]])
参数：
•	string : 待匹配的字符串。
•	pos : 可选参数，指定字符串的起始位置，默认为 0。
•	endpos : 可选参数，指定字符串的结束位置，默认为字符串的长度。

```bash
import re

pattern = re.compile(r'\d+')   # 查找数字
result1 = pattern.findall('runoob 123 google 456')
result2 = pattern.findall('run88oob123google456', 0, 18)

print(result1)
print(result2)
```

输出结果：

```bash
['123', '456']
['88', '12']
```

此处用到的正则表达式模式：

1. 利用括号分组
2. 用问号实现可选匹配
3. 用星号匹配零次或多次
4. 用加号匹配一次或多次
5. 通配字符

在正则表达式中，.(英文句号)为通配符，它匹配除了换行之外的所有字符串
Attention：. 仅匹配一个字符
eg.

```bash
atRegex = re.compile(r’.at’)
atRegex.findall(“The cat in the hat sat on the flat mat.”)
```

Result: \[“cat”, “hat”, “sat”, “lat”, “mat”]
结果中flat仅匹配到了lat

（）为分组符号
一个括号内的字符为一组，可以使用group()匹配对象方法，从一个分组中获取匹配的文本。
Eg.

```bash
phoneNumRegex = re.compile(r“(\d\d\d)-(\d\d\d-\d\d\d)”)
mo = phoneNumRegex.search(“My number is 415-555-4242.”)
mo.group(1)
# 415
mo.group(2)
# 555-4242
mo.group(0)
# 415-555-4242
mo.group()
# 415-555-4242
```

？表明它前面的分组在这个模式中是可选的，可以理解为：匹配这个问号之前的分组0次后者1次
*意味着匹配0次或多次，即星号之前的分组，可以在文本中出现任意次，它可以不存在，或者一次又一次的重复

```bash
batRegex = re.compile(r”Bat(wo)*man”)
mo1 = batRegex.search(“The Adventures of Batman”)
mo1.group()
# result: “Batman”
mo2 = batRegex.search(“The Adventures of Batwoman”)
mo2.group()
# result: “Batwoman”
mo3 = batRegex.search(“The Adventures of Batwowowowoman”)
mo3 = mo3.group()
# result: “Batwowowowoman”
```

+意味着匹配一次或多次，相比较星号不要求分组出现在匹配的字符串中，加号前的分组必须至少出现一次。
多个匹配模式，返回元祖列表：

```bash
import re

result = re.findall(r'(\w+)=(\d+)', 'set width=20 and height=10')
print(result)
```

结果：
\[('width', '20'),('height', '10')]
综合以上知识点，来看框架代码中的“#(.+?)#”

```bash
	def replace_by_re(json_str, object):
    args = re.findall("#(.+?)#", json_str)
    for arg in args:
        json_str = json_str.replace("#{}#".format(arg), str(getattr(object, arg)))
    return json_str
```

被匹配的字符串为json_str
在json_str中匹配的字符串格式为#xxx#，考虑到json_str中可能存在多个这样格式的字符串，所以用井号将字符分组，分组内的字符串无特殊的要求所以使用通配符匹配分组内的所有字符串。但是有一个要求，井号内字符不能为空，所以使用+号保证预匹配的字符串必须完整的存在一次

### 前置用例

业务流
在做接口自动化时，往往需要先测通核心业务流，再进行单接口测试
接口测试业务流设计
1）站在用户角度
2）重视全局而非细节
3）先测主流程，后测分流程
4）只测正例

### 基于Unittest框架的测试执行模块的封装

涉及三方库：ddt
----data driver test—数据驱动测试，只有测试流程完全一致的时候可以使用ddt
目的：测试数据与测试用例代码分离，通过外部测试数据动态生成用例
下载执行：pip install ddt
下载好后为了更好的适配本地的脚本，修改了一小部分代码(进入ddt模块找这段):

```bash
def _get_test_data_docstring(func, value):
    """Returns a docstring based on the following resolution strategy:
    1. Passed value is not a "primitive" and has a docstring, then use it.
    2. In all other cases return None, i.e the test name is used.
    """
    if value.get('title', None):
        return value.get('title')
    if not _is_primitive(value) and value.__doc__:
        return value.__doc__
    else:
        return None
```

效果就是将html报告中的用例描述，取用excel中填入的title的值

1．	相同业务模块为一个py文件
![testcases_modle](testcases_modle.jpg)

2．	为了简化和解耦，减少后续模块代码量，可以编写一个基类如base_case.py，逻辑与common目录下的**init**.py一样；在基类中定义通用的流程和代码逻辑，例：

```bash
import unittest
import json
import warnings
import settings
from common import logger, db_client
from common.test_data_handler import replace_by_re, generate_no_user_phone
from common.http_request import send_http_requests


class BaseTest(unittest.TestCase):
    name = "base用例"  # 这个属性应该被覆盖
    logger = logger
    db = db_client
    settings = settings
    @classmethod
    def setUpClass(cls) -> None:
        warnings.simplefilter('ignore', ResourceWarning)
        cls.logger.info("====================={}接口开始测试========================".format(cls.name))

    @classmethod
    def tearDownClass(cls) -> None:
        cls.logger.info("====================={}接口测试结束========================".format(cls.name))

    def setUp(self) -> None:
        """
        方法级的前置条件，每个测试函数执行前执行
        :return:
        """
        self.logger.info("用例测试开始！>>>>>>>>>>>")

    def tearDown(self) -> None:
        """
        方法级后置处理，每个测试函数执行结束执行
        :return:
        """
        self.logger.info("用例测试结束！<<<<<<<<<<<<")

    def checkout(self, case):
        # 测试数据处理-绑定对象属性，便于下面的测试流程处理函数
        self.case = case
        self.case["url"] = settings.DOMAIN["test"] + settings.INTERFACE[case["url"]]
        # 测试数据处理
        self.pre_test_data()
        # 测试步骤
        self.step()
        # 响应状态码断言
        self.assert_status_code()
        # 响应数据断言
        self.assert_json_response()
        # 数据库断言
        self.assert_db_true()

    def pre_test_data(self):
        """
        预制数据处理
        :return:
        """
        # 判断是否生成手机号码
        if "#phone#" in self.case["request_data"]:
            phone = generate_no_user_phone()
            # 替换槽位
            self.case["request_data"] = self.case["request_data"].replace("#phone#", phone)
            if self.case.get("sql"):
                self.case["sql"] = self.case["sql"].replace("#phone#", phone)
        # 替换槽位
        self.case["request_data"] = replace_by_re(self.case["request_data"], self)
        if self.case.get("sql"):  # 针对部分用例不涉及sql校验，使用此方法保证不会因为sql为空时报错
            try:
                self.case["sql"] = replace_by_re(self.case["sql"], self)
            except Exception as e:
                self.logger.error("用例用例：{}替换sql槽位失败！".format(self.case["sql"]))
                raise e
        # 将数据转换位python对象
        try:
            self.case["request_data"] = json.loads(self.case["request_data"])
            self.case["expect_data"] = json.loads(self.case["expect_data"])
        except Exception as e:
            self.logger.error("用例：{}数据转换字符串失败！".format(self.case["title"]))
            raise e

    def step(self):
        """
        测试步骤
        :return:
        """
        try:
            self.response = send_http_requests(url=self.case["url"], method=self.case["method"],
                                               **self.case["request_data"])
        except Exception as e:
            self.logger.exception("用例：【{}】发送http请求失败".format(self.case["title"]))
            self.logger.debug("method:{}".format(self.case["method"]))
            self.logger.debug("response_data:{}".format(self.case["request_data"]))
            self.logger.info("响应结果：{}".format(self.response.json()))
            self.logger.info("预期结果：{}".format(self.case["expect_data"]))
            raise e
        else:
            self.logger.info("用例【{}】发送http请求成功！".format(self.case["title"]))

    def assert_status_code(self):
        """
        响应状态码断言
        :return:
        """
        try:
            self.assertEqual(int(self.case["status_code"]), self.response.status_code)
        except Exception as e:
            self.logger.exception("用例：【{}】响应状态码断言失败！".format(self.case["title"]))
            raise e
        else:
            self.logger.info("响应状态码断言成功！")

    def assert_json_response(self):
        """
        json响应结果断言--根据情况这里只校验了部分参数，根据实际项改写
        :return:
        """
        # 这里的逻辑写死，只是针对当前项目
        res_data = self.response.json()
        try:
            self.assertEqual(self.case['expect_data']['code'], res_data['code'])
            self.assertEqual(self.case['expect_data']['msg'], res_data['msg'])
        except Exception as e:
            self.logger.exception("用例：【{}】响应结果断言失败！".format(self.case["title"]))
            self.logger.debug("预期结果：{}".format(self.case["expect_data"]["code"]))
            self.logger.debug("预期结果：{}".format(self.case["expect_data"]["msg"]))
            self.logger.debug("实际结果：{}".format(res_data['code']))
            self.logger.debug("实际结果：{}".format(res_data['msg']))
            raise e
        else:
            self.logger.info("用例：【{}】响应结果断言成功！".format(self.case["title"]))

    def assert_db_true(self):
        """
        断言数据库存在数据
        :return:
        """
        if self.case.get("sql"):
            # 查询数据
            try:
                db_res = self.db.exist(self.case["sql"])
                self.assertTrue(db_res)
            except Exception as e:
                self.logger.exception("用例：【{}】数据库断言失败！".format(self.case["title"]))
                self.logger.debug("执行sql：{}".format(self.case["sql"]))
                raise e
            else:
                self.logger.info("数据库断言成功！")
```

上述代码中，遵循流程：
前置&后置用例内容定义：
针对类的setUpClass & tearDownClass;
针对方法的setup&teardown
测试流程的定义：
测试步骤->响应状态码断言->响应数据断言->数据库断言

```bash
    def checkout(self, case):
        # 测试数据处理-绑定对象属性，便于下面的测试流程处理函数
        self.case = case
        self.case["url"] = settings.DOMAIN["test"] + settings.INTERFACE[case["url"]]
        # 测试数据处理
        self.pre_test_data()
        # 测试步骤
        self.step()
        # 响应状态码断言
        self.assert_status_code()
        # 响应数据断言
        self.assert_json_response()
        # 数据库断言
        self.assert_db_true()
```

此处的checkout方法其实是对上述步骤的一个汇总调用，在TestBase基类中定义每个步骤的处理方法，再定义一个汇总的调用方法，那么后续拥有相同测试步骤的模块用例就可以直接调用checkout(case)，这一种方法来执行整个用例了。
以下为每个测试步骤的方法定义：
self.pre_test_data()—预制数据处理
必然存在的步骤：
1）	参数替换；
2）	将excel文件中请求体转换成python对象，方便直接引用进接口请求。

```bash
def pre_test_data(self):
    """
    预制数据处理
    :return:
    """
    # 替换槽位
    try:
        self.case["request_data"] = replace_by_re(self.case["request_data"], self)
    except Exception as e:
        self.logger.error("用例：{}替换槽位失败".format(self.case["title"]))
        raise e
    if self.case.get("sql"):  # 针对部分用例不涉及sql校验，使用此方法保证不会因为sql为空时报错
        try:
            self.case["sql"] = replace_by_re(self.case["sql"], self)
        except Exception as e:
            self.logger.error("用例用例：{}替换sql槽位失败！".format(self.case["sql"]))
            raise e
```

self.step() # 测试步骤
发送http请求，当然除了http请求之外还有诸如websocket请求，根据具体项目进行封装处理

```bash
def step(self):
    """
    测试步骤
    :return:
    """
    try:
        self.response = send_http_requests(url=self.case["url"], method=self.case["method"],
                                           **self.case["request_data"])
    except Exception as e:
        self.logger.exception("用例：【{}】发送http请求失败".format(self.case["title"]))
        self.logger.debug("method:{}".format(self.case["method"]))
        self.logger.debug("response_data:{}".format(self.case["request_data"]))
        self.logger.info("响应结果：{}".format(self.response.json()))
        self.logger.info("预期结果：{}".format(self.case["expect_data"]))
        raise e
    else:
        self.logger.info("用例【{}】发送http请求成功！".format(self.case["title"]))
```

self.assert_status_code() # 响应状态码断言
针对上述http请求结果与excel中提取的预期结果做比较

```bash
def assert_status_code(self):
    """
    响应状态码断言
    :return:
    """
    try:
        self.assertEqual(int(self.case["status_code"]), self.response.status_code)
    except Exception as e:
        self.logger.exception("用例：【{}】响应状态码断言失败！".format(self.case["title"]))
        raise e
    else:
        self.logger.info("响应状态码断言成功！")
```

self.assert_json_response() ----响应结果断言，这个非固定，切记：所有的框架的代码都是不固定的，一定是根据对应的业务场景做变更的，这里就直接提供一个简单粗暴的方式
提取excel中对应的响应体与上述http请求结果做比较

```bash
def assert_json_response(self):
    """
    响应结果断言--根据情况这里只校验了部分参数，根据实际项改写
    :return:
    """
    # 这里的逻辑写死，只是针对当前项目
    res_data = self.response.json()
    try:
        self.assertEqual(self.case['expect_data']['code'], res_data['code'])
        self.assertEqual(self.case['expect_data']['msg'], res_data['msg'])
    except Exception as e:
        self.logger.exception("用例：【{}】响应结果断言失败！".format(self.case["title"]))
        self.logger.debug("预期结果：{}".format(self.case["expect_data"]["code"]))
        self.logger.debug("预期结果：{}".format(self.case["expect_data"]["msg"]))
        self.logger.debug("实际结果：{}".format(res_data['code']))
        self.logger.debug("实际结果：{}".format(res_data['msg']))
        raise e
    else:
        self.logger.info("用例：【{}】响应结果断言成功！".format(self.case["title"]))
```

self.assert_db_true() ----数据库校验，原理同上述响应断言，提取excel文件中的sql语句，连接并执行数据库语句，此处事例为mysql可以根据具体的项目架构需求再封装诸如：redis连接，mogodb连接，甚至是es查询
源码如下：

```bash
def assert_db_true(self):
    """
    断言数据库存在数据
    :return:
    """
    if self.case.get("sql"):             #[get]尝试获取对应数据，若没有返回空，而不会报错
        # 查询数据
        try:
            db_res = self.db.exist(self.case["sql"])
            self.assertTrue(db_res)
        except Exception as e:
            self.logger.exception("用例：【{}】数据库断言失败！".format(self.case["title"]))
            self.logger.debug("执行sql：{}".format(self.case["sql"]))
            raise e
        else:
            self.logger.info("数据库断言成功！")
```

至此，整理一下抽取基类的思路：数据参数化，相同步骤统一执行

1. 数据参数化：将所有的非定值的数据作为槽位。使用随机数或按照一定规律生成的参数对号入座，槽位表示的方式很多，具体看如何定义，可以是#randint#也可以是{randint}；最后将替换完槽位的数据统一进行格式化，由字符串（str）转换为可被python直接用于请求的python对象。
2. 相同的步骤执行：不难发现，所有接口测试都绕不开：填写参数->发送请求->获取响应->状态码&响应体的校验
   当然有的也存在数据库的校验
   那么在第一步数据参数化的时候，在针对某一模块也可以简单的理解为对一个sheet页中所有的请求参数都做了统一的替换和格式化
   那么我只需要在Unittest和ddt的帮助下，一条一条的执行用例即可
3. 前置&后置条件：非必要，基本上基类中只需要标注xxx开始执行，xxx执行结束即可，因为接口自动化的最终目的是整个业务场景的验证，所以必然存在不同模块的前置和后置执行内容不一致的情况-需要针对不同的模块做改写。所以基类无需做过多封装
   类级别—setUpClass & tearDownClass
   方法级别---setUp & teardown
4. @classmethod--用于定义类方法的装饰器。作用：在不创建实例的情况下调用类属性。
   在 Python 中，通常在方法的第一个参数中使用 self 来引用类实例本身。但是，当使用 @classmethod 装饰器时，第一个参数不是 self，而是 cls，用于引用类本身。

测试基类本身就是针对Unittest的属性和方法改写，而项目开发则是具体到每个功能测试模块，再引入基类再改写的过程

```bash
 @data(*cases)
    def test_audit(self, case):
        self.logger.info("用例【{}】开始测试>>>>>>>>>>>".format(case["title"]))
        # 1. 用例数据处理
        case["request_data"] = replace_by_re(case["request_data"], TestAudit)
        case["request_data"] = json.loads(case["request_data"])
        case["expect_data"] = json.loads(case["expect_data"])
        case["url"] = settings.DOMAIN["test"] + settings.INTERFACE[case["url"]]
        self.logger.debug("请求URL：{}".format(case["url"]))
        # 2. 测试步骤
        self.logger.debug("method:{}".format(case["method"]))
        self.logger.debug("args:{}".format(case["request_data"]))
        response = send_http_requests(url=case["url"], method=case["method"], **case["request_data"])
        self.logger.info("响应结果：{}".format(response.json()))
        self.logger.info("预期结果：{}".format(case["expect_data"]))
        # 3. 断言
        try:
            self.assertEqual(int(case["status_code"]), response.status_code)
            self.assertEqual(case['expect_data']['code'], response.json()['code'])
            self.assertEqual(case['expect_data']['msg'], response.json()['msg'])
        except AssertionError as e:
            self.logger.exception("用例【{}】响应结果断言失败！".format(case["title"]))
            self.logger.debug("预期结果:{}".format(case["expect_data"]))
            self.logger.debug("响应结果:{}".format(response.json()))
            raise e
        else:
            self.logger.info("响应结果断言成功！")
        # 数据库校验
        if case['sql']:
            try:
                case['sql'] = replace_by_re(case['sql'], TestAudit)
                self.logger.debug("查询语句为：{}".format(case["sql"]))
                db_res = self.db.exist(case['sql'])
            except Exception as e:
                self.logger.exception("数据库断言失败！")
                self.logger.debug("执行的sql:{}".format(case['sql']))
                raise e
            else:
                self.logger.info("数据库断言成功！")
            self.assertTrue(db_res)
```

上述代码直接可以写为：

```bash
@data(*cases)
    def test_audit(self, case):
        self.checkout(case)
```

有了基类的帮忙，原本繁琐的步骤，3行代码引用即可解决，工具化

Attention!!!----用于占位的槽位名称一定要与预置的参数命名一直，如excel文件中定义的槽位名称为#user_id#，则在预置用例中需要将参数命名为user_id的类属性。

当存在与通用步骤不一致的业务步骤，只需要继承基类后，直接改写或者重写方法即可。
至此，框架的基础搭建就结束了，后续需要根据具体的业务增加相关的处理模块。

### 执行文件

编写一个执行文件，收集测试套，并让他按照既定的流程执行使用excel归档的用例，将最终的执行结果汇总成html的测试报告

```bash
import unittest
from common.report_handler import report
import settings

if __name__ == '__main__':
    testsuite = unittest.TestLoader().discover('testcases', pattern='test*')
    report(testsuite, **settings.REPORT_CONFIG)
```
