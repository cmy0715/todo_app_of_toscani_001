import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 获取任务列表
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/todos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await res.json();
      
      if (result.success) {
        setTasks(result.data || []);
      } else {
        setError(result.message || '获取任务失败');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  }

  async function toggleComplete(task) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/todos/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: !task.completed })
      });
      const result = await res.json();
      
      if (result.success) {
        fetchTasks(); // 刷新列表
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert('操作失败');
    }
  }

  async function deleteTask(id) {
    if (!!window.confirm('确定要删除这个任务吗？')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await res.json();
      
      if (result.success) {
        fetchTasks(); // 刷新列表
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert('删除失败');
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  function getFilteredTasks() {
    if (filter === 'completed') {
      return tasks.filter(t => t.completed);
    }
    if (filter === 'active') {
      return tasks.filter(t => !t.completed);
    }
    return tasks;
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>任务列表</h2>
        <div>
          <button onClick={() => navigate('/tasks/new')} style={{ marginRight: 10, padding: '8px 16px' }}>
            新建任务
          </button>
          <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
            退出登录
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>
          筛选任务：
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginLeft: 10, padding: 5 }}>
            <option value="all">全部</option>
            <option value="active">未完成</option>
            <option value="completed">已完成</option>
          </select>
        </label>
      </div>

      {loading && <div>加载中...</div>}
      {error && <div style={{ color: 'red' }}>错误：{error}</div>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {getFilteredTasks().map(task => (
          <li key={task._id} style={{
            padding: '16px',
            marginBottom: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  margin: '0 0 8px 0',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#999' : '#333'
                }}>
                  {task.title}
                </h3>
                {task.description && (
                  <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{task.description}</p>
                )}
                {task.dueDate && (
                  <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#999' }}>
                    截止日期: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div>
                <button
                  onClick={() => toggleComplete(task)}
                  style={{
                    marginRight: '8px',
                    padding: '6px 12px',
                    backgroundColor: task.completed ? '#ffc107' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {task.completed ? '撤销' : '完成'}
                </button>
                <button
                  onClick={() => navigate(`/tasks/edit/${task._id}`)}
                  style={{
                    marginRight: '8px',
                    padding: '6px 12px',
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  编辑
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  删除
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {getFilteredTasks().length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>
          暂无任务，点击"新建任务"开始添加吧！
        </div>
      )}
    </div>
  );
}

export default TaskList;