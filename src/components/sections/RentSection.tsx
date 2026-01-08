import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedChipGroup } from '../ui/AnimatedChipGroup';
import { Button } from '../ui/Button';
import { FeatureCard } from '../ui/FeatureCard';
import { TiltCard } from '../ui/TiltCard';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { SceneWrapper, RentScene } from '../3d';
import { Building2, Key, Calendar, Users } from 'lucide-react';
import wbRentLogo from '../../assets/wb-rent-logo.png';

interface RentSectionProps {
  onNavigate?: (sectionId: string) => void;
}

// Features dla Rent
const RENT_FEATURES = [
  { icon: Building2, title: 'Nieruchomości', description: 'Kompleksowe zarządzanie portfelem nieruchomości.' },
  { icon: Key, title: 'Wynajem', description: 'Automatyzacja procesu wynajmu od A do Z.' },
  { icon: Calendar, title: 'Rezerwacje', description: 'System rezerwacji i kalendarz dostępności.' },
  { icon: Users, title: 'CRM', description: 'Zarządzanie relacjami z najemcami.' },
];

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

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
        {/* Left: Content */}
        <div className="max-w-xl">
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
        <div className="hidden lg:flex justify-center lg:justify-end">
          <SceneWrapper className="w-full max-w-md aspect-square" fallbackColor="#D6AF5B">
            <RentScene />
          </SceneWrapper>
        </div>
      </div>

      {/* Feature cards with TiltCard */}
      <div className="mt-8 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {RENT_FEATURES.map((feature, i) => (
          <TiltCard
            key={feature.title}
            maxTilt={12}
            scale={1.03}
            accentColor="#D6AF5B"
            className="rounded-xl"
          >
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={accentColor}
              delay={i * 0.1}
            />
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
