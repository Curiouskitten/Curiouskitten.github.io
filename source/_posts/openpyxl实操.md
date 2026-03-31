---
title:
  - openpyxl实操
date: 2022-02-22 02:40:18
tags: python
cover: /img/python3.jpeg
---

运用openpyxl模块完成文件内容的批量写入excel操作
确保本地存在openpyxl模块
若不存在：pip install openpyxl
1.新建excel文件，并写入数据，保存至指定位置
2.打开已存在的excel文件，追加写入内容

## 新建excel文件并写入
```bash
#  @Time : 2/22/22
#  @Author : 柒仔
import random
import string
import openpyxl

#创建设备id
def device_id():
    chars = string.ascii_letters + string.digits
    deviceid = ''.join((random.choice(chars) for i in range(random.randint(11, 512))))
    return deviceid

#随机生成设备名称
def device_name():
    num = string.ascii_letters + string.digits
    devicename = ''.join((random.choice(num) for i in range(random.randint(1,64))))
    return devicename

#新建excel文件并写入数据
def output_file(filename,sheetname='sheet1',times=1,type=1):
	#创建工作簿
    wb = openpyxl.Workbook()
    #获取默认工作表
    sheet = wb.active
    #重命名工作表名
    sheet.title = sheetname
    #单元格赋值
    sheet['A1'] = '序号'
    sheet['B1'] = '设备id'
    sheet['C1'] = '设备名称'
    #批量写入数据
    n = 0
    data_list = []
    for i in range(times):
        n += 1
        dataid = n
        deviceid = device_id()
        if type == 1:
            devicename = device_name()
            data = [dataid, deviceid, devicename]
            data_list.append(data)
        else:
            devicename2 = '设备名称' + str(n)
            data2 = [dataid, deviceid, devicename2]
            data_list.append(data2)
    for row in data_list:
        sheet.append(row)
    #保存文件
    wb.save(filename)

if __name__ == '__main__':
    file = '/Users/alice0711/Desktop/practice.xlsx'
    sheet = 'sheet1'
    import_file(filename=file,sheetname=sheet,times=200,type=2)

```


## 打开指定位置excel文件并写入
```bash
#  @Time : 2/22/22 2:25 AM
#  @Author : 柒仔
import random
import string
import openpyxl

#创建设备id
def device_id():
    chars = string.ascii_letters + string.digits
    deviceid = ''.join((random.choice(chars) for i in range(random.randint(11, 512))))
    return deviceid

#生成64位随机数
def device_id64():
    chars = string.ascii_letters + string.digits
    devicename = ''.join((random.choice(chars) for i in range(64)))
    return devicename

#随机生成设备名称
def device_name():
    num = string.ascii_letters + string.digits
    devicename = ''.join((random.choice(num) for i in range(random.randint(1,64))))
    return devicename

def output_file(filename,times=1,devtype=True,type=1,sheet_index=0,outfile='demo.xlsx'):
    """
    读取指定文件，并输出数据
    :param filename: 读取的文件路径
    :param times: 输出的数据行数
    :param devtype: bool--True：范围随机位数；False：固定64位字符
    :param type: 数据类型
    :param sheet_index: 工作表索引
    :param outfile: 输出的文件路径
    :return:
    """
    #导入文件
    wb = openpyxl.load_workbook(filename)
    #指定工作表
    sheet = wb.worksheets[sheet_index]
    #根据需求生成对应的批量数据
    n = 0
    data_list = []
    for i in range(times):
        n += 1
        dataid = n
        if devtype is True:
            deviceid = device_id()
        else:
            deviceid = device_id64()
        if type == 1:
            devicename = device_name()
        else:
            devicename = '设备名称' + str(n)
        data = [dataid, deviceid, devicename]
        data_list.append(data)
    for row in data_list:
        sheet.append(row)
    wb.save(outfile)

if __name__ == '__main__':
    file = '/Users/alice0711/Desktop/practice2.xlsx'
    outfile = '/Users/alice0711/Desktop/practice3.xlsx'
    output_file(filename=file,times=3,type=2,devtype=False,outfile=outfile)
    # wb = openpyxl.load_workbook(outfile)
    # sheet = wb.worksheets[0]
    # id_len = sheet.cell(2,2).value
    # print(len(id_len))

```
