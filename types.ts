
export interface UserInput {
  productIdea: string;
  targetAudience: string;
  brandPersonality: string;
}

export interface BrandKit {
  brandName: string;
  slogan: string;
  colorPalette: {
    name: string;
    hex: string;
  }[];
}

export interface ContentPillar {
  title: string;
  description: string;
}

export interface ContentStrategy {
  pillars: ContentPillar[];
  schedule: Record<string, string>;
}

export interface SampleContent {
  pillar: string;
  content: string;
}

export enum GenerationStep {
  IDLE,
  BRAND_KIT,
  LOGOS_AND_STRATEGY,
  CONTENT,
  DONE,
}
