import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchTask();
    }
  }, [id]);

  async function fetchTask() {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/todos/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      
      if (result.success) {
        setForm({
          title: result.data.title || '',
          description: result.data.description || ''
        });
      } else {
        setError(result.message || '无法加载任务');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!form.title.trim()) {
      setError('任务标题不能为空');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = isEdit ? `/api/todos/${id}` : '/api/todos';
      const method = isEdit ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      
      if (result.success) {
        setSuccess(isEdit ? '任务已更新' : '任务已创建');
        setTimeout(() => {
          navigate('/tasks');
        }, 1500);
      } else {
        setError(result.message || '保存失败');
      }
    } catch (err) {
      setError('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <h2>{isEdit ? '编辑任务' : '新建任务'}</h2>
      
      {loading && <p>加载中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>标题 *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={loading}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <label>描述</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            disabled={loading}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        
        <div>
          <button type="submit" disabled={loading} style={{ padding: '10px 20px', marginRight: 10 }}>
            {isEdit ? '保存修改' : '创建任务'}
          </button>
          <button type="button" onClick={() => navigate('/tasks')} style={{ padding: '10px 20px' }}>
            取消
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskEdit;