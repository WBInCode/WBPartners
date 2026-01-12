import { motion } from 'framer-motion';
import { cn } from '../../utils';
import { Chip } from './Chip';
import { staggerContainer, staggerItem } from '../../hooks/useAnimations';

type ChipVariant = 'primary' | 'accent' | 'muted';
type ChipSize = 'sm' | 'md';

interface ChipGroupProps {
  chips: string[];
  variant?: ChipVariant;
  size?: ChipSize;
  accentColor?: string;
  className?: string;
}

/**
 * ChipGroup komponent
 * - Flex wrap layout
 * - Gap między chipami
 * - Akceptuje tablicę stringów
 * - Staggered animation - zawsze włączone
 */
export function ChipGroup({
  chips,
  variant = 'primary',
  size = 'md',
  accentColor,
  className,
}: ChipGroupProps) {
  return (
    <motion.div
      className={cn('flex flex-wrap gap-2 md:gap-3', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {chips.map((chip, index) => (
        <motion.div key={`${chip}-${index}`} variants={staggerItem}>
          <Chip
            variant={variant}
            size={size}
            accentColor={accentColor}
          >
            {chip}
          </Chip>
        </motion.div>
      ))}
    </motion.div>
  );
}
