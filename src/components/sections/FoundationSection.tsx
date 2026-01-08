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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="max-w-xl mx-auto md:mx-0">
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
            className="mb-8"
            autoIcons
          />

          <div className="flex flex-wrap gap-4">
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

        {/* Right: 3D Scene */}
        <div className="hidden md:flex justify-center md:justify-end">
          <SceneWrapper className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-md aspect-square" fallbackColor="#8FD2E9">
            <FoundationScene />
          </SceneWrapper>
        </div>
      </div>
    </Section>
  );
}
