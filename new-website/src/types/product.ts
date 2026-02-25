export enum ProductCategory {
  STEEL_PLATE_PROCESSING = 'steel-plate-processing',
  CONVEYOR_SYSTEMS = 'conveyor-systems',
  TAIWAN_RONGHUA = 'taiwan-ronghua',
  AUXILIARY_EQUIPMENT = 'auxiliary-equipment'
}

export interface ProductSpecs {
  thickness?: string;
  speed?: string;
  precision?: string;
  power?: string;
  workingArea?: string;
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
}

export interface ProductFilter {
  category?: ProductCategory;
  priceRange?: string;
  availability?: string;
  searchQuery?: string;
}