/**
 * 服务数据入口
 * 优先使用后台管理的数据（services-override.json），fallback 到硬编码默认值
 */
import type { TechnicalService } from './services-database';
import {
  technicalServices as defaultServices,
  serviceAdvantages,
  serviceCommitments,
  serviceProcess,
  technicalCapabilities,
  getServiceStats as defaultGetServiceStats,
} from './services-database';

// 后台管理的服务数据模型
interface AdminService {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  isActive: boolean;
  sortOrder: number;
}

function convertAdminService(admin: AdminService): TechnicalService {
  return {
    id: admin.id,
    name: admin.name,
    nameEn: admin.nameEn,
    description: admin.description,
    descriptionEn: admin.descriptionEn,
    features: admin.features?.filter(Boolean),
    featuresEn: admin.featuresEn?.filter(Boolean),
  };
}

let overrideServices: TechnicalService[] | null = null;
try {
  const overrideData = require('./services-override.json') as AdminService[];
  if (Array.isArray(overrideData) && overrideData.length > 0) {
    overrideServices = overrideData
      .filter(s => s.isActive !== false)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map(convertAdminService);
  }
} catch {
  // 文件不存在，使用默认数据
}

export const technicalServices: TechnicalService[] = overrideServices || defaultServices;

export { serviceAdvantages, serviceCommitments, serviceProcess, technicalCapabilities };
export type { TechnicalService } from './services-database';

export const getServiceStats = () => {
  return {
    total: technicalServices.length,
    advantages: serviceAdvantages.length,
    processes: serviceProcess.length,
    capabilities: technicalCapabilities.reduce((total, cat) => total + cat.capabilities.length, 0),
  };
};
