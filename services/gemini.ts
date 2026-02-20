
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBrandVision = async (niche: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a luxury, bold, cinematic creative vision brief for a studio project. The niche is: ${niche}. 
      Focus on aesthetic concepts, neural branding strategies, and emotional impact.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "The project code name" },
            tagline: { type: Type.STRING, description: "Punchy luxury tagline" },
            strategy: { type: Type.STRING, description: "2-sentence AI-driven strategy" },
            aesthetic: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 visual keywords" }
          },
          required: ["title", "tagline", "strategy", "aesthetic"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
