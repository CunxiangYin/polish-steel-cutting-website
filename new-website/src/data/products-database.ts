// 基于 production-info 提取的完整产品数据库
import { ProductCategory } from '@/types/product';

export interface ProductSpecification {
  [key: string]: string;
}

export interface ProductSpecs {
  thickness?: string;
  speed?: string;
  precision?: string;
  power?: string;
  workingArea?: string;
  capacity?: string;
  flip_time?: string;
  drive_type?: string;
  installation?: string;
  accuracy?: string;
  operation?: string;
  size?: string;
  clamping_force?: string;
  pressure_distribution?: string;
  efficiency?: string;
  sealing?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: ProductCategory;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  specs?: ProductSpecs;
  image?: string;
  icon: string;
  downloadLink?: string;
  priceRange?: string;
  availability: 'in-stock' | 'made-to-order' | 'discontinued';
  applications?: string[];
  benefits?: string[];
  note?: string;
  manufacturer?: string;
  origin?: string;
}

// 基于 steel-cutting-equipment.json 的主要设备
export const steelCuttingEquipment: Product = {
  id: 'taiwan-yunghua-cutting-line',
  name: '台湾荣华钢材裁切生产线',
  nameEn: 'Taiwan Yunghua Steel Cutting Production Line',
  category: ProductCategory.STEEL_PLATE_PROCESSING,
  description: '台湾荣华机械厂股份有限公司专业设计、生产金属裁片机及分条机，产品遍及世界各地，六十年来，精益求精，不断提升研发技能，以先进的技术、完美的品质、快速的服务来满足客户的需求。',
  descriptionEn: 'Taiwan Yunghua Machinery Factory Co., Ltd. professionally designs and manufactures metal cutting machines and slitting machines, with products distributed worldwide for sixty years, continuously improving R&D skills with advanced technology, perfect quality, and fast service.',
  features: [
    '先进的技术',
    '完美的品质',
    '快速的服务',
    '精益求精的工艺',
    '不断提升的研发技能'
  ],
  featuresEn: [
    'Advanced technology',
    'Perfect quality',
    'Fast service',
    'Exquisite craftsmanship',
    'Continuously improving R&D skills'
  ],
  specs: {
    manufacturer: '台湾荣华机械厂股份有限公司',
    website: 'www.yunghua.com.tw',
    experience: '六十年经验',
    distribution: '产品遍及世界各地'
  },
  applications: [
    '中国大陆主要合作厂商',
    '香港主要合作厂商', 
    '日本主要合作厂商',
    '国际钢铁集团下属钢板配送中心'
  ],
  image: '/images/products/taiwan-yunghua-cutting-line.jpeg',
  icon: 'cutting',
  availability: 'made-to-order',
  priceRange: '面议',
  manufacturer: '台湾荣华机械厂股份有限公司',
  note: '本公司是台湾荣华机械厂股份有限公司国内代表处'
};

