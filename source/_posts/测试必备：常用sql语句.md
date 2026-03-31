---
title: 软件测试必备：常用sql语句
date: 2021-12-21 01:08:39
tags: mysql
cover: /img/sql.png
---

总结的基础sql语句，不完全适用于mysql，软件测试必备技能，需要熟记熟用
（持续补充）

## Table 表管理

### 创建表
创建一个名为student的表没包含id，name和age三个字段
``` bash
CREATE TABLE student (id INT PRIMARY KEY, name VARCHAR(20) NOT NUll,age INT DEFAULT 0);
```

### 删除表
``` bash
DROP TABLE student;
```

### 新增列
``` bash
ALTER TABLE student
ADD col_name col_type;
```

### 删除列
``` bash
ALTER TABLE student
DROP COLUMN col_1;
```
### 添加约束
``` bash
ALTER TABLE student
ADD constraint;
```

### 删除约束
``` bash
ALTER TABLE student
DROP constraint;
```

### 重命名表
``` bash
ALTER TABLE current_name
RENAME TO new_name;
```

### 重命名列
``` bash
ALTER TABLE student
CHANGE COLUMN old_col new_col data_type;
```

### 清空表数据（截断表）
``` bash
TRUNCATE TABLE student;
```

## Delete 删除
### 删除表中所有行（清空表记录）
attention：TRUNCATE清空表会恢复自增长字段初始值，而DELETE清空不会
``` bash
DELETE FROM student;
```

### 删除student表中满足查询条件的行
``` bash
DELETE FROM student WHERE id = "001";
```

## Insert 新增
### 在表中插入一条记录，对所有字段赋值
``` bash
INSERT INTO student VALUES (001,"alice",20);
```

### 在表中插入数据，对指定字段赋值
``` bash
INSERT INTO student (id,name,age) VALUES (002,"apple",23);
```

### 插入多行数据
``` bash
INSERT INTO student (id,name,age) VALUES (003,"Aldous",30),(004,"Arthur",30),...;
```

### INSERT...SELECT 插入
将student中查询的数据插入到user表中
``` bash
INSERT INTO t_user_info(id,name) SELECT id,name from student;
```

## Update 修改
### 修改所有行的单个列的值
``` bash
UPDATE student SET update_time = "2021-12-12";
```

### 根据条件修改对应的指定列的值
``` bash
UPDATE student SET name = "alice001" where id = "001";
```

### 关联更新
在更新sql语句中可以使用连接查询
``` bash
UPDATE student s JOIN t_user_info u ON s.uid = u.id
SET s.col_1 = 1 where s.col_1 = 0 AND u.col_2 IS NULL;
```
## 单表查询
### 单表查询多列
从table_name获取col_1,col_2,col_3列数据
``` bash
SELECT col_1,col_2,col_3 FROM table_name;
```

### 查询表中所有列数据
``` bash
SELECT * from table_name;
```

### 条件查询
根据过滤条件从table_name表中获取col_1,col_2列的数据
``` bash
SELECT col_1,col_2 
FROM table_name 
WHERE id = "001";
```

## 高级查询
### DISTINCT 去重
``` bash
SELECT DISTINCT(col_1)
from table_name
where type = "int";
```

### ORDER BY 生序/降序排序
ASC--生序
DESC--降序
``` bash
SELECT * from table_name ORDER BY col_1 ASC;

SELECT * form table_name ORDER BY col_1 DESC;
```
### LIMIT n OFFSER m 分页查询
从表table_name中以col_2降序排序，去掉两行数据，获取第一个(即结果数据中第行数据)col_1,col2的值，
``` bash
SELECT col_1,col_2 FROM table_name ORDER BY col_2 DESC LIMIT 1 OFFSET 2;
```

