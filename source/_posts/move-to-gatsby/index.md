---
title: 博客使用 Gatsby 构建
date: 2021-09-02 22:01:00
description: '抛弃 hexo 转用更适合前端开发者的静态网站生成方案 gatsbyjs, 并计划将原来的的 maupassant 主题开发基于 gatsby 的 maupassant 主题'
tags: [React, Typescript, Gatsby, blog]
---

# 鼓捣有的没的图啥？

因为作为一个使用`Vue`进行生产的前端来说，本来是想把 Hexo 的博客转移下到`Vuepress`的。

但是这个`Vuepress`的文档无论是哪种语言版本都十分的不好用，想把`maupassant`这套主题自己搞一套`Vuepress-maupassant`但苦于文档的易用性太低还是选择放弃

这时候我又发现了一个抓我眼球的静态生成器——`gatsbyjs`，而且因为上手了`React`的原因，正好可以练练手。

~~以后可能以 Vue 技术栈的身份跳个 React 技术栈的公司好了 XD~~

`gatsby`是基于`React`、`GraphQL`的静态网站生成器，功能十分强大。

其实作为静态建站方案，`gatsby`是很成熟的，当前版本已经到`v3`,再国外还是很受欢迎的，而且文档很齐全，社区维护的插件和主题也不少，正好作为我学习`React`的磨刀石，并且可以将博客迁移以及自己构建`gatsby`的`maupassant`主题。

因为原来的一套`maupassant-hexo`很简洁明亮，不过好像没有人开发基于 gatsby 的，所以可能自己还是需要以开发者的身份来构建适合自己的博客的`maupassant-gatsby`

# 开发记录

9-2 启动

- 根据官方文档搭建项目 `typescript + gatsby + scss`
- 找到原主题的样式文件并加以拆分简单开发了原有的布局

9-3

- 找到一些插件增强博客的易用性
- 研究了好久代码高亮 最终确定方案

9-4

- 因为原有样式的布局构建方式我不太喜欢，转用使用 `tailwindcss`按照原主题样式来重新编写样式组件来构建布局
- ...

> 如果选择重新按照原有的样式重写 是不是等于自己写主题样式？那我为什么不直接再编写一套样式呢？ 2021/9/4 20:40

# 开发中遇到的问题

## Cannot find namespace 'GatsbyTypes'.

因为使用了 `gatsby-plugin-typegen` 这个插件会自动生成整个项目中所需包括`graphql查询语句`返回的类型，然后再对配置文件进行 type-safe 化中直接使用了生成的 GatsbyTypes 命名空间但是编译无法通过

在`gatsby-node.ts`开头加入以下，手动为编译器添加声明文件

```ts
/// <reference path="./src/__generated__/gatsby-types.d.ts" />
```
