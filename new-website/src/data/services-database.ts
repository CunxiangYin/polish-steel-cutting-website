// 基于 technical-services.json 的技术服务数据库

export interface TechnicalService {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  features?: string[];
  featuresEn?: string[];
  scope?: string[];
  scopeEn?: string[];
  applications?: string[];
  applicationsEn?: string[];
  benefits?: string[];
  benefitsEn?: string[];
  equipment?: string[];
  equipmentEn?: string[];
  capabilities?: string[];
  capabilitiesEn?: string[];
  quality_assurance?: string[];
  qualityAssuranceEn?: string[];
  image?: string;
  imageDescription?: string;
  imageDescriptionEn?: string;
}

export const technicalServices: TechnicalService[] = [
  {
    id: 'equipment-maintenance',
    name: '设备维修、保养、改造',
    nameEn: 'Equipment Repair, Maintenance & Modification',
    description: '按照客户的设备购买年限、数量和加工产能，定制设备月度、季度、年度维护保养计划，以先进的技术和专业精神提供快速、全面、用心的服务。',
    descriptionEn: 'According to customers equipment purchase period, quantity and processing capacity, customize monthly, quarterly, and annual maintenance plans, providing fast, comprehensive, and dedicated service with advanced technology and professional spirit.',
    imageDescription: '技术人员维修保养现场',
    imageDescriptionEn: 'Technicians maintenance and service scene',
    features: [
      '定制维护保养计划',
      '先进技术支持',
      '专业精神服务',
      '快速响应',
      '全面服务',
      '用心服务'
    ],
    featuresEn: [
      'Customized maintenance plans',
      'Advanced technical support',
      'Professional service',
      'Quick response',
      'Comprehensive service',
      'Dedicated service'
    ],
    scope: [
      '月度维护',
      '季度保养', 
      '年度大修',
      '设备改造升级'
    ],
    scopeEn: [
      'Monthly maintenance',
      'Quarterly maintenance',
      'Annual overhaul',
      'Equipment upgrade and modification'
    ],
    image: '/images/products/taiwan-yunghua-cutting-line.jpeg'
  },
  {
    id: 'dust-proof-shed',
    name: '防尘棚制作',
    nameEn: 'Dust-proof Shed Manufacturing',
    description: '主要用于对加工铝板、不锈钢板、汽车面板等钢铁裁切生产的防尘隔离。增加照明亮度，改善作业环境。',
    descriptionEn: 'Mainly used for dust isolation in processing aluminum plates, stainless steel plates, automotive panels and other steel cutting production. Increases lighting brightness and improves working environment.',
    imageDescription: '钢材加工车间防尘棚设施',
    imageDescriptionEn: 'Dust-proof shed facilities in steel processing workshop',
    applications: [
      '铝板加工防尘',
      '不锈钢板加工防尘',
      '汽车面板加工防尘'
    ],
    applicationsEn: [
      'Aluminum plate processing dust protection',
      'Stainless steel plate processing dust protection',
      'Automotive panel processing dust protection'
    ],
    benefits: [
      '防尘隔离',
      '增加照明亮度', 
      '改善作业环境',
      '提高产品质量'
    ],
    benefitsEn: [
      'Dust isolation',
      'Increased lighting brightness',
      'Improved working environment',
      'Enhanced product quality'
    ],
    image: '/images/products/mechanical-coil-flipper.jpeg'
  },
  {
    id: 'grinding-processing',
    name: '圆刀、整平辊研磨、辊子包胶',
    nameEn: 'Circular Blade & Leveling Roll Grinding, Roll Rubber Coating',
    description: '拥有设备完善的机加工车间，导入上海机床厂的最新精密外圆磨床，提供稳定的加工品质，完全满足加工中心的圆刀、校平辊等工件的加工要求。',
    descriptionEn: 'Equipped with complete machining workshop facilities, introducing the latest precision external cylindrical grinder from Shanghai Machine Tool Factory, providing stable processing quality that fully meets the processing requirements for circular blades, leveling rolls and other workpieces in processing centers.',
    imageDescription: '精密研磨加工现场',
    imageDescriptionEn: 'Precision grinding processing site',
    equipment: [
      '上海机床厂最新精密外圆磨床',
      '完善的机加工车间设备'
    ],
    equipmentEn: [
      'Latest precision external cylindrical grinder from Shanghai Machine Tool Factory',
      'Complete machining workshop equipment'
    ],
    capabilities: [
      '圆刀研磨',
      '整平辊研磨', 
      '辊子包胶',
      '精密外圆磨削'
    ],
    capabilitiesEn: [
      'Circular blade grinding',
      'Leveling roll grinding',
      'Roll rubber coating',
      'Precision external cylindrical grinding'
    ],
    quality_assurance: [
      '稳定的加工品质',
      '满足加工中心要求',
      '精密加工标准'
    ],
    qualityAssuranceEn: [
      'Stable processing quality',
      'Meets processing center requirements',
      'Precision processing standards'
    ],
    image: '/images/products/hydraulic-nut.jpeg'
  }
];

