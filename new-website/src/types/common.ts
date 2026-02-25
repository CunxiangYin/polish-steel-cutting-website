export interface Company {
  name: string;
  nameEn: string;
  logo: string;
  description: string;
  founded: string;
  slogan?: string;
  coreValues?: string;
  targetCustomers?: string[];
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  contact: {
    phone: string;
    fax?: string;
    mobile: string;
    email: string;
    website?: string;
    manager: string;
  };
  services: string[];
  certifications: string[];
}

export interface NavigationItem {
  title: string;
  href: string;
  children?: NavigationItem[];
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}