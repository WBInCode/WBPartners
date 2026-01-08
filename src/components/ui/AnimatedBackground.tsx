import { useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '../../utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface AnimatedBackgroundProps {
  /** Typ animacji tła */
  variant?: 'particles' | 'gradient' | 'mesh' | 'dots';
  /** Kolor główny */
  primaryColor?: string;
  /** Kolor dodatkowy */
  secondaryColor?: string;
  /** Liczba cząsteczek (dla variant="particles") */
  particleCount?: number;
  /** Prędkość animacji (1 = normalna) */
  speed?: number;
  /** Dodatkowe klasy CSS */
  className?: string;
  /** Przezroczystość (0-1) */
  opacity?: number;
}

/**
 * AnimatedBackground - Animowane tło z różnymi efektami
 * - particles: pływające cząsteczki
 * - gradient: animowany gradient shift
 * - mesh: siatka gradientowa
 * - dots: animowana siatka kropek
 */
export function AnimatedBackground({
  variant = 'gradient',
  primaryColor = 'var(--wb-primary)',
  secondaryColor = 'var(--wb-secondary)',
  particleCount = 30,
  speed = 1,
  className,
  opacity = 0.6,
}: AnimatedBackgroundProps) {
  switch (variant) {
    case 'particles':
      return (
        <ParticlesBackground
          primaryColor={primaryColor}
          particleCount={particleCount}
          speed={speed}
          className={className}
          opacity={opacity}
        />
      );
    case 'gradient':
      return (
        <GradientBackground
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          speed={speed}
          className={className}
          opacity={opacity}
        />
      );
    case 'mesh':
      return (
        <MeshBackground
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          speed={speed}
          className={className}
          opacity={opacity}
        />
      );
    case 'dots':
      return (
        <DotsBackground
          primaryColor={primaryColor}
          speed={speed}
          className={className}
          opacity={opacity}
        />
      );
    default:
      return null;
  }
}

/**
 * Pływające cząsteczki
 */
function ParticlesBackground({
  primaryColor,
  particleCount,
  speed,
  className,
  opacity,
}: {
  primaryColor: string;
  particleCount: number;
  speed: number;
  className?: string;
  opacity: number;
}) {
  const particles = useMemo<Particle[]>(() => 
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: (Math.random() * 20 + 15) / speed,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }))
  , [particleCount, speed]);

  return (
    <div 
      className={cn('absolute inset-0 overflow-hidden pointer-events-none -z-10', className)}
      style={{ opacity }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: primaryColor,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Animowany gradient shift
 */
function GradientBackground({
  primaryColor,
  secondaryColor,
  speed,
  className,
  opacity,
}: {
  primaryColor: string;
  secondaryColor: string;
  speed: number;
  className?: string;
  opacity: number;
}) {
  const gradientAngle = useMotionValue(0);
  
  useEffect(() => {
    const controls = animate(gradientAngle, 360, {
      duration: 20 / speed,
      repeat: Infinity,
      ease: 'linear',
    });
    return controls.stop;
  }, [gradientAngle, speed]);

  const background = useTransform(
    gradientAngle,
    (angle) => `linear-gradient(${angle}deg, ${primaryColor}20 0%, ${secondaryColor}15 50%, ${primaryColor}10 100%)`
  );

  return (
    <motion.div
      className={cn('absolute inset-0 pointer-events-none -z-10', className)}
      style={{ background, opacity }}
    />
  );
}

/**
 * Animowana siatka gradientowa (mesh gradient)
 */
function MeshBackground({
  primaryColor,
  secondaryColor,
  speed,
  className,
  opacity,
}: {
  primaryColor: string;
  secondaryColor: string;
  speed: number;
  className?: string;
  opacity: number;
}) {
  return (
    <div 
      className={cn('absolute inset-0 overflow-hidden pointer-events-none -z-10', className)}
      style={{ opacity }}
    >
      {/* Blob 1 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${primaryColor}30 0%, transparent 70%)`,
          left: '-10%',
          top: '-10%',
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25 / speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Blob 2 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${secondaryColor}25 0%, transparent 70%)`,
          right: '-5%',
          bottom: '-5%',
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, -60, -100, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 20 / speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Blob 3 */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${primaryColor}20 0%, transparent 70%)`,
          right: '30%',
          top: '20%',
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.3, 0.85, 1],
        }}
        transition={{
          duration: 30 / speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/**
 * Animowana siatka kropek
 */
function DotsBackground({
  primaryColor,
  speed,
  className,
  opacity,
}: {
  primaryColor: string;
  speed: number;
  className?: string;
  opacity: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const dotSpacing = 40;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cols = Math.ceil(canvas.width / dotSpacing) + 1;
      const rows = Math.ceil(canvas.height / dotSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;
          
          // Wave effect
          const wave = Math.sin((i + j) * 0.3 + time * speed * 0.02) * 0.5 + 0.5;
          const size = 1.5 + wave * 2;
          const alpha = 0.15 + wave * 0.2;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor.startsWith('var(') 
            ? `rgba(10, 69, 123, ${alpha})`
            : primaryColor.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
          ctx.fill();
        }
      }

      time++;
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [primaryColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none -z-10 w-full h-full', className)}
      style={{ opacity }}
    />
  );
}
