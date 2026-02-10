
import { SiteContent, Lineage, Fraternity, VipPlan } from "../types";
import { supabase } from "../supabaseClient";

const initialLineages: Lineage[] = [
  { id: '1', name: 'Bruxas', description: 'O equilíbrio entre o rito e a razão. Ocultistas que moldam a realidade através de grimórios.', icon: 'Sparkles', color: '#9333ea', imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e', stats: { influence: 85, potency: 92, survival: 70 } },
  { id: '2', name: 'Lobos', description: 'Instinto, lealdade e força. O time da universidade esconde uma matilha feroz.', icon: 'Moon', color: '#d97706', imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e', stats: { influence: 60, potency: 95, survival: 88 } },
  { id: '3', name: 'Vampiros', description: 'Elegância eterna. A elite financeira da cidade que governa a noite de Pandora.', icon: 'Zap', color: '#dc2626', imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e', stats: { influence: 98, potency: 85, survival: 90 } },
  { id: '4', name: 'Anjos & Demônios', description: 'Os guardiões e os piores pesadelos. As forças que puxam os fios do destino.', icon: 'ShieldCheck', color: '#2563eb', imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e', stats: { influence: 90, potency: 99, survival: 50 } }
];

const initialFraternities: Fraternity[] = [
  { id: '1', name: 'Anjos', example: 'Alpha Omega', facade: 'Estudantes de Honra / Teologia', imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08759df9a73' },
  { id: '2', name: 'Demônios', example: 'The Serpent House', facade: 'Organizadores das festas "Project X"', imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a' },
  { id: '3', name: 'Vampiros', example: 'Sangue Nobre', facade: 'Herdeiros de famílias ricas / Artes', imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf' }
];

const initialVipPlans: VipPlan[] = [
  { id: '1', name: 'PANDORA INITIATE', price: '29,90', icon: 'Star', benefits: ['+15% Salary Bonus', '5 Garage Slots', 'Initiate Discord Tag'] },
  { id: '2', name: 'ELITE ENFORCER', price: '59,90', icon: 'ShieldCheck', isPopular: true, benefits: ['+30% Salary Bonus', '15 Garage Slots', 'Basic Lore Items Pack', 'Priority Queue (Level 2)'] },
  { id: '3', name: 'SOVEREIGN LEGEND', price: '99,90', icon: 'Crown', benefits: ['+50% Salary Bonus', 'Unlimited Garage Slots', 'Custom Lore Items & Weapons', 'Instant Server Access'] }
];

export const DEFAULT_CONTENT: SiteContent = {
  // Identity
  navName: "PANDORA CITY",
  logoUrl: "", // Empty means show the default diamond "P" icon

  // Home
  heroTitle: "PANDORA",
  heroTitleSuffix: "CITY",
  heroSubtitle: "Onde o conhecimento encontra o desconhecido. Você está pronto para o seu despertar?",
  heroImageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=2000",
  bloodMoonDate: new Date(Date.now() + 345600000).toISOString(),
  loreTitle: "BEM-VINDO AO CAMPUS",
  loreText: "Pandora não é uma cidade comum. É um campo de batalha espiritual disfarçado de universidade de elite.",
  loreImageUrl: "https://images.unsplash.com/photo-1541339907198-e08759df9a73?auto=format&fit=crop&q=80&w=1200",
  
  // Lore Page
  lorePageHeaderTitle: "THE PANDORA CHRONICLES",
  lorePageHeaderSubtitle: "Historical Archive #000 - Restricted",
  lorePageHeaderImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000",
  lorePageTimeline1Title: "1892: O Despertar",
  lorePageTimeline1Text: "A cidade foi erguida sobre um ponto de convergência abissal. Silas Thorne desapareceu misteriosamente.",
  lorePageTimeline2Title: "A Fenda do Nevoeiro",
  lorePageTimeline2Text: "Onde o mundo físico encontra o plano etéreo. Relatos de sombras que caminham são comuns.",
  lorePageTimelineImage: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200",
  lorePageSecretTitle: "O Segredo das Sete Chaves",
  lorePageSecretText: "Para cada segredo revelado, dois se escondem sob as lajes da universidade.",

  // Classes Page
  classesPageTitle: "GENETIC MATRIX",
  classesPageSubtitle: "Accessing phenotypic data for known lineages in the Pandora sector.",

  // University Page
  uniPageTitle: "PANDORA UNIVERSITY",
  uniPageSubtitle: "Fundada em 1892, a nossa instituição não é apenas um monumento ao conhecimento.",
  uniFacility1Title: "A Biblioteca das Almas",
  uniFacility1Text: "Contendo o maior acervo de grimórios e textos proibidos.",
  uniFacility1Image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200",
  uniFacility2Title: "Laboratórios de Biogenética",
  uniFacility2Text: "Onde a ciência encontra o sobrenatural.",
  uniFacility2Image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200",
  uniFacility3Title: "Dormitórios das Fraternidades",
  uniFacility3Text: "Alpha Wolf e Sigma Fang não são apenas casas estudantis.",
  uniFacility3Image: "https://images.unsplash.com/photo-1555854817-5b2260d1bd63?auto=format&fit=crop&q=80&w=1200",
  uniFacility4Title: "O Bunker do D.I.P",
  uniFacility4Text: "A Polícia de Investigação de Pandora opera diretamente das entranhas.",
  uniFacility4Image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
  uniUnderTitle: "O CAMPUS SUBTERRÂNEO",
  uniUnderText: "Os verdadeiros centros de poder estão nos quatro níveis abaixo do solo.",
  uniUnderImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
  uniLevel1Label: "Nível 1", uniLevel1Desc: "Administração de Elite",
  uniLevel2Label: "Nível 2", uniLevel2Desc: "Laboratórios Genéticos",
  uniLevel3Label: "Nível 3", uniLevel3Desc: "Câmaras de Iniciação",
  uniLevel4Label: "Nível 4", uniLevel4Desc: "[PROTOCOLO ÔMEGA ATIVO]",

  lineages: JSON.stringify(initialLineages),
  fraternities: JSON.stringify(initialFraternities),
  vipPlans: JSON.stringify(initialVipPlans),
  systemsLawTitle: "A LEI",
  systemsLawText: "Investigue, prenda, proteja. O D.I.P está de olho em cada alma de Pandora.",
  systemsLawImageUrl: "https://images.unsplash.com/photo-1621682372775-53744487491b?auto=format&fit=crop&q=80&w=1200",
  systemsChaosTitle: "O CAOS",
  systemsChaosText: "A noite é curta, a vida é rápida. O asfalto não perdoa os fracos.",
  systemsChaosImageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
  confidentialTitle: "ARQUIVOS CONFIDENCIAIS",
  confidentialText: "[CONTEÚDO REMOVIDO PELA STAFF]. Estes documentos detalham incidentes que a Universidade prefere esquecer.",
  webhookUrl: ""
};

export const cmsService = {
  async getContent(): Promise<SiteContent> {
    try {
      const { data, error } = await supabase.from('site_content').select('*');
      if (error) return DEFAULT_CONTENT;
      if (!data || data.length === 0) return DEFAULT_CONTENT;
      const content = data.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
      return { ...DEFAULT_CONTENT, ...content };
    } catch (e) {
      return DEFAULT_CONTENT;
    }
  },

  async saveContent(content: SiteContent) {
    try {
      const updates = Object.entries(content)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => ({ key, value: value?.toString() || "" }));
      const { error } = await supabase.from('site_content').upsert(updates, { onConflict: 'key' });
      if (error) return false;
      window.dispatchEvent(new Event('cms-update'));
      return true;
    } catch (e) {
      return false;
    }
  },

  async updateKey(key: string, value: string) {
    try {
      const { error } = await supabase.from('site_content').upsert({ key, value }, { onConflict: 'key' });
      if (error) return false;
      window.dispatchEvent(new Event('cms-update'));
      return true;
    } catch (e) {
      return false;
    }
  }
};
