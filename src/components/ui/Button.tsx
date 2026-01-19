import { motion } from 'framer-motion';
import { cn } from '../../utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Button komponent
 * - Warianty: primary, secondary, outline, ghost
 * - Rozmiary: sm, md, lg
 * - Opcjonalna ikona (left/right)
 * - Loading state
 * - Accessibility
 * - Animacje zawsze włączone
 */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}: ButtonProps) {
  // Variant styles
  const variantStyles: Record<ButtonVariant, string> = {
    primary: cn(
      'bg-[var(--wb-primary)] text-white',
      'hover:bg-[var(--wb-secondary)]',
      'focus:ring-[var(--wb-primary)]'
    ),
    secondary: cn(
      'bg-[var(--wb-secondary)] text-white',
      'hover:bg-[var(--wb-accent)]',
      'focus:ring-[var(--wb-secondary)]'
    ),
    outline: cn(
      'border-2 border-[var(--wb-primary)] text-[var(--wb-primary)] bg-transparent',
      'hover:bg-[var(--wb-primary)]/5',
      'focus:ring-[var(--wb-primary)]'
    ),
    ghost: cn(
      'text-[var(--wb-primary)] bg-transparent',
      'hover:bg-[var(--wb-primary)]/10',
      'focus:ring-[var(--wb-primary)]'
    ),
  };

  // Size styles - responsywne z większymi tap targets na mobile
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm gap-1.5 min-h-[36px] sm:min-h-[40px]',
    md: 'px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base gap-2 min-h-[40px] sm:min-h-[48px]',
    lg: 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg gap-2.5 min-h-[48px] sm:min-h-[56px]',
  };

  const buttonClasses = cn(
    // Base styles
    'inline-flex items-center justify-center',
    'font-medium rounded-lg',
    'transition-all duration-200',
    // Focus ring
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    // Disabled state
    'disabled:opacity-50 disabled:cursor-not-allowed',
    // Variant
    variantStyles[variant],
    // Size
    sizeStyles[size],
    // Custom
    className
  );

  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : iconLeft ? (
        <span className="flex-shrink-0">{iconLeft}</span>
      ) : null}
      <span>{children}</span>
      {iconRight && !loading && (
        <span className="flex-shrink-0">{iconRight}</span>
      )}
    </>
  );

  // If href is provided, render as anchor with animation
  if (href && !disabled && !loading) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        aria-disabled={disabled}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  // Disabled or loading - no animation
  if (disabled || loading) {
    return (
      <button
        className={buttonClasses}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {content}
      </button>
    );
  }

  // Default - animated button
  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || loading}
      aria-busy={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={props.onClick}
      type={props.type}
      form={props.form}
      name={props.name}
      value={props.value}
    >
      {content}
    </motion.button>
  );
}
