import { motion } from 'framer-motion';
import { cn } from '../../utils';

interface FloatingShapeProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'square' | 'triangle' | 'blob';
  blur?: boolean;
  delay?: number;
}

/**
 * FloatingShape - dekoracyjne pływające kształty
 */
export function FloatingShape({
  className,
  color = 'var(--wb-primary)',
  size = 'md',
  variant = 'circle',
  blur = true,
  delay = 0,
}: FloatingShapeProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-2xl rotate-45',
    triangle: 'clip-triangle',
    blob: 'rounded-blob',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 0.15, 
        scale: 1,
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay },
        x: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 },
      }}
      className={cn(
        'absolute pointer-events-none',
        sizeClasses[size],
        shapes[variant],
        blur && 'blur-xl',
        className
      )}
      style={{ backgroundColor: color }}
    />
  );
}

interface GlowOrbProps {
  className?: string;
  color?: string;
  size?: number;
  intensity?: number;
}

/**
 * GlowOrb - świecąca kula dekoracyjna
 */
export function GlowOrb({
  className,
  color = 'var(--wb-primary)',
  size = 200,
  intensity = 0.3,
}: GlowOrbProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: intensity,
        scale: [1, 1.1, 1],
      }}
      transition={{
        opacity: { duration: 1 },
        scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={cn('absolute pointer-events-none rounded-full', className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
    />
  );
}

interface GridPatternProps {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}

/**
 * GridPattern - subtelna siatka w tle
 */
export function GridPattern({
  className,
  color = 'var(--wb-primary)',
  size = 40,
  opacity = 0.05,
}: GridPatternProps) {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
}

interface GradientLineProps {
  className?: string;
  startColor?: string;
  endColor?: string;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  animated?: boolean;
}

/**
 * GradientLine - animowana linia gradientowa
 */
export function GradientLine({
  className,
  startColor = 'var(--accent-trade)',
  endColor = 'var(--accent-foundation)',
  direction = 'horizontal',
  animated = true,
}: GradientLineProps) {
  const gradientDirection = {
    horizontal: '90deg',
    vertical: '180deg',
    diagonal: '135deg',
  };

  return (
    <motion.div
      className={cn(
        'pointer-events-none',
        direction === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className
      )}
      style={{
        background: `linear-gradient(${gradientDirection[direction]}, transparent, ${startColor}, ${endColor}, transparent)`,
      }}
      {...(animated && {
        animate: { opacity: [0.3, 0.7, 0.3] },
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      })}
    />
  );
}

interface DecorativeDotsProps {
  className?: string;
  color?: string;
  rows?: number;
  cols?: number;
  gap?: number;
  dotSize?: number;
}

/**
 * DecorativeDots - siatka dekoracyjnych kropek
 */
export function DecorativeDots({
  className,
  color = 'var(--wb-primary)',
  rows = 4,
  cols = 4,
  gap = 8,
  dotSize = 4,
}: DecorativeDotsProps) {
  return (
    <div 
      className={cn('pointer-events-none', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${dotSize}px)`,
        gap: `${gap}px`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ 
            width: dotSize, 
            height: dotSize, 
            backgroundColor: color,
            opacity: 0.2 + (Math.random() * 0.3),
          }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

interface WaveDecoratorProps {
  className?: string;
  color?: string;
  flip?: boolean;
}

/**
 * WaveDecorator - falowa dekoracja między sekcjami
 */
export function WaveDecorator({
  className,
  color = 'var(--bg)',
  flip = false,
}: WaveDecoratorProps) {
  return (
    <div 
      className={cn(
        'absolute left-0 right-0 h-16 pointer-events-none overflow-hidden',
        flip ? 'top-0 rotate-180' : 'bottom-0',
        className
      )}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <motion.path
          d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
          fill={color}
          animate={{
            d: [
              "M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z",
              "M0,50 C360,0 1080,100 1440,50 L1440,100 L0,100 Z",
              "M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}

interface FloatingIconsProps {
  className?: string;
  icons: React.ReactNode[];
  color?: string;
}

/**
 * FloatingIcons - pływające ikony w tle
 */
export function FloatingIcons({
  className,
  icons,
  color = 'var(--wb-primary)',
}: FloatingIconsProps) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + (i * 20) % 80}%`,
            top: `${15 + (i * 25) % 70}%`,
            color,
            opacity: 0.1,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
}
