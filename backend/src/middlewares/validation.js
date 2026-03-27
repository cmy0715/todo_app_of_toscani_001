
/**
 * 请求参数验证中间件
 * 支持传入校验函数，对req.body/req.query等进行验证
 * 若校验失败，则触发全局错误处理
 * @param {Function} validator - 校验函数，返回错误信息字符串或null
 * @returns {Function} Express中间件函数
 */
function validateRequest(validator) {
  return (req, res, next) => {
    // 关键逻辑：执行校验函数
    const errorMessage = validator(req);
    if (errorMessage) {
      // 构造统一错误对象，走全局错误处理中间件
      const err = new Error(errorMessage);
      err.status = 400;
      return next(err);
    }
    next();
  };
}

module.exports = {
  validateRequest,
};
