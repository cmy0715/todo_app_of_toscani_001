import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    
    if (!form.username || !form.password) {
      setErrorMsg('请输入用户名和密码');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      
      if (result.success) {
        localStorage.setItem('token', result.data.token);
        navigate('/tasks');
      } else {
        setErrorMsg(result.message || '登录失败');
      }
    } catch (err) {
      setErrorMsg('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '40px auto', padding: 24, border: '1px solid #EEE', borderRadius: 8 }}>
      <h2>用户登录</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>用户名：</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={loading}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>密码：</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        {errorMsg && <div style={{ color: 'red', marginBottom: 12 }}>{errorMsg}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <a href="/register">还没有账号？立即注册</a>
      </div>
    </div>
  );
}

export default Login;
