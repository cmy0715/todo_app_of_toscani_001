const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { requestLogger, globalErrorHandler } = require('./middlewares/logger');

// Express应用初始化
const app = express();

// 连接 MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// 中间件
app.use(express.json());
app.use(requestLogger);

// 路由
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: null,
    message: 'Welcome to Todo App Backend',
  });
});

app.use('/auth', authRoutes);
app.use('/api/todos', taskRoutes);

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    data: null,
    message: 'Route not found',
  });
});

// 全局错误处理
app.use(globalErrorHandler);

module.exports = app;
