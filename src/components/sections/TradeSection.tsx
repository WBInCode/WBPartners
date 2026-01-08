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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left: Content */}
        <div className="max-w-xl mx-auto md:mx-0">
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
            className="mb-8"
            autoIcons
          />

          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary"
              href="/wb-trade"
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

        {/* Right: 3D Scene */}
        <div className="hidden md:flex justify-center md:justify-end">
          <SceneWrapper className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-md aspect-square" fallbackColor="#DB5F1B">
            <TradeScene />
          </SceneWrapper>
        </div>
      </div>
    </Section>
  );
}
