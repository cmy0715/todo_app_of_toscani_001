
const { Todo } = require('../models/schemas');

/**
 * 创建新任务
 * @param {import('express').Request} req 请求对象
 * @param {import('express').Response} res 响应对象
 * @param {import('express').NextFunction} next 下一中间件
 */
async function createTask(req, res, next) {
  try {
    const { title, description, dueDate } = req.body;
    // 检查title必填
    if (!title) {
      return res.status(400).json({
        success: false,
        data: null,
        message: '任务标题为必填项',
      });
    }
    // 创建任务
    const todo = new Todo({
      title,
      description,
      dueDate,
      owner: req.user.userId, // 从JWT认证中间件挂载的user
    });
    await todo.save();
    res.status(201).json({
      success: true,
      data: todo,
      message: '任务创建成功',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * 获取当前用户的所有任务
 * @param {import('express').Request} req 请求对象
 * @param {import('express').Response} res 响应对象
 * @param {import('express').NextFunction} next 下一中间件
 */
async function getTasks(req, res, next) {
  try {
    // 查询自己的任务
    const todos = await Todo.find({ owner: req.user.userId }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: todos,
      message: '任务获取成功',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * 获取单个任务详情（仅自己拥有的）
 * @param {import('express').Request} req 请求对象
 * @param {import('express').Response} res 响应对象
 * @param {import('express').NextFunction} next 下一中间件
 */
async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, owner: req.user.userId });
    if (!todo) {
      return res.status(404).json({
        success: false,
        data: null,
        message: '任务不存在',
      });
    }
    res.json({
      success: true,
      data: todo,
      message: '任务详情获取成功',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * 更新单个任务（仅自己拥有的）
 * @param {import('express').Request} req 请求对象
 * @param {import('express').Response} res 响应对象
 * @param {import('express').NextFunction} next 下一中间件
 */
async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const updateFields = {};
    const allowed = ['title', 'description', 'completed', 'dueDate'];
    // 只允许部分字段更新
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updateFields[key] = req.body[key];
      }
    }
    // 禁止空更新
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        data: null,
        message: '未提交任何变更',
      });
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: id, owner: req.user.userId },
      { $set: updateFields },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        data: null,
        message: '任务不存在或无权限',
      });
    }

    res.json({
      success: true,
      data: todo,
      message: '任务更新成功',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * 删除单个任务（仅自己拥有的）
 * @param {import('express').Request} req 请求对象
 * @param {import('express').Response} res 响应对象
 * @param {import('express').NextFunction} next 下一中间件
 */
async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, owner: req.user.userId });
    if (!todo) {
      return res.status(404).json({
        success: false,
        data: null,
        message: '任务不存在或无权限',
      });
    }
    res.json({
      success: true,
      data: todo,
      message: '任务删除成功',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
