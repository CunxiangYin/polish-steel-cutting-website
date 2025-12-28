import { Product, ProductCategory } from '@/types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'steel-plate-processing-01',
    name: '钢板加工设备',
    nameEn: 'Steel Plate Processing Equipment',
    category: ProductCategory.STEEL_PLATE_PROCESSING,
    description: '完整的钢板加工设备系列，包括切割机、辅助设备和零配件。',
    descriptionEn: 'Complete range of steel plate processing equipment including cutting machines, auxiliary equipment and spare parts.',
    features: [
      '适用于各种钢板厚度',
      '专业技术支持',
      '质量保证设备',
      '高精度切割',
      '稳定可靠运行'
    ],
    featuresEn: [
      'Various steel plate thicknesses',
      'Professional technical support',
      'Quality assured equipment',
      'High precision cutting',
      'Stable and reliable operation'
    ],
    specs: {
      thickness: '3-200mm',
      precision: '±0.1mm',
      power: '50-200kW'
    },
    icon: 'cog',
    priceRange: '50-200万',
    availability: 'in-stock'
  },
  {
    id: 'conveyor-systems-01',
    name: '输送带与移动平台',
    nameEn: 'Conveyor Belts & Mobile Platforms',
    category: ProductCategory.CONVEYOR_SYSTEMS,
    description: '工业输送系统、钢卷翻转机和移动平台车，用于物料搬运。',
    descriptionEn: 'Industrial conveyor systems, steel coil tipping machines, and mobile platform cars for material handling.',
    features: [
      '重型结构设计',
      '可定制配置',
      '可靠运行',
      '大承载能力',
      '低维护成本'
    ],
    featuresEn: [
      'Heavy-duty construction',
      'Customizable configurations',
      'Reliable operation',
      'Large load capacity',
      'Low maintenance cost'
    ],
    specs: {
      workingArea: '3000×12000mm',
      power: '15-75kW',
      speed: '0.5-10m/min'
    },
    icon: 'truck',
    priceRange: '30-150万',
    availability: 'made-to-order'
  },
  {
    id: 'taiwan-ronghua-01',
    name: '台湾荣华分条机',
    nameEn: 'Taiwan Ronghua Slitting Machines',
    category: ProductCategory.TAIWAN_RONGHUA,
    description: '专业钢卷分条设备和飞剪，用于精密材料加工和连续钢材操作。',
    descriptionEn: 'Professional steel coil slitting equipment and flying shears for precision material processing and continuous steel operations.',
    features: [
      '高速分条能力',
      '精密钢带切割',
      '台湾品质保证',
      '自动化控制',
      '高效率生产'
    ],
    featuresEn: [
      'High-speed slitting capability',
      'Precision steel strip cutting',
      'Taiwan quality assurance',
      'Automated control',
      'High efficiency production'
    ],
    specs: {
      thickness: '0.3-6.0mm',
      speed: '0-200m/min',
      precision: '±0.02mm',
      workingArea: '1600mm宽'
    },
    icon: 'scissors',
    priceRange: '80-300万',
    availability: 'in-stock'
  }
];

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return PRODUCTS.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return PRODUCTS.slice(0, 3); // 返回前三个产品作为特色产品
};