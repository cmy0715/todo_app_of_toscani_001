
# Todo App

**技术栈**: React + Node.js + MongoDB

---

## 项目简介

Todo App 是一个基于 MERN (MongoDB, Express, React, Node.js) 技术栈开发的全功能待办事项管理 Web 应用。支持用户创建、编辑、删除、查询待办事项，数据持久化，操作简单高效。

---

## 目录结构

```
project-root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── todoController.js
│   │   ├── models/
│   │   │   └── todo.js
│   │   ├── routes/
│   │   │   └── todoRoutes.js
│   │   ├── middlewares/
│   │   │   └── errorHandler.js
│   │   └── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TodoList.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## 后端启动

### 前置条件

- Node.js >= 16
- 本地或远程 MongoDB 服务

### 配置与运行

1. 进入 backend 目录：`cd backend`
2. 安装依赖：`npm install`
3. 配置环境变量（新建 `.env` 文件，例）：

   ```
   MONGODB_URI=mongodb://localhost:27017/todo_db
   PORT=4000
   ```

4. 启动服务：`npm start`  
   服务默认运行于 http://localhost:4000

5. 全局错误处理统一通过 `/middlewares/errorHandler.js` 中间件；所有 API 响应格式为  
   `{ success: boolean, data: any, message: string }`

---

## 前端启动

### 前置条件

- Node.js >= 16

### 配置与运行

1. 进入 frontend 目录：`cd frontend`
2. 安装依赖：`npm install`
3. 启动项目：`npm start`
4. 浏览器访问 http://localhost:3000

---

## 关键模型/接口

### Todo 数据模型（backend/src/models/todo.js）

- `title`: String，必填，待办事项标题
- `completed`: Boolean，完成状态，默认 false
- `createdAt`: Date，创建时间

### RESTful API 列表（backend/src/routes/todoRoutes.js）

- `GET    /api/todos`：查询所有待办事项
- `POST   /api/todos`：创建待办事项
- `PUT    /api/todos/:id`：修改待办事项
- `DELETE /api/todos/:id`：删除待办事项

---

## 代码规范

- 前端/后端均遵循 ESLint + Prettier 自动化规范
- 命名统一使用 camelCase
- 关键逻辑和所有函数，均含有必要的注释或文档字符串（JSDoc）

---

## 错误处理&接口返回

- API 所有请求均返回如下格式：
  ```
  {
    success: boolean,
    data: any,
    message: string
  }
  ```
- 服务端所有错误均通过全局错误处理中间件统一处理（`src/middlewares/errorHandler.js`）

---

## 项目维护

欢迎提出 issues 或 pull request，详细贡献方式参见 [CONTRIBUTING.md]（如有）。

---

## License

[MIT](./LICENSE)

---

## 联系方式

如有任何问题，请邮件联系：real.muyu.c@gmail.com
