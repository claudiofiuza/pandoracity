
import { SiteContent } from "../types";

const DEFAULT_CONTENT: SiteContent = {
  // Hero
  heroTitle: "PANDORA",
  heroSubtitle: "Onde o conhecimento encontra o desconhecido. Você está pronto para o seu despertar?",
  heroImageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=2000",
  bloodMoonDate: new Date(Date.now() + 345600000).toISOString(), // 4 days from now
  
  // Lore
  loreTitle: "BEM-VINDO AO CAMPUS",
  loreText: "Pandora não é uma cidade comum. É um campo de batalha espiritual disfarçado de universidade de elite. Aqui, os exames finais são resolvidos em becos escuros ou em corridas de alta octanagem.",
  loreImageUrl: "https://images.unsplash.com/photo-1541339907198-e08759df9a73?auto=format&fit=crop&q=80&w=1200",
  
  // Systems
  systemsLawTitle: "A LEI",
  systemsLawText: "Investigue, prenda, proteja. O D.I.P está de olho em cada alma de Pandora.",
  systemsLawImageUrl: "https://images.unsplash.com/photo-1621682372775-53744487491b?auto=format&fit=crop&q=80&w=1200",
  systemsChaosTitle: "O CAOS",
  systemsChaosText: "A noite é curta, a vida é rápida. O asfalto não perdoa os fracos.",
  systemsChaosImageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
  
  // Confidential
  confidentialTitle: "ARQUIVOS CONFIDENCIAIS",
  confidentialText: "[CONTEÚDO REMOVIDO PELA STAFF]. Estes documentos não deveriam existir. Eles detalham incidentes que a Universidade prefere esquecer. Ocultismo nas fraternidades, sacrifícios nas pistas de corrida... a verdade é mais estranha que a ficção.",
  
  webhookUrl: ""
};

export const cmsService = {
  getContent(): SiteContent {
    const saved = localStorage.getItem('pandora_cms_content');
    const content = saved ? JSON.parse(saved) : DEFAULT_CONTENT;
    return { ...DEFAULT_CONTENT, ...content };
  },

  saveContent(content: SiteContent) {
    localStorage.setItem('pandora_cms_content', JSON.stringify(content));
    window.dispatchEvent(new Event('cms-update'));
  },

  updateKey(key: string, value: string) {
    const current = this.getContent();
    current[key] = value;
    this.saveContent(current);
  },

  getWebhookUrl(): string {
    return this.getContent().webhookUrl || "";
  }
};
