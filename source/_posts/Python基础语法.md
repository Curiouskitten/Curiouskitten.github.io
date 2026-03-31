---
title: Python基础语法
date: 2021-12-16 01:22:20
tags: python
cover: /img/python3.jpeg

---

总结的python基础语法，必须熟记和使用
(持续完善)

<!-- more -->
## 变量
变量是赋给值的标签；
变量是指向特定值
### 变量的使用和命名
- 变量只能包含字母，数字，下划线（_）：能以字母or下划线打头，但不可用数字打头
- 变量名不可包含空格
- 不要将python关键字与函数名用作变量名
- 变量名应既简单又具有描述性
- 慎用小写字母l和大写字母O，很容易看成1和0


## 字符串 string
赋值使用‘ ’or“ ”圈住内容
``` bash
s = 'hello world python'
```

打印字符串s的第一个字符
``` bash
print(s[0])
```
打印字符串s倒数第6个字符
``` bash
print(s[-6])
``` 
字符串的切片:取字符串s第1至第12个字符，每两个输出一个字符，()内区间，左闭右开
``` bash
print(s[0:12:2])
```
attention:input()输出的数据类型默认为字符串

### 字符串的格式化输出1:
%s:字符串 ---接受任何数据类型
%d:整数   ---仅支持数字
%f:浮点数 ---仅支持数字
%的作用是占坑，( )做格式化输出
``` bash
print(
    '''=====个人信息=====
    姓名：%s
    性别：%s
    年龄：%d
    身高：%f
    '''%('小七','女',18,160.5)
)
=====个人信息=====
    姓名：小七
    性别：女
    年龄：18
    身高：160.500000
```

### 字符串的格式化输出2:.format 有序和无序
{}占坑,字符串.format----->相对来说使用的比较频繁，例：
``` bash
print('''
=====个人信息=====
姓名：{}
性别：{}
年龄：{}
身高：{}
'''.format('七仔','女',20,165.3)
      )
=====个人信息=====
姓名：七仔
性别：女
年龄：20
身高：165.3
``` 

attention: 
1.{}跟数据的个数最好一致，如果不一致起码{}要比值的数量少；
2.()里面的值也是有索引的，也是从0开始，我们可以在{}指定取值的索引
3.可以在有些{}给定索引，有些{}不给定索引---->绝对不行！！！要给就全部给，不给就全部都不给

### python字符串的常用方法
find()函数：返回-1表示未找到子字符串，如果找到了就返回对应字符的 索引或字符串第一个字符的索引
子字符串包含了单个字符，或者是多个字符

``` bash
s = 'learn python in lemon'
print(s.find('n'))#返回找到的字符串的索引值>>>4
print(s.find('python'))#返回找到的字符串的第一个索引值>>>6
print(s.find('k'))#如果没找到，返回-1>>>-1
print(s.find('o',1))#寻找的目标子字符串：一个字符串中存在多个相同的字符，此处寻找第一个o
print(s.find('o',11))#寻找的目标子字符串：此处寻找第二个o
``` 

isdigit()函数：如果只包含数字，就返回True，否则返回False

``` bash
print('111'.isdigit())#>>>True
print('s'.isdigit())#>>>False
``` 

replace（）函数：指定替换内容以及被替换字符串，并且可以指定替换次数

``` bash
s[0] = 'k' 
#TypeError:'str',object does not support item assignment 不能根据索引重新指派

print(s[0])#>>>l
new_s = s.replace('n','k')
print(new_s)#>>>leark pythok ik lemok
renew_s = s.replace('n','k',1)#数字表示替换的次数，当需要替换的字符串有多个，不填写数字则默认全部替换，填写数字则进行对应次数替换
print(renew_s)#>>>leark python in lemon
```

split()函数：根据指定字符对字符串进行切割,可以指定切割的次数，默认是全部切割

``` bash
t = 'learn python in lemon'
print(t.split(' ',2)) #返回一个列表，列表里面的元素都是字符串,attention:这里指定空格为切割符；结果：['learn', 'python', 'in lemon']
print(t.split('l'))#结果：['', 'earn python in ', 'emon']，这里被用作切割符的字符串结果中不展示，第一个返回是个空字符串
``` 

strip()函数：去掉头或尾指定的字符，返回一个新的字符串

``` bash
a = '****learn python in lemon\n'#\n-python中的换行符
print(a)
a_2 = a.strip('*')
print(a_2)#>>>learn python in lemon\n
a_3 = a_2.strip('\n')
print(a_3)#>>>learn python in lemon
``` 

upper()函数：字符串字母转成大写
lower()函数：字符串的字母转成小写
swapcase()函数：字符串的字母大小写互换

``` bash
b = 'learn python in lemon'
print(b.upper())#>>>LEARN PYTHON IN LEMON
print(b.upper().lower())#>>>learn python in lemon
常用于不区分大小写限制
print(b.swapcase())#>>>LEARN PYTHON IN LEMON
``` 

## 数据类型_列表_list
python的数据类型之列表
列表的定义：
关键字：list（列表）
使用最频繁的数据类型，列表可以完成大多数集合类的数据结构实现
它支持字符，数字，字符串甚至包含列表（即嵌套）
列表用[]标识
有序数据

### 1.空列表
``` bash
t = []
print(type(t))#>>><class 'list'>
print(len(t))#>>>0
``` 

### 2.列表里面的数据用逗号隔开，数据可以是任意数据类型
``` bash
t = [1,0.03,False,True,'hello',(1,2,'python'),[1,0.5,False]]
print(type(t))#>>><class 'list'>
print(len(t))#>>>7
print(t[2])#>>>False
print(t[5][2][2])#>>>t
print(t[-1][-1])#>>>False
``` 

### 3.列表的操作：增删改查
列表的特性：有序可变
有序：说明有索引，索引也是从0/-1开始，也分正序和反序，索引规则同字符串
可变：说明列表可以做删 增 改
切片：同字符串切片规则，列表明[start:end:step]
#### 取值偶数位的元素
``` bash
print(t[0::2])#取到的还是列表>>>[1, False, 'hello', [1, 0.5, False]]
``` 

#### 列表进行倒叙输出
``` bash
print(t[::-1])#>>>[[1, 0.5, False], (1, 2, 'python'), 'hello', True, False, 0.03, 1]
``` 

attention：
列表与元祖的不同之处
1.元祖不可变，列表可变
2.元祖如果只有一个元素要记得加逗号，列表无这个操作
3.元祖 tuple() 列表 list[]

列表与元祖的相同之处：
1.有序 有索引
2.可以根据索引取值
3.切片的方法方式都是一样的


#### 增加元素
``` bash
t.append('test')
print(t)#>>>[1, 0.03, False, True, 'hello', (1, 2, 'python'), [1, 0.5, False], 'test']
t.append('测试')
print(t)#>>>[1, 0.03, False, True, 'hello', (1, 2, 'python'), [1, 0.5, False], 'test', '测试']
``` 

综上所述.append()默认追加元素到列表的末尾，每次只能添加一个元素

``` bash
t.insert(1,'insert')#可以插入到指定索引位置，原有的保留并往后挪一位>>>[1, 'insert', 0.03, False, True, 'hello', (1, 2, 'python'), [1, 0.5, False], 'test', '测试']
t.extend([1,2,3,4])#拓展列表的操作，合并列表，注意是合并而不是将列表作为一个值嵌套进列表中>>>[1, 'insert', 0.03, False, True, 'hello', (1, 2, 'python'), [1, 0.5, False], 'test', '测试', 1, 2, 3, 4]
s = [5,6,7]
t = t+s
print(t)#>>>[1, 'insert', 0.03, False, True, 'hello', (1, 2, 'python'), [1, 0.5, False], 'test', '测试', 1, 2, 3, 4, 5, 6, 7]
``` 

