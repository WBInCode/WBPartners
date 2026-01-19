// Content constants for WB Partners
import type { Section, NavLink } from '../types';

export const SECTIONS: Section[] = [
  {
    id: 'intro',
    title: 'WB Partners',
    subtitle: 'Budujemy marki i projekty, które rosną.',
    description:
      'Tworzymy innowacyjne rozwiązania w obszarze software, e-commerce, usług oraz inicjatyw społecznych. Każdy projekt to połączenie strategii, technologii i designu.',
    chips: ['Software', 'E-commerce', 'Usługi', 'Inicjatywy'],
    ctaPrimary: {
      label: 'Poznaj projekty',
      href: '#wb-trade',
      isScroll: true,
    },
    ctaSecondary: {
      label: 'Kontakt',
      href: '#kontakt',
      isScroll: true,
    },
  },
  {
    id: 'wb-trade',
    title: 'WB Trade',
    description:
      'Platforma e-commerce nowej generacji oferująca kompleksowe rozwiązania dla sprzedaży online. Łączymy technologię z doświadczeniem użytkownika.',
    chips: ['E-commerce', 'B2B', 'Marketplace', 'Logistyka', 'Analytics'],
    accentColor: 'var(--accent-trade)',
    ctaPrimary: {
      label: 'Przejdź',
      href: '/wb-trade',
      isScroll: false,
    },
    ctaSecondary: {
      label: 'Następna sekcja',
      href: '#wb-incode',
      isScroll: true,
    },
  },
  {
    id: 'wb-incode',
    title: 'WB InCode',
    description:
      'Software house specjalizujący się w tworzeniu dedykowanych aplikacji webowych i mobilnych. Od MVP po skalowalne systemy enterprise.',
    chips: ['Web Development', 'Mobile Apps', 'Cloud', 'DevOps', 'Consulting'],
    accentColor: 'var(--accent-incode)',
    ctaPrimary: {
      label: 'Przejdź',
      href: '/wb-incode',
      isScroll: false,
    },
    ctaSecondary: {
      label: 'Następna sekcja',
      href: '#wb-rent',
      isScroll: true,
    },
  },
  {
    id: 'wb-rent',
    title: 'WB Rent',
    description:
      'Nowoczesna platforma wynajmu sprzętu. Digitalizujemy procesy najmu, oferując transparentność i wygodę dla obu stron.',
    chips: ['PropTech', 'Rental', 'SaaS', 'Automation', 'CRM'],
    accentColor: 'var(--accent-rent)',
    ctaPrimary: {
      label: 'Przejdź',
      href: '/wb-rent',
      isScroll: false,
    },
    ctaSecondary: {
      label: 'Następna sekcja',
      href: '#wb-foundation',
      isScroll: true,
    },
  },
  {
    id: 'wb-foundation',
    title: 'WB Foundation',
    description:
      'Inicjatywy społeczne i edukacyjne wspierające rozwój lokalnych społeczności. Inwestujemy w ludzi i projekty, które mają pozytywny wpływ.',
    chips: ['CSR', 'Edukacja', 'Społeczność', 'Mentoring', 'Granty'],
    accentColor: 'var(--accent-foundation)',
    ctaPrimary: {
      label: 'Przejdź',
      href: '/wb-foundation',
      isScroll: false,
    },
    ctaSecondary: {
      label: 'Kontakt',
      href: '#kontakt',
      isScroll: true,
    },
  },
  {
    id: 'kontakt',
    title: 'Kontakt',
    description:
      'Masz projekt lub pomysł? Skontaktuj się z nami. Odpowiadamy w ciągu 24 godzin.',
    chips: [],
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: 'Start', href: '#intro', sectionId: 'intro', accentColor: 'var(--wb-primary)' },
  { label: 'WB Trade', href: '#wb-trade', sectionId: 'wb-trade', accentColor: 'var(--accent-trade)' },
  { label: 'WB InCode', href: '#wb-incode', sectionId: 'wb-incode', accentColor: 'var(--accent-incode)' },
  { label: 'WB Rent', href: '#wb-rent', sectionId: 'wb-rent', accentColor: 'var(--accent-rent)' },
  { label: 'WB Foundation', href: '#wb-foundation', sectionId: 'wb-foundation', accentColor: 'var(--accent-foundation)' },
  { label: 'Kontakt', href: '#kontakt', sectionId: 'kontakt', accentColor: 'var(--wb-primary)' },
];

export const CONTACT_INFO = {
  email: 'support@wb-partners.pl',
  phone: '+48 570 034 367',
  address: 'ul. Juliusza Słowackiego 24/11, 35-060 Rzeszów',
};
