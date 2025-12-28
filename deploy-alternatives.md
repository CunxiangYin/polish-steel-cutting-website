# 🚀 备用部署方案 - 多平台部署策略

## 当前状况
- Netlify因使用限制暂停服务
- 已部署轻量版本恢复基础功能
- 需要多个备用部署方案确保业务连续性

## 备用部署方案

### 1. Vercel 部署 (推荐)
**优势：**
- 免费额度充足：100GB带宽/月
- 性能优秀：全球CDN
- 零配置部署
- 支持自定义域名

**部署步骤：**
```bash
# 1. 安装Vercel CLI
npm i -g vercel

# 2. 部署项目
vercel --prod

# 3. 绑定域名 (可选)
vercel domains add punaise-equipment.com
```

**预期URL：** https://punaise-equipment.vercel.app

### 2. GitHub Pages 部署
**优势：**
- 完全免费
- 与GitHub repo集成
- 稳定可靠
- 支持自定义域名

**部署步骤：**
```bash
# 1. 创建gh-pages分支
git checkout -b gh-pages

# 2. 推送到GitHub
git push origin gh-pages

# 3. 在GitHub Settings启用Pages
# Repository → Settings → Pages → Source: gh-pages
```

**预期URL：** https://cunxiangyin.github.io/polish-steel-cutting-website

### 3. Cloudflare Pages 部署
**优势：**
- 无限带宽
- 快速全球CDN
- 强大的边缘计算
- 免费SSL证书

**部署步骤：**
1. 登录 pages.cloudflare.com
2. 连接GitHub仓库
3. 设置构建配置：
   - 构建命令：`echo "Static site"`
   - 输出目录：`.`

**预期URL：** https://polish-steel-cutting.pages.dev

### 4. Firebase Hosting 部署
**优势：**
- Google基础设施
- 免费额度充足
- 快速部署
- 支持自定义域名

**部署步骤：**
```bash
# 1. 安装Firebase CLI
npm install -g firebase-tools

# 2. 初始化项目
firebase init hosting

# 3. 部署
firebase deploy
```

**预期URL：** https://punaise-equipment.web.app

### 5. Surge.sh 部署 (快速解决方案)
**优势：**
- 最快部署方式
- 一行命令部署
- 免费自定义域名

**部署步骤：**
```bash
# 1. 安装Surge CLI
npm install -g surge

# 2. 部署
surge . punaise-equipment.surge.sh
```

**预期URL：** https://punaise-equipment.surge.sh

## 优先级推荐

### 立即部署 (24小时内)
1. **Vercel** - 最佳性能和功能
2. **GitHub Pages** - 最稳定免费
3. **Surge.sh** - 最快部署

### 长期方案 (1周内)
1. **Cloudflare Pages** - 最佳性能
2. **Firebase Hosting** - Google生态
3. **自建服务器** - 完全控制

## 域名配置

### 临时域名策略
在主域名恢复前，使用多个子域名：
- `backup.punaise-equipment.com` → Vercel
- `cdn.punaise-equipment.com` → Cloudflare
- `mobile.punaise-equipment.com` → Firebase

### DNS配置示例
```
# Cloudflare DNS设置
backup    CNAME    punaise-equipment.vercel.app
cdn       CNAME    polish-steel-cutting.pages.dev
mobile    CNAME    punaise-equipment.web.app
```

## 自动化部署脚本

### deploy.sh 脚本
```bash
#!/bin/bash

echo "🚀 多平台部署脚本启动..."

# Vercel部署
echo "📦 部署到Vercel..."
vercel --prod --confirm

# GitHub Pages部署
echo "📦 部署到GitHub Pages..."
git checkout gh-pages
git merge main
git push origin gh-pages
git checkout main

# Surge部署
echo "📦 部署到Surge.sh..."
surge . punaise-equipment.surge.sh --domain

echo "✅ 所有平台部署完成！"

# 显示所有部署URL
echo "🌐 访问地址："
echo "• Vercel: https://punaise-equipment.vercel.app"
echo "• GitHub: https://cunxiangyin.github.io/polish-steel-cutting-website"
echo "• Surge: https://punaise-equipment.surge.sh"
```

## 监控与故障转移

### 网站监控
使用免费监控服务：
- **UptimeRobot** - 免费监控5个网站
- **StatusCake** - 免费监控多个地区
- **Pingdom** - 基础监控

### 故障转移策略
1. 主域名DNS设置多个A记录
2. 使用负载均衡服务
3. 设置自动故障切换

### DNS故障转移配置
```
# 主记录
@    A    1.2.3.4    (Netlify)
@    A    5.6.7.8    (Vercel备用)

# 子域名分流
www     CNAME    punaise-equipment.netlify.app
backup  CNAME    punaise-equipment.vercel.app
```

## 成本分析

### 各平台免费额度对比

| 平台 | 带宽 | 构建时间 | 存储 | 自定义域名 |
|------|------|----------|------|------------|
| Netlify | 100GB | 300min | 无限 | ✅ |
| Vercel | 100GB | 无限 | 无限 | ✅ |
| GitHub Pages | 100GB | 无限 | 1GB | ✅ |
| Cloudflare | 无限 | 500次 | 无限 | ✅ |
| Firebase | 10GB | 无限 | 1GB | ✅ |

### 推荐策略
- **主要流量** → Vercel (性能最佳)
- **备用流量** → GitHub Pages (最稳定)
- **图片资源** → Cloudflare (无限带宽)
- **API请求** → Firebase (Google基础设施)

## 恢复计划

### Netlify恢复后
1. 将完整版本 index-full.html 恢复为 index.html
2. 重新启用所有高级功能
3. 更新DNS指向主要部署
4. 保留备用部署作为容灾

### 完整版本恢复脚本
```bash
#!/bin/bash
echo "🔄 恢复完整版本..."
cp index-full.html index.html
git add index.html
git commit -m "恢复完整版本 - 所有功能已启用"
git push origin main
echo "✅ 完整版本已恢复！"
```

---

**立即可访问的临时地址：**
1. 轻量版本将在2-3分钟后在Netlify恢复
2. 同时准备Vercel备用部署确保业务连续性