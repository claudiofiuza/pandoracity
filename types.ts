
export interface Lineage {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface VipBenefit {
  name: string;
  basic: string | boolean;
  pro: string | boolean;
  legend: string | boolean;
}

export enum LineageType {
  WITCH = 'Bruxas',
  WOLF = 'Lobos',
  VAMPIRE = 'Vampiros',
  ANGEL_DEMON = 'Anjos & Demônios'
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
  bloodMoonDate: string; // ISO String for countdown
  
  // Lore
  loreTitle: string;
  loreText: string;
  loreImageUrl: string;
  
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
