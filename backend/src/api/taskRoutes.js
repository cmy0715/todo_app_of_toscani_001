
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { validateRequest } = require('../middlewares/validation');

const router = express.Router();

// 任务验证函数
const validateTask = (req) => {
  const { title } = req.body;
  if (!title) {
    return '任务标题不能为空';
  }
  return null;
};

// 所有任务路由都需要认证
router.use(authMiddleware);

router.post('/', validateRequest(validateTask), createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
