# 深圳普耐斯机电设备有限公司 - 官网

🌐 https://punaise-equipment.netlify.app

专业钢板切割设备制造商 | CNC等离子激光切割

## 目录结构

```
├── *.html              # 页面文件（index, blog, case-studies 等）
├── *.min.css           # 生产用 CSS（压缩版）
├── *.min.js            # 生产用 JS（压缩版）
├── *.js                # 直接引用的 JS（language-config, translations 等）
├── favicon.svg         # 网站图标
├── logo-main.svg       # 网站 Logo
├── manifest.json       # PWA 配置
├── sw.js               # Service Worker
├── robots.txt          # 搜索引擎爬虫配置
├── sitemap.xml         # 站点地图
├── netlify.toml        # Netlify 部署配置
├── _headers            # Netlify 安全/缓存头
├── _redirects          # Netlify URL 重定向规则
├── src/                # 源文件（开发用）
│   ├── css/            # CSS 源文件（未压缩）
│   └── js/             # JS 源文件（未压缩）
├── docs/               # 开发文档和参考资料
│   └── production-info/  # 产品信息数据
└── new-website/        # Next.js 新版站点（开发中）
```

## 技术栈

- **前端:** 纯 HTML5 / CSS3 / JavaScript (ES6+)
- **部署:** Netlify（静态站点）
- **分析:** Google Analytics 4 (G-RZXQ1MQYS6)
- **多语言:** 中/英/西/葡/泰/越/印尼

## 开发

修改 `src/` 下的源文件后，压缩生成 `.min` 文件放到根目录。

```bash
# 直接编辑源文件
vim src/js/script.js

# 压缩（需要安装 terser / csso 等工具）
npx terser src/js/script.js -o script.min.js
npx csso src/css/style.css -o style.min.css
```
