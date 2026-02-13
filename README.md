# 股市实时交易数据展示系统

一个完整的股市实时交易数据展示软件，支持前端展示、后端服务、管理端系统和微信小程序。

## 项目结构

```
stock-trade-view/
├── frontend/          # 前端应用 (Vue 3 + TypeScript + ECharts)
├── backend/           # 后端服务 (Node.js + Express + Socket.io)
├── admin/             # 管理端系统 (Vue 3 + Element Plus)
├── miniprogram/       # 微信小程序
└── docs/              # 项目文档
```

## 功能特性

### 前端应用
- 📊 实时股票行情展示
- 📈 ECharts价格走势图
- 🔄 WebSocket实时数据更新
- 🔍 股票搜索和详情查看

### 后端服务
- 🚀 RESTful API接口
- 📡 WebSocket实时推送
- 🔒 请求限流和安全防护
- 💾 数据缓存机制

### 管理端系统
- 👥 用户管理
- 📋 股票管理
- ⚙️ 系统配置
- 📝 日志管理

### 微信小程序
- 📱 移动端行情查看
- ⭐ 自选股管理
- 👤 个人中心

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/你的用户名/stock-trade-view.git
cd stock-trade-view
```

2. **安装依赖**
```bash
# 后端
cd backend
npm install

# 前端
cd ../frontend
npm install

# 管理端
cd ../admin
npm install
```

3. **启动服务**
```bash
# 启动后端 (在backend目录)
npm start

# 启动前端 (在frontend目录)
npm run dev

# 启动管理端 (在admin目录)
npm run dev
```

4. **访问应用**
- 前端: http://localhost:5173
- 后端: http://localhost:3000
- 管理端: http://localhost:5174

## 部署指南

详细部署指南请查看 [部署文档](docs/DEPLOYMENT.md)

### 快速部署

1. **部署后端到Railway**
   - 连接GitHub仓库
   - 设置Root Directory为 `backend`
   - 配置环境变量

2. **部署前端到Vercel**
   - 连接GitHub仓库
   - 设置Root Directory为 `frontend`
   - 配置环境变量

3. **部署管理端到Vercel**
   - 连接GitHub仓库
   - 设置Root Directory为 `admin`
   - 配置环境变量

## 环境变量配置

### 后端 (.env)
```
PORT=3000
NODE_ENV=production
CORS_ORIGIN=*
```

### 前端 (.env)
```
VITE_API_BASE_URL=https://你的后端URL/api
VITE_WS_URL=https://你的后端URL
```

### 管理端 (.env)
```
VITE_API_BASE_URL=https://你的后端URL/api
```

## 技术栈

| 模块 | 技术栈 |
|------|--------|
| 前端 | Vue 3, TypeScript, ECharts, Socket.io-client |
| 后端 | Node.js, Express, Socket.io |
| 管理端 | Vue 3, Element Plus, Vue Router |
| 小程序 | 微信小程序原生开发 |

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！
