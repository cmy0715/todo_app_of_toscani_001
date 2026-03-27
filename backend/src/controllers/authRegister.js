
const { User } = require('../models/schemas');
const bcrypt = require('bcrypt');

/**
 * 用户注册API控制器
 * 接收username和password，保存新用户
 * @param {Request} req - Express请求对象
 * @param {Response} res - Express响应对象
 * @param {Function} next - Express错误处理回调
 */
async function authRegister(req, res, next) {
  try {
    const { username, password } = req.body;

    // 关键逻辑：校验必填字段
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Username and password are required',
      });
    }

    // 检查用户名是否已存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        data: null,
        message: 'Username already exists',
      });
    }

    // 关键逻辑：加密用户密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    // 关键逻辑：只返回安全字段
    const result = {
      _id: user._id,
      username: user.username,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      success: true,
      data: result,
      message: 'User registered successfully',
    });
  } catch (err) {
    // 关键逻辑：委托全局错误处理中间件
    next(err);
  }
}

module.exports = authRegister;
