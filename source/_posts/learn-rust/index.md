---
title: 简单上手一下Rust
toc: true
date: 2021-11-23 21:47:00
tags:
  - rust
---

本身就有一个想学习一下 rust 的[目标](/about)，但是总好似没时间和精力去接触，直到看到[《Rust 是 JS 基建的未来》](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/218.%E7%B2%BE%E8%AF%BB%E3%80%8ARust%20%E6%98%AF%20JS%20%E5%9F%BA%E5%BB%BA%E7%9A%84%E6%9C%AA%E6%9D%A5%E3%80%8B.md)这篇文章，似乎很多现有的前端开发链上的工具都有了 rust 的替代方案。

回头想想自己真正掌握的编程语言实在少的可怜，对于职业发展来说真正的接触一门既能支撑前端基建发展，有可以有更深入 Web 领域(后端、Web Assembly)的机会，甚至于为了如同该文所说的前端社区未来引入 rust 生态后的工具贡献使用难度做准备，我想我要做的而不仅仅是单纯的前端框架使用者。

<!-- more -->

# 起步

首先是安装开发环境吧，本身自己的 windows 都是用 scoop 做管理，就很简单的安装 VS 然后执行安装 rustup 的命令就完成了~~scoop 安装的 rustup 想使用 mingw-w64 来编译似乎无法配置就还是装 VS 吧~~

```shell
scoop install rustup
```

## 镜像源的使用

总所周至的原因，cargo 的源在国内不太好用，所以建议使用[crm (Cargo registry manager)](https://github.com/wtklbm/crm)来帮助管理镜像源

```shell
cargo install crm
```

# rust 对于前端的快速入门

## 包管理器

rust 的包管理器就是 cargo，创建一个 rust 项目使用`cargo init`，运行则`cargo run`，使用`Cargo.toml`来管理依赖，和 npm 算是还挺相像的。

## 变量声明和类型

rust 同样使用`let`来声明变量，但是 rust 作为强类型语言，实质上在变量声明比较类似于 TS，但是其默认类型和 js 中的不一样。

```rust
let a = 1;
// 显示指定类型为i32
let b:i32 = 2;

```

但是有一点不同子啊与 let 直接声明的变量，在 rust 中默认是不允许改变的，需要指定 mut 关键字来让变量成为可变绑定的变量，按我的理解对应`=`的功能为绑定而不是赋值。

```rust
let a = 1;
let mut b = 1;
a = 2; //wrong
b = 2; //right

let b = b // 重新绑定为不可变

```

| 类型标识    | 类型描述                            | 注意                                 |
| ----------- | ----------------------------------- | ------------------------------------ |
| i8/u8       | 有/无符号 8 位整型                  | rust 中没有++和--                    |
| i16/u16     | 有/无符号 16 位整型                 | -                                    |
| i32/u32     | 有/无符号 32 位整型                 | 整型变量的默认类型                   |
| i64/u64     | 有/无符号 64 位整型                 | -                                    |
| i128/u128   | 有/无符号 128 位整型                | -                                    |
| isize/usize | 有/无符号基于底层机器指针位数的整型 | -                                    |
| f32/f64     | 单双精度浮点数                      | -                                    |
| bool        | 布尔值                              | -                                    |
| char        | 字符型                              | 大小为 4 个字节，代表 Unicode 标量值 |

这些是 rust 中的基础类型。

## 复合类型

对于 js 来说就三类 `Object | Array | Function`

### rust 的 Object

rust 中没有直接对标与 JS 直接声明对象字面量那样的灵活的类型，rust 的`struct`可能使用上与构造函数创建对象比较相似但不需要 new 关键字。

没深入暂时不是很能理解二者的差异

```rust
struct Point {
  x: i32,
  y: i32,
}
```

### rust 的 Array

数组在 rust 中对应元组和数组，但是 rust 中元组和数组都是不可变长度，一旦定义，就不能再增长或缩小。元组通过`元组名.索引数字`,数组则和 js 一致

```rust
let tup = (1, 1.2, 1.4);
let type_tup: (i32, f64, bool) = (1, 1.2, true);

let arr = [1, 2, 3];
let type_arr: [i32; 3] = [0; 3];
```

对于元组和数组，可以用到解构赋值——一种和 ES6 的解构相似的用法

```rust
let arr = [1, 2, 3];
let type_arr: [i32; 3] = [0; 3];

let [arr_first,arr_second,arr_third] = arr;
let (tup_first,tup_second,tup_third) = tup
```

### rust 的 Function

rust 中的函数与 js 相似，方法则比较类似于 ruby 的类方法和 js 成员函数的混合体(甚至于双冒号调用和.调用也和相似)

**WIP**
