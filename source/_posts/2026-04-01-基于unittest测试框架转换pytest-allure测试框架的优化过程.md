---
layout: post
title: pytest-夹具介绍
date: 2026-04-01T17:54:00.000+08:00
tags:
  - pytest的夹具功能
---
Pytest的一个重要功能，夹具（装饰器）。

夹具可以被类使用，也可以被方法调用，也可以定义作用范围。

定义一个夹具:

```
# 前置：已经下载好pytest和allure（是个web框架，可以单独下载，mac可以直接brew install allure）
# pip install pytest
# pip install allure-pytest
# 是否成功下载allure，终端输入：allure --version
# 成功返回版本号则说明allure环境已具备

import pytest

@pytest.fixture
def fixture_func(): # 不能随便接受参数
	print(‘》〉》〉》〉》我是个pytest.fixture风格的前置条件’)
	yield ‘我是一个yield的值’  # 相当于夹具的值
	print(‘我是一个pytest.fixture风格的后置条件《〈《〈《‘)
```

2. 夹具的调用

通过装饰器的方式调用，适用于类&方法;被类调用时，相当于unittest中的setup+teardown，在每个方法前后执行。

```
import pytest

# 函数调用夹具
@pytest.mark.usefixtures(‘fixture_function’)
def test_function():
	print(‘这是一个测试函数’)

# 类调用夹具
@pytest.mark.usefixtures(‘fixture_function’)
TestSomething():
	def test_fun_one():
		print(‘1’)
	
	def test_fun_two():
		print(‘2’)
```

作为参数被调用,相比较作为装饰器被调用，这种可以打印出夹具中yield的值；这种同样适用于类下的方法调用

```
import pytest

def two_one(fixture_func):
	print（fixture_func）
	print(‘’我是test_one)
```

3. 定义夹具的作用范围，夹具参数scope，默认function，即方法/函数范围，使用默认值时可以不要()，比如定义一个类级别的夹具，则@pytest.fixture(scope=‘class’)，这种类型的夹具被普通函数调用也不会报错，也会正常执行，但效果如同方法级。建议是什么用什么，别混用。包括模块级别。

```
import pytest

@pytest.fixture(scope='')	
def fixture_func(): 
	print(‘》〉》〉》〉》我是个pytest.fixture风格的前置条件’)
	yield ‘我是一个yield的值’
	print(‘我是一个pytest.fixture风格的后置条件《〈《〈《‘)
```

夹具参数autouse，默认=False，当定义为True时，即使是一个函数调用类级别的夹具，且此函数被放在了当前模块最后一行，也会正常的执行类级别夹具，即模块级别的前置后置

```
import pytest

@pytest.fixture(scope='class', autouse=True)	
def fixture_func(): 
	print(‘》〉》〉》〉》我是个pytest.fixture风格的前置条件’)
	yield ‘我是一个yield的值’
	print(‘我是一个pytest.fixture风格的后置条件《〈《〈《‘)
```

4. 夹具可以被集中定义在conftest.py文件中

文件名 conftest.py 是一个硬性约定的特殊名称。简单直接的回答是：如果你希望 pytest 能够“自动”发现并跨文件共享夹具（Fixtures），文件名必须是 conftest.py，不能改名。

此特征就可以代替原来的继承Unittest.Testcase，即类继承这一步。

Ps. 定义一个类级别，模块级别，包级别的夹具，autouse可以=True，但是方法级别的不建议使用，会导致所有测试函数都执行夹具；

夹具的检索规则，从被调用的函数起递归由里往外查询conftest.py中定义的夹具

5. 一个函数调用多个夹具，同级别夹具按照先后顺序调用，但不同级别，则从范围大的开始执行。

![](/images/夹具执行.png)

6. 夹具支持继承，但只被继承的夹具范围要>=继承夹具，即类级别的夹具是不能继承函数范围的夹具，但反之有效，以下以我封装的app自动化的conftest.py的部分内容为例：

   ```
   import config
   from appium import webdriver
   from appium.options.android import UiAutomator2Options
   from page_objects.app.login_page import LoginPage
   from page_objects.app.nologin_home_page import NoLoginHomePage


   @pytest.fixture(scope='class')
   def driver():
       desired_cap = config.DES_CAPS
       options = UiAutomator2Options().load_capabilities(desired_cap)
       with webdriver.Remote(config.APPIUM_SERVER_HOST, options=options) as session:
           yield session

   @pytest.fixture(scope='class')
   def login_driver(driver): # 继承上方参数名为driver的夹具
       # 判断是否存在协议窗口
       nhp = NoLoginHomePage(driver)
       if nhp.judge_Popup():
           nhp.confirm_agreement()
           nhp.enter_login_page()
       else:
           nhp.enter_login_page()
       # 登录
       lp = LoginPage(driver)
       lp.login(account=config.TestAccount['account'],password=config.TestAccount['passwd'])
       yield driver
   ```
7. 夹具的参数化

放两个例子，自己意会

针对此案例进行参数化执行：

```
import pytest

data = [
  {'num': 1,'except': 1},
  {'num': -1,'except': 1},
  {'num': 0,'except': 0}
]

def test_abs_1():
  case = data[0]
  assert case['except'] == abs(case['num'])

def test_abs_2():
  case = data[1]
  assert case['except'] == abs(case['num'])
  
def test_abs_3():
  case = data[2]
  assert case['except'] == abs(case['num'])
```

夹具表达1:

```
import pytest

data = [
  {'num': 1,'except': 1},
  {'num': -1,'except': 1},
  {'num': 0,'except': 0}
]

@pytest.mark.paramtrize('case', data)
def test_abs(case):
  assert case['except'] == abs(case['num'])
```

夹具表达2:

```
import pytest

data = [
  [1, 1],
  [-1, 1],
  [0, 0]
]

@pytest.mark.paramtrize('num,except', data) # 注意前面参数中间用逗号分隔但是不能有空格
def test_abs(num, except):
  assert abs['except'] == abs(case['num'])
```
