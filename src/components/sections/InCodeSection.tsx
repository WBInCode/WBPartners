import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedChipGroup } from '../ui/AnimatedChipGroup';
import { Button } from '../ui/Button';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { SceneWrapper, InCodeScene } from '../3d';
import wbInCodeLogo from '../../assets/wb-incode-logo.svg';

interface InCodeSectionProps {
  onNavigate?: (sectionId: string) => void;
}

/**
 * Sekcja WB InCode
 * - Software house specjalizujący się w programowaniu
 * - Strony internetowe, aplikacje, systemy
 * - Praca z różnymi technologiami i środowiskami
 */
export function InCodeSection({ onNavigate }: InCodeSectionProps) {
  const chips = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'];
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="max-w-xl mx-auto md:mx-0">
          <SectionHeader
            title="WB InCode"
            subtitle="Tworzymy oprogramowanie na miarę"
            description="Software house specjalizujący się w tworzeniu stron internetowych, aplikacji webowych i mobilnych oraz systemów enterprise. Pracujemy z nowoczesnymi technologiami i różnymi środowiskami."
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
              href="https://wb-incode.pl/"
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
        <div className="hidden md:flex justify-center md:justify-end">
          <SceneWrapper className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-md aspect-square" fallbackColor="#52F066">
            <InCodeScene />
          </SceneWrapper>
        </div>
      </div>
    </Section>
  );
}