#### 删除元素
``` bash
t.pop()#默认删除最后一个元素
t.pop(i)#删除列表中指定位置的元素
t.pop(0)#删除列表中第一个值
t.clear()#移除列表里面的所有数据
t.remove(x)#删除指定元素
del t[0] # 根据索引删除表中的一个元素
del t[1:2] # 支持删除列表中的片段，既能删除一个元素，也能一次删除多个元素（原理和切片类似，左取右不取）
del t[:] # 清空表
``` 

#### 小练习
``` bash
# 过滤列表中的空值
text_str = 'https://hexo.io/zh-cn/docs/writing'
str_list = text_str.split('/')
print(str_list) # --> ['https:', '', 'hexo.io', 'zh-cn', 'docs', 'writing']

# 方法一： 使用filter函数；filter(None, ...)，会自动过滤掉 False 值（如 None、False、0、""、[]、{} 等）
str_list = list(filter(None, str_list))
print(str_list) # --> ['https:', 'hexo.io', 'zh-cn', 'docs', 'writing']

# 方法二：遍历列表，定位到想要去掉的字符串
filtered_data = [x for x in str_list if x is not None]
print(filtered_data)
```
#### 知识拓展：列表推导式
Python 中一种简洁、高效地创建列表的方法，它可以用一行代码替代传统的多行循环语句来生成列表。
表达式：
``` bash
[expression for item in iterable if condition]

```
expression：对每个元素的操作表达式
item：迭代变量
iterable：可迭代对象（如列表、元组、字符串等）
condition：可选的条件过滤（可以省略）

简单示例：
1、基本形式
``` bash
# 生成0-9的平方列表
squares = [x**2 for x in range(10)]
# 结果: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```
2、带条件的推导式
``` bash
# 只保留偶数的平方
even_squares = [x**2 for x in range(10) if x % 2 == 0]
# 结果: [0, 4, 16, 36, 64]
```
3、多重循环
``` bash
# 两个列表的元素组合
pairs = [(x, y) for x in [1, 2, 3] for y in [3, 1, 4] if x != y]
# 结果: [(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```

高级用法
1、嵌套列表推导式
``` bash
# 矩阵转置
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]

transposed = [[row[i] for row in matrix] for i in range(4)]
# 结果: [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```
2、字典推导式（类似语法）
``` bash
# 创建字典的平方映射
square_dict = {x: x**2 for x in range(5)}
# 结果: {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```
特点：
可读性：虽然列表推导式很强大，但过度复杂的推导式会降低代码可读性
内存：列表推导式会立即生成整个列表，对于大数据集考虑使用生成器表达式
变量作用域：Python 3中列表推导式有自己的作用域，不会影响外部变量



#### 修改元素，修改原有的值，赋值的方式 列表名[索引值]=新值
``` bash
t2[2] = False
print(t2)#>>>[1, 0.02, False, 'hello', (1, 2, 3, 'python'), [1, 0.02, False, ['hello']]]
``` 

#### 查：根据索引值取值，切片
.index()
.count()
``` bash
print(t2.index(1))
#括号内的值为列表中的元素，作用是确定元素所在的搜索位置,若存在相同元素，返回首先出现的元素位置>>>0
print(t2.count(0.02))
#统计列表中0.02这个元素的数量>>>1
```

百分百需要记住的函数：.append();.extend();insert()；.pop();

## 数据类型_元祖_tuple
元祖的定义：
特性：关键字 tuple()
它支持字符，数字，字符串甚至可以包含元祖（即嵌套）
元祖用（）标识
有序数据
t = ()#空元祖
``` bash
print(type(t))#>>><class 'tuple'>
print(len)#>>>0
``` 
t2 = (1,)#只有一个数据的时候注意取法
``` bash
print(type(t2))#>>><class 'tuple'>
print(t2)#>>>0
```

### 索引，索引取值，切片同字符串的方法
修改元祖的值：不可修改，元祖属于不可变数据
嵌套元祖，例：
``` bash
t3 = (1,0.03,True,'false',(4,5,6,'python'))
print(type(t3))#>>><class 'tuple'>
print(len(t3))#>>>5
```

### 元祖的特性：有序不可变
有序：说明有索引，索引也是从0/-1开始，也分正序和反序
不可变：说明元祖一旦确定，那么值就不能做变更；删 增 改都不支持
``` bash
print(t3[0])#>>>1
print(t3[-1])#>>>(4, 5, 6, 'python')
```

元祖里面的嵌套取值：根据索引一层一层的去定位
``` bash 
print(t3[-1][-1][0])#>>>p
```

### 元祖的切片：元祖名[start:end:step]
取值偶数位的元素
``` bash
print(t3[0::2])#取到的还是元祖>>>(1, True, (4, 5, 6, 'python'))
``` 

### 元祖进行倒叙输出
``` bash
print(t3[::-1])#>>>((4, 5, 6, 'python'), 'false', True, 0.03, 1)
``` 

### 元祖的常用方法：
index(x):获取x的索引值，获取元祖里面某个元素的索引值
count(x):统计x的个数
``` bash
print(t3.index(0.03))#>>>1
print(t3.count(1))#此处输出为2，why？因为存在布尔值True，布尔值中True == 1；false == 0；
``` 
## 数据类型_字典_dict
字典的定义：
关键字：dictionary（dict），除列表以外python之中最灵活的内置数据结构类型字典是无序的对象集合
标识：{}
无序数据，是除了列表之外，python中使用最多的数据类型
存储数据的形式： key:value
key:是唯一的且不可边变的数据（int float tuple boolen，str）
value:任何数据类型都支持

question1：如果key重复的话，会如何？
result：后面的值会把前面的值覆盖掉

### 空字典
``` bash
d = {}
print(type(d))#>>><class 'dict'>
``` 
### 定义一个字典 key:value
``` bash
d1 = {1:'no 1',
     0.02:'零花钱',
     True:'result',
     'name':666,
     (1,3):'tuple',
      'list':[2,3,4]
      }
print(d1)#>>>{1: 'result', 0.02: '零花钱', 'name': 666, (1, 3): 'tuple', 'list': [2, 3, 4]}
```
 
### 字典的无序
``` bash
print(d1)#每一次执行输出的时候都会变化顺序,随机的不好复现
``` 

### 字典的取值，根据key取值，字典名[key]
``` bash
print(d1[True])#>>>result
print(d1['list'][-1])#>>>4
``` 
可以直接将嵌套的列表直接转换成字典
``` bash
sample_list = [["key1", "value1"], ["key2", [1, 2]]]
print(dict(sample_list))

## result
{'key1': 'value1', 'key2': [1, 2]}
```

### key的唯一
key必须是唯一的不重复的，如果出现重复的，则后面的值会把前面的值覆盖掉
字典也是用来存储数据的，那么何时使用字典？
当值需要成对存储的时候，可以理解为数据库

### 字典的操作，增，删，改，查询
#### 查：根据key来查询
字典嵌套字典
字典嵌套元祖
字典嵌套列表
``` bash
d2={'class':'python15',
    'teacher':['小明','小红','小刚','小白'],
    'vip':{'A':'小红','B':'小明','c':'小白'},
    'score':(88,99,100),
    'test':2334,
    'test02':'hello'
   }
取小明的值：方法一层一层的取定位，根据key
print(d2['vip']['B'])#>>>小明
取最后一个老师的名字:
print(d2['teacher'][-1])#>>>小白
取倒数第二的分数
print(d2['score'][-2])#>>>99
``` 

#### 增
``` bash
d[不存在的key] = 新值
```

#### 改
``` bash
d[已有的key] = 新值
d2['vip']['A'] = '小刚'
print(d2['vip']['A'])#>>>小刚
print(d2)#{'class': 'python15', 'teacher': ['小明', '小红', '小刚', '小白'], 'vip': {'A': '小刚', 'B': '小明', 'c': '小白'}, 'score': (88, 99, 100), 'test': 2334, 'test02': 'hello'}
``` 

