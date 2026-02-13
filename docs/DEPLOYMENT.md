# 股市实时交易数据展示系统 - 部署指南

## 目录
1. [准备工作](#准备工作)
2. [部署后端到Railway](#部署后端到railway)
3. [部署前端到Vercel](#部署前端到vercel)
4. [部署管理端到Vercel](#部署管理端到vercel)
5. [微信小程序配置](#微信小程序配置)
6. [常见问题](#常见问题)

---

## 准备工作

### 1. 注册账号

在开始部署之前，请确保已注册以下账号：

| 平台 | 用途 | 注册地址 |
|------|------|----------|
| GitHub | 代码托管 | https://github.com |
| Railway | 后端部署 | https://railway.app |
| Vercel | 前端部署 | https://vercel.com |

### 2. 推送代码到GitHub

```bash
# 初始化Git仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin https://github.com/你的用户名/stock-trade-view.git

# 推送代码
git push -u origin main
```

---

## 部署后端到Railway

### 步骤1：创建Railway项目

1. 访问 [Railway](https://railway.app) 并使用GitHub账号登录
2. 点击 "New Project" 按钮
3. 选择 "Deploy from GitHub repo"
4. 选择你的 `stock-trade-view` 仓库

### 步骤2：配置项目

1. 在项目设置中，设置 **Root Directory** 为 `backend`
2. Railway会自动检测到Node.js项目

### 步骤3：设置环境变量

在Railway项目的 "Variables" 标签页中添加以下环境变量：

```
PORT=3000
NODE_ENV=production
CORS_ORIGIN=*
```

### 步骤4：部署

1. 点击 "Deploy" 按钮
2. 等待部署完成
3. 部署成功后，Railway会提供一个访问URL，例如：`https://stock-trade-backend.railway.app`

### 步骤5：验证部署

访问以下URL验证后端是否正常运行：
- `https://你的后端URL/api/stock/list`

---

## 部署前端到Vercel

### 步骤1：创建Vercel项目

1. 访问 [Vercel](https://vercel.com) 并使用GitHub账号登录
2. 点击 "Add New..." → "Project"
3. 选择你的 `stock-trade-view` 仓库

### 步骤2：配置项目

在项目配置页面：

| 配置项 | 值 |
|--------|-----|
| Framework Preset | Vue.js |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

### 步骤3：设置环境变量

在 "Environment Variables" 部分添加：

```
VITE_API_BASE_URL=https://你的后端URL/api
VITE_WS_URL=https://你的后端URL
```

**重要**：将 `你的后端URL` 替换为Railway提供的后端服务URL。

### 步骤4：部署

1. 点击 "Deploy" 按钮
2. 等待部署完成
3. 部署成功后，Vercel会提供一个访问URL，例如：`https://stock-trade-frontend.vercel.app`

---

## 部署管理端到Vercel

### 步骤1：创建新项目

1. 在Vercel中点击 "Add New..." → "Project"
2. 再次选择你的 `stock-trade-view` 仓库

### 步骤2：配置项目

| 配置项 | 值 |
|--------|-----|
| Framework Preset | Vue.js |
| Root Directory | `admin` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

### 步骤3：设置环境变量

```
VITE_API_BASE_URL=https://你的后端URL/api
```

### 步骤4：部署

1. 点击 "Deploy" 按钮
2. 等待部署完成
3. 部署成功后，Vercel会提供一个访问URL

---

## 微信小程序配置

### 步骤1：修改API地址

在 `miniprogram/app.js` 中修改 `baseUrl`：

```javascript
globalData: {
  userInfo: null,
  stockList: [],
  selectedStock: null,
  baseUrl: 'https://你的后端URL/api'  // 修改为Railway后端URL
}
```

### 步骤2：配置小程序域名

1. 登录 [微信公众平台](https://mp.weixin.qq.com)
2. 进入 "开发" → "开发管理" → "开发设置"
3. 在 "服务器域名" 中添加：
   - request合法域名：`https://你的后端URL`
   - socket合法域名：`wss://你的后端URL`

### 步骤3：上传代码

1. 打开微信开发者工具
2. 导入 `miniprogram` 目录
3. 点击 "上传" 按钮
4. 在微信公众平台提交审核

---

## 常见问题

### Q1: 后端部署失败

**解决方案**：
- 检查 `package.json` 中是否有 `start` 脚本
- 确保所有依赖都在 `dependencies` 中
- 查看Railway的部署日志

### Q2: 前端无法连接后端

**解决方案**：
- 检查环境变量是否正确设置
- 确保后端CORS配置允许前端域名
- 检查后端URL是否包含 `https://`

### Q3: WebSocket连接失败

**解决方案**：
- 确保使用 `wss://` 协议（生产环境）
- 在Railway中检查WebSocket是否启用
- 检查前端环境变量中的 `VITE_WS_URL`

### Q4: 小程序请求失败

**解决方案**：
- 确保在微信公众平台配置了正确的服务器域名
- 检查后端URL是否使用HTTPS
- 确保后端CORS配置正确

---

## 部署清单

部署完成后，请确认以下事项：

- [ ] 后端服务正常运行
- [ ] 前端可以访问后端API
- [ ] WebSocket连接正常
- [ ] 管理端可以正常使用
- [ ] 微信小程序域名配置完成
- [ ] 所有环境变量设置正确

---

## 联系支持

如有问题，请查看以下资源：
- [Railway文档](https://docs.railway.app)
- [Vercel文档](https://vercel.com/docs)
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
