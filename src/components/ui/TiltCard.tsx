import { useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maksymalny kąt przechylenia w stopniach */
  maxTilt?: number;
  /** Skala powiększenia na hover */
  scale?: number;
  /** Intensywność efektu świecenia */
  glareIntensity?: number;
  /** Kolor akcentu dla glow */
  accentColor?: string;
  /** Czy wyłączyć efekt 3D */
  disabled?: boolean;
}

/**
 * TiltCard - Karta z efektem 3D tilt na hover
 * - Śledzi pozycję myszy
 * - Płynne przechylenia 3D
 * - Efekt świecenia (glare)
 * - Dynamiczny shadow
 */
export function TiltCard({
  children,
  className,
  maxTilt = 15,
  scale = 1.02,
  glareIntensity = 0.3,
  accentColor = 'rgba(10, 69, 123, 0.15)',
  disabled = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for smooth animations
  const springConfig = { stiffness: 300, damping: 30 };
  
  // Transform mouse position to rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);
  
  // Glare position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize mouse position to -0.5 to 0.5
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        scale: isHovered && !disabled ? scale : 1,
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative overflow-hidden',
        'transition-shadow duration-300',
        isHovered && !disabled && 'shadow-xl',
        className
      )}
    >
      {/* Glare effect overlay */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => 
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,${isHovered ? glareIntensity : 0}) 0%, transparent 50%)`
            ),
          }}
        />
      )}

      {/* Dynamic shadow layer */}
      {!disabled && isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-inherit"
          style={{
            boxShadow: `0 20px 40px -10px ${accentColor}`,
            transform: 'translateZ(-50px)',
          }}
        />
      )}

      {/* Content with 3D lift */}
      <div
        style={{
          transform: isHovered && !disabled ? 'translateZ(20px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/**
 * TiltCardContent - wrapper dla contentu który ma być "wyżej" w 3D
 */
interface TiltCardContentProps {
  children: ReactNode;
  className?: string;
  elevation?: number;
}

export function TiltCardContent({ 
  children, 
  className,
  elevation = 30 
}: TiltCardContentProps) {
  return (
    <div
      className={className}
      style={{
        transform: `translateZ(${elevation}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}
