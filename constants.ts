import { SiteContent, SectionType } from './types';

export const INITIAL_CONTENT: SiteContent = {
  [SectionType.HERO]: {
    headline: "New Homes: Your Infill Building Partner",
    subheadline: "We specialize in building high-quality, production homes on vacant lots.",
    ctaPrimary: "Find Your New Home Now",
    ctaSecondary: "Sell Your Vacant Lot for Cash"
  },
  [SectionType.VALUE_PROPS]: {
    headline: "The Greenstreet Difference",
    subheadline: "Why homeowners and land sellers trust us.",
    points: [
      "Quality Controlled Construction: Rigorous standards for every build.",
      "Predictable Pricing: No hidden costs, just exceptional value."
    ]
  },
  [SectionType.BUYER]: {
    headline: "New Construction, No Compromise: Move-In Ready Homes",
    subheadline: "Skip the design headaches and construction delays. Our production model delivers optimized floor plans and premium finishes at an unbeatable value.",
    points: [
      "Predictable Costs & Timeline: Move in on time and on budget.",
      "Proven Floor Plans: Designs tested for modern living.",
      "Efficiency & Value: Bulk buying power passed directly to you."
    ],
    ctaPrimary: "See Current Available Homes & Floor Plans"
  },
  [SectionType.SELLER]: {
    headline: "We Buy Vacant Lots for Cash: Get an Offer in 48 Hours",
    subheadline: "Turn your unused land into liquid assets. We offer a streamlined, commission-free process for lot owners.",
    points: [
      "Direct Cash Offer: Competitive pricing based on market value.",
      "We Buy As-Is: No clearing, grading, or repairs needed.",
      "Fast Closing: No agent commissions, no waiting."
    ],
    ctaPrimary: "Get Your Cash Offer Today"
  }
};

export const SECTION_PROMPTS = {
  [SectionType.HERO]: `Generate persuasive web copy for a Home Builder's homepage hero section. 
  Focus on "New Homes in Established Neighborhoods". 
  Audience: Both Home Buyers and Lot Sellers. 
  Tone: Authoritative, Professional.
  Required: An impactful Headline, a 2-3 sentence Subheadline, and text for two buttons (Buyer CTA and Seller CTA).`,

  [SectionType.VALUE_PROPS]: `Generate copy for "The Greenstreet Difference" value proposition section.
  Focus on "Standardization, Quality, Predictability".
  Required: A Headline, Subheadline, and 3 short, punchy bullet points highlighting benefits like Quality Control and Prime Locations.`,

  [SectionType.BUYER]: `Generate web copy for the "Home Buyer" product section.
  Focus on "Move-In Ready Production Homes".
  Tone: Exciting, Reassuring.
  Required: Headline focusing on "No Compromise", Subheadline explaining benefits of non-custom builds, and 3 bullet points (Predictable Costs, Proven Plans, Efficiency). Includes a CTA button text.`,

  [SectionType.SELLER]: `Generate web copy for the "Lot Acquisition" section.
  Focus on "We Buy Vacant Lots for Cash".
  Tone: Direct, Urgent, Simple.
  Required: Direct Headline, Subheadline assuring speed/simplicity, and 3 value points (Cash Offer, As-Is, Fast Close). Includes a CTA button text.`
};
