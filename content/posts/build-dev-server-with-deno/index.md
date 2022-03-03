---
title: 使用deno构建一个简单的开发服务器
path: /build-dev-server-with-deno
date: 2022-03-02T09:29:34.074Z
description: ""
tags:
  - Typescript
  - Deno
---
初次接触 Deno 其实好像是 21 年，发现 Node 之父又搞了什么幺蛾子，就简单试了试发现和 Node 比没有巨大的优势，毕竟 Node 的生态

后来呢生产中使用了 Vite 真的是十分好用，尝试简单接触了一下源码，和网上一些解析发现其核心功能实现没有那么难，想着自己简单实现下其基础功能。

<!-- more -->

总体来说就是实现以下几个核心功能:

1. 服务器拦截对`*.vue`文件的请求，即时编译他们然后将编译后的 js 返回
2. 对导入到 js 文件中的 npm 包会指向本地`node_modules`里本地安装的文件

然后后来又发现[vue-dev-server](https://github.com/vuejs/vue-dev-server)这个早期概念模型，这个仓库的源码基本就是 vite 开发服务器的核心功能实现。

# 来到了 Deno

显然 Deno 作为对标 Node 的运行时，而且自身提供了运行 ts 能力，非常的方便

那当然就想到能不能仿照这个简单的开发服务器来构建一个 Deno 下的开发服务器呢，当然说干就干

# 使用 Oak 构建服务器

首先我们需要启动一个本地服务器，在 Deno 中有一个名叫 Oak 的包基本对标 Koa 有些 api 也比较相似，所以就使用 Oak 来搭建服务器，毕竟 vite 也是使用 Koa 的嘛

```typescript
import { Application, Router } from "https://deno.land/x/oak@v10.4.0/mod.ts";

const app = new Application();

app.listen({ port: 4000 });
```

这样就是 Oak 最简单的启动了一个服务器，接着我们需要将启动目录下的`index.html`作为`/`路由响应到浏览器,一般来说新增一个`Router`来控制或者全局拦截然后对请求路径`/`做特殊处理都可以达到想要的效果

```typescript
import * as path from "https://deno.land/std@0.126.0/path/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v10.4.0/mod.ts";
//...

const router = new Router();

router.get("/", (ctx, next) => {
  try {
    const entry = Deno.readFileSync(path.join(Deno.cwd(), "index.html"));

    ctx.response.body = new TextDecoder().decode(entry);
  } catch (err) {
    if ((err as Error).name == "NotFound") {
      console.log("entry index.html not found");
    }
  }
  next();
});

app.use(router.routes());

app.listen({ port: 4000 });
```

如此就能将我们运行目录下的 `index.html` 返回了，接着就是需要核心的中间件对文件中导入的资源进行改写和对对应文件请求的拦截并做相关处理。

##
