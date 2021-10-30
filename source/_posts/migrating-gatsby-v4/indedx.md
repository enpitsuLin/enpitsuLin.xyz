---
title: 迁移到Gatsby v4
toc: true
date: 2021-10-29 10:50:00
tags:
  - blog
  - Gatsby
---

前几天 [gatsby v4](https://github.com/gatsbyjs/gatsby/releases/tag/gatsby%404.0.0) 算是正式发布了，在 **beta** 阶段就一致在关注，因为本身博客是由其搭建的，还有这种版本更新可以看看 unofficial 的插件有没有存在跟不上更新的情况 ~~可以蹭几条 pr（雾~~

于是花了参考[文档](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/)花了点时间简单的迁移了一下，还有把简单的几个插件自己实现了。

<!-- more -->

# 依赖更新

首先是更新 gatsby 的版本至 4.0.0

```json
{
  "dependencies": {
    "gatsby": "^4.0.0"
  }
}
```

或者直接运行

```shell{promptUser:enpitsulin}
npm install gatsby@next
```

然后把官方维护的插件也更新到 v4 的版本，这里我又引入 yarn 做包管理，因为 yarn 来升级依赖很好使 XD

直接运行，然后就有图形化的 CLI 来选择更新的，直接把`gatsby-`开头的都升级了

```shell{promptUser:enpitsulin}
yarn upgrade-interactive
```

# 废弃 api 更新

其实大多数都是废弃了 v2 的 api，我这种从 v3 开始的基本没什么影响，就是部分非官方插件没跟上，官方给出的方法是在插件的`package.json`中更新`peerDependencies `为`"^4.0.0"`或`"^4.0.0 || ^3.0.0"`来兼容 v3

## gatsby-plugin-root-import

这个插件其实实现很简单，就是直接使用了 gatsby-node.js 的`onCreateWebpackConfig`来控制 webpack 的 alias 设置，直接自己实现并移除了依赖，不过顺带到作者的仓库提了下 issue。

> 直接在 gatsby-node.ts 里导出这个方法 就可以实现原来的使用方法了

```typescript
const onCreateWebpackConfig: Gatsby['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': join(__dirname, '../src')
      }
    }
  });
};
```

## gatsby-remark-vscode

好像暂时没有迁移到 v4 的意思，准备换用官方的 `gatsby-remark-prismjs`

卸载原来的`gatsby-remark-vscode`并安装`gatsby-remark-prismjs`、`prismjs`

```shell{promptUser:enpitsulin}
yarn remove gatsby-remark-vscode
yarn add gatsby-remark-prismjs prismjs
```

并配置一下gatsby-config中的一些选项就ok了，换用这个高亮插件顺便想增加一些别的代码块效果比如复制和显示代码类型名称。

# 总结

v4 的更新还算顺利，因为没有很依赖非官方的插件来实现自己的页面，大多数是使用的 react 的生态和自己来写，所以说还是靠自己和写的代码质量高比较靠谱呀
