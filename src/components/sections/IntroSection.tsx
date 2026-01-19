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
import { useNavigate } from 'react-router-dom';

// ...

export function IntroSection({ onNavigate }: IntroSectionProps) {
  const navigate = useNavigate();
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
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
            className="mb-4 xs:mb-5 sm:mb-6 md:mb-8 justify-center lg:justify-start"
            autoIcons
          />

          <div className="flex flex-col xs:flex-row flex-wrap gap-2 xs:gap-3 sm:gap-4 justify-center lg:justify-start">
            <Button
              variant="primary"
              onClick={() => navigate('/projekty')}
            >
              Poznaj projekty
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const contactSection = document.getElementById('kontakt');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Kontakt
            </Button>
          </div>
        </div>

        {/* Right: 3D Scene - ukryte na mobile, widoczne od lg */}
        <div className="hidden lg:block h-[280px] md:h-[320px] lg:h-[400px] xl:h-[450px]">
          <SceneWrapper className="w-full h-full max-w-[240px] md:max-w-[280px] lg:max-w-[360px] xl:max-w-md mx-auto">
            <IntroScene />
          </SceneWrapper>
        </div>
      </div>
    </Section>
  );
}
