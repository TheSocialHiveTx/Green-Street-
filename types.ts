export enum SectionType {
  HERO = 'HERO',
  VALUE_PROPS = 'VALUE_PROPS',
  BUYER = 'BUYER',
  SELLER = 'SELLER'
}

export interface ContentBlock {
  headline: string;
  subheadline: string;
  points?: string[];
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export interface SiteContent {
  [SectionType.HERO]: ContentBlock;
  [SectionType.VALUE_PROPS]: ContentBlock;
  [SectionType.BUYER]: ContentBlock;
  [SectionType.SELLER]: ContentBlock;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}