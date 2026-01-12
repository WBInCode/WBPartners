import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedChipGroup } from '../ui/AnimatedChipGroup';
import { Button } from '../ui/Button';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { SceneWrapper, TradeScene } from '../3d';
import wbTradeLogo from '../../assets/wb-trade-logo.png';

interface TradeSectionProps {
  onNavigate?: (sectionId: string) => void;
}

/**
 * Sekcja WB Trade
 * - Nagłówek "WB Trade"
 * - Opis platformy e-commerce
 * - Chipy: E-commerce, B2B, Marketplace, Logistyka, Analytics
 * - Feature cards z ikonami
 * - CTA primary: "Przejdź" → /wb-trade
 * - CTA secondary: "Następna sekcja" → scroll
 */
export function TradeSection({ onNavigate }: TradeSectionProps) {
  const chips = ['E-commerce', 'B2B', 'Marketplace', 'Logistyka', 'Analytics'];
  const accentColor = 'var(--accent-trade)';

  return (
    <Section id="wb-trade" accentColor={accentColor} withGlow ariaLabel="WB Trade - platforma e-commerce" className="section-trade section-bg relative">
      {/* Animated background */}
      <AnimatedBackground 
        variant="mesh" 
        primaryColor="#DB5F1B" 
        secondaryColor="#E87A3D" 
        opacity={0.4}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <SectionHeader
            title="WB Trade"
            subtitle="Platforma e-commerce nowej generacji"
            description="Platforma e-commerce nowej generacji oferująca kompleksowe rozwiązania dla sprzedaży online. Łączymy technologię z doświadczeniem użytkownika."
            titleColor={accentColor}
            logoSrc={wbTradeLogo}
            logoAlt="WB Trade Logo"
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
              href="https://www.wb-trade.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="!bg-[var(--accent-trade)] hover:!opacity-90"
            >
              Przejdź
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate?.('wb-incode')}
              className="!border-[var(--accent-trade)] !text-[var(--accent-trade)] hover:!bg-[var(--accent-trade)]/5"
            >
              Następna sekcja
            </Button>
          </div>
        </div>

        {/* Right: 3D Scene - ukryte na mobile, widoczne od lg */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <SceneWrapper className="w-full max-w-[240px] md:max-w-[280px] lg:max-w-[360px] xl:max-w-md aspect-square" fallbackColor="#DB5F1B">
            <TradeScene />
          </SceneWrapper>
        </div>
      </div>
    </Section>
  );
}
