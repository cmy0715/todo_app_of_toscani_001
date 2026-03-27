
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

/**
 * 首页页面组件
 * @returns {JSX.Element} 首页内容
 */
function HomePage() {
  return (
    <div>
      <h2>主页</h2>
      <p>欢迎使用 Todo App！</p>
    </div>
  );
}

/**
 * 404 未找到页面组件
 * @returns {JSX.Element} 404 页面内容
 */
function NotFoundPage() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>您访问的页面不存在。</p>
    </div>
  );
}

/**
 * 页面根组件，负责配置路由
 * @returns {JSX.Element}
 */
function AppPages() {
  try {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* 后续可扩展更多路由，如 /todos, /about 等 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    );
  } catch (error) {
    // 路由级基础错误捕获
    // eslint-disable-next-line no-console
    console.error('页面渲染错误:', error);
    // 全局错误页面简单返回
    return (
      <div>
        <h2>页面渲染错误</h2>
        <pre>{error.message}</pre>
      </div>
    );
  }
}

export default AppPages;
