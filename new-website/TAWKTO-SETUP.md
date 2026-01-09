# Tawk.to 快速设置指南

## 🚀 立即开始（5分钟完成）

### 第1步：注册账号（2分钟）

1. **访问注册页面**: https://www.tawk.to/signup
2. **填写信息**:
   - Name: 付经理
   - Email: 466904802@qq.com  
   - Password: 设置强密码（建议：Punaise2024!）
3. **验证邮箱**: 检查QQ邮箱，点击验证链接

### 第2步：添加网站（1分钟）

登录后会自动跳转到添加网站页面：

1. **Property Name**: 深圳普耐斯机电设备
2. **Site URL**: https://punaise-equipment.netlify.app
3. **Category**: Industrial & Manufacturing
4. 点击 **"Create Property"**

### 第3步：获取Widget ID（30秒）

创建成功后，你会看到类似这样的安装代码：

```javascript
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/[YOUR_PROPERTY_ID]/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
```

**重要**: 记下你的 Property ID（在 `embed.tawk.to/` 后面的部分）

### 第4步：更新网站代码（1分钟）

1. 打开文件: `/src/components/TawkTo.tsx`
2. 找到第17-18行：
```typescript
propertyId = 'YOUR_PROPERTY_ID',  // 将在注册后替换
widgetId = 'default'
```
3. 替换为你的实际Property ID，例如：
```typescript
propertyId = '65abc123def456789',  // 你的实际ID
widgetId = 'default'
```

### 第5步：部署更新（30秒）

在终端运行：
```bash
npm run build
npx netlify deploy --prod --dir=out
```

## ⚙️ 基础配置

### 1. 设置工作时间

1. 进入 **Administration > Business Hours**
2. 设置时间：
   - Monday-Friday: 09:00 - 18:00
   - Saturday: 09:00 - 12:00  
   - Sunday: Closed
   - Timezone: Asia/Shanghai (GMT+8)

### 2. 自动欢迎消息

进入 **Administration > Triggers**，创建新触发器：

**触发器名称**: 欢迎消息
- **条件**: Visitor time on site > 5 seconds
- **动作**: Send message
- **消息内容**:
```
您好！欢迎咨询深圳普耐斯机电设备 👋

我是在线客服，很高兴为您服务！

📌 热门咨询：
• CNC等离子切割机报价
• 激光切割系统规格
• 设备交期和安装

请问有什么可以帮助您的吗？
```

### 3. 离线消息设置

进入 **Administration > Offline Form**：

1. **启用离线表单**: ✅
2. **必填字段**:
   - Name ✅
   - Email ✅
   - Message ✅
3. **可选字段**:
   - Phone
   - Company
4. **离线消息发送到**: 466904802@qq.com

### 4. 快捷回复模板

进入 **Administration > Shortcuts**，添加：

**#价格** - 价格咨询回复
```
感谢您的询价！为了准确报价，请提供：
1️⃣ 切割材料类型和厚度
2️⃣ 日常加工量
3️⃣ 精度要求
4️⃣ 预算范围

我们会在30分钟内提供详细报价单。
```

**#规格** - 技术规格
```
设备主要技术参数：
✅ 切割厚度：3-200mm
✅ 切割精度：±0.5mm
✅ 切割速度：0-8000mm/min
✅ 工作电压：380V/50Hz

需要完整规格书请留下邮箱，立即发送！
```

**#联系** - 直接联系
```
您可以通过以下方式直接联系我们：

📱 付经理：+86 189-3864-9300
☎️ 公司电话：+86 755-26443680
📧 邮箱：466904802@qq.com
🏢 地址：深圳市龙华区

期待与您合作！
```

## 📱 手机APP设置

1. **下载APP**:
   - iOS: App Store搜索 "Tawk.to"
   - Android: Google Play搜索 "Tawk.to"

2. **登录配置**:
   - 使用同样的账号密码登录
   - 开启推送通知
   - 设置消息提醒音

## 🎯 高级功能

### 部门设置

创建不同部门处理不同咨询：
- **销售部**: 产品咨询、报价
- **技术部**: 技术规格、方案设计  
- **售后部**: 维修、配件

### 访客标签

为访客添加标签便于跟进：
- 🔥 高意向客户
- 💰 已报价
- 📞 需要回访
- ✅ 已成交

### 聊天评分

启用聊天后评分，收集客户反馈：
1. **Administration > Chat Rating**
2. 启用评分功能
3. 设置评分后感谢语

## 📊 数据分析

每周查看以下报告：
- **Overview**: 对话总数、平均响应时间
- **Agents**: 客服绩效
- **Visitors**: 访客来源、停留时间
- **Missed Chats**: 错失的机会

## ⚠️ 注意事项

1. **隐私合规**: 在网站添加隐私政策说明使用在线客服
2. **备份设置**: 定期导出聊天记录
3. **团队培训**: 确保所有客服熟悉快捷键和模板
4. **测试**: 部署后用不同设备测试功能

## 🆘 常见问题

**Q: 聊天窗口不显示？**
A: 检查Property ID是否正确，清除浏览器缓存

**Q: 收不到消息通知？**
A: 检查手机APP推送权限，确认邮箱设置

**Q: 如何更换聊天窗口颜色？**
A: Administration > Chat Widget > Appearance

## ✅ 完成清单

- [ ] 注册Tawk.to账号
- [ ] 添加网站Property
- [ ] 获取Property ID
- [ ] 更新TawkTo.tsx文件
- [ ] 部署网站更新
- [ ] 设置工作时间
- [ ] 配置欢迎消息
- [ ] 添加快捷回复
- [ ] 下载手机APP
- [ ] 测试聊天功能

---

**需要帮助？** 
- Tawk.to帮助中心: https://help.tawk.to
- 技术支持邮箱: support@tawk.to
- 或者直接问我！