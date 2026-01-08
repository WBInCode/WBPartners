import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedChipGroup } from '../ui/AnimatedChipGroup';
import { Button } from '../ui/Button';
import { StatsCounter } from '../ui/StatsCounter';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { SceneWrapper, IntroScene } from '../3d';
import wbPartnersLogo from '../../assets/wb-partners-logo.png';

interface IntroSectionProps {
  onNavigate?: (sectionId: string) => void;
}

// Statystyki firmy
const STATS = [
  { value: 4, suffix: '', label: 'Marki w portfolio' },
  { value: 50, suffix: '+', label: 'Zrealizowanych projektów' },
  { value: 98, suffix: '%', label: 'Zadowolonych klientów' },
  { value: 10, suffix: '+', label: 'Lat doświadczenia' },
];

/**
 * Sekcja Intro
 * - H1: "WB Partners"
 * - H2: "Budujemy marki i projekty, które rosną."
 * - Opis (max-w-2xl)
 * - Chipy: Software, E-commerce, Usługi, Inicjatywy
 * - CTA: "Poznaj projekty" → WB Trade, "Kontakt" → Kontakt
 * - Layout grid: tekst po lewej, scena 3D po prawej
 * - Statystyki animowane
 */
export function IntroSection({ onNavigate }: IntroSectionProps) {
  const chips = ['Software', 'E-commerce', 'Usługi', 'Inicjatywy'];

  return (
    <Section id="intro" ariaLabel="Strona główna WB Partners" className="section-intro section-bg relative">
      {/* Animated background */}
      <AnimatedBackground 
        variant="mesh" 
        primaryColor="var(--wb-primary)" 
        secondaryColor="var(--wb-secondary)"
        opacity={0.3}
      />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
        {/* Left: Content */}
        <div className="max-w-xl">
          <SectionHeader
            title="WB Partners"
            subtitle="Budujemy marki i projekty, które rosną."
            description="Tworzymy innowacyjne rozwiązania w obszarze software, e-commerce, usług oraz inicjatyw społecznych. Każdy projekt to połączenie strategii, technologii i designu."
            logoSrc={wbPartnersLogo}
            logoAlt="WB Partners Logo"
          />

          <AnimatedChipGroup 
            chips={chips} 
            variant="primary"
            className="mb-8"
            autoIcons
          />

          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary"
              onClick={() => onNavigate?.('wb-trade')}
            >
              Poznaj projekty
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate?.('kontakt')}
            >
              Kontakt
            </Button>
          </div>
        </div>

        {/* Right: 3D Scene */}
        <div className="hidden lg:block h-[400px] lg:h-[500px]">
          <SceneWrapper className="w-full h-full">
            <IntroScene />
          </SceneWrapper>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-8 lg:mt-12 pt-8 border-t border-gray-200">
        <StatsCounter stats={STATS} />
      </div>
    </Section>
  );
}
