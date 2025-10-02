
import { GoogleGenAI, Type } from "@google/genai";
import type { UserInput, BrandKit, ContentStrategy } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const brandKitSchema = {
  type: Type.OBJECT,
  properties: {
    brandName: {
      type: Type.STRING,
      description: "A unique and catchy brand name. Should be 2-3 words.",
    },
    slogan: {
      type: Type.STRING,
      description: "A short, memorable slogan for the brand.",
    },
    colorPalette: {
      type: Type.ARRAY,
      description: "An array of 5 color objects that match the brand personality.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "e.g., 'Primary Teal', 'Accent Gold'" },
          hex: { type: Type.STRING, description: "The hex code, e.g., '#RRGGBB'" },
        },
        required: ["name", "hex"],
      },
    },
  },
  required: ["brandName", "slogan", "colorPalette"],
};

const contentStrategySchema = {
    type: Type.OBJECT,
    properties: {
        pillars: {
            type: Type.ARRAY,
            description: "An array of 3-4 content pillar objects.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the content pillar." },
                    description: { type: Type.STRING, description: "A brief description of this content pillar." },
                },
                required: ["title", "description"],
            },
        },
        schedule: {
            type: Type.OBJECT,
            description: "A sample weekly posting schedule.",
            properties: {
                Monday: { type: Type.STRING },
                Tuesday: { type: Type.STRING },
                Wednesday: { type: Type.STRING },
                Thursday: { type: Type.STRING },
                Friday: { type: Type.STRING },
                Saturday: { type: Type.STRING },
                Sunday: { type: Type.STRING },
            },
        },
    },
    required: ["pillars", "schedule"],
};

export const generateBrandKit = async (input: UserInput): Promise<BrandKit> => {
    const prompt = `
        Based on the following information, generate a complete brand kit.
        Product Idea: "${input.productIdea}"
        Target Audience: "${input.targetAudience}"
        Brand Personality: "${input.brandPersonality}"

        Generate a unique brand name, a catchy slogan, and a matching color palette with 5 colors.
        The color palette should include descriptive names for each color.
    `;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: brandKitSchema,
        },
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as BrandKit;
    } catch (error) {
        console.error("Failed to parse BrandKit JSON:", response.text);
        throw new Error("Could not generate a valid brand kit. Please try again.");
    }
};

export const generateLogoConcepts = async (brandKit: BrandKit): Promise<string[]> => {
    const colorString = brandKit.colorPalette.map(c => c.name).join(', ');
    const prompt = `
      Generate 4 logo concepts for a brand named "${brandKit.brandName}".
      The brand's slogan is "${brandKit.slogan}".
      The aesthetic should be minimalist, modern, and clean.
      The logo should be suitable for a tech-savvy audience.
      Use the brand's color palette: ${colorString}.
      Provide the logos on a simple, flat background, NOT as mockups on products.
    `;
    
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 4,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
    });
    
    return response.generatedImages.map(img => `data:image/png;base64,${img.image.imageBytes}`);
};


export const generateContentStrategy = async (input: UserInput, brandName: string): Promise<ContentStrategy> => {
    const prompt = `
        Develop a content strategy for the brand "${brandName}".
        Product Idea: "${input.productIdea}"
        Target Audience: "${input.targetAudience}"
        Brand Personality: "${input.brandPersonality}"

        Suggest 3-4 content pillars and a sample weekly posting schedule for social media.
    `;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: contentStrategySchema,
        },
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as ContentStrategy;
    } catch (error) {
        console.error("Failed to parse ContentStrategy JSON:", response.text);
        throw new Error("Could not generate a valid content strategy. Please try again.");
    }
};

export const generateSampleContent = async (pillarTitle: string, brandName: string, input: UserInput): Promise<string> => {
    const prompt = `
      You are the social media manager for "${brandName}".
      The brand personality is ${input.brandPersonality}.
      The product is: ${input.productIdea}.
      The target audience is: ${input.targetAudience}.

      Write a sample Instagram post caption that fits the content pillar: "${pillarTitle}".
      The caption should be engaging, include relevant hashtags, have a clear call to action, and be formatted with appropriate line breaks for readability.
      Ensure the output is ready to be copied and pasted directly into Instagram.
    `;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    
    return response.text;
};