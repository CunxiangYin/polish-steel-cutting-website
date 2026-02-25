# 在线客服实施方案

## 推荐方案：Tawk.to (免费方案)

### 为什么选择 Tawk.to？
1. **完全免费** - 无座席限制，无消息限制
2. **多语言支持** - 支持中文、英文、泰语、越南语等
3. **快速部署** - 5分钟即可上线
4. **移动端支持** - iOS/Android APP随时响应客户
5. **离线处理** - 离线消息自动发送到邮箱

### 集成步骤

#### 第1步：注册账号
1. 访问 https://www.tawk.to
2. 点击 "Sign Up Free Forever"
3. 填写信息：
   - Email: 466904802@qq.com
   - Password: 设置强密码
   - Name: 付经理

#### 第2步：添加网站
1. 登录后选择 "Add Property"
2. 填写网站信息：
   - Site Name: 深圳普耐斯机电设备
   - Site URL: https://punaise-equipment.netlify.app

#### 第3步：获取集成代码
登录后会获得类似这样的代码：
```javascript
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
```

#### 第4步：创建React组件

在 `src/components/TawkTo.tsx` 创建：

```typescript
'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkTo() {
  const params = useParams();
  const locale = params?.locale || 'zh';

  useEffect(() => {
    // 设置访客属性
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // 根据语言设置不同的欢迎消息
    const greetings: Record<string, string> = {
      zh: '您好！有什么可以帮助您的吗？',
      en: 'Hello! How can I help you today?',
      th: 'สวัสดี! มีอะไรให้ช่วยไหม?',
      vi: 'Xin chào! Tôi có thể giúp gì cho bạn?',
      ms: 'Selamat datang! Apa yang boleh saya bantu?',
      id: 'Selamat datang! Ada yang bisa saya bantu?',
      es: '¡Hola! ¿En qué puedo ayudarte?',
      pt: 'Olá! Como posso ajudar?'
    };

    // 设置访客信息
    window.Tawk_API.onLoad = function() {
      window.Tawk_API.setAttributes({
        'language': locale,
        'page': window.location.pathname,
      });
      
      // 设置自定义欢迎消息
      window.Tawk_API.customStyle = {
        visibility: {
          desktop: {
            position: 'br', // bottom right
            xOffset: '20px',
            yOffset: '20px'
          },
          mobile: {
            position: 'br',
            xOffset: '10px', 
            yOffset: '10px'
          }
        }
      };
    };

    // 加载 Tawk.to 脚本
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);

    return () => {
      // 清理
      const tawkScript = document.querySelector('script[src*="embed.tawk.to"]');
      if (tawkScript) {
        tawkScript.remove();
      }
    };
  }, [locale]);

  return null;
}
```

#### 第5步：添加到布局

在 `src/app/[locale]/layout.tsx` 中添加：

```typescript
import TawkTo from '@/components/TawkTo';

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      {children}
      <TawkTo />
    </>
  );
}
```

### 配置客服团队

#### 1. 添加客服人员
1. 在 Tawk.to 控制台
2. 进入 Administration > Agents
3. 添加客服邮箱
4. 分配权限和班次

#### 2. 设置自动回复
```
中文自动回复：
"您好！欢迎咨询深圳普耐斯机电设备。我们的客服会在1分钟内回复您。
如需紧急联系，请致电：+86 189-3864-9300（付经理）"

英文自动回复：
"Hello! Welcome to Shenzhen Punaise. Our agent will respond within 1 minute.
For urgent matters, please call: +86 189-3864-9300 (Manager Fu)"
```

#### 3. 设置工作时间
- 周一至周五：9:00 - 18:00
- 周六：9:00 - 12:00
- 周日：休息
- 时区：Asia/Shanghai (UTC+8)

#### 4. 离线消息设置
- 自动发送到：466904802@qq.com
- 抄送给：付经理手机邮箱
- 离线表单字段：
  - 姓名（必填）
  - 邮箱（必填）
  - 电话（选填）
  - 公司（选填）
  - 留言（必填）

### 高级功能配置

#### 1. 触发器设置
创建以下自动触发规则：

**30秒欢迎消息**
- 条件：访客停留30秒
- 动作：发送 "需要了解设备报价吗？"

**产品页面触发**
- 条件：浏览产品页超过1分钟
- 动作：发送 "对这款设备感兴趣？可以提供详细规格书"

**离开意图触发**
- 条件：鼠标移向关闭按钮
- 动作：发送 "稍等！留下联系方式获取优惠报价"

#### 2. 快捷回复模板

**价格咨询**
```
感谢您的询价。请提供：
1. 切割材料类型和厚度
2. 每日生产量
3. 精度要求
我们会在30分钟内提供详细报价。
```

**技术规格**
```
设备技术参数：
- 切割厚度：[X]mm
- 切割精度：±[X]mm
- 工作面积：[X]×[X]mm
- 功率：[X]KW
需要完整规格书请留下邮箱。
```

**售后服务**
```
我们提供：
✓ 1年免费保修
✓ 终身技术支持
✓ 24小时响应服务
✓ 现场培训
✓ 配件供应保障
```

### WhatsApp 集成方案（补充）

如果需要同时支持 WhatsApp：

```typescript
// src/components/WhatsAppButton.tsx
export default function WhatsAppButton() {
  const phoneNumber = '8618938649300'; // 付经理WhatsApp
  const message = encodeURIComponent('您好，我想咨询设备价格');
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      className="fixed bottom-24 right-6 z-40 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}
```

### 监控和优化

#### KPI 指标
1. **平均响应时间**：目标 < 1分钟
2. **首次解决率**：目标 > 80%
3. **客户满意度**：目标 > 4.5/5
4. **转化率**：目标 > 15%

#### 月度报告模板
- 对话总数
- 平均响应时间
- 解决率
- 热门问题TOP5
- 客户反馈分析
- 改进建议

### 培训材料

#### 客服必备知识
1. 产品知识
   - 各型号设备规格
   - 价格范围
   - 交货周期
   - 售后政策

2. 常见问题解答
   - 设备对比
   - 付款方式
   - 物流安排
   - 安装培训

3. 沟通技巧
   - 主动询问需求
   - 提供专业建议
   - 跟进报价
   - 建立信任

### 实施时间表

| 阶段 | 任务 | 时间 |
|------|------|------|
| Day 1 | 注册和基础配置 | 30分钟 |
| Day 1 | 网站集成 | 1小时 |
| Day 2 | 团队培训 | 2小时 |
| Day 3-7 | 试运行和优化 | 持续 |
| Day 8 | 正式上线 | - |

### 成本分析

| 方案 | 月成本 | 功能 |
|------|--------|------|
| Tawk.to | $0 | 全功能免费 |
| WhatsApp Business | $0 | 免费使用 |
| Crisp (付费版) | $25-95 | 高级功能 |
| Intercom | $74+ | 企业级 |

### 下一步行动

1. ✅ 立即注册 Tawk.to 账号
2. ✅ 获取集成代码
3. ✅ 添加到网站
4. ✅ 配置自动回复
5. ✅ 培训客服团队
6. ✅ 开始7天试运行

---

**技术支持**: 如需协助集成，我可以立即帮您完成代码部署。