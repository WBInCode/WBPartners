import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedChipGroup } from '../ui/AnimatedChipGroup';
import { Button } from '../ui/Button';
import { FeatureCard } from '../ui/FeatureCard';
import { TiltCard } from '../ui/TiltCard';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { SceneWrapper, FoundationScene } from '../3d';
import { Heart, GraduationCap, Users, Award } from 'lucide-react';
import wbFoundationLogo from '../../assets/wb-foundation-logo.png';

interface FoundationSectionProps {
  onNavigate?: (sectionId: string) => void;
}

// Features dla Foundation
const FOUNDATION_FEATURES = [
  { icon: Heart, title: 'CSR', description: 'Społeczna odpowiedzialność biznesu w praktyce.' },
  { icon: GraduationCap, title: 'Edukacja', description: 'Programy edukacyjne i warsztaty dla młodzieży.' },
  { icon: Users, title: 'Społeczność', description: 'Budowanie lokalnych społeczności i sieci wsparcia.' },
  { icon: Award, title: 'Mentoring', description: 'Programy mentoringowe dla startupów i młodych.' },
];

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

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
        {/* Left: Content */}
        <div className="max-w-xl">
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
        <div className="hidden lg:flex justify-center lg:justify-end">
          <SceneWrapper className="w-full max-w-md aspect-square" fallbackColor="#8FD2E9">
            <FoundationScene />
          </SceneWrapper>
        </div>
      </div>

      {/* Feature cards with TiltCard */}
      <div className="mt-8 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {FOUNDATION_FEATURES.map((feature, i) => (
          <TiltCard
            key={feature.title}
            maxTilt={12}
            scale={1.03}
            accentColor="#8FD2E9"
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
