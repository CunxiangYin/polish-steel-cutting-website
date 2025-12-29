# Punaise Mechanical Equipment - shadcn/ui 实施计划

## 项目实施阶段

### 阶段1: 项目初始化和基础设置 (Phase 1)

#### 1.1 创建Next.js项目
- [ ] 初始化Next.js 14项目 (App Router)
- [ ] 配置TypeScript
- [ ] 安装并配置Tailwind CSS
- [ ] 设置shadcn/ui

#### 1.2 项目结构设置
- [ ] 创建目录结构
- [ ] 设置环境变量
- [ ] 配置ESLint和Prettier
- [ ] 设置Git工作流程

#### 1.3 shadcn/ui组件安装
- [ ] 安装基础组件: Button, Card, Input, Textarea
- [ ] 安装导航组件: NavigationMenu, DropdownMenu
- [ ] 安装表单组件: Form, Label, Select
- [ ] 安装布局组件: Separator, Badge, Avatar
- [ ] 安装交互组件: Accordion, Tabs, Progress
- [ ] 安装工具组件: Toast, Dialog

### 阶段2: 核心组件开发 (Phase 2)

#### 2.1 布局组件
- [ ] 创建Header/Navigation组件
  - 响应式导航菜单
  - 语言选择器
  - 移动端菜单
  - Logo组件
- [ ] 创建Footer组件
  - 链接分组
  - 社交媒体链接
  - 公司信息
- [ ] 创建Layout包装组件

#### 2.2 Hero区域组件
- [ ] HeroSection主组件
- [ ] HeroStats统计组件
- [ ] CTAButtons行动号召按钮组
- [ ] HeroAnimation背景动画组件

#### 2.3 内容区域组件
- [ ] AboutSection关于我们组件
- [ ] FeatureCard特性卡片组件
- [ ] ProductCard产品卡片组件
- [ ] ProductsGrid产品网格组件

### 阶段3: 高级功能组件 (Phase 3)

#### 3.1 交互组件
- [ ] TestimonialCard客户评价卡片
- [ ] TestimonialsCarousel评价轮播
- [ ] FAQSection常见问题组件
- [ ] ContactForm联系表单组件

#### 3.2 功能性组件
- [ ] LanguageSelector语言选择器
- [ ] LocalizationButton本地化按钮
- [ ] SearchDialog搜索对话框
- [ ] QuoteForm询价表单

#### 3.3 数据展示组件
- [ ] StatsDisplay统计展示
- [ ] ProgressChart进度图表
- [ ] TrustIndicators信任指标
- [ ] SuccessStories成功案例

### 阶段4: 页面组装和样式优化 (Phase 4)

#### 4.1 主页面开发
- [ ] 首页布局组装
- [ ] 响应式样式调整
- [ ] 动画效果实现
- [ ] 交互逻辑开发

#### 4.2 样式系统完善
- [ ] 自定义CSS变量设置
- [ ] 主题配置优化
- [ ] 深色模式支持（可选）
- [ ] 打印样式优化

#### 4.3 性能优化
- [ ] 图片优化和懒加载
- [ ] 代码分割优化
- [ ] Bundle分析和优化
- [ ] Core Web Vitals优化

### 阶段5: 测试和部署 (Phase 5)

#### 5.1 质量保证
- [ ] 组件单元测试
- [ ] 集成测试
- [ ] 可访问性测试
- [ ] 跨浏览器测试
- [ ] 移动端测试

#### 5.2 SEO和元数据
- [ ] Meta标签优化
- [ ] 结构化数据实现
- [ ] Sitemap生成
- [ ] robots.txt配置

#### 5.3 国际化实现
- [ ] i18n配置设置
- [ ] 翻译文件创建
- [ ] 语言切换功能
- [ ] 地区化内容调整

#### 5.4 部署准备
- [ ] 生产环境配置
- [ ] 环境变量设置
- [ ] 部署脚本创建
- [ ] 监控配置

## 详细任务清单

