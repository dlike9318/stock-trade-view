#!/bin/bash

# 阿里云函数计算打包脚本

echo "=== 开始打包阿里云函数计算 ==="

# 进入阿里云目录
cd "$(dirname "$0")/../backend/aliyun"

# 创建临时目录
rm -rf dist
mkdir -p dist

# 复制文件
echo "复制代码文件..."
cp index.js dist/
cp package.json dist/
cp -r ../services dist/

# 安装依赖
echo "安装依赖..."
cd dist
npm install --production

# 打包
echo "创建ZIP包..."
zip -r ../stock-trade-aliyun.zip .

# 清理
cd ..
rm -rf dist

echo "=== 打包完成: stock-trade-aliyun.zip ==="
echo "请将此文件上传到阿里云函数计算控制台"
