#!/bin/bash

# 多语言钢板切割设备网站部署脚本
# Multilingual Steel Cutting Equipment Website Deployment Script

echo "🚀 开始部署多语言网站..."
echo "🚀 Starting multilingual website deployment..."

# 检查环境
echo "📋 检查环境..."
echo "📋 Checking environment..."
node --version
npm --version

# 安装依赖
echo "📦 安装依赖..."
echo "📦 Installing dependencies..."
npm ci --only=production

# 构建生产版本
echo "🔨 构建生产版本..."
echo "🔨 Building production version..."
npm run build

# 检查构建结果
if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "✅ Build successful!"
    
    echo "📊 构建统计："
    echo "📊 Build statistics:"
    echo "支持的语言版本 / Supported languages:"
    echo "- 🇨🇳 中文 (Chinese) - /zh"
    echo "- 🇺🇸 英文 (English) - /en"
    echo "- 🇹🇭 泰语 (Thai) - /th"
    echo "- 🇻🇳 越语 (Vietnamese) - /vi"
    echo "- 🇲🇾 马来语 (Malay) - /ms"
    echo "- 🇮🇩 印尼语 (Indonesian) - /id"
    echo "- 🇪🇸 西班牙语 (Spanish) - /es"
    echo "- 🇧🇷 葡萄牙语 (Portuguese) - /pt"
    
    # 启动生产服务器
    echo "🌟 启动生产服务器..."
    echo "🌟 Starting production server..."
    echo "服务器将在 http://localhost:3000 运行"
    echo "Server will run at http://localhost:3000"
    
    npm start
else
    echo "❌ 构建失败！"
    echo "❌ Build failed!"
    exit 1
fi