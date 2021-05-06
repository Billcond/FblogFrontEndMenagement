# FblogFrontEndMenagement
##  技术栈  antv antd  vue vuex vue-router axios simplemde
## 基本完成博客发布  博客管理（分类实现与遍历）   博客文章数据图像显示的功能
## 目前组件结构体
![image](https://user-images.githubusercontent.com/82869798/117257993-1321e480-ae7f-11eb-960a-8d0298f0d597.png)
## view-router  和  v-if else   v-show的实践
### view-router  适用于父组件中右固定内容  路由子组件  那么此时 设置index.js就好了
### v-if else v-show  如果同等级的组件需要有切换的需求   这时候view-roter  无法切换  
###  这时候使用v-if  else  同等级的组件完成对应的处理之后 要emmit 事件给父组件  

# 部分截图显示


# 博文管理
![image](https://user-images.githubusercontent.com/82869798/117261781-1fa83c00-ae83-11eb-87ec-4eacb4cb2e92.png)
# 博文发布
![image](https://user-images.githubusercontent.com/82869798/117261782-1fa83c00-ae83-11eb-91f5-72af8fd10571.png)
# 博文统计
![image](https://user-images.githubusercontent.com/82869798/117262121-8168a600-ae83-11eb-847f-a2c68771589a.png)
# 博文编辑
## 这里确认编辑 只会更新数据库中的内容 并不会像博文发布一样  像数据库重新添加东西
![image](https://user-images.githubusercontent.com/82869798/117262422-d3113080-ae83-11eb-9317-a66f4be39002.png)