#### 删除
``` bash
d.pop('vip')#根据key删除--删除键值对
d.clear()#清空字典
d.popitem()#随机删除某个键值对
```

### 其他用法
#### items():以列表返回可遍历的（键，值）元组数组
``` bash
print(d2.items())
#>>>dict_items([('class', 'python15'), ('teacher', ['小明', '小红', '小刚', '小白']), ('vip', {'A': '小刚', 'B': '小明', 'c': '小白'}), ('score', (88, 99, 100)), ('test', 2334), ('test02', 'hello')])
``` 

#### keys():以列表返回一个字典所有的键
``` bash
print(d2.keys())
#>>>dict_keys(['class', 'teacher', 'vip', 'score', 'test', 'test02'])
```

#### values()：以列表返回一个字典所有的值
``` bash
print(d2.values())
#>>>dict_values(['python15', ['小明', '小红', '小刚', '小白'], {'A': '小刚', 'B': '小明', 'c': '小白'}, (88, 99, 100), 2334, 'hello'])
```

#### pop(key)：删除指定key的字典值，会返回被删除的这个值
``` bash
print(d2.pop('test02'))#>>>hello
``` 

#### del 字典名[key]:删除指定key的字典值
``` bash
del d2['teacher']
print(d2)
>>>{'class': 'python15', 'vip': {'A': '小刚', 'B': '小明', 'c': '小白'}, 'score': (88, 99, 100), 'test': 2334}
``` 

## 数据类型_集合_set
集合的定义：
关键字：set（集合）-{1,"value",[1, 2]}
一种成员不可重复的数据序列。与列表一样，可以包含任意的数据类型，与列表不同的是，集合中的元素不可重复。
集合的这种特性通常会用于去重。
``` bash
sample_1 = [1, 2, 1, "python", 2.14, "python", True, True]
print("集合去重", set(sample_1))
```
结果：集合去重 {1, 2, 2.14, 'python'}
综上，set可以对str，int，float进行去重
attention：创建一个空集合必须用 set() 而不是 {}，因为 {} 是用来创建一个空字典
``` bash
# 添加元素
s.add( x )
# 还有一个方法，也可以添加元素，且参数可以是列表，元组，字典等：
s.update( x )
    
```

## 数据类型转换
不同的数据类型以及他们不同的特点可以实现不同的编程需求，之间也有相通之处，部分数据类型之间可以相互转换，具体可以分为四大类。
同一主类型的数据类型之间的转换
数据结构相似或等效的数据类型之间的转换
其他数据类型与字符串之间的转换
同一数据类型的形式转换

第一类：Number子数据类型，如：float、boolean可以转换成int，int也可以转换成float。
``` bash
# 类型
print(type(int(1.1)))       # <class 'int'>
print(type(int(True)))      # <class 'int'>
print(type(int(False)))     # <class 'int'>
print(type(float(1)))       # <class 'float'>
print(type(float(True)))    # <class 'float'>
print(type(float(False)))   # <class 'float'>

# 结果值
print(1.1)              # 1
print(int(True))        # 1
print(int(False))       # 0
print(float(1))         # 1.0
print(float(True))      # 1.0
print(float(False))     # 0.0
```
从结果上看，float转换成int时会丢失小数点后面的部分。True和False本身也可以用1和0表示，在判断条件中while True = while 1，if 0 = if False
上面的代码之所以可以挣奶茶给你的工作是因为传递了可转换的数据类型，如果传递的是不可转换的数据类型，就会报系统错误。例如，传递一个字符串类型给这个两个函数，就会得到ValueError

第二类：具有相似结构数据的数据类型，如：list，tuple，dict，set。这些均为序列对象，可以包含其他数据类型作为成员，且在成员组织的结构上具有相似性或可转换性。
``` bash
print(type(tuple([1, 2, 3, 2])))            # <class 'tuple'>
print(type(tuple({1, 2, 3, 4, 2})))         # <class 'tuple'>
print(type(tuple({1: 11, 2: 22, 3: 33})))   # <class 'tuple'>
print(type(list([1, 2, 3, 2])))             # <class 'list'>
print(type(list({1, 2, 3, 4, 2})))          # <class 'list'>
print(type(list({1: 11, 2: 22, 3: 33})))    # <class 'list'>
print(type(set((1, 2, 3, 2))))              # <class 'set'>
print(type(set([1, 2, 3, 4, 2])))           # <class 'set'>
print(type(set({1: 11, 2: 22, 3: 33})))     # <class 'set'>
print(type(dict(((1, 11), (3, 33)))))       # <class 'dict'>
print(type(dict([[2, 22], [4, 44]])))       # <class 'dict'>
print(type(dict([{5, 55}, {6, 66}])))       # <class 'dict'>


print(tuple([1, 2, 3, 2]))                  # (1, 2, 3, 2)
print(tuple({1, 2, 3, 4, 2}))               # (1, 2, 3, 4)
print(tuple({1: 11, 2: 22, 3: 33}))         # (1, 2, 3)
print(list([1, 2, 3, 2]))                   # [1, 2, 3, 2]
print(list({1, 2, 3, 4, 2}))                # [1, 2, 3, 4]
print(list({1: 11, 2: 22, 3: 33}))          # [1, 2, 3]
print(set((1, 2, 3, 2)))                    # {1, 2, 3}
print(set([1, 2, 3, 4, 2]))                 # {1, 2, 3, 4}
print(set({1: 11, 2: 22, 3: 33}))           # {1, 2, 3}
print(dict(((1, 11), (3, 33))))             # {1: 11, 3: 33}
print(dict([[2, 22], [4, 44]]))             # {2: 22, 4: 44}
print(dict([{5, 55}, {6, 66}]))             # {5: 55, 66: 6}
```
综上，list，tuple，set，dict之间可以互相转换。只是其他数据类型转换成dict类型时，只会取键值对的键内容；
list，tuple转换为set类型时，若存在重复成员，会去重。
值得注意的是，最后一行，输出结果并不像预期的一样为{5:55, 6:66}，而是{5: 55, 66: 6}。因为set本身是无序的，set的成员在内存中的顺序不一定会与书写代码时的顺序一致。

第三类：其他类型与字符串之间的转换。
在python中一切皆是对象，数据类型也不例外，而python中所有对象都可以转换成字符串的形式。
``` bash
int_sample = 1
float_sample = 1.1
boolean_sample = True
complex_sample = 3.14j
tuple_sample = (1, 2, 3)
list_sample = [1, 2, 3]
set_sample = {1, 2, 3}
dict_sample = {"number1": 1, "number2": 2}
print(type(str(int_sample)))
print(type(str(float_sample)))
print(type(str(boolean_sample)))
print(type(str(complex_sample)))
print(type(str(tuple_sample)))
print(type(str(list_sample)))
print(type(str(set_sample)))
print(type(str(dict_sample)))
```
字符串也可以转换为其他数据类型，可以使用数据类型函数，但是更推荐eval函数。其效果就是动态的执行一个字符串值代表的表达式。
``` bash
sample1 = eval('{"number1": 1, "number2": 2}')
sample2 = eval('[1,2,3]')
sample3 = eval('10')
print(sample1, type(sample1))
print(sample2, type(sample2))
print(sample3, type(sample3))
```

第四类数据类型转换，特指同一数据类型之间的转换。如：int数据类型可以有十进制，二进制，八进制，十六进制等多种形式的存在。
``` bash 
print(hex(10), type(hex(10)))       # 0xa <class 'str'>
print(oct(10), type(oct(10)))       # 0o12 <class 'str'>
print(bin(10), type(bin(10)))       # 0b1010 <class 'str'>
print(int(0x10), type(int(0x10)))   # 16 <class 'int'>
print(int(0o10), type(int(0o10)))   # 8 <class 'int'>
print(int(0b10), type(int(0b10)))   # 2 <class 'int'>
```

