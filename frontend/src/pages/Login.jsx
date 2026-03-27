
import React, { useState } from 'react';

/**
 * 登录页面组件
 * @returns {JSX.Element} 登录表单及交互
 */
function Login() {
  // 定义表单状态
  const [form, setForm] = useState({ username: '', password: '' });
  // 定义加载及错误状态
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  /**
   * 表单输入变动处理
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrorMsg('');
    setSuccessMsg('');
  }

  /**
   * 登录表单提交（UI交互本地处理）
   * @param {React.FormEvent} e 
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    // 简单校验
    if (!form.username || !form.password) {
      setErrorMsg('请输入用户名和密码');
      return;
    }

    setLoading(true);
    try {
      // 发送登录请求（待接入真实 API，此处为模拟）
      // const res = await fetch('/api/auth/login', {...})
      // 假设为统一格式
      // const result = await res.json();

      // 模拟 API 响应
      await new Promise(r => setTimeout(r, 500));
      // 假定用户名 admin 密码 123456 登录成功
      if (form.username === 'admin' && form.password === '123456') {
        setSuccessMsg('登录成功，欢迎回来！');
        // 真实应用：设置 token，跳转页面等处理
      } else {
        setErrorMsg('用户名或密码错误');
      }
    } catch (err) {
      // 统一错误处理（真实项目中建议全局处理，此为UI降级）
      setErrorMsg('登录时发生错误，请稍后重试。');
      // eslint-disable-next-line no-console
      console.error('登录错误:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '40px auto', padding: 24, border: '1px solid #EEE', borderRadius: 8 }}>
      <h2>用户登录</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="username">用户名：</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            disabled={loading}
            required
            style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password">密码：</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            disabled={loading}
            required
            style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 4 }}
          />
        </div>
        {errorMsg && (
          <div style={{ color: 'red', marginBottom: 12 }}>{errorMsg}</div>
        )}
        {successMsg && (
          <div style={{ color: 'green', marginBottom: 12 }}>{successMsg}</div>
        )}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  );
}

export default Login;