### ORDER BY 分组
分组常采用聚合函数进行计算，如SUM，AVG，COUNT，MAX，MIN
在 SQL 中，分组聚合是一种对数据进行分类并对每个分类进行聚合计算的操作。它允许我们按照指定的列或字段对数据进行分组，然后对每个分组应用聚合函数，如 COUNT、SUM、AVG 等，以获得分组后的汇总结果。
``` bash
SELECT col_1,SUM(col_2) FROM table_name GROUP BY col_1;
```

### HAVING 分组过滤
在 SQL 中，HAVING 子句用于在分组聚合后对分组进行过滤。它允许我们对分组后的结果进行条件筛选，只保留满足特定条件的分组。
HAVING 子句与条件查询 WHERE 子句的区别在于，WHERE 子句用于在 分组之前 进行过滤，而 HAVING 子句用于在 分组之后 进行过滤
``` bash
SELECT col_1,SUM(col_2) FROM table_name GROUP BY col_1 HAVING type IS NULL;
# 举个例子：
# 假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、class_id（班级编号）、score（成绩）。
# 请你编写一个SQL查询，统计学生表中班级的总成绩超过150分的班级编号（class_id）和总成绩（total_score）
select
  class_id,
  sum(score) as total_score
from
  student
group by
  class_id having sum(score) > 150;
```

## 高级查询 常见sql操作符
### UNION
用于将两个或多个查询结果集合并，并去除重复的行。即如果两个查询的结果有相同的行，则保留一行
```  bash
SELECT name, age, department
FROM table1
UNION
SELECT name, age, department
FROM table2;
```

### UNION ALL
合并两个查询结果集
用于将两个或多个查询的结果集合并，但不去除重复行。即如果两个查询的结果有相同的行，则全部保留
``` bash
SELECT col_1,col_2 FROM table1 UNION [ALL] SELECT col_1,col_2 FROM table2;
```
来个练习：
假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、age（年龄）、score（分数）、class_id（班级编号）。还有一个新学生表 student_new，包含的字段和学生表完全一致。
请编写一条 SQL 语句，获取所有学生表和新学生表的学生姓名（name）、年龄（age）、分数（score）、班级编号（class_id）字段，要求保留重复的学生记录。
``` bash
select name,age,score,class_id 
from student 
union all 
select name,age,score,class_id 
from student_new;
```



### LIKE/NOT LIKE
根据给定模式进行匹配（模糊查询）
``` bash
SELECT col_1,col_2 FROM table_name WHERE col_1 LIKE pattern;
#or
SELECT col_1,col_2 FROM table_name WHERE col_1 NOT LIKE pattern;
```

### IN/NOT IN
根据给定数据集，获取指定列具有/不具有响应列的行
``` bash
SELECT col_1,col_2 FROM table_name WHERE col_1 IN ("a","b");
#or
SELECT col_1,col_2 FROM table_name WHERE col_1 NOT IN ("a","b");
```

### BETWEEN...AND...
获取列表在给定范围内的行
``` bash
SELECT * FROM table_name WHERE col_1 BETWEEN "10" and "50";

```
### NULL/NOT NULL
获取列值为空或非空的行
``` bash
SELECT * FROM table_name WHERE col_1 IS NULL;
#or
SELECT * FROM table_name WHERE col_1 IS NOT NULL;
```

## 多表查询
### INNER JOIN 内连接
在 SQL 中，INNER JOIN 是一种常见的关联查询方式，它根据两个表之间的关联条件，将满足条件的行组合在一起。
注意，INNER JOIN 只返回两个表中满足关联条件的交集部分，即在两个表中都存在的匹配行。
``` bash
SELECT * FROM A INNER JOIN B ON A.key = B.key;
# 举个例子
# 假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、age（年龄）、class_id（班级编号）。还有一个班级表class，包含以下字段：id（班级编号）、name（班级名称）、level（班级级别）。
# 请你编写一个 SQL 查询，根据学生表和班级表之间的班级编号进行匹配，返回学生姓名（student_name）、学生年龄（student_age）、班级编号（class_id）、班级名称（class_name）、班级级别（class_level）。
select
  s.name as student_name,
  s.age as student_age,
  s.class_id,
  c.name as class_name,
  c.level as class_level
from
  student s
  inner join class c on s.class_id = c.id;
```

