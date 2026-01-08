# WB Partners - One-Page Website

Profesjonalna strona one-page z scroll snap dla WB Partners. Nowoczesna, responsywna i dostępna strona prezentująca projekty i usługi firmy.

## 🚀 Demo

```bash
npm run dev
# Otwórz http://localhost:5173
```

## 📦 Tech Stack

- **Vite** - Build tool (v7.2.5)
- **React 19** - UI Framework
- **TypeScript** - Type safety
- **TailwindCSS v4** - Styling
- **Framer Motion** - Animations
- **clsx** - Conditional classes

## 🎨 Funkcje

### Scroll Snap
- Płynne przewijanie między sekcjami
- 6 pełnoekranowych sekcji
- Scroll indicator z interaktywnymi kropkami

### Nawigacja
- Sticky navbar z backdrop blur
- Hamburger menu na mobile
- Aktywna sekcja podświetlona
- Skip to content link (a11y)

### Sekcje
1. **Intro** - Strona główna WB Partners
2. **WB Trade** - Platforma e-commerce (akcent: #DB5F1B)
3. **WB InCode** - Software house (akcent: #52F066)
4. **WB Rent** - Platforma wynajmu (akcent: #D6AF5B)
5. **WB Foundation** - Inicjatywy społeczne (akcent: #8FD2E9)
6. **Kontakt** - Formularz kontaktowy z walidacją

### Animacje
- Framer Motion dla smooth animations
- Fade in + slide up dla nagłówków
- Staggered animations dla chipów
- Scale animations na kartach i przyciskach
- Pulse animation na aktywnej kropce
- Respektuje `prefers-reduced-motion`

### Dostępność (A11Y)
- Semantyczny HTML
- ARIA labels
- Focus visible styling
- Keyboard navigation
- Skip to content link
- High contrast mode support

## 📁 Struktura Projektu

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Section.tsx
│   │   └── ScrollIndicator.tsx
│   ├── sections/
│   │   ├── IntroSection.tsx
│   │   ├── TradeSection.tsx
│   │   ├── InCodeSection.tsx
│   │   ├── RentSection.tsx
│   │   ├── FoundationSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Chip.tsx
│       ├── ChipGroup.tsx
│       ├── MockCard.tsx
│       ├── SectionHeader.tsx
│       ├── ContactForm.tsx
│       └── ContactInfo.tsx
├── hooks/
│   ├── useScrollToSection.ts
│   ├── useActiveSection.ts
│   └── useAnimations.ts
├── constants/
│   └── content.ts
├── utils/
│   └── index.ts
├── types/
│   └── index.ts
├── App.tsx
└── index.css
```

## 🎨 CSS Variables

```css
:root {
  --wb-primary: #0A457B;
  --wb-secondary: #2A679D;
  --wb-accent: #4A78AB;
  --bg: #F7FAFF;
  --text: #0B1220;
  
  /* Section accents */
  --accent-trade: #DB5F1B;
  --accent-incode: #52F066;
  --accent-rent: #D6AF5B;
  --accent-foundation: #8FD2E9;
}
```

## 🛠️ Komendy

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

## 📱 Breakpoints

- **320px** - Mobile S
- **768px** - Tablet
- **1024px** - Desktop
- **1440px** - Desktop L

## ✅ Komponenty

### Layout
- `Navbar` - Fixed navbar z hamburger menu
- `Section` - Bazowy komponent sekcji ze scroll snap
- `ScrollIndicator` - Wskaźnik pozycji scroll

### UI
- `Button` - Warianty: primary, secondary, outline, ghost
- `Chip` - Tagi/etykiety
- `ChipGroup` - Grupa chipów ze staggered animation
- `MockCard` - Placeholder karta z akcentami sekcji
- `SectionHeader` - Nagłówek sekcji (title, subtitle, description)
- `ContactForm` - Formularz z walidacją
- `ContactInfo` - Karta informacji kontaktowych

### Hooks
- `useScrollToSection` - Smooth scroll do sekcji
- `useActiveSection` - IntersectionObserver dla aktywnej sekcji
- `useAnimations` - Warianty animacji i reduced-motion hook

## 📄 Licencja

Prawa autorskie © 2026 WB Partners. Wszelkie prawa zastrzeżone.
