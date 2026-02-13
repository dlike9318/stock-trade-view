const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();
const server = http.createServer(app);

// 配置CORS
const corsOrigin = process.env.CORS_ORIGIN || '*';
const allowedOrigins = corsOrigin === '*' ? '*' : corsOrigin.split(',').map(origin => origin.trim());

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST']
}));

// 请求限流中间件
const rateLimit = (req, res, next) => {
  // 简单的内存限流实现
  if (!global.requestCount) {
    global.requestCount = {};
  }
  
  const ip = req.ip;
  const now = Date.now();
  
  if (!global.requestCount[ip]) {
    global.requestCount[ip] = [];
  }
  
  // 清理1分钟前的请求
  global.requestCount[ip] = global.requestCount[ip].filter(time => now - time < 60000);
  
  // 限制每分钟100个请求
  if (global.requestCount[ip].length > 100) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  global.requestCount[ip].push(now);
  next();
};

// 使用限流中间件
app.use(rateLimit);

// 数据缓存
const cache = {
  stockData: {},
  expiry: {} // 缓存过期时间
};

// 缓存中间件
const cacheMiddleware = (req, res, next) => {
  const url = req.originalUrl;
  if (cache.stockData[url] && cache.expiry[url] > Date.now()) {
    return res.json(cache.stockData[url]);
  }
  next();
};

// 使用缓存中间件
app.use('/api/stock', cacheMiddleware);

// 创建Socket.io服务器
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// 股票数据服务
const stockDataService = require('./services/stockDataService');

// API路由
app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const data = await stockDataService.getStockData(symbol);
    
    // 缓存数据，有效期30秒
    const url = req.originalUrl;
    cache.stockData[url] = data;
    cache.expiry[url] = Date.now() + 30000;
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stock/list', async (req, res) => {
  try {
    const list = await stockDataService.getStockList();
    
    // 缓存数据，有效期30秒
    const url = req.originalUrl;
    cache.stockData[url] = list;
    cache.expiry[url] = Date.now() + 30000;
    
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// WebSocket连接处理
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // 发送实时数据
  const sendRealTimeData = async () => {
    try {
      const data = await stockDataService.getMarketOverview();
      socket.emit('realtime_data', data);
    } catch (error) {
      console.error('Error sending realtime data:', error);
    }
  };
  
  // 初始发送
  sendRealTimeData();
  
  // 定时发送
  const interval = setInterval(sendRealTimeData, 5000);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
