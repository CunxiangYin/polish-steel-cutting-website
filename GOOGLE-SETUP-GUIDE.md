# Google服务设置指南 - Polish钢板切割设备官网

## 🚀 **立即执行步骤**

### 1. **Google Analytics 4 设置**

#### A. 创建GA4账户
1. 访问: https://analytics.google.com/
2. 点击 "开始衡量" 或 "Create Account"
3. 填写账户信息：
   ```
   账户名称: Polish Steel Cutting Equipment
   属性名称: Polish Official Website
   行业类别: Industrial Equipment & Machinery  
   业务规模: Small business (1-10 employees)
   网站URL: https://cute-jelly-dc03bf.netlify.app
   时区: Asia/Shanghai
   货币: USD (美元) - 面向海外市场
   ```

#### B. 获取测量ID
1. 创建完成后进入 "管理" (Admin)
2. 选择 "数据流" (Data Streams)  
3. 点击你的网站数据流
4. 复制 "测量ID" (格式：G-XXXXXXXXXX)

#### C. 更新网站代码
替换HTML文件中的两处 `GA_MEASUREMENT_ID`:
```html
<!-- 在index.html第106和111行 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
gtag('config', 'G-YOUR-ID');
```

### 2. **Google Search Console 设置**

#### A. 添加资源
1. 访问: https://search.google.com/search-console/
2. 点击 "添加资源" (Add Property)
3. 选择 "URL前缀" (URL prefix)
4. 输入: `https://cute-jelly-dc03bf.netlify.app`

#### B. 域名验证
1. 选择 "HTML标记" 验证方法
2. 复制验证代码 (格式：google-site-verification=xxxxxxxx)
3. 替换HTML文件第133行：
```html
<meta name="google-site-verification" content="你的验证代码" />
```

#### C. 提交网站地图
验证成功后：
1. 左侧菜单选择 "站点地图" (Sitemaps)
2. 输入: `sitemap.xml`
3. 点击 "提交"

### 3. **更新和部署**

执行以下命令更新网站：
```bash
# 1. 编辑index.html文件，替换GA_MEASUREMENT_ID和验证代码
# 2. 提交更改
git add .
git commit -m "配置Google Analytics和Search Console"
git push

# 3. 等待Netlify自动部署（约2-5分钟）
```

## 📊 **验证设置是否成功**

### Google Analytics验证:
1. 访问你的网站
2. 在GA4中查看 "实时" 报告
3. 应该看到1个活跃用户（你自己）

### Google Search Console验证:
1. 验证成功后会显示绿色勾号
2. 24小时内开始看到搜索数据
3. 查看 "覆盖范围" 确认页面被索引

## 🎯 **重要事件跟踪**

网站已配置以下转化事件：
- **contact_form_submit**: 联系表单提交
- **button_clicks**: 按钮点击行为
- **page_views**: 页面浏览量
- **scroll_tracking**: 页面滚动深度

## 📈 **关键指标监控**

### 每周检查:
- 有机搜索流量趋势
- 关键词排名变化
- 页面加载速度
- 表单转化率

### 每月分析:
- 搜索查询报告
- 页面性能报告  
- 用户行为分析
- 竞争对手比较

---
**设置完成后，网站将开始收集完整的SEO和用户数据！**