// 基于 peripheral-equipment.json 的周边设备
export const peripheralEquipment: Product[] = [
  {
    id: 'steel-coil-cart',
    name: '钢卷移动台车',
    nameEn: 'Steel Coil Mobile Cart',
    category: ProductCategory.CONVEYOR_SYSTEMS,
    description: '用于运载宽幅钢卷，设备运行平稳，噪音低。台车设置安全装置，防钢卷翻倒，确保安全。电器控制，操作简单方便。',
    descriptionEn: 'Used for transporting wide steel coils, equipment runs smoothly with low noise. Cart is equipped with safety devices to prevent steel coil rollover, ensuring safety. Electrical control, simple and convenient operation.',
    features: [
      '用于运载宽幅钢卷，设备运行平稳，噪音低',
      '台车设置安全装置，防钢卷翻倒，确保安全',
      '电器控制，操作简单方便',
      '移动速度：10~20M/MIN'
    ],
    featuresEn: [
      'For transporting wide steel coils with smooth operation and low noise',
      'Cart equipped with safety devices to prevent rollover',
      'Electrical control, simple and convenient operation',
      'Moving speed: 10~20M/MIN'
    ],
    specs: {
      speed: '10-20M/MIN',
      control: '电器控制',
      safety: '防钢卷翻倒安全装置'
    },
    applications: ['钢卷运输', '钢材加工配送中心'],
    image: '/images/products/steel-coil-cart.jpeg',
    icon: 'conveyor',
    availability: 'in-stock',
    priceRange: '¥80,000-150,000'
  },
  {
    id: 'mechanical-coil-flipper',
    name: '机械式钢卷翻倒机',
    nameEn: 'Mechanical Steel Coil Flipper',
    category: ProductCategory.AUXILIARY_EQUIPMENT,
    description: '采用齿条或摩擦轮式，不占空间，不动基础。不受场地限制，放置地面上就可使用。翻转平稳、安全，噪音低，造型美观。',
    descriptionEn: 'Uses rack or friction wheel type, space-saving, no foundation required. Not limited by site conditions, can be used when placed on the ground. Smooth, safe flipping with low noise and beautiful design.',
    features: [
      '采用齿条或摩擦轮式，不占空间，不动基础',
      '不受场地限制，放置地面上就可使用', 
      '翻转平稳、安全，噪音低，造型美观',
      '设计承载能力：3~20ton，翻转时间：15~30S'
    ],
    featuresEn: [
      'Rack or friction wheel type, space-saving, no foundation required',
      'Not limited by site, can be used when placed on ground',
      'Smooth, safe flipping with low noise and beautiful design',
      'Design capacity: 3~20ton, flipping time: 15~30S'
    ],
    specs: {
      capacity: '3-20ton',
      flip_time: '15-30S',
      drive_type: '齿条或摩擦轮式',
      installation: '放置地面即可使用'
    },
    applications: ['钢卷翻转', '钢材处理'],
    image: '/images/products/mechanical-coil-flipper.jpeg',
    icon: 'auxiliary',
    availability: 'made-to-order',
    priceRange: '¥120,000-280,000'
  },
  {
    id: 'steel-strip-cutter',
    name: '钢带剪断机',
    nameEn: 'Steel Strip Cutting Machine',
    category: ProductCategory.AUXILIARY_EQUIPMENT,
    description: '切断尺寸准确，平直度良好。作业简单，剪切长度任意设定，工作效率高。体积小，占用场地小，噪音低，造型美观。',
    descriptionEn: 'Accurate cutting size with good straightness. Simple operation, arbitrary shear length setting, high efficiency. Compact size, small footprint, low noise, beautiful design.',
    features: [
      '切断尺寸准确，平直度良好',
      '作业简单，剪切长度任意设定，工作效率高',
      '体积小，占用场地小，噪音低，造型美观',
      '可采用手动或自动操作方式'
    ],
    featuresEn: [
      'Accurate cutting size with good straightness',
      'Simple operation, arbitrary length setting, high efficiency',
      'Compact size, small footprint, low noise, beautiful design',
      'Manual or automatic operation available'
    ],
    specs: {
      accuracy: '切断尺寸准确，平直度良好',
      operation: '手动或自动操作',
      size: '体积小，占用场地小'
    },
    applications: ['钢带切断', '精密切割'],
    image: '/images/products/steel-strip-cutter.jpeg',
    icon: 'cutting',
    availability: 'in-stock',
    priceRange: '¥45,000-95,000'
  }
];

