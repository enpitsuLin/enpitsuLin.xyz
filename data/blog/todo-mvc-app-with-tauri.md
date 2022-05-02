---
title: 使用Tauri构建桌面端应用程序——以TodoMVC为例
draft: true
date: 2022-05-02 17:29:37
lastmod: 2022-05-02 17:29:37
tags: ['rust', 'tauri']
summary: rust太难学了？学习了rust不会实践？简单使用 Tauri 搭建经典实战项目TodoMVC 来做实践吧。你会发现rust真的很好玩，tauri也是非常的快，转变思维使用rust来写代码真的很爽。
---

学习 Rust 不会实践？错，其实是太难了根本学不会，直接上实践就完事了。就用框架最经典的实战项目 TodoMVC，我们实现一个 rust+sqlite 做后端 、react 做前端的~~跨平台~~桌面端 app

## 创建 Tauri 项目

虽然根据[官方文档](https://tauri.studio/docs/getting-started/beginning-tutorial#1-start-a-new-tauri-project)新建一个项目很简单。

不过我是用 pnpm 做包管理，pnpm 创建项目运行如下

```sh
pnpm create tauri-app
```

我们选择使用从`create-vite` 然后使用 react-ts 模板

![](https://images-enpitsulin.oss-cn-beijing.aliyuncs.com/images/Snipaste_2022-05-02_17-35-03.png)

然后等待 cli 安装完依赖，用 VSCode 打开项目，这里建议你安装`rust-analyzer`不过我估计学习 rust 应该早都推荐安装了,然后我们的项目目录就如下

![目录](https://images-enpitsulin.oss-cn-beijing.aliyuncs.com/images/20220502174606.png)

存放前端项目内容的 src 和 rust 后端的 src-tauri，对于 web 界面的开发就很正常开发 react 一样，但是对于和编写 rust 后端就不同于 electron 了毕竟 rust 和 nodejs 完全不一样

## 构建页面

首先我们直接使用 TodoMVC 这个项目提供的 css，安装`todomvc-app-css`

```sh
pnpm add todomvc-app-css
```

然后在入口文件引入,并把原先引入的样式文件删掉

```tsx:src/main.tsx {diff}
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
+ import 'todomvc-app-css/index.css'
- import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

然后新建 components 目录并创建 TodoItem 组件

```tsx:src/components/TodoItem.tsx
const TodoItem = () => {
  return (
    <li>
      <div className="view">
        <input type="checkbox" className="toggle" autoFocus />
        <label>some todo item</label>
        <button className="destroy"></button>
      </div>
    </li>
  )
}
export default TodoItem
```

以及 TodoList 组件

```tsx:src/components/TodoList.tsx
import TodoItem from './TodoItem'
const TodoList = () => {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <input type="text" className="new-todo" placeholder="What needs to be done?" />
      </header>
      <section className="main">
        <input type="checkbox" className="toggle-all" />
        <label htmlFor="togle-all"></label>
        <ul className="todo-list">
          <TodoItem />
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>1</strong> items left
        </span>
        <ul className="filters">
          <li>
            <a>All</a>
          </li>
          <li>
            <a>Active</a>
          </li>
          <li>
            <a>Completed</a>
          </li>
        </ul>
      </footer>
    </>
  )
}
export default TodoList
```

然后在 App.tsx 中把原先模板中的代码删除然后引入 TodoList 并展示出来。

```tsx:src/App.tsx
import TodoList from './component/TodoList'

function App() {
  return (
    <div className="todoapp">
      <TodoList />
    </div>
  )
}

export default App
```

### 启动 Tauri

然后启动 tauri，就可以看到效果了

```sh
pnpm tauri dev
```

![效果](https://images-enpitsulin.oss-cn-beijing.aliyuncs.com/images/20220502180609.png)

不过这部分仅仅只是显示简单的 html 结构以及相应的 css 样式没有任何功能

## 开发后端

实现 web 界面功能先放到一边，先来考虑下 rust 后端操作，先了解下 tauri 怎么通信的

根据[官方文档](https://tauri.studio/docs/guides/command)我们可以通过 TauriAPI 包或者设置`tauri.conf.json > build > withGlobalTauri`为 true 来将 invoke 挂载到 window.\_\_TAURI\_\_ 对象上

然后我们就可以使用 invoke 调用 rust 后端提供的方法了

### 使用 sqlite

首先添加 [rusqlite](https://github.com/rusqlite/rusqlite) 依赖来获得操作 sqlite 的能力

```toml:src-tauri/Cargo.toml {diff}
[dependencies]
# ...
+ rusqlite = { version = "0.27.0", features = ["bundled"] }
```

### 实现对 sqlite 数据库的操作

参考 [rusqlite](https://github.com/rusqlite/rusqlite#readme)的用法，我们创建一个方法来创建数据库连接。

```rust
fn connect() -> Result<()>{
    let db_path = "db.sqlite";
    let db = Connection::open(&db_path)?;
    println!("{}", db.is_autocommit());
    Ok(())
}
```

然后我们可以实现更多的方法来对数据库增删改查，但写太多方法每次都要创建数据库连接然后断开，比较麻烦，于是我们可以实现一个结构体`TodoApp`来封装常用的方法

### TodoApp

首先我们设计一下数据库表结构

Todo 表比较简单的结构，建表语句：

```sqlite
CREATE TABLE IF NOT EXISTS Todo (
    id          varchar(64)     PRIMARY KEY,
    label       text            NOT NULL,
    done        numeric         DEFAULT 0,
    is_delete   numeric         DEFAULT 0
)
```

然后我们新建一个`todo.rs`模块,同时建立一个 Todo 结构体做类型，这里都用 pub 因为我们可能在 main 中使用的时候访问这些属性

```rust
pub struct Todo {
    pub id: String,
    pub label: String,
    pub done: bool,
    pub is_delete: bool,
}
```

以及 TodoApp 暂时未实现内部的方法

```rust
pub struct TodoApp {
    pub conn: Connection,
}
impl TodoApp {
    //To be implement
}
```
