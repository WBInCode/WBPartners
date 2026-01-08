import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedChipGroup } from '../ui/AnimatedChipGroup';
import { Button } from '../ui/Button';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { SceneWrapper, IntroScene } from '../3d';
import wbPartnersLogo from '../../assets/wb-partners-logo.png';

interface IntroSectionProps {
  onNavigate?: (sectionId: string) => void;
}

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="max-w-xl mx-auto md:mx-0">
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
        <div className="hidden md:block h-[300px] md:h-[350px] lg:h-[450px]">
          <SceneWrapper className="w-full h-full max-w-[280px] md:max-w-[320px] lg:max-w-md mx-auto">
            <IntroScene />
          </SceneWrapper>
        </div>
      </div>
    </Section>
  );
}
