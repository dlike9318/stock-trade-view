# 阿里云函数计算打包脚本 (Windows PowerShell)

Write-Host "=== 开始打包阿里云函数计算 ===" -ForegroundColor Green

# 获取脚本目录
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $scriptDir "..\backend\aliyun"
$distDir = Join-Path $backendDir "dist"

# 进入阿里云目录
Set-Location $backendDir

# 创建临时目录
if (Test-Path $distDir) {
    Remove-Item -Recurse -Force $distDir
}
New-Item -ItemType Directory -Path $distDir | Out-Null

# 复制文件
Write-Host "复制代码文件..." -ForegroundColor Yellow
Copy-Item "index.js" $distDir
Copy-Item "package.json" $distDir
Copy-Item -Recurse "..\services" $distDir

# 安装依赖
Write-Host "安装依赖..." -ForegroundColor Yellow
Set-Location $distDir
npm install --production

# 打包
Write-Host "创建ZIP包..." -ForegroundColor Yellow
$zipPath = Join-Path $backendDir "stock-trade-aliyun.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath
}
Compress-Archive -Path * -DestinationPath $zipPath

# 清理
Set-Location $backendDir
Remove-Item -Recurse -Force $distDir

Write-Host "=== 打包完成: stock-trade-aliyun.zip ===" -ForegroundColor Green
Write-Host "请将此文件上传到阿里云函数计算控制台" -ForegroundColor Cyan
