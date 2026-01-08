import { cn } from '../../utils';

type ChipVariant = 'primary' | 'accent' | 'muted';
type ChipSize = 'sm' | 'md';

interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  icon?: React.ReactNode;
  accentColor?: string;
  className?: string;
}

/**
 * Chip komponent
 * - Warianty: primary, accent, muted
 * - Rozmiary: sm, md
 * - Pill shape (rounded-full)
 * - Opcjonalna ikona
 * - Customowy accent color
 */
export function Chip({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  accentColor,
  className,
}: ChipProps) {
  // Variant styles
  const variantStyles: Record<ChipVariant, string> = {
    primary: 'bg-[var(--wb-primary)]/10 text-[var(--wb-primary)]',
    accent: accentColor 
      ? '' // Custom accent color handled separately
      : 'bg-[var(--wb-accent)]/10 text-[var(--wb-accent)]',
    muted: 'bg-gray-100 text-gray-600',
  };

  // Size styles
  const sizeStyles: Record<ChipSize, string> = {
    sm: 'px-3 py-1 text-xs gap-1',
    md: 'px-4 py-2 text-sm gap-1.5',
  };

  // Custom accent color styles
  const customAccentStyle = accentColor && variant === 'accent'
    ? {
        backgroundColor: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
        color: accentColor,
      }
    : undefined;

  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'font-medium rounded-full',
        // Transition for hover
        'transition-colors duration-200',
        // Hover effect (optional)
        'hover:opacity-80',
        // Variant (if not custom accent)
        !customAccentStyle && variantStyles[variant],
        // Size
        sizeStyles[size],
        // Custom
        className
      )}
      style={customAccentStyle}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
