
import { SiteContent } from "../types";
import { supabase } from "../supabaseClient";

export const DEFAULT_CONTENT: SiteContent = {
  heroTitle: "PANDORA",
  heroSubtitle: "Onde o conhecimento encontra o desconhecido. Você está pronto para o seu despertar?",
  heroImageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=2000",
  bloodMoonDate: new Date(Date.now() + 345600000).toISOString(),
  loreTitle: "BEM-VINDO AO CAMPUS",
  loreText: "Pandora não é uma cidade comum. É um campo de batalha espiritual disfarçado de universidade de elite.",
  loreImageUrl: "https://images.unsplash.com/photo-1541339907198-e08759df9a73?auto=format&fit=crop&q=80&w=1200",
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
      if (error) {
        console.error("Erro ao buscar site_content:", error.message, error.details);
        return DEFAULT_CONTENT;
      }
      
      if (!data || data.length === 0) return DEFAULT_CONTENT;
      
      const content = data.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
      
      return { ...DEFAULT_CONTENT, ...content };
    } catch (e) {
      console.error("Falha crítica no CMS (Get):", e);
      return DEFAULT_CONTENT;
    }
  },

  async saveContent(content: SiteContent) {
    try {
      const updates = Object.entries(content)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => ({
          key,
          value: value?.toString() || ""
        }));

      const { error } = await supabase.from('site_content').upsert(updates, { onConflict: 'key' });
      
      if (error) {
        console.error("Erro ao salvar no Supabase (Upsert):", error.message, error.details);
        alert(`Erro ao salvar: ${error.message}. Verifique o console para detalhes.`);
        return false;
      }

      window.dispatchEvent(new Event('cms-update'));
      return true;
    } catch (e) {
      console.error("Falha crítica no CMS (Save):", e);
      return false;
    }
  },

  async updateKey(key: string, value: string) {
    try {
      const { error } = await supabase.from('site_content').upsert({ key, value }, { onConflict: 'key' });
      if (error) {
        console.error(`Erro ao atualizar chave ${key}:`, error.message);
        return false;
      }
      window.dispatchEvent(new Event('cms-update'));
      return true;
    } catch (e) {
      console.error(`Falha crítica ao atualizar ${key}:`, e);
      return false;
    }
  }
};
