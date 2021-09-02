---
title: 从0开始的Typescript学习和踩坑
toc: false
date: 2021-08-29 22:03:09
tags: [前端技术]
categories: [JavaScript, Vue, React]
description: 大家都在学 不学白不学 卷起来=_,=
---

# 前言

说是从 0 开始，事实上在已经算是在生产中体验过 `Vue3 + ts + vscode + Volar`的魔力了。

但是生产中束缚于业务老是束手束脚的，放不开，正好也好久没有继续 React 的学习了,本身 Vue3 的`composition api`用起来就很香，不如正好搞一波`React + ts + Hooks`的学习。

~~Vue3.2 都发布了 新能那么爆炸 还抱着 Vue2 搞生产真的有点便秘 项目还烂代码堆积 😶~~

# 项目搭建网上搜索一大堆

> > 项目搭建方法略

# 类型小坑

## 函数式组件的类型声明

对于`typescript`的`react组件`,函数式的组件在使用函数声明或者函数表达式方式定义的时候有些许不同

```ts
/**
 * function statement
 * 不会将props推断需要显示声明
 */
function Button(props:PropsWithChildren<ButtonProps>): ReactElement<Props> {
	return <button>{somethings}</button>;
}
/**
 * function expression
 * 此处props会推断成PropsWithChildren<ButtonProps>
 */
const Button:FunctionComponent<Props> = (props)=>
```

## 对于 Class 组件的 Prop 类型

Class 组件可能在某些场合还是很有必要存在的所以还是要注意下坑

对于定义好 Props 和 State 的接口需要在继承`Component`时注意

```typescript
class SomeComponent extends Component<Props, State> {
	///...
}
```

而且注意是一定需要的 prop 增加其可选
