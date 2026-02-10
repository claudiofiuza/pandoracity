
import { UpdateEntry } from "../types";
import { cmsService } from "./cmsService";

export async function sendUpdateToDiscord(update: UpdateEntry) {
  // Fixed: Use getContent() asynchronously and access webhookUrl property instead of calling non-existent getWebhookUrl()
  const content = await cmsService.getContent();
  const webhookUrl = content.webhookUrl;
  
  if (!webhookUrl) {
    console.warn("Discord Webhook URL não configurada no Painel Administrativo.");
    return false;
  }

  const colors = {
    Lore: 0xD4AF37,      // Antique Gold
    System: 0xDC2626,    // Red
    University: 0x9333EA, // Purple
    Genetic: 0x2563EB,   // Blue
    Server: 0x10B981     // Green
  };

  const embed = {
    title: `📢 NOVA ATUALIZAÇÃO: ${update.title}`,
    description: update.description,
    color: (colors as any)[update.category] || 0x000000,
    fields: [
      { name: "📁 Categoria", value: update.category, inline: true },
      { name: "✍️ Autor", value: update.author, inline: true },
      { name: "📅 Data", value: update.date, inline: true }
    ],
    footer: {
      text: "Pandora City Intelligence System • Official Records"
    },
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });
    return response.ok;
  } catch (error) {
    console.error("Erro ao enviar para o Discord:", error);
    return false;
  }
}
