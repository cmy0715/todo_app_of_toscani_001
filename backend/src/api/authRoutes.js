const express = require('express');
const authRegister = require('../controllers/authRegister');
const authLogin = require('../controllers/authLogin');
const { validateRequest } = require('../middlewares/validation');

const router = express.Router();

// 注册验证函数
const validateRegister = (req) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return '用户名和密码不能为空';
  }
  if (password.length < 6) {
    return '密码长度至少6位';
  }
  return null;
};

// 登录验证函数
const validateLogin = (req) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return '用户名和密码不能为空';
  }
  return null;
};

router.post('/register', validateRequest(validateRegister), authRegister);
router.post('/login', validateRequest(validateLogin), authLogin);

module.exports = router;
