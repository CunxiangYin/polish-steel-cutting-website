#!/bin/bash

# Google Analytics 4 配置更新脚本
# 使用方法: ./update-ga4.sh G-YOUR-MEASUREMENT-ID

echo "🚀 Google Analytics 4 配置更新脚本"
echo "================================="

# 检查是否提供了测量ID参数
if [ $# -eq 0 ]; then
    echo "❌ 错误: 请提供Google Analytics测量ID"
    echo "使用方法: ./update-ga4.sh G-YOUR-MEASUREMENT-ID"
    echo ""
    echo "示例: ./update-ga4.sh G-ABC123DEF456"
    exit 1
fi

MEASUREMENT_ID=$1

# 验证测量ID格式
if [[ ! $MEASUREMENT_ID =~ ^G-[A-Z0-9]+$ ]]; then
    echo "❌ 错误: 测量ID格式不正确"
    echo "正确格式: G-XXXXXXXXXX (G-开头,后跟字母数字)"
    echo "您提供的: $MEASUREMENT_ID"
    exit 1
fi

echo "📊 测量ID: $MEASUREMENT_ID"
echo ""

# 备份原文件
echo "💾 备份原始文件..."
cp index.html index.html.backup
echo "✅ 备份完成: index.html.backup"

# 替换测量ID
echo "🔧 更新测量ID..."
sed -i.tmp "s/GA_MEASUREMENT_ID/$MEASUREMENT_ID/g" index.html

# 检查替换是否成功
if grep -q "$MEASUREMENT_ID" index.html; then
    echo "✅ 测量ID更新成功!"
    rm index.html.tmp
else
    echo "❌ 更新失败，恢复备份文件"
    cp index.html.backup index.html
    exit 1
fi

# 显示更改摘要
echo ""
echo "📋 更改摘要:"
echo "-------------------"
grep -n "$MEASUREMENT_ID" index.html | head -3
echo ""

# 提交到Git
echo "📤 提交更改到Git..."
git add index.html
git commit -m "配置Google Analytics: $MEASUREMENT_ID

✅ 更新测量ID到实际值
✅ 启用完整事件追踪
✅ 配置转化目标设置

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "✅ Git提交完成"

# 推送到GitHub
echo "🚀 推送到GitHub..."
git push
echo "✅ 推送完成"

echo ""
echo "🎉 Google Analytics配置完成!"
echo "================================="
echo "📝 下一步操作:"
echo "1. 等待Netlify自动部署 (约3-5分钟)"
echo "2. 访问你的网站测试追踪"
echo "3. 在GA4中查看实时报告"
echo "4. 验证事件正确发送"
echo ""
echo "🔗 网站URL: https://cute-jelly-dc03bf.netlify.app/"
echo "📊 GA4地址: https://analytics.google.com/"
echo ""
echo "✨ 配置完成！Analytics开始工作需要15-30分钟"