
export interface Lineage {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  stats: {
    influence: number;
    potency: number;
    survival: number;
  };
}

export interface Fraternity {
  id: string;
  name: string;
  example: string;
  facade: string;
  imageUrl: string;
}

export interface VipPlan {
  id: string;
  name: string;
  price: string;
  icon: string;
  isPopular?: boolean;
  benefits: string[];
}

// Added missing VipBenefit interface
export interface VipBenefit {
  name: string;
  basic: string | boolean;
  pro: string | boolean;
  legend: string | boolean;
}

export interface UpdateEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'Lore' | 'System' | 'University' | 'Genetic' | 'Server';
  author: string;
}

export type Permission = 'ADMIN' | 'EDITOR';

export interface User {
  id: string;
  username: string;
  password?: string;
  role: Permission;
}

export interface SiteContent {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  bloodMoonDate: string;
  
  // Lore
  loreTitle: string;
  loreText: string;
  loreImageUrl: string;
  
  // Lists (Stored as JSON strings in DB)
  lineages: string; 
  fraternities: string;
  vipPlans: string;

  // Systems
  systemsLawTitle: string;
  systemsLawText: string;
  systemsLawImageUrl: string;
  systemsChaosTitle: string;
  systemsChaosText: string;
  systemsChaosImageUrl: string;
  
  // Confidential
  confidentialTitle: string;
  confidentialText: string;
  
  webhookUrl?: string;
  [key: string]: string | undefined;
}