attention: 虽然Python中基本的数据类型之间支持转换，但并非全部类型都支持相互转换，既有单向转换，也有双向转换。部分数据类型在转换的时候可能会丢失部分数据，使用时需要留意。

## python运算符
python语言支持以下类型的运算符：
算数运算符--must
比较（关系）运算符---must
赋值运算符---must
逻辑运算符---must
成员运算符---must
位运算符
身份运算符
运算符优先级

### 算术运算符：+，-，*, /, %
``` bash
a = 10
b = 5
print(a+b)#>>>15
print(a*b)#>>>50
```

#### + 字符串的拼接，列表的拼接
乘法：对字符串列表 元组 要输出多次
``` bash
s_1='hello'
s_2=[1,2,3]
print(s_1*3)#>>> hellohellohello
print((s_1+' ')*3)#>>> hello hello hello
print(s_2*2) #>>>[1, 2, 3, 1, 2, 3]
```

#### % 模运算 取余运算
``` bash
5/4 商1余下1
print(5%4)#>>>:1
5/3 商1余2
print(5%3)#>>>2
print(5/4)#>>>1.25
```

作用：判断奇数偶数的
例：
``` bash
x = int(input("请输入一个整数："))#一定要定义函数数据类型（格式化# ）
if x <= 0:
    print("请输入大于0的整数！")
else:
    y = x%2
    if y == 0:
        print("您输入的是偶数")
    else:
        print("您输入的是奇数")

x%2的值是0 则说明x是偶数
x%2的值为1 则说明x是奇数
``` 

判断数据类型：
``` bash 
number = int(input("请输入一个数字："))
if type(number) == int:
    if number == 0:
        print("请输入大于0的整数！")
    else:
        result1 = number%2
        if result1 == 0:
            print("您输入的是偶数")
        else:
            print("您输入的是奇数")
else:
    print("您输入的不是正整数！")
#-----以上代码有个很大的问题，input()输出的值的数据类型为字符串，所以即使输入的是2，2的数据类型不是int，而是str

nub = int(input())
practise：上述的循环没有有效的判断出数据的类型，尝试判断数字是正数还是负数
``` 

### 比较（关系）运算符：
6种比较关系：>,>=,<,<=,==,!=
``` bash
nub1 = 10
nub2 = 2
print(nub1 > nub2)#>>>True
print(nub1 >= nub2)#>>>True
print(nub1 == nub2)#>>>False
print(nub1 != nub2)#>>>True
print(nub1 < nub2)#>>>False
print(nub1 <= nub2)#>>>False
```

python是区分大小写的！
``` bash
print('get' == 'Get')#>>>False
print(False == 0)#>>>True  0等同于False，1等同于True（主要用于判断语句）
```
### 赋值运算符 = += -=
``` bash
x=6
print(x)#>>>6
y=1
y+=1#即y=y+1
print(y)#>>>2
z=3
z-=1#即z=z-1>>>2
print(z)#>>>2
```

## if判断
if 判断条件:
    执行语句....
else:
    执行语句....

if 判断语句1:
    执行语句1....
elif 判断语句2:
    执行语句2....
else:
    执行语句3....

for example:
``` bash
score = 90
if score >=90:
    print('优秀！')
elif score >= 80:
    print('良好！')
elif score >=60:
    print('及格')
else:
    print('不及格')
``` 
if条件判断语句里面，一定会有if开头，如果是多重判断我们可以引用elif 最后一种默认处理
但是else elif都不是必须的，根据业务场景
if, elif后面必须加判断条件
else后面不能加判断条件

练习：利用random函数生成随机整数，从1-9取出来，然后输入一个数字，来猜，如果大于，则打印bigger。小了，则打印less
``` bash
random.randint(1,10) #产生 1 到 10 的一个整数型随机数 
random.random()         #产生 0 到 1 之间的随机浮点数
random.choice('tomorrow')  #从序列中随机选取一个元素
random.randrange(1,100,2)  #生成从1到100的间隔为2的随机整数

import random #一定要写这个
r = random.randint(1,9)
NUM = int(input('请输入一个整数：'))

if NUM > r:
    print('bigger')
elif NUM == r:
    print('equal')
else:
    print('less')
print(r)
```

## for循环
用于遍历一个集合
基本形式:
for 变量 in 集合：
	执行语句

for 变量 in 集合：
	执行语句1
else:
	执行语句2
通常与range()函数一起使用，range()返回一个列表，for…in…遍历这个列表中的元素
for example:
``` bash
for i in range(10):
	print(“循环10次”)

for j in range(-1,2): #for循环也遵从左闭右开的规则，即这里j循环赋值会=-1，但是不会等于2
	if j > 0:
		print(“正数:”,x)
	elif j == 0:
		print(“零”,o)
	else:
		print(“负数”,x)
else:
	print(“循环结束”)

# for循环也支持（start:end:step），同时遵从左闭右开的规则，如下从0开始遍历到10，每隔2个取一个值，10结束且不取
for h in range(0,10,2):
    print(h)
# ---->>>> 0 2 4 6 8
```

## while循环
while循环：用于循环执行程序，在某个条件下，循环执行某段程序，以处理需要重复处理的相同任务。
基本形式：
while 判断条件：
执行语句....

判断条件：可以是比较，逻辑，成员，True，False 0，1，非空数据，空数据
最终要的依据:判断条件的结果，到底是True 还是False
执行逻辑，先判断条件，再根据条件的值，决定是否要执行下面的代码块
执行完毕 会再次判断while后面的条件，决定是否要执行下面的代码块
True 死循环
False 不会执行while下面的代码块
0 就相当于False，所以不会执行while下面的代码
1 相当于True，会进入死循环
[]/{}/()/'' 不会执行while下面的代码#即为False
[1]/(1,2)/{"name":"python"}  死循环#即为True
什么也不填 报错。while后面必须要填写一个条件

综上所述，while后面的条件一直为真，则会陷入死循环；同理，条件一直为False则永远不进入循环体内

如何防止进入死循环以及无法进入while循环呢
解决方案：
1.while后面的条件不为恒定值：让while后面的条件随着循环执行的次数变化而变化
    1)引入变量，并在内部实现变量的递增或递减
    2)变量与while后面的条件相结合

2.while后面的条件为恒定值
    1)引入continue 和 break
    2)添加内部判断条件

9.break&continue 

practice：
我要循环三次
变量自减，在恒定true的情况下，在循环的内部添加判断条件，达到可控的循环（避免死循环）
``` bash
count=3
while True:
    print('这个是python_while循环条件下的语句')
    count -=1#每执行一次都会减1
    print(count)
    if count>0:
        continue#结束本次循环，继续下一次循环
    else:
        break#结束循环
```

## 抛出异常
知识点：
try…except…finally语句
raise语句
assert语句
自定义异常
程序调试
在python3中，BaseException是所有异常的基类，所有的内置异常都是它的派生类。用户自定义的异常也应该继承它。常见内部异常：
1.AssertionError>assert语句失败时出发；
2.AttributeError>属性引用和属性赋值异常
3.ImportError>导入异常，点那个import语句或from语句无法再模块中找到相应文件名称时触发
4.NameError>名称异常，在局部或全局空间中无法找到文件名称时触发
5.SyntaxError>语法错误
6.SystemError>编译器内部错误
7.TypeError>当操作或者函数应用找不到合适的类型时触发

### try…except…
	try:#尝试读取一个不存在的文件
		open(“hello.txt”,“r”)
	except FileNotFoundError:#捕获FileNotFoundError异常
		print(“文件不存在”)
	excrpt:#	其他异常情况
		print(“程序异常”)
异常处理语也可以嵌套：
	try:
		s =“hello”
		try:
			print()
			print()
		Except TypeError:
			Print(“字符串不支持减法运算”)
	except:
		Print(“异常”)
