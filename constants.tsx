
import React from 'react';
import { Lineage, VipBenefit } from './types';
import { Sparkles, Moon, Zap, ShieldCheck } from 'lucide-react';

export const LINEAGES: Lineage[] = [
  {
    id: 'witches',
    name: 'Bruxas',
    description: 'O equilíbrio entre o rito e a razão. Ocultistas que moldam a realidade através de grimórios.',
    icon: 'Sparkles',
    color: '#9333ea'
  },
  {
    id: 'wolves',
    name: 'Lobos',
    description: 'Instinto, lealdade e força. O time da universidade esconde uma matilha feroz.',
    icon: 'Moon',
    color: '#d97706'
  },
  {
    id: 'vampires',
    name: 'Vampiros',
    description: 'Elegância eterna. A elite financeira da cidade que governa a noite de Pandora.',
    icon: 'Zap',
    color: '#dc2626'
  },
  {
    id: 'angels',
    name: 'Anjos & Demônios',
    description: 'Os guardiões e os piores pesadelos. As forças que puxam os fios do destino.',
    icon: 'ShieldCheck',
    color: '#2563eb'
  }
];

export const VIP_BENEFITS: VipBenefit[] = [
  { name: 'Salário Base Extra', basic: '+15%', pro: '+30%', legend: '+50%' },
  { name: 'Vagas de Garagem', basic: '5', pro: '15', legend: 'Ilimitado' },
  { name: 'Itens de Lore', basic: false, pro: 'Básico', legend: 'Customizado' },
  { name: 'Prioridade na Fila', basic: 'Baixa', pro: 'Média', legend: 'Instantânea' },
  { name: 'Tag Exclusiva Discord', basic: true, pro: true, legend: true }
];
