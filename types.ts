
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
