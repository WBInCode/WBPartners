import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../utils';

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function Counter({ value, suffix = '', label, duration = 2 }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      // Easing function (ease-out-cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setCount(start);

      if (now >= endTime) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center px-2"
    >
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--wb-primary)]">
        {count.toLocaleString('pl-PL')}
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{suffix}</span>
      </div>
      <div className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">{label}</div>
    </motion.div>
  );
}

interface StatsCounterProps {
  stats: Array<{
    value: number;
    suffix?: string;
    label: string;
  }>;
  className?: string;
}

/**
 * StatsCounter - animowane liczniki statystyk
 */
export function StatsCounter({ stats, className }: StatsCounterProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8', className)}>
      {stats.map((stat, index) => (
        <Counter
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          duration={2 + index * 0.2}
        />
      ))}
    </div>
  );
}
