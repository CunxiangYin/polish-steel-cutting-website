import { Company, NavigationItem, Language, SocialLink } from '@/types/common';

export const COMPANY_INFO: Company = {
  name: '深圳普耐斯机电设备有限公司',
  nameEn: 'Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd.',
  logo: '/logo-main.svg',
  description: '钢板销售、钢板加工设备、辅助设备、零配件及周边材料销售，提供相关产品技术维修和咨询服务，主营台湾荣华精密机械。',
  founded: '2005',
  address: {
    street: '南新路1003号荔枝大厦608室',
    city: '深圳市南山区',
    region: '广东省',
    postalCode: '518052',
    country: '中国'
  },
  contact: {
    phone: '+86 755-2644-3680',
    mobile: '+86 135-1099-2218',
    email: '466904802@qq.com',
    manager: '付经理'
  },
  services: [
    '钢板加工设备销售',
    '台湾荣华机械代理',
    '设备技术咨询',
    '维修保养服务',
    '零配件供应'
  ],
  certifications: [
    '统一社会信用代码: 914403007703327657',
    '台湾荣华授权代理商',
    'ISO质量认证'
  ]
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: '首页',
    href: '/'
  },
  {
    title: '关于我们',
    href: '#about'
  },
  {
    title: '产品中心',
    href: '#products',
    children: [
      { title: '钢板加工设备', href: '#products/steel-processing' },
      { title: '输送带系统', href: '#products/conveyor-systems' },
      { title: '台湾荣华分条机', href: '#products/taiwan-ronghua' }
    ]
  },
  {
    title: '服务支持',
    href: '#services',
    children: [
      { title: '技术咨询', href: '#services/consulting' },
      { title: '维修保养', href: '#services/maintenance' },
      { title: '零配件供应', href: '#services/parts' }
    ]
  },
  {
    title: '联系我们',
    href: '#contact'
  }
];

export const LANGUAGES: Language[] = [
  {
    code: 'zh-CN',
    name: '中文简体',
    flag: '🇨🇳'
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/company/punaise-equipment',
    icon: 'linkedin'
  },
  {
    platform: 'YouTube',
    url: 'https://www.youtube.com/channel/punaise-equipment',
    icon: 'youtube'
  },
  {
    platform: 'WeChat',
    url: '#',
    icon: 'wechat'
  }
];

export const INDUSTRIES = [
  { value: 'shipbuilding', label: '造船业' },
  { value: 'automotive', label: '汽车制造' },
  { value: 'construction', label: '建筑工程' },
  { value: 'machinery', label: '机械制造' },
  { value: 'steel-center', label: '钢材加工中心' },
  { value: 'energy', label: '能源设备' }
];

export const MATERIALS = [
  { value: 'carbon-steel', label: '碳钢' },
  { value: 'stainless-steel', label: '不锈钢' },
  { value: 'aluminum', label: '铝合金' },
  { value: 'copper', label: '铜合金' },
  { value: 'alloy', label: '合金钢' }
];

export const BUDGET_RANGES = [
  { value: 'under-50k', label: '50万以下' },
  { value: '50k-100k', label: '50-100万' },
  { value: '100k-200k', label: '100-200万' },
  { value: 'over-200k', label: '200万以上' }
];

export const QUANTITY_RANGES = [
  { value: 'small', label: '100平米以下' },
  { value: 'medium', label: '100-1000平米' },
  { value: 'large', label: '1000-5000平米' },
  { value: 'xlarge', label: '5000平米以上' }
];