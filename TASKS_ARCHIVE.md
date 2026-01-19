# WB Partners - Lista Tasków

## STATUS PROJEKTU
- **Rozpoczęto:** 08.01.2026
- **Aktualny etap:** UKOŃCZONO
- **Aktywny task:** WSZYSTKIE UKOŃCZONE

---

## LEGENDA
- [ ] Do zrobienia
- [x] Zrobione
- [🔄] W trakcie

---

## ZASADY PRACY
1. **Po każdym tasku:** Sprawdź czy działa poprawnie (otwórz stronę, przetestuj)
2. **Przed oznaczeniem DONE:** Zweryfikuj wizualnie i funkcjonalnie
3. **Jeśli błąd:** Napraw przed przejściem dalej
4. **Dokumentuj:** Aktualizuj TASKS.md po każdej zmianie

---

## ETAP 1: FUNDAMENT PROJEKTU

### 1. Setup projektu
- [x] 1.1 Utworzenie projektu Vite + React + TypeScript
- [x] 1.2 Instalacja TailwindCSS + plugin Vite
- [x] 1.3 Konfiguracja vite.config.ts z tailwindcss
- [x] 1.4 CSS Variables (kolory główne + akcenty sekcji)
- [x] 1.5 Podstawowy App.tsx z testem Tailwind
- [x] 1.6 Weryfikacja: npm run dev działa

### 2. Struktura folderów i plików
- [x] 2.1 Utworzenie struktury: src/components/
- [x] 2.2 Utworzenie struktury: src/components/ui/
- [x] 2.3 Utworzenie struktury: src/components/sections/
- [x] 2.4 Utworzenie struktury: src/components/layout/
- [x] 2.5 Utworzenie struktury: src/hooks/
- [x] 2.6 Utworzenie struktury: src/utils/
- [x] 2.7 Utworzenie struktury: src/types/
- [x] 2.8 Utworzenie struktury: src/constants/
- [x] 2.9 Plik src/types/index.ts z typami
- [x] 2.10 Plik src/constants/content.ts z treściami sekcji

---

## ETAP 2: LAYOUT I SCROLL SNAP

### 3. Konfiguracja scroll snap
- [x] 3.1 Dodanie scroll-snap-type do kontenera głównego
- [x] 3.2 Dodanie scroll-snap-align do sekcji
- [x] 3.3 Sekcje 100vh z overflow hidden
- [x] 3.4 Padding-top dla sticky header (72px)
- [x] 3.5 Safe area z prawej strony (pr-16 desktop)
- [x] 3.6 Test przewijania między sekcjami

### 4. Komponent Section (bazowy)
- [x] 4.1 Utworzenie src/components/layout/Section.tsx
- [x] 4.2 Props: id, children, className, accentColor
- [x] 4.3 Scroll snap align: start
- [x] 4.4 Min-height: 100vh
- [x] 4.5 Padding responsywny (mobile/desktop)
- [x] 4.6 Opcjonalny glow/radial gradient tła

### 5. Implementacja 6 sekcji (placeholdery)
- [x] 5.1 Sekcja Intro (id="intro")
- [x] 5.2 Sekcja WB Trade (id="wb-trade")
- [x] 5.3 Sekcja WB InCode (id="wb-incode")
- [x] 5.4 Sekcja WB Rent (id="wb-rent")
- [x] 5.5 Sekcja WB Foundation (id="wb-foundation")
- [x] 5.6 Sekcja Kontakt (id="kontakt")
- [x] 5.7 Każda sekcja ma tymczasowy tytuł do identyfikacji

---

## ETAP 3: NAWIGACJA

### 6. Komponent Navbar
- [x] 6.1 Utworzenie src/components/layout/Navbar.tsx
- [x] 6.2 Fixed position, h-[72px], z-50
- [x] 6.3 Tło: bg-white/80 backdrop-blur-md
- [x] 6.4 Border-bottom subtelny
- [x] 6.5 Logo "WB Partners" po lewej
- [x] 6.6 Linki nawigacyjne po prawej (desktop)
- [x] 6.7 Hamburger menu (mobile) - stan zamknięty
- [x] 6.8 Aktywna sekcja podświetlona w nav