// 大型钢铁裁切加工设备
export const largeScaleEquipment: Product[] = [
  {
    id: 'large-steel-cutting-equipment',
    name: '大型钢铁裁切加工设备',
    nameEn: 'Large Scale Steel Cutting Processing Equipment',
    category: ProductCategory.STEEL_PLATE_PROCESSING,
    description: '专业的大型钢铁裁切加工设备，采用先进的切割技术，适用于各种规格的钢铁材料精密加工。设备运行稳定，切割精度高，生产效率优异。',
    descriptionEn: 'Professional large-scale steel cutting processing equipment with advanced cutting technology, suitable for precision processing of various steel materials. Stable operation, high cutting accuracy, and excellent production efficiency.',
    features: [
      '先进的切割技术',
      '高精度切割能力',
      '设备运行稳定可靠',
      '适用于各种规格钢材',
      '优异的生产效率',
      '操作简便安全'
    ],
    featuresEn: [
      'Advanced cutting technology',
      'High precision cutting capability',
      'Stable and reliable operation',
      'Suitable for various steel specifications',
      'Excellent production efficiency',
      'Simple and safe operation'
    ],
    specs: {
      precision: '高精度切割',
      efficiency: '优异生产效率',
      stability: '运行稳定可靠',
      application: '各种规格钢材加工'
    },
    applications: [
      '大型钢铁加工企业',
      '钢材配送中心',
      '制造业钢材处理',
      '精密钢材切割'
    ],
    benefits: [
      '提高生产效率',
      '保证切割精度',
      '降低运营成本',
      '提升产品质量'
    ],
    image: '/images/products/large-steel-cutting-equipment.jpeg',
    icon: 'cutting',
    availability: 'made-to-order',
    priceRange: '面议',
    manufacturer: '专业钢铁设备制造商',
    note: '根据客户需求定制，提供完整解决方案'
  }
];

// 基于 specialized-parts.json 的专用配件
export const specializedParts: Product[] = [
  {
    id: 'jdc-belt-tensioner',
    name: '日本JDC皮带张紧器',
    nameEn: 'Japan JDC Belt Tensioner',
    category: ProductCategory.TAIWAN_RONGHUA,
    description: '皮带张紧器是日本JDC公司的专利高技术产品。通过外部卷紧机将钢材绕成卷状时，将添加皮带的表面产生很大的摩擦系数，使卷材密接，进行同步旋转。增加卷紧张力，避免钢卷表面产生擦痕，且收卷整齐、美观。',
    descriptionEn: 'Belt tensioner is a patented high-tech product from Japan JDC Company. When steel is wound into coils by external coiling machine, it creates high friction coefficient on belt surface, making coiled material close contact and synchronous rotation. Increases coiling tension, prevents surface scratches on steel coils, and ensures neat, beautiful coiling.',
    features: [
      '日本JDC公司专利高技术产品',
      '增加卷紧张力',
      '避免钢卷表面产生擦痕',
      '收卷整齐、美观'
    ],
    featuresEn: [
      'Patented high-tech product from Japan JDC Company',
      'Increases coiling tension',
      'Prevents surface scratches on steel coils', 
      'Neat and beautiful coiling'
    ],
    applications: [
      '不锈钢表面处理',
      '彩涂板加工',
      '铝板等高表面要求材料',
      '防止钢卷表面擦痕'
    ],
    benefits: [
      '增加卷紧张力',
      '避免表面擦痕',
      '收卷整齐美观',
      '提高产品质量'
    ],
    image: '/images/products/jdc-belt-tensioner.jpeg',
    icon: 'parts',
    availability: 'in-stock',
    priceRange: '¥25,000-45,000',
    origin: '日本JDC公司专利技术产品',
    note: '我司为日本JDC合格代理商'
  },
  {
    id: 'hydraulic-nut',
    name: '液压螺母',
    nameEn: 'Hydraulic Nut',
    category: ProductCategory.TAIWAN_RONGHUA,
    description: '用途：金属分条机圆刀紧固夹具。能达到20-30吨的轴向锁紧力，减少对刀轴的机械冲击，保持刀轴精度。操作简单方便，密封性好。',
    descriptionEn: 'Application: Metal slitting machine circular blade fastening fixture. Can achieve 20-30 tons axial clamping force, reduce mechanical impact on blade shaft, maintain blade shaft precision. Simple and convenient operation with good sealing.',
    features: [
      '能达到20-30吨的轴向锁紧力，减少对刀轴的机械冲击，保持刀轴精度',
      '刀片轴向锁紧力压力均匀，降低刀片磨损，延长刀片寿命',
      '减少对刀时间，提高设备生产效率',
      '操作简单方便，密封性好，不会产生漏油现象'
    ],
    featuresEn: [
      'Achieves 20-30 tons axial clamping force, reduces mechanical impact on blade shaft',
      'Uniform pressure distribution, reduces blade wear, extends blade life',
      'Reduces setup time, improves equipment efficiency',
      'Simple operation, good sealing, no oil leakage'
    ],
    specs: {
      clamping_force: '20-30吨轴向锁紧力',
      pressure_distribution: '压力均匀',
      efficiency: '提高生产效率',
      sealing: '密封性好，无漏油'
    },
    applications: ['金属分条机', '圆刀紧固'],
    image: '/images/products/hydraulic-nut.jpeg',
    icon: 'parts',
    availability: 'in-stock',
    priceRange: '¥15,000-28,000'
  }
];