### OUTER JOIN 查询进阶-关联查询
在 SQL 中，OUTER JOIN 是一种关联查询方式，它根据指定的关联条件，将两个表中满足条件的行组合在一起，并包含没有匹配的行 。
在 OUTER JOIN 中，包括 LEFT OUTER JOIN 和 RIGHT OUTER JOIN 两种类型，它们分别表示查询左表和右表的所有行（即使没有被匹配），再加上满足条件的交集部分。
有些数据库并不支持 RIGHT JOIN 语法，那么如何实现 RIGHT JOIN 呢？
其实只需要把主表（from 后面的表）和关联表（LEFT JOIN 后面的表）顺序进行调换即可！
``` bash
# 假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、age（年龄）、class_id（班级编号）。还有一个班级表class，包含以下字段：id（班级编号）、name（班级名称）、level（班级级别）。
# 请你编写一个 SQL 查询，根据学生表和班级表之间的班级编号进行匹配，返回学生姓名（student_name）、学生年龄（student_age）、班级编号（class_id）、班级名称（class_name）、班级级别（class_level），要求必须返回所有学生的信息（即使对应的班级编号不存在）。
select
  s.name as student_name,
  s.age as student_age,
  s.class_id,
  c.name as class_name,
  c.level as class_level
from
  student s
  left join class c on s.class_id = c.id;
```

#### LEFT JOIN 左外连接
``` bash
SELECT * FROM A LEFT JOIN B ON A.key = B.key;
```

#### LEFT JOIN 左外连接（排除B部分）
``` bash
SELECT * FROM A LEFT JOIN B ON A.key = B.key WHERE B.key IS NULL;
```

#### RIGHT JOIN 右外连接
``` bash
SELECT * FROM A RIGHT JOIN B ON A.key = B.key;
```

#### RIGHT JOIN 右外连接（排除A部分）
``` bash
SELECT * FROM A RIGHT JOIN B ON A.key = B.key WHERE A.key IS NULL;
```

### CROSS JOIN
查询进阶 - 关联查询
有时，我们可能希望在单张表的基础上，获取更多额外数据，比如获取学生表中学生所属的班级信息等。这时，就需要使用关联查询。
在 SQL 中，关联查询是一种用于联合多个数据表中的数据的查询方式。
其中，CROSS JOIN 是一种简单的关联查询，不需要任何条件来匹配行，它直接将左表的 每一行 与右表的 每一行 进行组合，返回的结果是两个表的笛卡尔积。
ps：笛卡尔积即两个集合x,y的笛卡尔积，即XxY：假设集合X={a, b}，集合Y={0, 1, 2}，则两个集合的笛卡尔积为{(a, 0), (a, 1), (a, 2), (b, 0), (b, 1), (b, 2)}
``` bash
# 假设有一个学生表 student ，包含以下字段：id（学号）、name（姓名）、age（年龄）、class_id（班级编号）；还有一个班级表class，包含以下字段：id（班级编号）、name（班级名称）。
# 请你编写一个SQL查询，将学生表和班级表的所有行组合在一起，并返回学生姓名（student_name）、学生年龄（student_age）、班级编号（class_id）以及班级名称（class_name）。
select
  s.name as student_name,
  s.age as student_age,
  s.class_id,
  c.name as class_name
from
  student s
  cross join class c;
```	

#### FULL JOIN 全外连接
``` bash
SELECT * FROM A FULL JOIN B ON A.key = B.key;
```
attention:MYSQL中不支持FULL JOIN，可以使用UNION ALL的方式达到FULL JOIN效果

