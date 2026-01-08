import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedChipGroup } from '../ui/AnimatedChipGroup';
import { Button } from '../ui/Button';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { SceneWrapper, RentScene } from '../3d';
import wbRentLogo from '../../assets/wb-rent-logo.png';

interface RentSectionProps {
  onNavigate?: (sectionId: string) => void;
}

/**
 * Sekcja WB Rent
 * - Nagłówek "WB Rent"
 * - Opis platformy wynajmu
 * - Feature cards z ikonami
 */
export function RentSection({ onNavigate }: RentSectionProps) {
  const chips = ['PropTech', 'Rental', 'SaaS', 'Automation', 'CRM'];
  const accentColor = 'var(--accent-rent)';

  return (
    <Section id="wb-rent" accentColor={accentColor} withGlow ariaLabel="WB Rent - platforma wynajmu" className="section-rent section-bg relative">
      {/* Animated background */}
      <AnimatedBackground 
        variant="gradient" 
        primaryColor="#D6AF5B" 
        secondaryColor="#C49A3F"
        opacity={0.5}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="max-w-xl mx-auto md:mx-0">
          <SectionHeader
            title="WB Rent"
            subtitle="Inteligentna platforma wynajmu"
            description="Nowoczesna platforma wynajmu nieruchomości i sprzętu z automatyzacją procesów. Upraszczamy zarządzanie i maksymalizujemy zyski."
            titleColor={accentColor}
            logoSrc={wbRentLogo}
            logoAlt="WB Rent Logo"
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
              href="/wb-rent"
              className="!bg-[var(--accent-rent)] hover:!opacity-90"
            >
              Przejdź
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate?.('wb-foundation')}
              className="!border-[var(--accent-rent)] !text-[var(--accent-rent)] hover:!bg-[var(--accent-rent)]/5"
            >
              Następna sekcja
            </Button>
          </div>
        </div>

        {/* Right: 3D Scene */}
        <div className="hidden md:flex justify-center md:justify-end">
          <SceneWrapper className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-md aspect-square" fallbackColor="#D6AF5B">
            <RentScene />
          </SceneWrapper>
        </div>
      </div>
    </Section>
  );
}
