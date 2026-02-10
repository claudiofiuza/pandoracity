
import React from 'react';
import { Lineage, VipBenefit } from './types';
import { Sparkles, Moon, Zap, ShieldCheck } from 'lucide-react';

export const LINEAGES: Lineage[] = [
  {
    id: 'witches',
    name: 'Bruxas',
    description: 'O equilíbrio entre o rito e a razão. Ocultistas que moldam a realidade através de grimórios.',
    icon: 'Sparkles',
    color: '#9333ea',
    // Added missing stats property
    stats: {
      influence: 85,
      potency: 92,
      survival: 70
    }
  },
  {
    id: 'wolves',
    name: 'Lobos',
    description: 'Instinto, lealdade e força. O time da universidade esconde uma matilha feroz.',
    icon: 'Moon',
    color: '#d97706',
    // Added missing stats property
    stats: {
      influence: 60,
      potency: 95,
      survival: 88
    }
  },
  {
    id: 'vampires',
    name: 'Vampiros',
    description: 'Elegância eterna. A elite financeira da cidade que governa a noite de Pandora.',
    icon: 'Zap',
    color: '#dc2626',
    // Added missing stats property
    stats: {
      influence: 98,
      potency: 85,
      survival: 90
    }
  },
  {
    id: 'angels',
    name: 'Anjos & Demônios',
    description: 'Os guardiões e os piores pesadelos. As forças que puxam os fios do destino.',
    icon: 'ShieldCheck',
    color: '#2563eb',
    // Added missing stats property
    stats: {
      influence: 90,
      potency: 99,
      survival: 50
    }
  }
];

export const VIP_BENEFITS: VipBenefit[] = [
  { name: 'Salário Base Extra', basic: '+15%', pro: '+30%', legend: '+50%' },
  { name: 'Vagas de Garagem', basic: '5', pro: '15', legend: 'Ilimitado' },
  { name: 'Itens de Lore', basic: false, pro: 'Básico', legend: 'Customizado' },
  { name: 'Prioridade na Fila', basic: 'Baixa', pro: 'Média', legend: 'Instantânea' },
  { name: 'Tag Exclusiva Discord', basic: true, pro: true, legend: true }
];
