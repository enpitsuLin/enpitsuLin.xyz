---
title: 新增一个live2d插件
date: 2019-03-27 22:00:00
tags: [Blog, Hexo, Live2d]
excerpt: 感觉一个页面白白净净的似乎也有些无趣,遂增加一个有生气的物件
---

基于这几天对于 hexo 这个简单强大的框架的热度,折腾了一些时间,暂时就成了现在的样子.

但似乎感觉少了点什么,于是往页面上`hexo-helper-live2d`

## 安装

使用终端命令在项目内安装模块

```shell
npm install --save hexo-helper-live2d
```

以及安装所需的 live2d 模型,这里我选用的是一个简单的黑猫模型.

```shell
npm install live2d-widget-model-hijiki
```

安装完之后进行配置

往`_config.yml`文件中添加下列语句

```yaml
# Live2D
live2d:
  enable: true
  model:
    use: live2d-widget-model-hijiki
  display:
    width: 100
    height: 200
    position: left
    hOffset: 0
    vOffset: -90
  mobile:
    show: false
```

完成配置

## 结束

然后直接

```shell
hexo s -g
```

然后在`http://localhost:4000/`进行预览然后可以`hexo d`部署到服务器上查看

---

[原作者仓库 hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)
[所用模型仓库](https://github.com/xiazeyu/live2d-widget-models)