#### FULL JOIN 全外连接（排除交叉）
``` bash
SELECT * FROM A FULL JOIN B ON A.key = B.key WHERE A.key IS NULL
OR B.key IS NULL;
```
attention:MYSQL中不支持FULL JOIN，可以使用UNION ALL的方式达到FULL JOIN效果


## 子查询
子查询是指在一个查询语句内部 嵌套 另一个完整的查询语句，内层查询被称为子查询。子查询可以用于获取更复杂的查询结果或者用于过滤数据。
当执行包含子查询的查询语句时，数据库引擎会首先执行子查询，然后将其结果作为条件或数据源来执行外层查询。
打个比方，子查询就像是在一个盒子中的盒子，外层查询是大盒子，内层查询是小盒子。执行查询时，我们首先打开小盒子获取结果，然后将小盒子的结果放到大盒子中继续处理。
### 独立于外部查询，子查询只执行一次，执行完将结果传递给外部查询
``` bash
SELECT * FROM A WHERE A.id IN(SELECT id FORM B);
```
``` bash
# 假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、age（年龄）、score（分数）、class_id（班级编号）。还有一个班级表class，包含以下字段：id（班级编号）、name（班级名称）。
#请你编写一个 SQL 查询，使用子查询的方式来获取存在对应班级的学生的所有数据，返回学生姓名（name）、分数（score）、班级编号（class_id）字段。
select s.name,s.score,s.class_id
from student s
where s.class_id in (
    select c.id from class c
);
```

### 子查询-exists
子查询它可以嵌套在主查询中，帮助我们进行更复杂的条件过滤和数据检索。
其中，子查询中的一种特殊类型是 "exists" 子查询，用于检查主查询的结果集是否存在满足条件的记录，它返回布尔值（True 或 False），而不返回实际的数据。
和 exists 相对的是 not exists，用于查找不满足存在条件的记录
``` bash
# 假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、age（年龄）、score（分数）、class_id（班级编号）。还有一个班级表class，包含以下字段：id（班级编号）、name（班级名称）。
# 请你编写一个 SQL 查询，使用 exists 子查询的方式来获取 不存在对应班级的 学生的所有数据，返回学生姓名（name）、年龄（age）、班级编号（class_id）字段。
select
  s.name,s.age,s.class_id
from student s
where not exists (
    select * from class c where s.class_id = c.id);

```

### 相关子查询
依赖于外部查询的数据，外部查询每执行一次，子查询就执行一次
``` bash
SELECT * FROM grade t1 WHERE t1.score >
(SELECT AVG(t2.score) FROM grade t2 WHERE t1.id = t2.id);
```

### 比较运算符子查询
使用比较运算符的子查询
``` bash
SELECT * FROM student WHERE id = (SELECT MAX(id)
FROM student);
```

### IN/NOT IN型子查询
data_list可以是具体的数值，也可以是通过子查询得到的数据集
``` bash
SELECT * FROM student WHERE id IN (data_list);
#or
SELECT * FROM student WHERE id NOT IN (data_list);
```

### EXISTS/NOT EXISTS型子查询
exists对外表进行循环逐条查询，每次查询会查看exists的条件语句，如果子查询返回记录行，则留下当前循环的这条记录，否则丢弃这记录。not exists则相反
``` bash
SELECT * FROM student WHERE EXISTS (select id FROM B);

SELECT * FROM student WHERE NOT EXISTS (select id FROM B);
```

## LIMIT 分页查询
### LIMIT M,N分页
``` bash
SELECT * FROM student LIMIT 0,10;

SELECT * FROM student LIMIT 10,10;
```

### LIMIT M OFFSET N 分页
``` bash
SELECT * FROM student LIMIT 10 OFFSET 0;

SELECT * FROM student LIMIT 10 OFFSET 10;
```

