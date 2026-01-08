import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedChipGroup } from '../ui/AnimatedChipGroup';
import { Button } from '../ui/Button';
import { FeatureCard } from '../ui/FeatureCard';
import { TiltCard } from '../ui/TiltCard';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { SceneWrapper, TradeScene } from '../3d';
import { ShoppingCart, TrendingUp, Package, BarChart3 } from 'lucide-react';
import wbTradeLogo from '../../assets/wb-trade-logo.png';

interface TradeSectionProps {
  onNavigate?: (sectionId: string) => void;
}

// Features dla Trade
const TRADE_FEATURES = [
  { icon: ShoppingCart, title: 'Sklepy online', description: 'Kompleksowe rozwiązania e-commerce dla B2B i B2C.' },
  { icon: TrendingUp, title: 'Wzrost sprzedaży', description: 'Optymalizacja konwersji i strategia marketplace.' },
  { icon: Package, title: 'Logistyka', description: 'Integracje z kurierami i zarządzanie magazynem.' },
  { icon: BarChart3, title: 'Analytics', description: 'Zaawansowana analityka i raportowanie.' },
];

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

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
        {/* Left: Content */}
        <div className="max-w-xl">
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
        <div className="hidden lg:flex justify-center lg:justify-end">
          <SceneWrapper className="w-full max-w-md aspect-square" fallbackColor="#DB5F1B">
            <TradeScene />
          </SceneWrapper>
        </div>
      </div>

      {/* Feature cards with TiltCard */}
      <div className="mt-8 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {TRADE_FEATURES.map((feature, i) => (
          <TiltCard
            key={feature.title}
            maxTilt={12}
            scale={1.03}
            accentColor="#DB5F1B"
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
