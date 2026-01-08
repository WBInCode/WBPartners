import { cn } from '../../utils';
import wbPartnersLogo from '../../assets/wb-partners-logo.png';

type LogoVariant = 'full' | 'icon' | 'monochrome';
type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  onClick?: () => void;
  clickable?: boolean;
  title?: string;
}

const sizeClasses: Record<LogoSize, string> = {
  sm: 'h-6 md:h-7',
  md: 'h-7 md:h-8',
  lg: 'h-10 md:h-12',
  xl: 'h-14 md:h-16 lg:h-20',
};

/**
 * Logo komponent
 * - Warianty: full (pełne logo), icon (ikona), monochrome
 * - Responsywne rozmiary: sm, md, lg, xl
 * - Opcjonalna animacja hover
 * - Klikalne z focus state dla accessibility
 */
export function Logo({
  variant = 'full',
  size = 'md',
  className,
  onClick,
  clickable = false,
  title = 'WB Partners',
}: LogoProps) {
  const isClickable = clickable || !!onClick;

  const logoElement = (
    <img
      src={wbPartnersLogo}
      alt={title}
      className={cn(
        sizeClasses[size],
        'w-auto object-contain',
        // Monochrome filter
        variant === 'monochrome' && 'grayscale brightness-0 invert',
        // Icon variant - cropped
        variant === 'icon' && 'max-w-[48px]',
        className
      )}
    />
  );

  if (isClickable) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'inline-flex items-center',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wb-primary)] focus-visible:ring-offset-2',
          'rounded-md',
          'transition-transform duration-200',
          'hover:scale-105',
          'active:scale-95',
          'cursor-pointer'
        )}
        title={title}
        aria-label={`${title} - Strona główna`}
      >
        {logoElement}
      </button>
    );
  }

  return logoElement;
}
