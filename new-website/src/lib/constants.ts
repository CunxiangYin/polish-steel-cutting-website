import { Company, NavigationItem, Language, SocialLink } from '@/types/common';

export const COMPANY_INFO: Company = {
  name: '深圳市普耐斯机电设备有限公司',
  nameEn: 'Shenzhen Punaise Mechanical Equipment Co., Ltd.',
  logo: '/logo-main.svg',
  description: '为综合性商贸企业，专业服务于大型钢材加工配送中心。主要经营大型钢材裁切设备及周边设备的销售、安装调试和售后服务，并提供设备专用配件、专用耗材和专用工具的销售。',
  founded: '2005',
  slogan: '专业、全面、用心之服务',
  address: {
    street: '南新路1003号荔枝大厦608室',
    city: '深圳市南山区',
    region: '广东省',
    postalCode: '518052',
    country: '中国'
  },
  contact: {
    phone: '0755-26443680',
    fax: '0755-26443750',
    mobile: '+86 189-3864-9300',
    email: '466904802@qq.com',
    website: 'http://szpolish.com.cn/',
    manager: '付经理'
  },
  services: [
    '钢材裁剪设备的销售、安装和售后服务',
    '周边设备制作（移动台车、翻倒机、钢带剪断机等）',
    '专用配件销售（张力皮带、液压螺母、固体润滑条、液体润滑剂等）',
    '专用耗材经营（钢板呢、纸夹垫、橡胶圈、内径胶套等）',
    '专业技术服务（设备维修保养改造、防尘棚制作、圆刀、整平辊研磨等）'
  ],
  certifications: [
    '台湾荣华机械厂股份有限公司国内代表处',
    '台湾正记机械股份有限公司合作伙伴',
    '台湾道德企业有限公司合作伙伴', 
    '日本米盛铁工所合作伙伴',
    '日本JDC合格代理商',
    '六十年专业技术传承'
  ],
  coreValues: '以"专业、全面、尽心之服务"为经营方针，为客户提供专业技术服务，携手客户，共同发展',
  targetCustomers: [
    '宝钢、攀钢、鞍钢、马钢集团等大型钢铁企业',
    '海尔、长虹、美的集团下属加工中心',
    '烨辉钢铁物流中心',
    '华联五金、富鸿实业、苏利宝钢铁等',
    '日本JFE(株式)、三井(株式)等国际钢铁集团的下属钢板配送中心'
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