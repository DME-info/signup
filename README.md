# sign up

&emsp;&emsp;这是机械系学生科协学习部自主搭建的动态报名网站，依托mysql数据库完成数据的交换。现选项只包括科协的部门，将来将加入学生组织其他部门的选项。网页已经过本地验证，期待明年的内部验证。

## 建表SQL语句

&emsp;&emsp;在phpmyadmin界面中新建一个数据库mechinfo（推荐）或选择mysql数据库，进入SQL模式创建以下表。

```sql
CREATE TABLE `signup` (
    `name` VARCHAR(64),
    `class` VARCHAR(64),
    `id` VARCHAR(64),
    `phone` VARCHAR(64),
    `email` VARCHAR(64),
    `WeChat` VARCHAR(64),
    `first` VARCHAR(64),
    `second` VARCHAR(64),
    `third` VARCHAR(64),
    `time` TIMESTAMP DEFAULT NOW()
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8
```

> ***此表仅为科协版报名使用，与old文件夹中文件配套***

```sql
CREATE TABLE `signup` (
    `name` VARCHAR(64),
    `class` VARCHAR(64),
    `id` VARCHAR(64),
    `phone` VARCHAR(64),
    `email` VARCHAR(64),
    `WeChat` VARCHAR(64),
    `firstOrganization` VARCHAR(64),
    `firstDepartment` VARCHAR(64),
    `secondOrganization` VARCHAR(64),
    `secondDepartment` VARCHAR(64),
    `thirdOrganization` VARCHAR(64),
    `thirdDepartment` VARCHAR(64),
    `time` TIMESTAMP DEFAULT NOW()
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8
```

> ***此表为全社工组织报名使用，与现在文件夹中文件配套***

## version 1

&emsp;&emsp;由周航宇码出，实现了基本的功能。

## version 2

&emsp;&emsp;由刘怡豪改进，将网页的css样式与php操作分离出来，形成单独的文件。同时利用html5的特点对代码进行一定的优化，并通过css对布局进行调整。（现已放入oldold文件夹中）

## version 3

&emsp;&emsp;对网页架构进行了大幅度优化，并添加了js实现正则检查、事件驱动等功能。（现已放入old文件夹中）

## Version 4

&emsp;&emsp;在原来科协报名表的基础上加入了全部社工组织的报名信息，并且在网页中加入了悬浮的链接栏，可以直接链接到相应社工组织的具体介绍页面。

&emsp;&emsp;优化了提交成功和提交失败（如果出现的话）时的提示效果。

## 注意

&emsp;&emsp;signup.php文件中的密码写为\*\*\*\*\*\*\*，不能明示写出！

## 映射

+ gitee: https://gitee.com/DME-info/signup.git
+ github: https://github.com/DME-info/signup.git

