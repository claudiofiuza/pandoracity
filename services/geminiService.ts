
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askLoreKeeper(question: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Você é o "Guardião da Lore" da Pandora City, uma cidade universitária com mistérios sobrenaturais fundada em 1892. 
        Seu tom de voz é misterioso, acadêmico e levemente intimidador. 
        Você conhece os segredos das Bruxas, Lobos, Vampiros e Anjos/Demônios. 
        Mantenha as respostas curtas (máximo 3 frases) e envolventes. 
        Nunca saia do personagem. Se perguntarem algo fora da lore, diga que as sombras não permitem que tal conhecimento seja revelado ainda.`,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error asking Lore Keeper:", error);
    return "As sombras estão inquietas... Tente novamente em breve.";
  }
}

export async function generateNanoImage(prompt: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Cinematic GTA RP style, dark and atmospheric, supernatural elements, high contrast, neon accents: ${prompt}` }],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
