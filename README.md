对CNode社区前端页面文章部分的仿制
====

实现思路
---
通过对CNode社区提供的API所获取到的数据的分析，可以提取出大部分页面展示所用到的信息，期间使用vue-router进行页面链接，其中第一个页面所获取到的 'id' 作为参数传到下一个页面来获得文章详细信息内容，通过AJAX获取到的信息后渲染到页面上，因为其中文章内容的都是通过margdown方式编写，所以需要用到markdown的CSS进行辅助进行页面渲染。

项目进行过程中遇到的难点
---

###### 1. 时间的格式化
通过ajax传回来的数据是日期格式，需要通过过滤器的方式计算得出距离现在时间的时间差进行显示
###### 2. 在文章详情页面点击作者其他作品文章内容不更新
测试后发现点击作者其他作品或者回答过的主题时路由参数已经发生改变但是文章并不更新，所以通过vue的watch方法对路由的变化进行监听，变化是再次执行信息获取