### TOP语法 取前几条记录
``` bash
SELECT * FROM student LIMIT 5;

SELECT * FROM student ORDER BY id DESC LIMIT 1;
```
## 开窗函数
### sum over
在 SQL 中，开窗函数是一种强大的查询工具，它允许我们在查询中进行对分组数据进行计算、 同时保留原始行的详细信息 。
开窗函数可以与聚合函数（如 SUM、AVG、COUNT 等）结合使用，但与普通聚合函数不同，开窗函数不会导致结果集的行数减少。
打个比方，可以将开窗函数想象成一种 "透视镜"，它能够将我们聚焦在某个特定的分组，同时还能看到整体的全景。
本节我们先讲第一个开窗函数：sum over。
该函数用法为：
SUM(计算字段名) OVER (PARTITION BY 分组字段名)
做个练习
``` bash
# 假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、age（年龄）、score（分数）、class_id（班级编号）。
# 请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并计算每个班级的学生平均分（class_avg_score）。
select
  id,
  name,
  age,
  score,
  class_id,
  avg(score) over (partition by class_id) as class_avg_score
from
  student;
```
### 查询进阶-开窗函数-sum over order by
sum over 函数的另一种用法：sum over order by，可以实现同组内数据的 累加求和 。
示例用法如下：
SUM(计算字段名) OVER (PARTITION BY 分组字段名 ORDER BY 排序字段 排序规则)
来个练习：
``` bash
# 假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、age（年龄）、score（分数）、class_id（班级编号）。
# 请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数升序的方式累加计算每个班级的学生总分（class_sum_score）
select id,name,age,score,class_id,
sum(score) over (partition by class_id order by score asc) as class_sum_score
from student;
```
### 开窗函数-rank
Rank 开窗函数是 SQL 中一种用于对查询结果集中的行进行 排名 的开窗函数。它可以根据指定的列或表达式对结果集中的行进行排序，并为每一行分配一个排名。在排名过程中，相同的值将被赋予相同的排名，而不同的值将被赋予不同的排名。
当存在并列（相同排序值）时，Rank 会跳过后续排名，并保留相同的排名。
Rank 开窗函数的常见用法是在查询结果中查找前几名（Top N）或排名最高的行。
Rank 开窗函数的语法如下：
RANK() OVER (
  PARTITION BY 列名1, 列名2, ... -- 可选，用于指定分组列
  ORDER BY 列名3 [ASC|DESC], 列名4 [ASC|DESC], ... -- 用于指定排序列及排序方式
) AS rank_column
其中，PARTITION BY 子句可选，用于指定分组列，将结果集按照指定列进行分组；ORDER BY 子句用于指定排序列及排序方式，决定了计算 Rank 时的排序规则。AS rank_column 用于指定生成的 Rank 排名列的别名。
照例：
``` bash
# 假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、age（年龄）、score（分数）、class_id（班级编号）。
# 请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数降序的方式计算每个班级内的学生的分数排名（ranking）
select 
id,
name,
age,
score,
class_id,
rank() over (partition by class_id order by score desc) as ranking
from student;
```

### row_number
Row_Number 开窗函数是 SQL 中的一种用于为查询结果集中的每一行 分配唯一连续排名 的开窗函数。
它与之前讲到的 Rank 函数，Row_Number 函数为每一行都分配一个唯一的整数值，不管是否存在并列（相同排序值）的情况。每一行都有一个唯一的行号，从 1 开始连续递增。
Row_Number 开窗函数的语法如下（几乎和 Rank 函数一模一样）：
ROW_NUMBER() OVER (
  PARTITION BY column1, column2, ... -- 可选，用于指定分组列
  ORDER BY column3 [ASC|DESC], column4 [ASC|DESC], ... -- 用于指定排序列及排序方式
) AS row_number_column
其中，PARTITION BY子句可选，用于指定分组列，将结果集按照指定列进行分组。ORDER BY 子句用于指定排序列及排序方式，决定了计算 Row_Number 时的排序规则。AS row_number_column 用于指定生成的行号列的别名。
照旧
``` bash
# 假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、age（年龄）、score（分数）、class_id（班级编号）。
# 请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数降序的方式给每个班级内的学生分配一个编号（row_number）。
select id,name,age,score,class_id,
row_number() over (partition by class_id order by score desc) as row_number
from student;
```


