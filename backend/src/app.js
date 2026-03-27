
const express = require('express');

/**
 * 全局错误处理中间件
 * 捕获所有路由/中间件错误，统一返回响应格式
 * @param {Error} err - 捕获到的错误对象
 * @param {Request} req - Express请求对象
 * @param {Response} res - Express响应对象
 * @param {Function} next - Express下一中间件
 */
function globalErrorHandler(err, req, res, next) {
  // 关键逻辑：统一错误格式
  res.status(err.status || 500).json({
    success: false,
    data: null,
    message: err.message || 'Internal Server Error',
  });
}

// Express应用初始化
const app = express();

// 关键逻辑：JSON请求体解析
app.use(express.json());

// 示例根路由
/**
 * GET /
 * 测试API基础响应格式
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: null,
    message: 'Welcome to Todo App Backend',
  });
});

// 关键逻辑：全局错误处理中间件挂载
app.use(globalErrorHandler);

module.exports = app;
