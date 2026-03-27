
const jwt = require('jsonwebtoken');

/**
 * JWT用户认证中间件
 * 校验前端传来的JWT，验证身份通过后，挂载解密信息到req.user
 * @param {import('express').Request} req 请求对象
 * @param {import('express').Response} res 响应对象
 * @param {import('express').NextFunction} next 下一中间件
 */
function authMiddleware(req, res, next) {
  try {
    // 关键逻辑：从请求头获取token (推荐格式: Bearer <Token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        data: null,
        message: '未认证的请求',
      });
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'default_jwt_secret';

    // 校验token
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          data: null,
          message: 'Token无效或已过期',
        });
      }
      // 关键逻辑：将解密出user挂载到请求对象
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error); // 使用全局错误处理中间件
  }
}

module.exports = authMiddleware;