attention：若外层try子句中的代码块引发异常，程序将直接跳转到外层try对应的except子句，而内部的try语句不会被执行。
	try:
		执行语句
	except FileNotFoundError:#捕获指定异常
		执行语句
finally:#无论异常是否发生finally子句都会被执行
	执行语句



## 文件操作
### 什么是文件？
文件是数据的集合和抽象
文件类型：1.文本文件；2.二进制文件
文件本质上都是存储在存储器上的二进制数据
### 字符编码：
1.ascii码—最先发明的字符编码（一个字符占据一个字节）；
2.gb2312:简体中文字符集；
3.gbk（对gb2312的优化）；
4.unicode：纳入世界上所有符号，但是效率不高；
5.utf-8:为了提高unicode效率，现在最常用的编码方式

### open()函数
指定处理模式，设置打开的文件为只读，只写，或可读写状态。
open(file,mode=’’,buffering=-1,encoding=None,errors=None,newline=None,closed=True,opener=None)
参数：
file->预打开的文件名，若文件不存在，open()将创建文件，如“test.txt”or 指定文件放置的位置“/user/Desktop/test.txt”
	mode->文件的打开模式，
“r”->以只读的方式打开文件；
“r+” ->以读写的方式打开文件;
“w”->以写入的方式打开文件;删除文件内容，重新写入，若文件不存在则新建文件
“w+” ->以读写的方式打开文件;删除文件内容，重新写入，若文件不存在则新建文件
“a” ->;以写入的方式打开文件，在文件末尾追加新的内容，若文件不存在则新建文件
“a+” ->;以读写的方式打开文件，在文件末尾追加新的内容，若文件不存在则新建文件
“b” ->;以二进制模式打开文件，可与r，w，a，结合使用
“U” ->支持所有换行符号。“\r”,”\n”,”\r\n”都表示换行

和mode组合的字符：
“b”二进制模式，例如：“rb”表示二进制读取
“t”文本模式（默认），例如：rt一般省略t
“+”读取写入，例如“r+”表示同时读写


1.基本操作：
创建一个名为test.txt的文本文件，（注意编码方式）文件中写入一下内容
``` bash 
窗前明月光，疑是地上霜。举头望明月，低头思故乡。
```
打开文件mode = rt,t可以省略
``` bash
fb = open(‘test.txt’，‘r’，encoding=‘utf-8’)
#读取
content = fb.read()
print(content)
#关闭文件
fb.close()
```
attention:上面这种操作经常因为忘记关闭文件句柄，造成资源浪费，所以处理文件是往往使用with语句进行上下文管理。

2.with上下文管理
``` bash
with open(‘test.txt’，‘r’，encoding= ‘utf-8’)  as fb:
	content = fb.read()
	print(content)
```

3.逐行读取readline
从文件中读取一行，如果f.readline()返回一个空的字符串，表示已经达到了文件末尾
``` bash
with open(‘test.txt’，‘r’，encoding= ‘utf-8’)  as fb:
	print(fb.readline())
```
readlines>>>以列表形式返回所有行
``` bash
with open(‘test.txt’，‘r’，encoding= ‘utf-8’)  as fb:
	content = fb.readlines()
	print(content)
```
迭代:要从文件中读取行，也可以循环遍历文件对象，这使内存高效，快速的，并简化代码。
``` bash
with open(‘test.txt’，‘r’，encoding= ‘utf-8’)  as fb:
	for line in fb:
		print(line)
``` 

4.读二进制文件
任何文件都可以以二进制读的方式打开
``` bash
with open(‘test.txt’，‘rb’)  as fb:
	content = fb.read()
	print(content)
```
mode = rb，不需要encoding参数

5.写文本文件_清除写w
``` bash
with open(path,'a',encoding='utf-8') as f:
	f.write(name + '\n')
        f.writelines(text)
        f.write('\n\n')
w会清除原文件内容重新写入

6.写文本文件_追加写_a

7.写文本文件_排他写x：当写入的文件存在则不创建，报错->>>file exists：‘test.txt’

8.写二进制文件：wb；这种模式下写入内容为字节数据

9.文件指针：open函数返回的文件对象使用文件指针来记录当前在文件中的位置

10.read方法：在读模式下，使用文件对象的read 方法可以读取文件的内容，接受一个整数参数表示读取内容的大小，文本模式下表示字符数量，二进制模式下表示字节大小。
``` bash
	with open(‘test.txt’，‘r’，encoding= ‘utf-8’)  as fb:
		content = fb.read(3)
#>床前明
```

11.tell方法：返回整数，表示文件指针距离文件开头的字节数
``` bash
	with open(‘test.txt’，‘r’，encoding= ‘utf-8’)  as fb:
		print(fb.tell())#>>>0
		content = fb.read(3)
		print(content)
		print(fb.tell())#>>>9
```
12.seek方法：移动文件句柄
``` bash
	seek(offset= ;whence=0)
	offset：偏移指针的字节数
	whence：表示便宜参考，默认为0
		0>>>表示偏移参考文件的开头，offset必须是=>0的整数
		1>>>表示偏移参考当前位置，offset可以是负数
		2>>>表示偏移参考文件的结尾，offset一般是负数
``` 
## 模块(model)&包(packge)&函数(function)
### 模块概念
模块是一个包含python定义和语句的文件，文件名就是模块名后跟文件后缀.py
（一个文件即一个模块）

	导入模块1：import 模块名
	for example:import requests;
	使用模块中的函数：（在导入模块前提下）
	res = requests.get(url=,headers=,params=)
	此方法：当前变量表中，不会直接定义导入的模块的函数名，他只定义了模块名，所以使用函数则是通过模块名访问函数
	
	导入模块2：from 模块名 import 函数名
	For example:from fibo import fib,fib2
	此方法：并不会把被调模块引入当前的变量表中，而是将函数fib，fib2引入，可直接访问两个函数
	
	导入模块3：from 模块名 import *
	此方法：导入模块中定义的所有名称（函数名，变量，类名）
	
	导入模块4：from 模块名 as 新名称
				from 模块名 import 名称 as 新名称

### 包的概念
模块的问题解决了代码过长不便于维护的问题，为避免模块名冲突，python又引入了用目录来组织模块的方法，包
for example:创建名为my_package的文件夹，将模块my_model.py放入该文件夹下，则可通过import my_package.my_model 来引入，目的：避免程序中不同包下存在不同的模块，避免引入模块时冲突。


### 函数概念
具备一定功能，可重复使用的语句，用函数名来表示并通过函数名进行调用，每次使用函数可以提供不同的参数作为输入，以实现对不同数据的处理。

#### 函数调用的过程
1.调用程序在调用处暂停执行；
2.在调用时将实参赋值给函数的形参；
3.执行函数体语句；
4.函数调用结束给出返回值，程序回到调用前的暂停处继续执行
def ->>python中定义函数的关键字
def 函数名(参数列表)：
	函数体
	return 返回值列表

#### 函数的参数
##### 形参：
必须参数：定义函数时，调用者必须传递实参给这个形参，他就是必须参数，直接定义在函数名后()中的形参就是必须参数。
默认参数：定义函数时，某些形参可能在调用时不用接收实参，这种情况可以定义为默认参数，在函数名后()，以参数名=默认值的形式定义的形参就是必须参数，默认参数必须定义在必须参数的后面
For example:定义一个函数，它接收两个参数content和times，content是函数需要打印的内容，times是函数打印的次数，若不传递times则默认打印一次。
``` bash
	def my_print(content,times=1):  #定义函数
		for i in range(times):
			Print(content)
	my_print(‘happy birthday!’)	#调用，不写入times值
	#>>> happy birthday!
	my_print(‘happy birthday!’,2)  #调用，指定times值
	#>>> happy birthday!
		 happy birthday!

