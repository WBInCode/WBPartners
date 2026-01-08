import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedChipGroup } from '../ui/AnimatedChipGroup';
import { Button } from '../ui/Button';
import { FeatureCard } from '../ui/FeatureCard';
import { TiltCard } from '../ui/TiltCard';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { SceneWrapper, InCodeScene } from '../3d';
import { Code2, Smartphone, Cloud, Settings } from 'lucide-react';
import wbInCodeLogo from '../../assets/wb-incode-logo.svg';

interface InCodeSectionProps {
  onNavigate?: (sectionId: string) => void;
}

// Features dla InCode
const INCODE_FEATURES = [
  { icon: Code2, title: 'Web Apps', description: 'Aplikacje webowe React, Vue, Angular i Next.js.' },
  { icon: Smartphone, title: 'Mobile', description: 'Natywne i cross-platform (React Native, Flutter).' },
  { icon: Cloud, title: 'Cloud', description: 'AWS, Azure, GCP - architektura i wdrożenia.' },
  { icon: Settings, title: 'DevOps', description: 'CI/CD, Docker, Kubernetes, monitoring.' },
];

/**
 * Sekcja WB InCode
 * - Nagłówek "WB InCode"
 * - Opis software house
 * - Feature cards z ikonami
 */
export function InCodeSection({ onNavigate }: InCodeSectionProps) {
  const chips = ['Web Development', 'Mobile Apps', 'Cloud', 'DevOps', 'Consulting'];
  const accentColor = 'var(--accent-incode)';

  return (
    <Section id="wb-incode" accentColor={accentColor} withGlow ariaLabel="WB InCode - software house" className="section-incode section-bg relative">
      {/* Animated background */}
      <AnimatedBackground 
        variant="particles" 
        primaryColor="#52F066" 
        particleCount={25}
        opacity={0.5}
      />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
        {/* Left: Content */}
        <div className="max-w-xl">
          <SectionHeader
            title="WB InCode"
            subtitle="Software house z pasją do kodu"
            description="Software house specjalizujący się w tworzeniu dedykowanych aplikacji webowych i mobilnych. Od MVP po skalowalne systemy enterprise."
            titleColor={accentColor}
            logoSrc={wbInCodeLogo}
            logoAlt="WB InCode Logo"
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
              href="/wb-incode"
              className="!bg-[var(--accent-incode)] hover:!opacity-90"
            >
              Przejdź
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate?.('wb-rent')}
              className="!border-[var(--accent-incode)] !text-[var(--accent-incode)] hover:!bg-[var(--accent-incode)]/5"
            >
              Następna sekcja
            </Button>
          </div>
        </div>

        {/* Right: 3D Scene */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <SceneWrapper className="w-full max-w-md aspect-square" fallbackColor="#52F066">
            <InCodeScene />
          </SceneWrapper>
        </div>
      </div>

      {/* Feature cards with TiltCard */}
      <div className="mt-8 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {INCODE_FEATURES.map((feature, i) => (
          <TiltCard
            key={feature.title}
            maxTilt={12}
            scale={1.03}
            accentColor="#52F066"
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
