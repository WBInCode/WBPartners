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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <SectionHeader
            title="WB Rent"
            subtitle="Inteligentna platforma wynajmu"
            description="Nowoczesna platforma wynajmu sprzętu z automatyzacją procesów. Upraszczamy zarządzanie i maksymalizujemy zyski."
            titleColor={accentColor}
            logoSrc={wbRentLogo}
            logoAlt="WB Rent Logo"
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

        {/* Right: 3D Scene - ukryte na mobile, widoczne od lg */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <SceneWrapper className="w-full max-w-[240px] md:max-w-[280px] lg:max-w-[360px] xl:max-w-md aspect-square" fallbackColor="#D6AF5B">
            <RentScene />
          </SceneWrapper>
        </div>
      </div>
    </Section>
  );
}
