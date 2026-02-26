/**
 * 产品数据入口
 * 优先使用后台管理的数据（products-override.json），fallback 到硬编码默认值
 */
import { ProductCategory } from '@/types/product';
import type { Product } from './products-database';
import {
  products as defaultProducts,
  productCategories,
  keyPartners,
  targetCustomers,
  getFeaturedProducts as defaultGetFeaturedProducts,
  getProductsByCategory as defaultGetProductsByCategory,
  getProductStats as defaultGetProductStats
} from './products-database';

// 后台管理的产品数据模型（简化版）
interface AdminProduct {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  price: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
}

// 将后台数据转换为前台数据格式
function convertAdminProduct(admin: AdminProduct): Product {
  // 映射分类名称到 ProductCategory enum
  const categoryMap: Record<string, ProductCategory> = {
    '切割设备': ProductCategory.STEEL_PLATE_PROCESSING,
    '成型设备': ProductCategory.CONVEYOR_SYSTEMS,
    '辅助设备': ProductCategory.AUXILIARY_EQUIPMENT,
    '配件工具': ProductCategory.TAIWAN_RONGHUA,
    'Cutting Equipment': ProductCategory.STEEL_PLATE_PROCESSING,
    'Forming Equipment': ProductCategory.CONVEYOR_SYSTEMS,
    'Auxiliary Equipment': ProductCategory.AUXILIARY_EQUIPMENT,
    'Parts & Tools': ProductCategory.TAIWAN_RONGHUA,
  };

  return {
    id: admin.id,
    name: admin.name,
    nameEn: admin.nameEn,
    category: categoryMap[admin.category] || ProductCategory.STEEL_PLATE_PROCESSING,
    description: admin.description,
    descriptionEn: admin.descriptionEn,
    features: admin.features.filter(Boolean),
    featuresEn: admin.featuresEn.filter(Boolean),
    image: admin.image || undefined,
    icon: categoryMap[admin.category] === ProductCategory.TAIWAN_RONGHUA ? 'parts'
      : categoryMap[admin.category] === ProductCategory.AUXILIARY_EQUIPMENT ? 'auxiliary'
      : categoryMap[admin.category] === ProductCategory.CONVEYOR_SYSTEMS ? 'conveyor'
      : 'cutting',
    priceRange: admin.price || '面议',
    availability: 'in-stock',
  };
}

// 尝试加载后台管理数据
let overrideProducts: Product[] | null = null;
try {
  // prebuild 会在 Netlify 构建时生成这个文件
  const overrideData = require('./products-override.json') as AdminProduct[];
  if (Array.isArray(overrideData) && overrideData.length > 0) {
    overrideProducts = overrideData
      .filter(p => p.isActive !== false)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map(convertAdminProduct);
  }
} catch {
  // 文件不存在（本地开发或首次部署），使用默认数据
}

export const products: Product[] = overrideProducts || defaultProducts;

export { productCategories, keyPartners, targetCustomers };
export type { Product, ProductSpecs } from './products-database';

export const getFeaturedProducts = () => {
  if (overrideProducts) {
    return overrideProducts.slice(0, 6);
  }
  return defaultGetFeaturedProducts();
};

export const getProductsByCategory = (category: ProductCategory) => {
  return products.filter(p => p.category === category);
};

export const getProductStats = () => {
  return {
    total: products.length,
    categories: productCategories.length,
    partners: keyPartners.length,
    customers: targetCustomers.reduce((total, group) => total + group.customers.length, 0),
  };
};