### 7. Hamburger Menu (mobile)
- [x] 7.1 Ikona hamburgera (lucide-react lub custom)
- [x] 7.2 Stan open/close
- [x] 7.3 Overlay menu pełnoekranowe
- [x] 7.4 Animacja otwarcia/zamknięcia
- [x] 7.5 Zamknięcie po kliknięciu linku
- [x] 7.6 Zamknięcie po kliknięciu poza menu
- [x] 7.7 Blokada scroll gdy menu otwarte

### 8. Scroll do sekcji
- [x] 8.1 Hook useScrollToSection
- [x] 8.2 Smooth scroll do elementu po ID
- [x] 8.3 Offset dla sticky header
- [x] 8.4 Podłączenie do linków w Navbar
- [x] 8.5 Podłączenie do CTA w sekcjach

---

## ETAP 4: SCROLL INDICATOR

### 9. Komponent ScrollIndicator
- [x] 9.1 Utworzenie src/components/layout/ScrollIndicator.tsx
- [x] 9.2 Fixed position po prawej stronie
- [x] 9.3 Pionowy układ kropek (6 kropek)
- [x] 9.4 Centrowanie w pionie
- [x] 9.5 Z-index ponad sekcjami

### 10. Aktywna sekcja (IntersectionObserver)
- [x] 10.1 Hook useActiveSection
- [x] 10.2 IntersectionObserver na każdej sekcji
- [x] 10.3 Threshold: 0.5 (50% widoczności)
- [x] 10.4 Aktualizacja aktywnej sekcji
- [x] 10.5 Podłączenie do ScrollIndicator
- [x] 10.6 Podłączenie do Navbar (aktywny link)

### 11. Interakcja ScrollIndicator
- [x] 11.1 Kliknięcie w kropkę = scroll do sekcji
- [x] 11.2 Hover effect na kropkach
- [x] 11.3 Tooltip z nazwą sekcji (opcjonalnie)
- [x] 11.4 Ukrycie na mobile (lub mniejsze)

---

## ETAP 5: KOMPONENTY UI

### 12. Komponent Button
- [x] 12.1 Utworzenie src/components/ui/Button.tsx
- [x] 12.2 Warianty: primary, secondary, outline, ghost
- [x] 12.3 Rozmiary: sm, md, lg
- [x] 12.4 Props: onClick, href, disabled, loading
- [x] 12.5 Ikona opcjonalna (left/right)
- [x] 12.6 Hover i focus states
- [x] 12.7 Transition animations
- [x] 12.8 Accessibility: aria-label, role

### 13. Komponent Chip
- [x] 13.1 Utworzenie src/components/ui/Chip.tsx
- [x] 13.2 Warianty kolorystyczne (primary, accent, muted)
- [x] 13.3 Rozmiary: sm, md
- [x] 13.4 Pill shape (rounded-full)
- [x] 13.5 Opcjonalna ikona
- [x] 13.6 Hover effect (opcjonalnie)

### 14. Komponent MockCard
- [x] 14.1 Utworzenie src/components/ui/MockCard.tsx
- [x] 14.2 Karta z cieniem (shadow-xl)
- [x] 14.3 Zaokrąglone rogi (rounded-2xl)
- [x] 14.4 Tło białe/jasne
- [x] 14.5 Placeholder content (linie, kółka)
- [x] 14.6 Warianty dla różnych sekcji
- [x] 14.7 Subtelna animacja (opcjonalnie)

### 15. Komponent SectionHeader
- [x] 15.1 Utworzenie src/components/ui/SectionHeader.tsx
- [x] 15.2 Props: title, subtitle, description
- [x] 15.3 Typografia responsywna
- [x] 15.4 Max-width dla description
- [x] 15.5 Spacing między elementami