### Task 1: 项目初始化
```bash
# 创建Next.js项目
npx create-next-app@latest punaise-equipment --typescript --tailwind --eslint --app --src-dir

# 进入项目目录
cd punaise-equipment

# 安装shadcn/ui
npx shadcn-ui@latest init

# 安装基础组件
npx shadcn-ui@latest add button card input textarea form label select navigation-menu dropdown-menu separator badge avatar accordion tabs progress toast dialog
```

### Task 2: 目录结构设计
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/                 # shadcn/ui组件
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ContactSection.tsx
│   ├── cards/
│   │   ├── ProductCard.tsx
│   │   ├── FeatureCard.tsx
│   │   └── TestimonialCard.tsx
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   └── QuoteForm.tsx
│   └── common/
│       ├── Logo.tsx
│       ├── LanguageSelector.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── utils.ts
│   ├── validations.ts
│   └── constants.ts
├── types/
│   ├── common.ts
│   ├── product.ts
│   └── form.ts
├── hooks/
│   ├── useLanguage.ts
│   ├── useContact.ts
│   └── useScroll.ts
├── data/
│   ├── products.ts
│   ├── testimonials.ts
│   └── faq.ts
└── styles/
    └── globals.css
```

### Task 3: 组件开发优先级

#### 高优先级组件
1. **Layout组件**: Header, Footer, Navigation
2. **HeroSection**: 主要展示区域
3. **ProductCard**: 产品展示核心
4. **ContactForm**: 转化关键组件

#### 中优先级组件
1. **AboutSection**: 公司介绍
2. **FeaturesSection**: 特性展示
3. **TestimonialsSection**: 社会证明
4. **FAQSection**: 用户支持

#### 低优先级组件
1. **动画组件**: 增强用户体验
2. **搜索功能**: 额外功能
3. **深色模式**: 可选特性

### Task 4: 数据结构设计

#### 产品数据类型
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  category: ProductCategory;
  image?: string;
  icon: string;
  specs?: {
    thickness?: string;
    speed?: string;
    precision?: string;
  };
  downloadLink?: string;
}

enum ProductCategory {
  PLASMA_CUTTING = 'plasma-cutting',
  LASER_CUTTING = 'laser-cutting',
  FLAME_CUTTING = 'flame-cutting',
  SLITTING = 'slitting',
  AUXILIARY = 'auxiliary'
}
```

#### 表单数据类型
```typescript
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
}

interface QuoteFormData {
  industry: string;
  material: string;
  thickness: number;
  quantity: string;
  budget: string;
  phone: string;
  company?: string;
}
```

### Task 5: 样式配置

#### tailwind.config.js扩展
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'industrial-blue': {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        'equipment-orange': {
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      }
    }
  }
}
```

## 实施时间表

### 第1周: 基础设置
- 项目初始化
- shadcn/ui配置
- 基础组件开发

### 第2周: 核心组件
- Layout组件完善
- Hero和About区域
- 产品展示基础

### 第3周: 功能组件
- 表单组件开发
- 交互功能实现
- 响应式优化

### 第4周: 优化和部署
- 性能优化
- 测试完善
- 部署准备

## 质量检查标准

### 代码质量
- [ ] TypeScript类型覆盖率 > 90%
- [ ] ESLint无错误
- [ ] Prettier格式化一致
- [ ] 组件可重用性 > 80%

### 性能标准
- [ ] Lighthouse性能分数 > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### 可访问性标准
- [ ] WCAG 2.1 AA标准合规
- [ ] 键盘导航完全支持
- [ ] 屏幕阅读器兼容
- [ ] 颜色对比度 > 4.5:1

### 兼容性标准
- [ ] Chrome (最新2个版本)
- [ ] Firefox (最新2个版本)
- [ ] Safari (最新2个版本)
- [ ] Edge (最新2个版本)
- [ ] 移动端iOS/Android

这个实施计划为shadcn/ui重构提供了详细的路线图，确保项目能够按计划高质量完成。