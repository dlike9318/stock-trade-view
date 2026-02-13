# 阿里云部署指南

## 目录
1. [函数计算FC部署](#方案一函数计算fc部署推荐)
2. [云服务器ECS部署](#方案二云服务器ecs部署)
3. [常见问题](#常见问题)

---

## 方案一：函数计算FC部署（推荐）

### 免费额度
- 每月100万次函数调用
- 每月40万GB-秒内存使用
- **永久免费**

### 步骤1：注册阿里云账号

1. 访问 https://www.aliyun.com
2. 注册账号并完成实名认证

### 步骤2：开通函数计算服务

1. 登录阿里云控制台
2. 搜索 "函数计算 FC"
3. 点击 "立即开通"

### 步骤3：打包代码

**Windows系统：**
```powershell
cd scripts
.\build-aliyun.ps1
```

**Linux/Mac系统：**
```bash
chmod +x scripts/build-aliyun.sh
./scripts/build-aliyun.sh
```

打包完成后会在 `backend/aliyun/` 目录生成 `stock-trade-aliyun.zip`

### 步骤4：创建函数

1. 进入函数计算控制台
2. 点击 "创建函数"
3. 选择 "使用内置运行时创建"
4. 填写配置：
   - 函数名称：`stock-trade-api`
   - 运行环境：Node.js 18
   - 请求处理程序：`index.handler`
   - 内存规格：256MB
   - 超时时间：30秒

### 步骤5：上传代码

1. 在函数详情页点击 "代码配置"
2. 选择 "上传代码包"
3. 上传 `stock-trade-aliyun.zip`

### 步骤6：配置HTTP触发器

1. 点击 "触发器管理"
2. 点击 "创建触发器"
3. 配置：
   - 触发器类型：HTTP触发器
   - 认证方式：匿名访问
   - 请求方式：GET, POST

### 步骤7：测试并获取地址

1. 点击 "测试函数"
2. 复制触发器URL
3. 访问：`https://xxx.cn-hangzhou.fc.aliyuncs.com/api/stock/list`

---

## 方案二：云服务器ECS部署

### 免费试用
- 配置：1核2G
- 试用时长：1个月

### 步骤1：申请ECS服务器

1. 访问阿里云控制台
2. 搜索 "云服务器ECS"
3. 点击 "免费试用"
4. 选择配置：
   - 地域：华东1（杭州）
   - 实例规格：1核2G
   - 系统：Ubuntu 22.04

### 步骤2：连接服务器

**Windows用户：**
- 使用PowerShell：`ssh root@服务器IP`
- 或使用PuTTY、Xshell等工具

**Mac/Linux用户：**
```bash
ssh root@服务器IP
```

### 步骤3：运行部署脚本

连接服务器后，执行：

```bash
# 下载并运行部署脚本
curl -o deploy.sh https://raw.githubusercontent.com/dlike9318/stock-trade-view/main/scripts/deploy-ecs.sh
chmod +x deploy.sh
./deploy.sh
```

### 步骤4：配置安全组

1. 进入ECS控制台
2. 点击实例 → 安全组
3. 添加入方向规则：
   - 端口：3000
   - 协议：TCP
   - 授权对象：0.0.0.0/0

### 步骤5：验证部署

访问：`http://服务器IP:3000/api/stock/list`

---

## 前端配置

部署成功后，修改前端环境变量：

### 函数计算
```
VITE_API_BASE_URL=https://xxx.cn-hangzhou.fc.aliyuncs.com/api
```

### ECS服务器
```
VITE_API_BASE_URL=http://服务器IP:3000/api
```

---

## 常见问题

### Q: 函数计算返回502错误
A: 检查代码是否正确上传，确保入口函数为 `index.handler`

### Q: ECS服务器无法访问
A: 检查安全组是否开放了3000端口

### Q: 如何查看日志
A: 
- 函数计算：在函数详情页点击 "日志查询"
- ECS服务器：使用 `pm2 logs stock-trade-api`

### Q: 如何更新代码
A:
- 函数计算：重新打包上传
- ECS服务器：`cd /home/stock-trade-view && git pull && pm2 restart stock-trade-api`
