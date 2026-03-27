
const request = require('supertest');
const app = require('../src/app');

/**
 * 单元测试：Todo App后端核心模块
 * 使用supertest进行API路由测试，确保返回统一格式
 */

describe('Todo App Backend Core Module Unit Tests', () => {
  /**
   * 测试根路由API
   */
  it('should return basic success response for GET /', async () => {
    const res = await request(app).get('/');
    // 关键逻辑：响应格式校验
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data', null);
    expect(res.body).toHaveProperty('message', 'Welcome to Todo App Backend');
  });

  /**
   * 测试错误响应格式（路径不存在情况下）
   */
  it('should return error response for invalid route', async () => {
    const res = await request(app).get('/notfound');
    // 关键逻辑：响应格式校验，使用全局错误处理
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('data', null);
    expect(res.body).toHaveProperty('message');
  });
});
