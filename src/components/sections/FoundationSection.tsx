import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedChipGroup } from '../ui/AnimatedChipGroup';
import { Button } from '../ui/Button';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { SceneWrapper, FoundationScene } from '../3d';
import wbFoundationLogo from '../../assets/wb-foundation-logo.png';

interface FoundationSectionProps {
  onNavigate?: (sectionId: string) => void;
}

/**
 * Sekcja WB Foundation
 * - Nagłówek "WB Foundation"
 * - Opis inicjatyw społecznych
 * - Feature cards z ikonami
 */
export function FoundationSection({ onNavigate }: FoundationSectionProps) {
  const chips = ['CSR', 'Edukacja', 'Społeczność', 'Mentoring', 'Granty'];
  const accentColor = 'var(--accent-foundation)';

  return (
    <Section id="wb-foundation" accentColor={accentColor} withGlow ariaLabel="WB Foundation - inicjatywy społeczne" className="section-foundation section-bg relative">
      {/* Animated background */}
      <AnimatedBackground 
        variant="dots" 
        primaryColor="#8FD2E9"
        opacity={0.4}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <SectionHeader
            title="WB Foundation"
            subtitle="Wspieramy przyszłość, inwestujemy w ludzi"
            description="Fundacja wspierająca inicjatywy edukacyjne i społeczne. Budujemy społeczność i pomagamy rozwijać talenty."
            titleColor={accentColor}
            logoSrc={wbFoundationLogo}
            logoAlt="WB Foundation Logo"
          />

          <AnimatedChipGroup 
            chips={chips} 
            variant="accent"
            accentColor={accentColor}
            className="mb-4 xs:mb-5 sm:mb-6 md:mb-8 justify-center lg:justify-start"
            autoIcons
          />

          <div className="flex flex-col xs:flex-row flex-wrap gap-2 xs:gap-3 sm:gap-4 justify-center lg:justify-start">
            <Button 
              variant="primary"
              href="/wb-foundation"
              className="!bg-[var(--accent-foundation)] hover:!opacity-90"
            >
              Przejdź
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate?.('kontakt')}
              className="!border-[var(--accent-foundation)] !text-[var(--accent-foundation)] hover:!bg-[var(--accent-foundation)]/5"
            >
              Następna sekcja
            </Button>
          </div>
        </div>

        {/* Right: 3D Scene - ukryte na mobile, widoczne od lg */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <SceneWrapper className="w-full max-w-[240px] md:max-w-[280px] lg:max-w-[360px] xl:max-w-md aspect-square" fallbackColor="#8FD2E9">
            <FoundationScene />
          </SceneWrapper>
        </div>
      </div>
    </Section>
  );
}
