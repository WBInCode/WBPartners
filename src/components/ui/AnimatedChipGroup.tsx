import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils';
import { AnimatedChip } from './AnimatedChip';
import { staggerContainer } from '../../hooks/useAnimations';
import { 
  ShoppingCart, Code2, Building2, Heart, 
  Truck, BarChart3, Smartphone, Cloud,
  Key, Calendar, Users, Lightbulb,
  Globe, Package, Settings, Sparkles,
  FileCode, Server, Database, Container
} from 'lucide-react';

type ChipVariant = 'primary' | 'accent' | 'muted';
type ChipSize = 'sm' | 'md';

// Mapowanie słów na ikony
const CHIP_ICON_MAP: Record<string, LucideIcon> = {
  // Trade
  'E-commerce': ShoppingCart,
  'B2B': Package,
  'Marketplace': Globe,
  'Logistyka': Truck,
  'Analytics': BarChart3,
  // InCode - technologie
  'Web Development': Code2,
  'Software': Code2,
  'Mobile Apps': Smartphone,
  'Cloud': Cloud,
  'DevOps': Settings,
  'React': Code2,
  'TypeScript': FileCode,
  'Node.js': Server,
  'Python': FileCode,
  'AWS': Cloud,
  'Docker': Container,
  'Database': Database,
  // Rent
  'Nieruchomości': Building2,
  'Wynajem': Key,
  'Rezerwacje': Calendar,
  'CRM': Users,
  'Usługi': Settings,
  // Foundation
  'CSR': Heart,
  'Edukacja': Lightbulb,
  'Społeczność': Users,
  'Mentoring': Sparkles,
  'Inicjatywy': Heart,
};

interface ChipData {
  label: string;
  icon?: LucideIcon;
}

interface AnimatedChipGroupProps {
  chips: (string | ChipData)[];
  variant?: ChipVariant;
  size?: ChipSize;
  accentColor?: string;
  className?: string;
  /** Czy automatycznie dodawać ikony na podstawie tekstu */
  autoIcons?: boolean;
}

/**
 * AnimatedChipGroup - grupa chipów z animowanymi ikonami
 * - Automatyczne przypisywanie ikon na podstawie tekstu
 * - Staggered entrance animation
 * - Pulsujące ikony
 */
export function AnimatedChipGroup({
  chips,
  variant = 'primary',
  size = 'md',
  accentColor,
  className,
  autoIcons = true,
}: AnimatedChipGroupProps) {
  // Normalizacja chipów do formatu ChipData
  const normalizedChips: ChipData[] = chips.map((chip) => {
    if (typeof chip === 'string') {
      return {
        label: chip,
        icon: autoIcons ? CHIP_ICON_MAP[chip] : undefined,
      };
    }
    return chip;
  });

  // Animacje zawsze włączone
  return (
    <motion.div
      className={cn('flex flex-wrap gap-1.5 xs:gap-2 md:gap-3', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {normalizedChips.map((chip, index) => (
        <AnimatedChip
          key={`${chip.label}-${index}`}
          variant={variant}
          size={size}
          accentColor={accentColor}
          delay={index * 0.08}
          icon={chip.icon && <chip.icon className="w-3.5 h-3.5" />}
        >
          {chip.label}
        </AnimatedChip>
      ))}
    </motion.div>
  );
}
