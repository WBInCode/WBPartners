import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils';
import { NAV_LINKS } from '../../constants/content';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { useReducedMotionPreference } from '../../hooks/useAnimations';
import { useSwipeDown } from '../../hooks/useSwipeDown';
import { Logo } from '../ui/Logo';

interface NavbarProps {
  activeSection?: string;
}

/**
 * Navbar komponent
 * - Fixed position, h-[72px], z-50
 * - Tło: bg-white/80 backdrop-blur-md
 * - Border-bottom subtelny
 * - Logo "WB Partners" po lewej
 * - Linki nawigacyjne po prawej (desktop)
 * - Hamburger menu (mobile)
 * - Aktywna sekcja podświetlona
 * - Blokada scroll gdy menu otwarte
 * - Shadow przy scrollu
 */
export function Navbar({ activeSection = 'intro' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollToSection = useScrollToSection();
  const prefersReducedMotion = useReducedMotionPreference();
  
  // Swipe down to close menu
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const { offsetY, handlers: swipeHandlers } = useSwipeDown({
    threshold: 80,
    onSwipeDown: closeMenu,
    enabled: isMenuOpen,
  });

  // Wykrywanie scrollu dla efektu shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blokada scroll gdy menu jest otwarte
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup przy unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header
        className={cn(
          // Fixed position
          'fixed top-0 left-0 right-0',
          // Height
          'h-[72px]',
          // Enhanced glassmorphism background
          'bg-white/70 backdrop-blur-xl backdrop-saturate-150',
          // Border - subtle
          'border-b border-white/20',
          // Z-index
          'z-50',
          // Flex layout
          'flex items-center justify-between',
          // Padding
          'px-4 md:px-8',
          // Transition for shadow
          'transition-shadow duration-300',
          // Shadow when scrolled
          isScrolled && 'shadow-lg shadow-gray-200/50'
        )}
      >
        {/* Logo - klikalne, scrolluje do intro */}
        <button
          onClick={() => {
            scrollToSection('#intro');
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wb-primary)] focus-visible:ring-offset-2 rounded-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          title="WB Partners - Strona główna"
          aria-label="WB Partners - Strona główna"
        >
          <Logo size="md" />
          <span className="hidden sm:block font-semibold text-lg tracking-tight text-[var(--wb-primary)] group-hover:text-[var(--wb-primary-dark)] transition-colors">
            WB Partners
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <a
                key={link.sectionId}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  'relative px-4 py-2 rounded-lg text-sm font-medium',
                  'transition-all duration-200',
                  'hover:scale-105',
                  isActive
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
                style={isActive ? { color: link.accentColor } : undefined}
              >
                {link.label}
                {/* Animated underline indicator with section color */}
                {isActive && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{ backgroundColor: link.accentColor }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Hamburger Button (mobile) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={isMenuOpen}
        >
          <span
            className={cn(
              'w-6 h-0.5 bg-[var(--wb-primary)] transition-all duration-300',
              isMenuOpen && 'rotate-45 translate-y-2'
            )}
          />
          <span
            className={cn(
              'w-6 h-0.5 bg-[var(--wb-primary)] transition-all duration-300',
              isMenuOpen && 'opacity-0'
            )}
          />
          <span
            className={cn(
              'w-6 h-0.5 bg-[var(--wb-primary)] transition-all duration-300',
              isMenuOpen && '-rotate-45 -translate-y-2'
            )}
          />
        </button>
      </header>

      {/* Mobile Menu Overlay - fullscreen with backdrop blur */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu - fullscreen style with swipe to close */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
            style={{ 
              transform: offsetY > 0 ? `translateY(${offsetY}px)` : undefined,
              opacity: offsetY > 0 ? 1 - (offsetY / 150) : 1,
            }}
            className={cn(
              'fixed top-[72px] left-0 right-0 bottom-0',
              'bg-white/95 backdrop-blur-xl z-40 lg:hidden',
              'overflow-y-auto',
              'touch-pan-y'
            )}
            {...swipeHandlers}
          >
            {/* Swipe indicator */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>
            
            <div className="flex flex-col p-6 pt-2 gap-2">
              {NAV_LINKS.map((link, index) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <motion.a
                    key={link.sectionId}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    transition={prefersReducedMotion ? {} : { delay: index * 0.08, duration: 0.3 }}
                    className={cn(
                      'px-6 py-4 rounded-xl text-lg font-medium',
                      'transition-all duration-200',
                      'flex items-center gap-3',
                      isActive
                        ? 'text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 active:scale-98'
                    )}
                    style={isActive ? { backgroundColor: link.accentColor } : undefined}
                  >
                    {/* Colored dot indicator */}
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: isActive ? 'white' : link.accentColor,
                        opacity: isActive ? 1 : 0.6
                      }}
                    />
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
            
            {/* Footer w mobile menu */}
            <motion.div 
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? {} : { delay: 0.4 }}
              className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100"
            >
              <p className="text-sm text-gray-500 text-center">
                © 2026 WB Partners. Wszystkie prawa zastrzeżone.
              </p>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