##### 不定参数
在定义函数时，不确定在调用时会传递多少个实参，可定义不定参数
位置不定参数：
在形参前加*号可以定义位置不定参数，通常定义为*args
用来接收函数调用时，以位置参数传递过来的超过形参数量的多余的参数
不定参数必须定义在默认参数后面
for example:
``` bash
def add(x,y,*args):
	x += y
	for i in args:
	x += i
	print(x)
add(1,2,3,4)#>>> 10
```
##### 关键字不定参数
在形参前加**号可以定义关键字不定参，通常定义为**kwargs
用来接收函数调用时，以关键字参数传递过来的超过形参的多余的实参
for example:
``` bash
def func(a,**kwargs):
	print(kwargs,type(kwargs))
func(a=1,b=2,c=3,d=4)
#>>>{‘b’=2,’c’= 3,’d’=4}<class’dict’>
```			

##### 实参：
1.位置参数：调用函数时，传递实参时默认会按照形参的位置一一对应，这种实参传递叫做位置参数
for example:
``` bash
def my_power(x,n):
	print(x**n)#x的n次幂
my_power(3,2)
#>>>9
```

2.关键字参数：调用函数时，传递实参时以 形参名=实参 的形式传递参数，叫做关键字参数
for example:
调用上方函数：
``` bash
my_power(x=2,n=3)
#>>>8
```

3. *；**在传递实参时的用法
*解包：在传递实参的时候，可以通过*对迭代对象(列表)进行解包
for example：
``` bash
def fun(a,b,*arg):
fun(*ls)#>>>1 2 (3, 4, 5, 6)
```

**解包：在传递实参时候，可以通过**对字典对象进行解包
``` bash
def fun(a,b,**kwargs):
    	print(a,b,kwargs)
dic = {'a':1,'b':2,'c':3,'d':4}
fun(**dic)#>>>1 2 {'c': 3, 'd': 4}
```

##### 返回值return
Python中使用return关键字来退出函数，返回到函数被调用的地方继续往下执行
函数中可以没有返回值，也就是说函数中可以没有return语句，这时函数返回None
for example：
``` bash
def add(x,y,*args):
	x += y
	for i in args:
		x += i
	return x 
res = add(1,2)
print(res)
#>>>3
```

#### Lambdah函数
用来定义简单的，可以在一行内表示的函数(用的少)
语法格式：lambda arg1,arg2,… : expression

#### 变量作用域：局部变量；全局变量
global关键字：有时候需要在函数内部修改全局变量。使用globals关键字可以在函数内部修改全局变量

for example：
``` bash
a = 1
def fun():
	global a 
	a += 1
fun()
print(a)
#>>>2
```
## 面向对象编程
涉及“类与对象”知识，【类】是【对象】的母板，得先有了类，我们才能制造各种“对象”。就像我们先有了产品图纸，才能制造各种产品一样。
### 类是一个函数包
类中可以放置函数和变量，然后类中的函数可以很方便的使用类中的变量。
就像我们可以用def语句来自定义一个函数，我们用class语句来自定义一个类。既然【类】是一个函数包，所以一个类中可以放置一堆函数。
``` bash
# 语法：创建一个名为“ClassName”的类，类名一般首字母要大写，(): 不能丢   
class ClassName():
# 如定义一个名为'狗'的类，可以写成class Dog():
    # 规范：class语句后续的代码块要缩进  
    def function1():
        print("函数1")
    # 定义类中的函数1
    def function2():
        print("函数2")
    def function3():
        print("函数3")
```
在类中被定义的函数被称为类的【方法】，描述的是这个类能做什么。我们使用类名.函数名()的格式，就可以让类的方法运行起来。
``` bash
class A():
    def function1():
        print('我是类A的第一个方法！')
    def function2():
        print('我是类A的第二个方法！')
    def function3():
        print('我是类A的第三个方法！')

A.function1()
# >>>我是类A的第一个方法！
A.function2()
# >>>我是类A的第二个方法！
A.function3()
# >>>我是类A的第三个方法！
```
除了函数外，在类中还可以放置一堆变量,在类中被定义的变量被称为类的【属性】。使用类名.变量名的格式，可以把类中的属性的值提取出来。
类中的属性（变量）可改变，使用类名.变量名的格式，可以让我们在类的外面，增加或修改类的属性：
``` bash
class A():
    A_1 = 100
    A_2 = -5.83
    A_3 = 'abc'

# 这里需要用print语句，才能把提取出的数值打印到屏幕上
print(A.A_1)
# >>>100
print(A.A_2)
# >>>-5.83
print(A.A_3)
# >>>abc

# 更改类属性
A.A_1 = 99
A.A_4 = '新增一个变量'

print(A.A_1)
# >>>99
print(A.A_4)
# >>>新增一个变量
```

当类中放置了函数和变量，类就有了方法(类中的函数)和属性(类中的变量)
类方法也是函数，与单独定义函数有什么区别？
最大的区别：
1、调用格式：类.函数名()比函数名()多了一个【类.】
2、“类”中的函数可以利用“类”中的变量（也就是类方法可以调用类属性）。
``` bash
class A():
    A_1 = 100
    A_2 = -5.83
    A_3 = 'abc'
    @classmethod
    def function1(cls):
        print(cls.A_1)

A.function1()
# >>>100
```
@classmethod是声明下面的函数是类方法
cls的意思是class的缩写。如果类方法function1想使用类属性（也就是类中的变量），就要写上cls为function1的第一个参数，也就是把这个类作为参数传给自己，这样就能被允许使用类中的数据。
cls.变量。类方法想使用类属性的时候，需要在这些变量名称前加上cls.
三者配合使用，缺一不可。

### 给类传参
``` bash
def add_100(num):
    sum = num + 100
    print('计算结果如下：')
    print(sum)

num = 1
add_100(num)
```
类方法和函数类似，也可以传递参数
``` bash
poesy = ['《卜算子》','我住长江头，','君住长江尾。','日日思君不见君，','共饮长江水。']

class ReadPoesy():
    def read_func(param):
        for i in param:
            print(i)

ReadPoesy.read_func(poesy)

```
和函数不同的是，类方法还可以利用类属性作为参数，也就是从类的内部给自己传递参数
``` bash
class ReadPoesy():
    poesy = ['《卜算子》','我住长江头，','君住长江尾。','日日思君不见君，','共饮长江水。']
    
    @classmethod
    def read_func(cls):
        for i in cls.poesy:
            print(i)

ReadPoesy.read_func()
```
类方法可以同时使用内部参数和外部参数
``` bash
class PlusClass():
    class_var = 100

    @classmethod
    def plus_func(cls, param):
        sum_res = cls.class_var + param
        print('加100函数计算结果如下：')
        print(sum_res)


param = int(input('请输入一个整数：'))
PlusClass.plus_func(param)

```

### 增加&修改类属性
有两种途径来增加或修改类属性。一种是从外部，用类.变量 = xx直接增加/修改类属性，另一种是从内部，用类方法去增加/修改；
方法1:从外部直接增加/修改类属性
``` bash
class 类A():
    pass


类A.变量1 = 100
print(类A.变量1)
```
类A()是一个空类（里面的pass语句代表“什么都不做”），利用类A.变量1，我们在外部给类A()添加了一个类属性变量1，然后使用print语句把类属性打印了出来。
``` bash
class 幸运():
    @classmethod
    def 好运翻倍(cls):
        print("好的，我把它存了起来，然后翻了888倍还给你：%d"%(cls.幸运数*888))

幸运.幸运数 = int(input("你的幸运数是多少？请输入一个整数"))
幸运.好运翻倍()
```