### lag/lead
开窗函数 Lag 和 Lead 的作用是获取在当前行之前或之后的行的值，这两个函数通常在需要比较相邻行数据或进行时间序列分析时非常有用。
1）Lag 函数
Lag 函数用于获取 当前行之前 的某一列的值。它可以帮助我们查看上一行的数据。
Lag 函数的语法如下：
LAG(column_name, offset, default_value) OVER (PARTITION BY partition_column ORDER BY sort_column)
参数解释：
column_name：要获取值的列名。
offset：表示要向上偏移的行数。例如，offset为1表示获取上一行的值，offset为2表示获取上两行的值，以此类推。
default_value：可选参数，用于指定当没有前一行时的默认值。
PARTITION BY和ORDER BY子句可选，用于分组和排序数据。
2）Lead 函数
Lead 函数用于获取 当前行之后 的某一列的值。它可以帮助我们查看下一行的数据。
Lead 函数的语法如下：
LEAD(column_name, offset, default_value) OVER (PARTITION BY partition_column ORDER BY sort_column)
参数解释：
column_name：要获取值的列名。
offset：表示要向下偏移的行数。例如，offset为1表示获取下一行的值，offset为2表示获取下两行的值，以此类推。
default_value：可选参数，用于指定当没有后一行时的默认值。
PARTITION BY和ORDER BY子句可选，用于分组和排序数据。
``` bash
# 假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、age（年龄）、score（分数）、class_id（班级编号）。
# 请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数降序的方式获取每个班级内的学生的前一名学生姓名（prev_name）、后一名学生姓名（next_name）。
select
  id,
  name,
  age,
  score,
  class_id,
  lag(name, 1, null) over (partition by class_id order by score desc) as prev_name,
  lead(name, 1, null) over (partition by class_id order by score desc) as next_name
from student;
```


## 聚合函数
### AVG()求平均值
``` bash
SELECT AVG(age) FROM student;
```

### COUNT()统计行数
``` bash
SELECT COUNT(id) FROM student; 
```

### MAX()求最大值
``` bash
SELECT MAX(age) FROM student;
```

### MIN()求最小值
``` bash
SELECT MIN(age) FROM student;
```

### SUM()求和
``` bash
SELECT SUM(age) FROM student;
```

### GROUP_CONCAT()
将GROUP BY产生的同一分组中的值连接起来，返回一个字符串结果
``` bash
SELECT name,GROUP_CONCAT(id) FROM student GROUP BY name;
```

## VIEW 视图
### 创建视图
创建table的col_1和col_2两列的视图
``` bash
CREATE VIEW view_1(col_1,col_2) AS SELECT col_1,col_2 FROM table1;
```

### 删除视图
``` bash
DROP VIEW view_1；
```

## INDEX 索引
### 创建索引
在table1的col_1和col_2上创建一个索引
``` bash
CREATE INDEX index_1 ON table_1(col_1,col_2);
```

### 创建唯一索引
``` bash
CREATE UNIQUE INDEX index_1 ON table1(col_1,col_2);
```

### 删除索引
``` bash
DROP INDEX index_1 ON table1;
```

## TRIGGER 触发器
### 创建触发器语法
``` bash
CREATE TRIGGER trigger_name trigger_time trigger_event ON table_name FOR EACH ROW trigger_stmt;
```
trigger_name:触发器名称
trigger_time:触发程序动作时间，表示出发程序是在激活它的语句之前或之后出发，可以是BEFORE或AFTER
trigger_event:激活触发的语句类型，可以是INSERT、UPDATE、DELETE
table_name:表名，必须是永久表，不能是缓存表
trigger_stmt:触发激活时执行的语句

### 删除触发器
``` bash
DROP TRIGGER trigger_name;
```

