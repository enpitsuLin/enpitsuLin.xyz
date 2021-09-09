---
title: 博客使用 Gatsby 构建
date: 2021-09-02 22:01:00
tags: [React, Typescript, Gatsby, blog]
---

因为 `Hexo` 对作为静态博客工具功能性过于局限，而且作为日常工作开发中是使用`Vue`，本来首选应该是转移下到`Vuepress`的。

但是这个`Vuepress`的文档实在是可圈可点，同时我又发现了`gatsbyjs`，而且因为上手了`React`的原因，正好可以通过搭建博客项目锻炼下。

<!-- more -->

~~以后可能以 Vue 技术栈的身份跳个 React 技术栈的公司好了 XD~~

`gatsby`是基于`React`、`GraphQL`的静态网站生成器，功能十分强大，而且基于`React`并且可以用上整个前端生态。

其实作为静态建站方案，`gatsby`是很成熟的，当前版本已经到 v3 版本,在国外还是很受欢迎的，而且文档很齐全，社区维护的插件和主题也不少，但是网上的教程质量不是很高所以可能需要从零自己研究

虽然原先 hexo 的主题 `maupassant`挺合我口味的，但在一番思考较量后，最后还是决定重新构建一套样式

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

9-5

- 完成自有主题构建除文章页的大部分，`tailwindcss`撸样式真的太快了 :P
- 设计完成了暗黑主题，暂未考虑明亮主题

9-6

- 增加各个组件和布局之间的联系和抽离组件使代码更简洁

9-7

- 完成文章 Toc 导航组件，这里因为想自己写一个 Affix 组件浪费了很多时间 :P

9-8

- 研究 Header 的响应化浪费很多时间 最后决定使用现成的组件库重构一下各种地方
- 最后还是选择放弃响应式 Header 选择在小屏幕上使用抽屉式导航

# 开发中遇到的问题

## Cannot find namespace 'GatsbyTypes'.

因为使用了 `gatsby-plugin-typegen` 这个插件会自动生成整个项目中所需包括`graphql查询语句`返回的类型，然后再对配置文件进行 type-safe 化中直接使用了生成的 GatsbyTypes 命名空间但是编译无法通过

在`gatsby-node.ts`开头加入以下，手动为编译器添加声明文件

```ts
/// <reference path="./src/gatsby-types.d.ts" />
```

`./src/gatsby-types.d.ts`这个路径是插件配置中导出的路径

## typescript 下的生命周期钩子

其实这部分必要性不是很大，虽然但是确实增强了类型强度，不过和自己代码中交互有限，不能将一些类型传递到页面模板中

# Hello Gatsby :)