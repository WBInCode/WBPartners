import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor?: string;
  delay?: number;
}

/**
 * FeatureCard - karta z ikoną, tytułem i opisem
 * - Animowane wejście
 * - Hover effects
 * - Gradient accent
 */
export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  accentColor = 'var(--wb-primary)',
  delay = 0
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        'relative group',
        'bg-white/80 backdrop-blur-sm',
        'rounded-xl p-4 md:p-6',
        'border border-gray-100',
        'shadow-sm hover:shadow-lg',
        'transition-shadow duration-300'
      )}
    >
      {/* Gradient accent bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: accentColor }}
      />
      
      {/* Icon */}
      <div 
        className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4"
        style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)` }}
      >
        <Icon 
          className="w-5 h-5 md:w-6 md:h-6"
          style={{ color: accentColor }}
        />
      </div>
      
      {/* Content */}
      <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{title}</h3>
      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
