// 环境配置
const config = {
  // API基础URL
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  // WebSocket URL
  wsUrl: import.meta.env.VITE_WS_URL || 'http://localhost:3000'
};

export default config;
