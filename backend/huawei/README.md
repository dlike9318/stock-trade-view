# 华为云FunctionGraph部署指南

## 前提条件

1. 注册华为云账号：https://www.huaweicloud.com
2. 完成实名认证
3. 开通FunctionGraph服务

## 部署步骤

### 步骤1：创建函数

1. 登录华为云控制台
2. 搜索 "FunctionGraph" 并进入
3. 点击 "创建函数"
4. 选择 "创建空白函数"
5. 填写基本信息：
   - 函数名称：`stock-trade-api`
   - 运行时：Node.js 18.17
   - 内存：256MB
   - 超时：30秒

### 步骤2：上传代码

#### 方法A：在线编辑
1. 进入函数详情页
2. 点击 "代码" 标签
3. 将 `huawei/index.js` 内容复制到编辑器
4. 点击 "保存"

#### 方法B：上传ZIP包
1. 在本地打包：
   ```bash
   cd backend/huawei
   npm install
   # 将 index.js, package.json, node_modules, ../services 打包
   ```
2. 在函数页面点击 "上传代码"
3. 选择ZIP文件上传

### 步骤3：配置API网关触发器

1. 在函数详情页点击 "触发器" 标签
2. 点击 "创建触发器"
3. 选择 "API网关"
4. 配置API：
   - API名称：stock-api
   - 分组：创建新分组
   - 路径：/api/stock/list
   - 方法：GET
5. 重复创建其他API：
   - /api/stock/{symbol} - GET
   - /api/market/overview - GET

### 步骤4：配置环境变量

在函数 "配置" 标签中添加：
```
NODE_ENV=production
```

### 步骤5：测试函数

1. 点击 "测试" 标签
2. 创建测试事件：
   ```json
   {
     "path": "/api/stock/list",
     "httpMethod": "GET"
   }
   ```
3. 点击 "测试" 查看结果

### 步骤6：获取API地址

1. 进入触发器页面
2. 复制API网关地址
3. 访问：`https://你的API地址/api/stock/list`

## 前端配置

部署成功后，修改前端环境变量：

```
VITE_API_BASE_URL=https://你的API地址/api
```

## 注意事项

1. **WebSocket不支持**：函数计算不支持WebSocket，前端需要改用HTTP轮询
2. **冷启动**：函数长时间未调用会有冷启动延迟
3. **免费额度**：每月100万次调用，足够个人使用

## 常见问题

### Q: 函数执行超时
A: 增加函数超时时间到60秒

### Q: 内存不足
A: 增加内存配置到512MB

### Q: API返回404
A: 检查API网关路径配置是否正确
