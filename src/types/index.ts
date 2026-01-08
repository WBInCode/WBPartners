// Types for WB Partners

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  chips: string[];
  accentColor?: string;
  ctaPrimary?: {
    label: string;
    href: string;
    isScroll?: boolean;
  };
  ctaSecondary?: {
    label: string;
    href: string;
    isScroll?: boolean;
  };
}

export interface NavLink {
  label: string;
  href: string;
  sectionId: string;
  accentColor?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ChipVariant = 'primary' | 'accent' | 'muted';
export type ChipSize = 'sm' | 'md';