方法2:
``` bash
class 类():
    @classmethod
    def 增加类属性(cls):
        cls.变量 = input('请随意输入字符串：')

类.增加类属性()

print('打印新增的类属性：')
print(类.变量)

```
直接通过类方法类.增加并打印类属性()接收外部输入的字符串，然后新增为类属性
``` bash
class 成绩单():
    @classmethod
    def 录入成绩单(cls):
        cls.学生姓名 = input('请输入学生姓名：')
        cls.语文_成绩 = int(input('请输入语文成绩：'))
        cls.数学_成绩 = int(input('请输入数学成绩：'))

    @classmethod
    def 打印成绩单(cls):
        print(cls.学生姓名 + '的成绩单如下：')
        print('语文成绩：%d' % (cls.语文_成绩))
        print('数学成绩：%d' % (cls.数学_成绩))

    @classmethod
    def 打印平均分(cls):
        平均分 = (cls.语文_成绩 + cls.数学_成绩)/2
        print('%s的平均分是%d：'%(cls.学生姓名, 平均分))
        
    @classmethod
    def 评级(cls):
        平均分 = (cls.语文_成绩 + cls.数学_成绩)/2
        if 平均分 >= 90:
            print("%s的评级是:优"%(cls.学生姓名))
        elif 平均分 >= 80 and 平均分 < 90:
            print("%s的评级是:良"%(cls.学生姓名))
        elif 平均分 >= 60 and 平均分 < 80:
            print("%s的评级是:中"%(cls.学生姓名))
        else:
            print("%s的评级是:差"%(cls.学生姓名))
            
成绩单.录入成绩单()
成绩单.打印成绩单()
成绩单.打印平均分()
成绩单.评级()
```

类方法不但能调用类属性，还能直接调用其他类方法
基于上述例子，修改脚本为直接调用类中的其他方法
``` bash
class 成绩单():
    @classmethod
    def 录入成绩单(cls):
        cls.学生姓名 = input('请输入学生姓名：')
        cls.语文_成绩 = int(input('请输入语文成绩：'))
        cls.数学_成绩 = int(input('请输入数学成绩：'))

    @classmethod
    def 打印成绩单(cls):
        print(cls.学生姓名 + '的成绩单如下：')
        print('语文成绩：%d' % (cls.语文_成绩))
        print('数学成绩：%d' % (cls.数学_成绩))

    @classmethod
    def 计算平均分(cls):
        平均分 = (cls.语文_成绩 + cls.数学_成绩)/2

    @classmethod
    def 打印平均分(cls):
        print('%s的平均分是：%d' % (cls.学生姓名, cls.计算平均分()))
        
    @classmethod
    def 评级(cls):
        平均分 = cls.计算平均分()
        if 平均分 >= 90:
            print("%s的评级是:优"%(cls.学生姓名))
        elif 平均分 >= 80 and 平均分 < 90:
            print("%s的评级是:良"%(cls.学生姓名))
        elif 平均分 >= 60 and 平均分 < 80:
            print("%s的评级是:中"%(cls.学生姓名))
        else:
            print("%s的评级是:差"%(cls.学生姓名))
            
成绩单.录入成绩单()
成绩单.打印成绩单()
成绩单.打印平均分()
成绩单.评级()
```
为了便于观看上述例子使用中文命名，如此并不符合代码规范，类命名遵循大驼峰，即每个单词首字母大写：class BaseCase()

### 类与对象
【类】是【对象】的模板。得先有了类，我们才能制造各种“对象”。
以上说的【对象】，都是指【实例对象】。我们可以以【类】为模板，多次复制，生成多个【实例对象】。
Python中，万事万物都可以是对象，【类】这种模板层级的本身也是【对象】，但并不是【实例对象】。
从【类】变成【实例对象】的过程，就叫做【实例化】。
如何得到【实例】，如何使用【实例】，使用【实例】和直接使用【类】有什么区别？
1、格式是不同

cls代表“类”的意思，self代表“实例”的意思，这样写是编码规范（程序员们的共识），但不是强制要求。理论上只要写个变量名占位，写什么都行，比如把self写成bbb：
``` bash
class 智能机器人():
    胸围 = 33
    腰围 = 44
    臀围 = 55
    
    def 自报三围(bbb):
        print('主人，我的三围是：')
        print('胸围：' + str(bbb.胸围))
        print('腰围：' + str(bbb.腰围))
        print('臀围：' + str(bbb.臀围))
        print('哈哈哈哈哈，下面粗上面细，我长得像个圆锥。')


a = 智能机器人() # 实例化
a.自报三围() # 实例化后再使用实例
```


### 类的实例化
#### 实例属性和类属性
当类支持实例化的时候，self是所有类方法位于首位、默认的特殊参数。
实例化后，只要你在类中用了def语句，那么就必须在其后的括号里把第一个位置留给self。
当类支持实例化的时候，就不能再直接使用类方法了，如果运行以下代码将会报错：
``` bash
class 智能机器人():
    胸围 = 33
    腰围 = 44
    臀围 = 55
    
    def 自报三围(self):
        print('主人，我的三围是：')
        print('胸围：' + str(self.胸围))
        print('腰围：' + str(self.腰围))
        print('臀围：' + str(self.臀围))
        print('哈哈哈哈哈，下面粗上面细，我长得像个圆锥。')

#实例化后，直接使用类方法会报错
智能机器人.自报三围() 
```

#### 实例方法和类方法
通常来说，我们都是把类实例化后再调用
当我们完成实例化后，对应于一个实例的属性和方法，叫“实例属性、实例方法”，不再称为“类属性、类方法”
类和实例的关系，就像母体和复制品的关系一样。当一个类实例化为多个实例后，实例将原封不动的获得类属性，也就是实例属性和类属性完全相等。
可以修改类属性，这会导致所有实例属性变化（因为类是模板）。
也可以修改实例属性，但这不会影响到其他实例，也不会影响到类。因为每个实例都是独立的个体
新增也是一样的道理，在类中新增属性会影响到实例，但在实例中新增属性只影响这个实例自己。
重写类：
和类属性一样，我们可以重写类方法，这会导致所有实例方法自动被重写
“重写类方法”分成两个步骤：1、在类的外部写一个函数，2、把这个新函数的名字赋值给类.原始函数
``` bash
class 类():
    def 原始函数(self):
        print('我是原始函数！')

def 新函数(self):
    print('我是重写后的新函数!')

a = 类()  # 实例化
a.原始函数()

# 用新函数代替原始函数，也就是【重写类方法】
类.原始函数 = 新函数

# 现在原始函数已经被替换了
a.原始函数()
```
这里的赋值是在替换方法，并不是调用函数，所以【不要加上括号】—— 写成类.原始函数() = 新函数()是错误的。
我们可以通过重写类方法，让实例方法发生变化，但我们不能重写实例方法，模板给的技能不是说换就能换的。

总结：实例的属性和方法
1、修改类属性和类方法，将会影响所有实例
2、修改某个实例的属性，只会影响这个实例自身
3、不能修改实例的方法

#### 初始化函数
``` bash
class 类():
    def __init__(self):
        print('实例化成功！')

实例 = 类()
```
初始化函数的意思是，当你创建一个实例的时候，这个函数就会被调用。上面的代码在执行实例 = 类()的语句时，就自动调用了__init__(self)函数。
初始化函数的写法是固定的格式：中间是“init”，这个单词的中文意思是“初始化”，然后前后都要有【两个下划线】，然后__init__()的括号中，第一个参数一定要写上self，不然会报错。
``` bash
# 请直接运行并体验代码

class 成绩单():
    def __init__(self,学生姓名,语文_成绩,数学_成绩):
        self.学生姓名 = 学生姓名
        self.语文_成绩 = 语文_成绩
        self.数学_成绩 = 数学_成绩

    def 打印成绩单(self):
        print(self.学生姓名 + '的成绩单如下：')
        print('语文成绩：'+ str(self.语文_成绩))
        print('数学成绩：'+ str(self.数学_成绩))


成绩单1 = 成绩单('张三',99,88)
成绩单2 = 成绩单('李四',64,73)
成绩单3 = 成绩单('王五',33,22)

成绩单1.打印成绩单()
成绩单2.打印成绩单()
成绩单3.打印成绩单()
```
再举个例子，把“打印乘法表”封装成一个类，让它可以通过初始化函数传递参数
``` bash
class 乘法表():
    def __init__(self,n):
        self.n = n

    def 打印(self):
        for i in range(1,self.n+1):
            for x in range(1,i+1):
                print( '%d X %d = %d' % (i ,x ,i*x) ,end = '  ' )
            print('  ')

三三乘法表 = 乘法表(3)
三三乘法表.打印()

五五乘法表 = 乘法表(5)
五五乘法表.打印()
```