// 合并所有产品
export const products: Product[] = [
  steelCuttingEquipment,
  ...largeScaleEquipment,
  ...peripheralEquipment,
  ...specializedParts
];

// 产品分类
export const productCategories = [
  {
    id: 'steel-cutting',
    name: '钢材切割设备',
    description: '台湾荣华机械大型钢材裁切生产线，60年技术传承',
    icon: 'cutting',
    count: 2
  },
  {
    id: 'peripheral',
    name: '周边设备',
    description: '钢卷台车、翻倒机、剪断机等配套设备',
    icon: 'peripheral',
    count: 3
  },
  {
    id: 'parts',
    name: '专用配件',
    description: '日本JDC皮带张紧器、液压螺母等高技术配件',
    icon: 'parts',
    count: 2
  }
];

// 主要合作伙伴（基于 company-profile.json）
export const keyPartners = [
  {
    name: '台湾荣华机械厂股份有限公司',
    description: '专业设计、生产金属裁片机及分条机，60年技术传承',
    website: 'www.yunghua.com.tw',
    partnership: '国内代表处',
    specialization: '金属裁片机及分条机'
  },
  {
    name: '台湾正记机械股份有限公司',
    description: '专业机械设备制造商',
    partnership: '合作伙伴'
  },
  {
    name: '台湾道德企业有限公司',
    description: '机械设备供应商',
    partnership: '合作伙伴'
  },
  {
    name: '日本米盛铁工所',
    description: '日本专业铁工技术企业',
    partnership: '合作伙伴'
  },
  {
    name: '日本JDC公司',
    description: '皮带张紧器专利技术提供商',
    partnership: '合格代理商',
    note: '专利高技术产品供应商'
  }
];

// 主要客户群体（基于 company-profile.json）
export const targetCustomers = [
  {
    category: '大型钢铁企业',
    customers: ['宝钢', '攀钢', '鞍钢', '马钢集团等']
  },
  {
    category: '制造业集团下属加工中心',
    customers: ['海尔集团', '长虹集团', '美的集团']
  },
  {
    category: '钢铁物流和贸易',
    customers: ['烨辉钢铁物流中心', '华联五金', '富鸿实业', '苏利宝钢铁']
  },
  {
    category: '国际钢铁集团',
    customers: ['日本JFE(株式)', '三井(株式)等国际钢铁集团下属钢板配送中心']
  }
];

// 获取特色产品
export const getFeaturedProducts = () => {
  return products.filter(product => 
    product.category === ProductCategory.STEEL_PLATE_PROCESSING || 
    product.category === ProductCategory.TAIWAN_RONGHUA
  ).slice(0, 6);
};

// 根据分类获取产品
export const getProductsByCategory = (category: ProductCategory) => {
  return products.filter(product => product.category === category);
};

// 获取产品统计
export const getProductStats = () => {
  return {
    total: products.length,
    categories: productCategories.length,
    partners: keyPartners.length,
    customers: targetCustomers.reduce((total, group) => total + group.customers.length, 0)
  };
};