// 服务优势
export const serviceAdvantages = [
  {
    title: '专业技术团队',
    titleEn: 'Professional Technical Team',
    description: '60年技术传承，经验丰富的技术专家团队',
    descriptionEn: '60 years of technical heritage, experienced expert team',
    icon: 'team'
  },
  {
    title: '快速响应服务',
    titleEn: 'Quick Response Service',
    description: '24小时响应，快速解决客户技术问题',
    descriptionEn: '24-hour response, quickly resolving customer technical issues',
    icon: 'speed'
  },
  {
    title: '定制化解决方案',
    titleEn: 'Customized Solutions',
    description: '根据客户具体需求，提供个性化服务方案',
    descriptionEn: 'Personalized service solutions based on specific customer needs',
    icon: 'custom'
  },
  {
    title: '全程质量保证',
    titleEn: 'Full Quality Assurance',
    description: '严格的质量标准，确保服务质量和效果',
    descriptionEn: 'Strict quality standards ensuring service quality and results',
    icon: 'quality'
  }
];

// 服务承诺
export const serviceCommitments = [
  '以"专业、全面、尽心之服务"为经营方针',
  '为客户提供专业技术服务',
  '携手客户，共同发展',
  '快速、全面、用心的服务体验'
];

// 服务流程
export const serviceProcess = [
  {
    step: 1,
    title: '需求分析',
    description: '深入了解客户设备状况和服务需求',
    duration: '1-2天'
  },
  {
    step: 2,
    title: '方案制定',
    description: '制定个性化的维护保养或改造方案',
    duration: '2-3天'
  },
  {
    step: 3,
    title: '方案实施',
    description: '专业团队现场实施服务方案',
    duration: '按方案'
  },
  {
    step: 4,
    title: '质量验收',
    description: '服务完成后进行质量检验和客户验收',
    duration: '1天'
  },
  {
    step: 5,
    title: '跟踪服务',
    description: '定期跟踪设备运行状况，提供持续支持',
    duration: '长期'
  }
];

// 技术能力
export const technicalCapabilities = [
  {
    category: '设备维修改造',
    capabilities: [
      '钢材裁切设备大修',
      '分条机精度调整',
      '电气系统升级',
      '机械部件更换',
      '性能优化改进'
    ]
  },
  {
    category: '精密加工',
    capabilities: [
      '圆刀精密研磨',
      '整平辊修复',
      '辊子包胶处理',
      '精密测量检测',
      '表面质量控制'
    ]
  },
  {
    category: '环境改善',
    capabilities: [
      '防尘棚设计制作',
      '照明系统优化',
      '通风除尘系统',
      '噪音控制治理',
      '安全防护设施'
    ]
  },
  {
    category: '技术咨询',
    capabilities: [
      '设备选型建议',
      '工艺流程优化',
      '生产效率提升',
      '质量标准制定',
      '操作培训指导'
    ]
  }
];

// 获取服务统计
export const getServiceStats = () => {
  return {
    total: technicalServices.length,
    advantages: serviceAdvantages.length,
    processes: serviceProcess.length,
    capabilities: technicalCapabilities.reduce((total, cat) => total + cat.capabilities.length, 0)
  };
};