
const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * 用户Schema
 * @typedef {Object} User
 * @property {string} username - 用户名，唯一且必填
 * @property {string} password - 哈希加密密码，必填
 * @property {Date} createdAt - 用户创建日期
 * @property {Date} updatedAt - 用户信息修改日期
 */
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // 自动管理createdAt, updatedAt
  }
);

/**
 * 任务Schema
 * @typedef {Object} Todo
 * @property {string} title - 任务标题，必填
 * @property {string} description - 任务详细描述，可选
 * @property {boolean} completed - 是否已完成
 * @property {ObjectId} owner - 当前任务归属的用户
 * @property {Date} dueDate - 任务截止日期，可选
 * @property {Date} createdAt - 任务创建日期
 * @property {Date} updatedAt - 任务更新日期
 */
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // 自动管理createdAt, updatedAt
  }
);

// 关键逻辑：模型导出
const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
  User,
  Todo,
};