## 控制流程函数
### IFNULL 判空表达式
语法：IFNULL(expr1,expr2)
expr1不为NULL，则IFNULL()的返回值为expr1；否则其返回值为expr2
``` bash
SELECT id IFNULL(class_id,0) FROM student;

SELECT IFNULL(1,0);
#--1
SELECT IFNULL(NULL,10);
#--10
```

### NULLIF
语法：NULLIF（expr1,expr2),假如expr1 = expr2,返回null，否则返回expr1
``` bash
SELECT NULLIF(1,1);
#--NULL
SELECT NULLIF(1,2);
#--1
```

### IF
语法：IF(expr1,expr2,expr3)
expr1是TRUE(expr1<>0 and expr1<>NULL).则IF()的返回值为expr2；否则返回值为expr3
``` bash
SELECT IF(1<2,'yes','no');
#---yes
```

### CASE...WHEN...THEN...
用于计算条件列表并返回多个可能结果表达式之一，类似于程序语言的条件分支语句
``` bash
SELECT CASE sex WHEN '1' THEN '男' WHEN '2' THEN '女' ELSE ‘其他’ END FROM student；
```

## PROCEDURE 存储过程
概念：
存储过程是大型数据库系统非常重要的对象，它是一组为了完成特定功能的SQL语句集，是SQL语句和控制语句的预编译合集

不带参数的存储过程
``` bash
CREATE PROCEDURE proc_show_curdate() 
BEGIN 
	select CURDATE();
END
```

带IN和OUT类型参数的存储过程
``` bash
CREATE PROCEDURE proc_del_and_count (IN del_id INT UNSIGNED,OUT count_records INT UNSIGNED)
BEGIM
	DELETE FROM student WHERE id=del_id;
	SELECT COUNT(1) FROM student INTO count_records;
END 
```
调用存储过程
``` bash
CALL proc_show_curdate();

CALL proc_del_and_count(1.@count_records);
```

获得用户变量的值
``` bash
SELECT @count_records；
```

删除存储过程
``` bash
DROP PROCEDURE proc_del_and_count;
```

时间函数
``` bash
-- 获取当前日期
SELECT DATE() AS current_date;

-- 获取当前日期时间
SELECT DATETIME() AS current_datetime;

-- 获取当前时间
SELECT TIME() AS current_time;
```

函数-字符串处理
1）使用字符串处理函数 UPPER 将姓名转换为大写
``` bash
-- 将姓名转换为大写
SELECT name, UPPER(name) AS upper_name
FROM employees;
```
2）使用字符串处理函数 LENGTH 计算姓名长度：
``` bash
-- 计算姓名长度
SELECT name, LENGTH(name) AS name_length
FROM employees;
```
3）使用字符串处理函数 LOWER 将姓名转换为小写：
``` bash
-- 将姓名转换为小写并进行条件筛选
SELECT name, LOWER(name) AS lower_name
FROM employees;
```

条件分支
条件分支 case when 是 SQL 中用于根据条件进行分支处理的语法。它类似于其他编程语言中的 if else 条件判断语句，允许我们根据不同的条件选择不同的结果返回。
使用 case when 可以在查询结果中根据特定的条件动态生成新的列或对现有的列进行转换。
如下：
假设有一个学生表 student，包含以下字段：name（姓名）、age（年龄）。请你编写一个 SQL 查询，将学生按照年龄划分为三个年龄等级（age_level）：60 岁以上为 "老同学"，20 岁以上（不包括 60 岁以上）为 "年轻"，20 岁及以下、以及没有年龄信息为 "小同学"。
返回结果应包含学生的姓名（name）和年龄等级（age_level），并按姓名升序排序。
``` bash
SELECT
  name,
  CASE
    WHEN (age > 60) THEN '老同学'
    WHEN (age > 20) THEN '年轻'
    ELSE '小同学'END AS age_level
FROM
  student
ORDER BY
  name ASC;
```













