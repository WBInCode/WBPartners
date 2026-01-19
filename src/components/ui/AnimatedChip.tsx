import { motion } from 'framer-motion';
import { cn } from '../../utils';

type ChipVariant = 'primary' | 'accent' | 'muted';
type ChipSize = 'sm' | 'md';

interface AnimatedChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  icon?: React.ReactNode;
  accentColor?: string;
  className?: string;
  /** Opóźnienie animacji (w sekundach) */
  delay?: number;
}

/**
 * AnimatedChip - Chip z animowanymi ikonami i efektami hover
 * - Pulse animation na ikonie
 * - Scale i glow na hover
 * - Staggered entrance animation
 */
export function AnimatedChip({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  accentColor,
  className,
  delay = 0,
}: AnimatedChipProps) {
  // Variant styles
  const variantStyles: Record<ChipVariant, string> = {
    primary: 'bg-[var(--wb-primary)]/10 text-[var(--wb-primary)]',
    accent: accentColor
      ? ''
      : 'bg-[var(--wb-accent)]/10 text-[var(--wb-accent)]',
    muted: 'bg-gray-100 text-gray-600',
  };

  // Size styles - responsywne
  const sizeStyles: Record<ChipSize, string> = {
    sm: 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs gap-1 sm:gap-1.5',
    md: 'px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm gap-1.5 sm:gap-2',
  };

  // Custom accent color styles
  const customAccentStyle = accentColor && variant === 'accent'
    ? {
      backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
      // Darken the text color for better visibility on light backgrounds
      color: `color-mix(in srgb, ${accentColor}, black 40%)`,
    }
    : undefined;

  return (
    <motion.span
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.4,
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
      whileHover={{
        scale: 1.08,
        boxShadow: accentColor
          ? `0 4px 20px ${accentColor}40`
          : '0 4px 20px rgba(10, 69, 123, 0.2)',
      }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center cursor-pointer',
        'font-medium rounded-full',
        // Smooth transitions
        'transition-colors duration-200',
        // Variant (if not custom accent)
        !customAccentStyle && variantStyles[variant],
        // Size
        sizeStyles[size],
        // Custom
        className
      )}
      style={customAccentStyle}
    >
      {icon && (
        <motion.span
          className="flex-shrink-0"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.span>
      )}
      {children}
    </motion.span>
  );
}
