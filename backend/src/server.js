
const app = require('./app');

/**
 * 启动Express服务器
 * @param {number} port - 服务器监听端口
 */
function startServer(port) {
  // 关键逻辑：启动监听指定端口
  app.listen(port, () => {
    // 输出启动信息以便调试和运维监控
    // 注意：生产环境下请自行管理日志输出方式
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
  });
}

// 获取端口号，默认4000
const PORT = process.env.PORT || 4000;

// 关键逻辑：执行服务器启动
startServer(PORT);
