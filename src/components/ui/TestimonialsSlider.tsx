import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '../../utils';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  accentColor?: string;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

/**
 * TestimonialsSlider - animowany slider z opiniami klientów
 * - Auto-play z możliwością pauzy
 * - Nawigacja strzałkami i kropkami
 * - Animowane przejścia
 * - Responsywny design
 */
export function TestimonialsSlider({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: TestimonialsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, goToNext]);

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div 
      className={cn('relative', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main slider container */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="p-8 md:p-12"
          >
            {/* Quote icon */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
              style={{ 
                backgroundColor: `${currentTestimonial.accentColor || 'var(--wb-primary)'}15` 
              }}
            >
              <Quote 
                className="w-6 h-6"
                style={{ color: currentTestimonial.accentColor || 'var(--wb-primary)' }}
              />
            </div>

            {/* Testimonial content */}
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Author info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ 
                  backgroundColor: currentTestimonial.accentColor || 'var(--wb-primary)' 
                }}
              >
                {currentTestimonial.avatar ? (
                  <img 
                    src={currentTestimonial.avatar} 
                    alt={currentTestimonial.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  currentTestimonial.name.charAt(0).toUpperCase()
                )}
              </div>

              {/* Name and role */}
              <div>
                <div className="font-semibold text-gray-900">
                  {currentTestimonial.name}
                </div>
                <div className="text-sm text-gray-500">
                  {currentTestimonial.role}, {currentTestimonial.company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white hover:shadow-lg transition-all"
          aria-label="Poprzednia opinia"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white hover:shadow-lg transition-all"
          aria-label="Następna opinia"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all duration-300',
              index === currentIndex 
                ? 'w-8 bg-[var(--wb-primary)]' 
                : 'bg-gray-300 hover:bg-gray-400'
            )}
            aria-label={`Przejdź do opinii ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {autoPlay && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden rounded-b-2xl">
          <motion.div
            key={currentIndex}
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? undefined : '100%' }}
            transition={{ 
              duration: autoPlayInterval / 1000, 
              ease: 'linear' 
            }}
            className="h-full bg-[var(--wb-primary)]"
          />
        </div>
      )}
    </div>
  );
}

// Przykładowe testimoniale dla WB Partners
export const WB_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Anna Kowalska',
    role: 'CEO',
    company: 'TechStart Sp. z o.o.',
    content: 'Współpraca z WB InCode to strzał w dziesiątkę. Zespół dostarczył aplikację na czas, a jakość kodu przekroczyła nasze oczekiwania. Polecam każdej firmie szukającej profesjonalnego partnera technologicznego.',
    accentColor: '#52F066',
  },
  {
    id: 2,
    name: 'Michał Nowak',
    role: 'Właściciel',
    company: 'E-Shop Premium',
    content: 'Dzięki WB Trade nasz sklep internetowy zwiększył sprzedaż o 150% w ciągu pierwszego roku. Platforma jest intuicyjna, a wsparcie techniczne na najwyższym poziomie.',
    accentColor: '#DB5F1B',
  },
  {
    id: 3,
    name: 'Katarzyna Wiśniewska',
    role: 'Property Manager',
    company: 'Nieruchomości Pro',
    content: 'WB Rent zrewolucjonizował sposób zarządzania naszym portfelem nieruchomości. Automatyzacja procesów zaoszczędziła nam dziesiątki godzin pracy miesięcznie.',
    accentColor: '#D6AF5B',
  },
  {
    id: 4,
    name: 'Piotr Zieliński',
    role: 'Dyrektor',
    company: 'Fundacja Edukacja+',
    content: 'WB Foundation to partner, który naprawdę rozumie potrzeby sektora non-profit. Ich program mentoringowy pomógł dziesiątkom młodych ludzi rozpocząć kariery w IT.',
    accentColor: '#8FD2E9',
  },
];
