import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SectionType, ContentBlock } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const contentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    headline: { type: Type.STRING, description: "The main H1 or section headline" },
    subheadline: { type: Type.STRING, description: "The descriptive paragraph or H2" },
    points: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "A list of 3-4 bullet points or key benefits" 
    },
    ctaPrimary: { type: Type.STRING, description: "Text for the primary call to action button" },
    ctaSecondary: { type: Type.STRING, description: "Text for the secondary call to action button (optional)" },
  },
  required: ["headline", "subheadline"],
};

export const generateSectionContent = async (
  section: SectionType, 
  prompt: string
): Promise<ContentBlock> => {
  try {
    const modelId = 'gemini-2.5-flash'; 
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: contentSchema,
        systemInstruction: "You are an expert copywriter for a high-end infill home builder. Write persuasive, SEO-optimized content.",
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned from Gemini");
    
    return JSON.parse(text) as ContentBlock;
  } catch (error) {
    console.error(`Error generating content for ${section}:`, error);
    throw error;
  }
};

export const createChatSession = () => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the Greenstreet Builders AI Assistant. 
      Your goal is to assist two types of users:
      1. Home Buyers: Looking for new construction homes in established neighborhoods. Emphasize quality, speed, and standard designs.
      2. Lot Sellers: Owners of vacant lots. Emphasize fast cash offers, no commissions, and buying "as-is".
      
      Be professional, concise, and helpful. If a user wants to sell, ask for the lot address and approximate size. If a user wants to buy, ask for their preferred neighborhood and budget range.
      Do not make up specific listing data, but speak generally about the "Greenstreet Inventory".`
    }
  });
};
