---
title: 在hexo使用本地资源文件
date: 2017-06-14 22:19:07
tags: [hexo,Markdown]
categories: 心得体会
---

因为有在文章中插图片的需求，然后在hexo.io的帮助文档里找到了[资源文件夹](https://hexo.io/zh-cn/docs/asset-folders.html)

但抛弃了markdown的语法,遂再找解决方法.

发现在 hexo 2.x 时出现过一个插件[asset-image](https://github.com/CodeFalling/hexo-asset-image)
然后这个东西就是现在的资源文件夹的前身.但保留了markdown的语法~~显然是原来的这个好用啊~~

使用方法的话见上面的Github项目的readme.

下面随便讲下

在你的hexo工程文件夹下使用下面的命令添加插件


``npm install hexo-asset-image --save``


之后new的文章都会自动创建一个同名文件夹供存放资源~~不仅是图片~~

然后插入的时候按照markdown的语法使用就好