---
title: 使用deno构建一个简单的开发服务器
path: /build-dev-server-with-deno
date: 2022-03-02T09:29:34.074Z
tags:
  - Typescript
  - Deno
---
初次接触 Deno 其实好像是 21 年，发现 Node 之父又搞了什么幺蛾子，就简单试了试发现和 Node 比没有巨大的优势，毕竟 Node 的生态

后来呢生产中使用了 Vite 真的是十分好用，尝试简单接触了一下源码，和网上一些解析发现其核心功能实现没有那么难，总体来说就是实现以下几个核心功能:

1. 服务器拦截对`*.vue`文件的请求，即时编译他们然后将编译后的 js 返回
2. 对导入到 js 文件中的 npm 包会指向本地`node_modules`里本地安装的文件

然后后来又发现[vue-dev-server](https://github.com/vuejs/vue-dev-server)这个早期概念模型，这个仓库的源码基本就是 vite 开发服务器的核心功能实现。

# 来到了 Deno

显然 Deno 作为对标 Node 的运行时，而且自身提供了运行 ts 能力，非常的方便

那当然就想到能不能仿照这个简单的开发服务器来构建一个 Deno 下的开发服务器呢，当然说干就干

# 使用 Oak 构建服务器
