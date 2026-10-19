export type Language = 'ar' | 'en';

export interface ServiceItem {
  id: string;
  number: string;
  title: {
    ar: string;
    en: string;
  };
  shortDesc: {
    ar: string;
    en: string;
  };
  fullDesc: {
    ar: string;
    en: string;
  };
  deliverables: {
    ar: string[];
    en: string[];
  };
  techStack: string[];
  timeline: {
    ar: string;
    en: string;
  };
  iconName: string;
  badge?: {
    ar: string;
    en: string;
  };
}

export interface CaseStudy {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  client: string;
  category: 'web' | 'ecommerce' | 'automation';
  categoryLabel: {
    ar: string;
    en: string;
  };
  summary: {
    ar: string;
    en: string;
  };
  impactMetric: {
    value: string;
    label: {
      ar: string;
      en: string;
    };
  };
  secondaryMetric: {
    value: string;
    label: {
      ar: string;
      en: string;
    };
  };
  imagePath: string;
  tags: string[];
  deliverables: {
    ar: string[];
    en: string[];
  };
  challenge: {
    ar: string;
    en: string;
  };
  solution: {
    ar: string;
    en: string;
  };
}

export interface Testimonial {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  role: {
    ar: string;
    en: string;
  };
  company: string;
  quote: {
    ar: string;
    en: string;
  };
  metricResult: string;
}

export interface FAQItem {
  id: string;
  question: {
    ar: string;
    en: string;
  };
  answer: {
    ar: string;
    en: string;
  };
}
