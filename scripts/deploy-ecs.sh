#!/bin/bash

# 阿里云ECS服务器部署脚本
# 在服务器上运行此脚本

echo "=== 开始部署到阿里云ECS ==="

# 更新系统
echo "更新系统..."
sudo apt update && sudo apt upgrade -y

# 安装Node.js 18
echo "安装Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装Git
echo "安装Git..."
sudo apt install -y git

# 安装PM2 (进程管理)
echo "安装PM2..."
sudo npm install -g pm2

# 克隆项目
echo "克隆项目..."
cd /home
git clone https://github.com/dlike9318/stock-trade-view.git
cd stock-trade-view/backend

# 安装依赖
echo "安装依赖..."
npm install

# 配置环境变量
echo "配置环境变量..."
export PORT=3000
export NODE_ENV=production
export CORS_ORIGIN="*"

# 使用PM2启动服务
echo "启动服务..."
pm2 start index.js --name stock-trade-api

# 设置开机自启
pm2 startup
pm2 save

# 显示状态
pm2 status

echo "=== 部署完成 ==="
echo "服务地址: http://服务器IP:3000"
echo "API地址: http://服务器IP:3000/api/stock/list"