### 16. Komponent ChipGroup
- [x] 16.1 Utworzenie src/components/ui/ChipGroup.tsx
- [x] 16.2 Flex wrap layout
- [x] 16.3 Gap między chipami
- [x] 16.4 Akceptuje tablicę stringów

---

## ETAP 6: SEKCJE - PEŁNA TREŚĆ

### 17. Sekcja Intro
- [x] 17.1 Utworzenie src/components/sections/IntroSection.tsx
- [x] 17.2 H1: "WB Partners"
- [x] 17.3 H2: "Budujemy marki i projekty, które rosną."
- [x] 17.4 Opis (max-w-2xl)
- [x] 17.5 Chipy: Software, E-commerce, Usługi, Inicjatywy
- [x] 17.6 CTA: "Poznaj projekty" → scroll do WB Trade
- [x] 17.7 CTA: "Kontakt" → scroll do Kontakt
- [x] 17.8 Layout grid: tekst po lewej, MockCard po prawej
- [x] 17.9 Responsywność: stack na mobile

### 18. Sekcja WB Trade
- [x] 18.1 Utworzenie src/components/sections/TradeSection.tsx
- [x] 18.2 Nagłówek "WB Trade"
- [x] 18.3 Opis platformy e-commerce
- [x] 18.4 Chipy: E-commerce, B2B, Marketplace, Logistyka, Analytics
- [x] 18.5 CTA primary: "Przejdź" → /wb-trade
- [x] 18.6 CTA secondary: "Następna sekcja" → scroll
- [x] 18.7 MockCard z akcentem Trade (#DB5F1B)
- [x] 18.8 Subtelny glow tła w kolorze akcentu

### 19. Sekcja WB InCode
- [x] 19.1 Utworzenie src/components/sections/InCodeSection.tsx
- [x] 19.2 Nagłówek "WB InCode"
- [x] 19.3 Opis software house
- [x] 19.4 Chipy: Web Development, Mobile Apps, Cloud, DevOps, Consulting
- [x] 19.5 CTA primary: "Przejdź" → /wb-incode
- [x] 19.6 MockCard z akcentem InCode (#52F066)
- [x] 19.7 Subtelny glow tła

### 20. Sekcja WB Rent
- [x] 20.1 Utworzenie src/components/sections/RentSection.tsx
- [x] 20.2 Nagłówek "WB Rent"
- [x] 20.3 Opis platformy wynajmu
- [x] 20.4 Chipy: PropTech, Rental, SaaS, Automation, CRM
- [x] 20.5 CTA primary: "Przejdź" → /wb-rent
- [x] 20.6 MockCard z akcentem Rent (#D6AF5B)
- [x] 20.7 Subtelny glow tła

### 21. Sekcja WB Foundation
- [x] 21.1 Utworzenie src/components/sections/FoundationSection.tsx
- [x] 21.2 Nagłówek "WB Foundation"
- [x] 21.3 Opis inicjatyw społecznych
- [x] 21.4 Chipy: CSR, Edukacja, Społeczność, Mentoring, Granty
- [x] 21.5 CTA primary: "Przejdź" → /wb-foundation
- [x] 21.6 MockCard z akcentem Foundation (#8FD2E9)
- [x] 21.7 Subtelny glow tła

---

## ETAP 7: FORMULARZ KONTAKTOWY

### 22. Sekcja Kontakt - Layout
- [x] 22.1 Utworzenie src/components/sections/ContactSection.tsx
- [x] 22.2 Nagłówek "Kontakt"
- [x] 22.3 Opis zachęcający do kontaktu
- [x] 22.4 Grid: formularz po lewej, info po prawej
- [x] 22.5 Responsywność: stack na mobile

### 23. Komponent ContactForm
- [x] 23.1 Utworzenie src/components/ui/ContactForm.tsx
- [x] 23.2 Pole: Imię (input text)
- [x] 23.3 Pole: Email (input email)
- [x] 23.4 Pole: Temat (input text)
- [x] 23.5 Pole: Wiadomość (textarea)
- [x] 23.6 Przycisk: "Wyślij wiadomość"
- [x] 23.7 Stylowanie pól (border, focus ring)

### 24. Walidacja formularza
- [x] 24.1 Hook useContactForm (stan + walidacja)
- [x] 24.2 Walidacja: Imię wymagane
- [x] 24.3 Walidacja: Email wymagany + format
- [x] 24.4 Walidacja: Temat wymagany
- [x] 24.5 Walidacja: Wiadomość wymagana (min 10 znaków)
- [x] 24.6 Wyświetlanie błędów przy polach
- [x] 24.7 Blokada submit przy błędach

### 25. Submit formularza
- [x] 25.1 Stan loading podczas wysyłki
- [x] 25.2 Symulacja wysyłki (setTimeout)
- [x] 25.3 Komunikat sukcesu po wysłaniu
- [x] 25.4 Reset formularza po sukcesie
- [x] 25.5 Obsługa błędu wysyłki

### 26. Karta informacji kontaktowych
- [x] 26.1 Utworzenie src/components/ui/ContactInfo.tsx
- [x] 26.2 Tytuł "Informacje kontaktowe"
- [x] 26.3 Email kontaktowy (placeholder)
- [x] 26.4 Opcjonalnie: telefon, adres
- [x] 26.5 Ikony przy danych (lucide-react)
- [x] 26.6 Stylowanie karty (cień, zaokrąglenie)

---

## ETAP 8: ANIMACJE (FRAMER MOTION)

### 27. Instalacja i setup Framer Motion
- [x] 27.1 npm install framer-motion
- [x] 27.2 Test podstawowej animacji

### 28. Animacje wejścia sekcji
- [x] 28.1 Fade in + slide up dla nagłówków
- [x] 28.2 Staggered animation dla chipów
- [x] 28.3 Animacja MockCard (scale + fade)
- [x] 28.4 Trigger: gdy sekcja w viewport

### 29. Animacje przycisków i interakcji
- [x] 29.1 Hover scale na przyciskach
- [x] 29.2 Tap animation (scale down)
- [x] 29.3 Animacja focus ring

### 30. Animacje nawigacji
- [x] 30.1 Animacja hamburger → X
- [x] 30.2 Slide in menu mobile
- [x] 30.3 Animacja active indicator w nav

### 31. Animacje ScrollIndicator
- [x] 31.1 Pulse animation na aktywnej kropce
- [x] 31.2 Hover scale na kropkach
- [x] 31.3 Smooth transition między kropkami

### 32. Prefers-reduced-motion
- [x] 32.1 Hook useReducedMotion
- [x] 32.2 Wyłączenie animacji gdy reduced-motion
- [x] 32.3 Test w ustawieniach systemu

---

## ETAP 9: RESPONSYWNOŚĆ

### 33. Breakpoint 320px (mobile S)
- [x] 33.1 Navbar: tylko logo + hamburger
- [x] 33.2 Sekcje: padding 16px
- [x] 33.3 Typografia: zmniejszone fonty
- [x] 33.4 MockCard: ukryty lub mniejszy
- [x] 33.5 ScrollIndicator: ukryty
- [x] 33.6 Formularz: pełna szerokość

### 34. Breakpoint 768px (tablet)
- [x] 34.1 Navbar: częściowe menu
- [x] 34.2 Sekcje: padding 32px
- [x] 34.3 Grid: 1 kolumna lub 2 mniejsze
- [x] 34.4 MockCard: widoczny, mniejszy

### 35. Breakpoint 1024px (desktop)
- [x] 35.1 Navbar: pełne menu
- [x] 35.2 Sekcje: grid 2 kolumny
- [x] 35.3 ScrollIndicator: widoczny
- [x] 35.4 Safe area dla indicator

### 36. Breakpoint 1440px (desktop L)
- [x] 36.1 Max-width container (1280px lub więcej)
- [x] 36.2 Centrowanie contentu
- [x] 36.3 Większe marginesy boczne

### 37. Testy cross-browser
- [x] 37.1 Chrome - weryfikacja
- [ ] 37.2 Firefox - weryfikacja
- [ ] 37.3 Safari - weryfikacja (jeśli dostępne)
- [ ] 37.4 Edge - weryfikacja

---

## ETAP 10: DOSTĘPNOŚĆ (A11Y)

### 38. Semantyczny HTML
- [x] 38.1 Prawidłowe użycie header, main, section, footer
- [x] 38.2 Hierarchia nagłówków (h1 → h2 → h3)
- [x] 38.3 Aria-labels na interaktywnych elementach
- [x] 38.4 Role dla custom komponentów

### 39. Keyboard navigation
- [x] 39.1 Tab order logiczny
- [x] 39.2 Focus visible na wszystkich elementach
- [x] 39.3 Enter/Space aktywuje przyciski
- [x] 39.4 Escape zamyka menu
- [x] 39.5 Skip to content link

### 40. Screen reader
- [x] 40.1 Alt text dla obrazków (jeśli są)
- [x] 40.2 Aria-live dla dynamicznych treści
- [x] 40.3 Aria-current dla aktywnej sekcji
- [x] 40.4 Ukrywanie dekoracyjnych elementów

---

## ETAP 11: OPTYMALIZACJA

### 41. Performance
- [x] 41.1 Lazy loading komponentów (jeśli potrzebne)
- [x] 41.2 Optymalizacja re-renderów (memo, useCallback)
- [x] 41.3 Debounce na scroll events
- [x] 41.4 Will-change dla animowanych elementów

### 42. SEO basics
- [x] 42.1 Meta title i description
- [ ] 42.2 Open Graph tags
- [ ] 42.3 Favicon
- [ ] 42.4 Robots.txt (jeśli potrzebne)

### 43. Bundle size
- [x] 43.1 Analiza bundle (npm run build)
- [x] 43.2 Tree shaking lucide-react
- [x] 43.3 Sprawdzenie unused dependencies

---

## ETAP 12: POLISH I FINALIZACJA

### 44. Visual polish
- [x] 44.1 Spójność kolorów we wszystkich sekcjach
- [x] 44.2 Spójność spacing (8px grid)
- [x] 44.3 Spójność typografii
- [x] 44.4 Spójność cieni i zaokrągleń
- [x] 44.5 Glow effects na sekcjach projektów

### 45. Code cleanup
- [x] 45.1 Usunięcie console.log
- [x] 45.2 Usunięcie unused imports
- [x] 45.3 Usunięcie komentarzy deweloperskich
- [x] 45.4 Formatowanie kodu (Prettier)
- [x] 45.5 ESLint - brak błędów

### 46. Dokumentacja
- [x] 46.1 README.md z opisem projektu
- [x] 46.2 Instrukcja uruchomienia
- [x] 46.3 Struktura folderów
- [x] 46.4 Lista komponentów

### 47. Final testing
- [x] 47.1 Pełny test flow użytkownika
- [x] 47.2 Test wszystkich linków/CTA
- [x] 47.3 Test formularza
- [x] 47.4 Test na różnych urządzeniach
- [x] 47.5 Test animacji
- [x] 47.6 Brak błędów w konsoli

### 48. Build produkcyjny
- [x] 48.1 npm run build - sukces
- [x] 48.2 Preview build lokalnie
- [x] 48.3 Weryfikacja działania buildu

---

## NOTATKI
- Używamy: Vite, React, TypeScript, TailwindCSS, Framer Motion, lucide-react, clsx
- Brak WebGL
- Kolory: patrz CSS Variables w index.css
- Breakpoints: 320, 768, 1024, 1440

---

## HISTORIA ZMIAN
| Data | Task | Status |
|------|------|--------|
| 08.01.2026 | #1 Setup projektu | ✅ DONE |
| 08.01.2026 | #2 Struktura folderów | ✅ DONE |
| 08.01.2026 | #3 Konfiguracja scroll snap | ✅ DONE |
