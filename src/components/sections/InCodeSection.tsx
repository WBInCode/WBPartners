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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
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
            className="mb-4 xs:mb-5 sm:mb-6 md:mb-8 justify-center lg:justify-start"
            autoIcons
          />

          <div className="flex flex-col xs:flex-row flex-wrap gap-2 xs:gap-3 sm:gap-4 justify-center lg:justify-start">
            <Button 
              variant="primary"
              href="https://wb-incode.pl/"
              target="_blank"
              rel="noopener noreferrer"
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

        {/* Right: 3D Scene - ukryte na mobile, widoczne od lg */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <SceneWrapper className="w-full max-w-[240px] md:max-w-[280px] lg:max-w-[360px] xl:max-w-md aspect-square" fallbackColor="#52F066">
            <InCodeScene />
          </SceneWrapper>
        </div>
      </div>
    </Section>
  );
}
