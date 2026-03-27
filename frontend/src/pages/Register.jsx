
import React, { useState } from 'react';

/**
 * 注册页面组件
 * @returns {JSX.Element} 注册表单 UI 及交互
 */
function Register() {
  // 表单状态
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // 错误与消息状态
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * 表单输入变更事件处理
   * @param {React.ChangeEvent<HTMLInputElement>} e 输入事件
   */
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  /**
   * 表单提交处理
   * @param {React.FormEvent} e 提交事件
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 前端基础校验
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('请填写所有字段');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    setLoading(true);
    try {
      // 调用注册API（假定接口为 /api/register, POST）
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });
      const result = await res.json();

      // 统一API响应格式: { success, data, message }
      if (result.success) {
        setSuccess('注册成功，请前往登录。');
        setForm({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        setError(result.message || '注册失败，请重试');
      }
    } catch (err) {
      // 错误处理，前端临时兜底，生产环境可用Error Boundary
      setError('网络错误，请稍后再试');
      // eslint-disable-next-line no-console
      console.error('注册异常:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 6 }}>
      <h2>用户注册</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 12 }}>
          <label>
            用户名:
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              autoComplete="username"
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            邮箱:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              autoComplete="email"
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            密码:
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              autoComplete="new-password"
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            重复密码:
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              autoComplete="new-password"
            />
          </label>
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, fontSize: 16 }}>
          {loading ? '注册中...' : '注册'}
        </button>
      </form>
    </div>
  );
}

export default Register;
