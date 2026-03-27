
import React, { useEffect, useState } from 'react';

/**
 * 任务项类型定义
 * @typedef {Object} Task
 * @property {string} _id - 任务唯一ID
 * @property {string} title - 任务标题
 * @property {boolean} completed - 是否完成
 * @property {string} [description] - 任务描述
 */

/**
 * 默认API响应格式
 * @typedef {Object} ApiResponse
 * @property {boolean} success - 响应是否成功
 * @property {Array<Task>} data - 任务数据列表
 * @property {string} message - 提示信息
 */

const API_URL = '/api/tasks'; // 任务接口地址

/**
 * 任务列表页面组件
 * @returns {JSX.Element}
 */
function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 获取任务列表（带筛选）
  useEffect(() => {
    /**
     * 拉取任务数据
     * @returns {Promise<void>}
     */
    async function fetchTasks() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        /** @type {ApiResponse} */
        const result = await res.json();
        if (result.success) {
          setTasks(result.data || []);
        } else {
          setError(result.message || '任务获取失败');
        }
      } catch (err) {
        // 捕获网络等其他错误
        setError(err?.message || '获取任务异常');
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  /**
   * 根据筛选条件返回过滤后的任务
   * @returns {Task[]}
   */
  function getFilteredTasks() {
    if (filter === 'completed') {
      return tasks.filter(t => t.completed);
    }
    if (filter === 'active') {
      return tasks.filter(t => !t.completed);
    }
    return tasks;
  }

  /**
   * 处理筛选条件选择
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  // UI渲染
  try {
    return (
      <div>
        <h2>任务列表</h2>
        {/* 筛选器 */}
        <div>
          <label>
            筛选任务：
            <select value={filter} onChange={handleFilterChange}>
              <option value="all">全部</option>
              <option value="active">未完成</option>
              <option value="completed">已完成</option>
            </select>
          </label>
        </div>
        {loading && <div>加载中...</div>}
        {error && (
          <div style={{ color: 'red' }}>错误：{error}</div>
        )}
        <ul>
          {getFilteredTasks().map(task => (
            <li key={task._id}>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </span>
              {task.description && (
                <small> —— {task.description}</small>
              )}
              {task.completed && <span> ✅</span>}
            </li>
          ))}
        </ul>
        {getFilteredTasks().length === 0 && !loading && !error && (
          <div>暂无任务</div>
        )}
      </div>
    );
  } catch (renderError) {
    // 局部错误捕获，建议全局错误处理
    // eslint-disable-next-line no-console
    console.error('任务列表渲染错误:', renderError);
    return <div>页面渲染错误：{renderError.message}</div>;
  }
}

export default TaskList;