### 类的继承
类的继承很大程度也是为了避免重复性劳动。比如说当我们要写一个新的类，如果新的类有许多代码都和旧类相同，又有一部分不同的时候，就可以用“继承”的方式避免重复写代码。
格式：class 新类(旧类)
``` bash
class 成绩单_旧():
    def __init__(self,学生姓名,语文_成绩,数学_成绩):
        self.学生姓名 = 学生姓名
        self.语文_成绩 = 语文_成绩
        self.数学_成绩 = 数学_成绩

    def 打印成绩单(self):
        print(self.学生姓名 + '的成绩单如下：')
        print('语文成绩：'+ str(self.语文_成绩))
        print('数学成绩：'+ str(self.数学_成绩))

    def 打印平均分(self):
        平均分 = (self.语文_成绩 + self.数学_成绩)/2
        print(self.学生姓名 + '的平均分是：' + str(平均分))

class 成绩单_新(成绩单_旧):
    def 打印总分(self):
        总分 = self.语文_成绩 + self.数学_成绩
        print(self.学生姓名 + '的总分是：' + str(总分))


实例_旧 = 成绩单_旧('王明明',99,88)
实例_旧.打印成绩单()
实例_旧.打印平均分()

实例_新 = 成绩单_新('王明明',99,88)
实例_新.打印成绩单()
实例_新.打印平均分()
实例_新.打印总分()

```
在Python里，我们统一把旧的类称为父类，新写的类称为子类。子类可以在父类的基础上改造类方法，所以我们可以说子类继承了父类。
子类除了可以定制新的类方法，还能直接覆盖父类的方法,只要使用相同的类方法名称就能做到这一点。
``` bash
class 基础机器人():
    def __init__(self,参数):
        self.姓名 = 参数

    def 自报姓名(self):
        print('我是' + self.姓名 + '！')     

    def 卖萌(self):
        print('主人，求抱抱！')

class 高级机器人(基础机器人):
    def 自报姓名(self):
        print('我是高级机器人' + self.姓名 + '！')

    def 卖萌(self):
        print('主人，每次想到怎么欺负你的时候，就感觉自己全身biubiubiu散发着智慧的光芒！')

安迪 = 高级机器人('安迪')
安迪.自报姓名()
安迪.卖萌()
```
子类从【一个父类】继承类方法，我们叫做“单继承”。还有一种更复杂的继承情况，叫“多重继承”
格式：class 子类(父类1,父类2,……)
``` bash 
class 基础机器人():
    def 卖萌(self):
        print('主人，求抱抱！')

 # 注：因为多重继承要求父类是平等的关系，所以这里的“高级机器人”没有继承“基础机器人”
class 高级机器人(): 
    def 高级卖萌(self): 
        print('主人，每次想到怎么欺负你的时候，就感觉自己全身biubiubiu散发着智慧的光芒！')

class 超级机器人(基础机器人,高级机器人):
    def 超级卖萌(self): 
        print('pika, qiu!')
        print('''　           　へ　　　　　／|
              /＼7　　　∠＿/
             /　│　　／　／
             │　Z＿,＜　／　　/`ヽ
             │　　　　　ヽ　　/　　〉
             Y　　　　　`　/　　/
             ｲ●　､　●　　⊂⊃〈　　/
             ()　へ　　　　|　＼〈
              >ｰ､_　ィ　│／／
             /へ　　/　ﾉ＜|＼＼
             ヽ_ﾉ　　(_／　│／／
              7　　　　　　　|／
              ＞―r￣￣`ｰ―＿''')

        
皮卡 = 超级机器人()

皮卡.卖萌()
皮卡.高级卖萌()
皮卡.超级卖萌()
```
子类超级机器人同时继承了父类基础机器人和高级机器人中的类方法。
不过，多重继承有利有弊。过度使用继承容易把事情搞复杂，就像一个人有很多爸爸必定会带来诸多麻烦。
如果不是开发大型项目，不太需要用到太复杂的继承关系



## 其他拓展--Some exercises
### 列表生成式
``` bash
list1 = [i for i in range(3)]
print(list1)
# >>>[0, 1, 2]
# 列表元素可以是组合，分别规定范围。
list2 = [m+n for m in ['天字', '地字'] for n in '一二']
print(list2)
# >>>['天字一', '天字二', '地字一', '地字二']
# 元素既可规定范围，也可附加条件。
list3 = [n*n for n in range(1,11) if n % 3 == 0]
print(list3)
# >>>[9, 36, 81]
```
趁热打铁，来组练习题：
补全函数cards()。函数会返回一个扑克牌列表，里面有52个元组（将花色和数字分开），对应52张牌。
在下方补充4行代码（左右），让函数下方的打印函数打印出52张扑克牌。每张扑克牌的展现形式是元组(花色，大小)。
方法1:
``` bash
def cards():
    a = ['红桃', '方块', '梅花', '黑桃']
    b = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    re_list = [(i, j) for i in a for j in b]
    return re_list
print(cards())  # 将函数的返回值打印出来
```

方法2:
``` bash
def cards():
  color = ['红心', '方块', '梅花','黑桃']  # 将花色放在一个列表中待用
  num = list(range(2, 11))
  num.extend('JQKA')  # 通过两行代码，生成一个 2-A 的数字列表。
  return [(x, y) for x in color for y in num ]  # 用列表生成式完成扑克牌的生成。
print(cards())
```


### 运用index()优化石头剪刀布小游戏
原代码：
``` bash
import random
# 出拳
punches = ['石头', '剪刀', '布']
computer_choice = random.choice(punches)
# user_choice = ''
user_choice = input('请出拳：（石头、剪刀、布）')  # 请用户输入选择
while user_choice not in punches:  # 当用户输入错误，提示错误，重新输入
    print('输入有误，请重新出拳')
    user_choice = input()
# 亮拳
print('————战斗过程————')
print('电脑出了：%s' % (computer_choice))
print('你出了：%s' % (user_choice))
# 胜负
print('—————结果—————')
if user_choice == computer_choice:  # 使用if进行条件判断
    print('平局！')
# 请你将下一行代码用 index()函数 实现（不再有 and 和 or），从而简化代码。
elif (user_choice == '石头' and computer_choice == '剪刀') or (user_choice == '剪刀' and computer_choice == '布') or (
        user_choice == '布' and computer_choice == '石头'):
    print('你赢了！')
else:
    print('你输了！')
```

优化后：
``` bash
# 出拳
punches = ['石头', '剪刀', '布']
computer_choice = random.choice(punches)
# user_choice = ''
user_choice = input('请出拳：（石头、剪刀、布）')  # 请用户输入选择
while user_choice not in punches:  # 当用户输入错误，提示错误，重新输入
    print('输入有误，请重新出拳')
    user_choice = input()

# 亮拳
print('————战斗过程————')
print('电脑出了：%s' % (computer_choice))
print('你出了：%s' % (user_choice))

# 胜负
print('—————结果—————')
if user_choice == computer_choice:  # 使用if进行条件判断
    print('平局！')
elif user_choice == punches[punches.index(computer_choice) - 1]
    print('你赢了！')
else:
    print('你输了！')
```