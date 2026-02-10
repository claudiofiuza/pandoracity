
export interface Lineage {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  imageUrl?: string; 
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
  // Navigation & Identity
  navName: string;
  logoUrl: string;

  // Hero
  heroTitle: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  heroImageUrl: string;
  bloodMoonDate: string;
  
  // Lore Section (Home)
  loreTitle: string;
  loreText: string;
  loreImageUrl: string;
  
  // Lore Page (Internal)
  lorePageHeaderTitle: string;
  lorePageHeaderSubtitle: string;
  lorePageHeaderImage: string;
  lorePageTimeline1Title: string;
  lorePageTimeline1Text: string;
  lorePageTimeline2Title: string;
  lorePageTimeline2Text: string;
  lorePageTimelineImage: string;
  lorePageSecretTitle: string;
  lorePageSecretText: string;

  // Classes Page (Internal)
  classesPageTitle: string;
  classesPageSubtitle: string;

  // University Page (Internal)
  uniPageTitle: string;
  uniPageSubtitle: string;
  uniFacility1Title: string;
  uniFacility1Text: string;
  uniFacility1Image: string;
  uniFacility2Title: string;
  uniFacility2Text: string;
  uniFacility2Image: string;
  uniFacility3Title: string;
  uniFacility3Text: string;
  uniFacility3Image: string;
  uniFacility4Title: string;
  uniFacility4Text: string;
  uniFacility4Image: string;
  uniUnderTitle: string;
  uniUnderText: string;
  uniUnderImage: string;
  uniLevel1Label: string;
  uniLevel1Desc: string;
  uniLevel2Label: string;
  uniLevel2Desc: string;
  uniLevel3Label: string;
  uniLevel3Desc: string;
  uniLevel4Label: string;
  uniLevel4Desc: string;
  
  // Lists
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
