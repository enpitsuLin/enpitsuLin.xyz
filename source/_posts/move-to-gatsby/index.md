---
title: 博客使用 Gatsby 构建
date: 2021-09-02 22:01
description: '抛弃 hexo 转用更适合前端开发者的静态网站生成方案 gatsbyjs, 并将原来的的 maupassant 主题开发基于 gatsby 的 maupassant 主题'
tags: [React, Typescript, Gatsby, blog]
---

# 鼓捣有的没的图啥？

因为上手了`React`，迫不及待的就很想使用`React`上生成促进学习，但是基本没啥机会。~~以后可能以 Vue 技术栈的身份跳个 React 技术栈的公司好了 XD~~

因为作为一个前端来说，本来是想把 Hexo 的博客转移下到`Vuepress`的，但是这个`Vuepress`的文档真的细碎，想把`maupassant`这套主题自己搞一套`Vuepress-maupassant`但苦于文档的易用性太低还是选择放弃，转而使用刚刚学会的`React`技术栈中的`GatsbyJS`

> `Vuepress`已经 v2.0 版本了 文档还是不太行 —— 2021-09-02

## GatsbyJS

`gatsby`是基于`React`、`GraphQL`的静态网站生成器，功能十分强大。

其实作为静态建站方案，`gatsby`是很成熟的，当前版本已经到`v3`,再国外还是很受欢迎的，而且文档很齐全，社区维护的插件和主题也不少，正好作为我学习`React`的磨刀石，并且可以将博客迁移以及自己构建`gatsby`的`maupassant`主题。

# 从 Starter 开始

`gatsby`官方对建站使用的模板定义为`starter`，从零开始我们可以在[官方网站](https://www.gatsbyjs.com/starters/)上选择一些模板使用,`starter`让我们能很快的构建出一个静态页面

# typescript 支持

## 使用 gatsby-plugin-typegen 为 Gatsby 的 GraphQL 查询添加 Typescript 定义

首先是安装

```shell
npm install gatsby-plugin-typegen -S
```

然后进入`gatsby-config.js`中配置

```javascript
plugins: [
  //...
  `gatsby-plugin-typegen`
];
// 或是
plugins: [
  {
    resolve: `gatsby-plugin-typegen`,
    options: {
      // ... 配置项
    }
  }
];
```

[Quick Start | Gatsby (gatsbyjs.com)](https://www.gatsbyjs.com/docs/quick-start/)
