import { useEffect } from 'react';
import { useScrollToSection } from './useScrollToSection';

const VALID_SECTIONS = ['intro', 'wb-trade', 'wb-incode', 'wb-rent', 'wb-foundation', 'kontakt'];

/**
 * Hook to handle URL hash navigation
 * - Scrolls to section on page load if hash present
 * - Handles browser back/forward buttons
 * - Supports keyboard navigation with Enter on hash links
 */
export function useHashNavigation() {
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    // Handle initial hash on page load
    const handleInitialHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && VALID_SECTIONS.includes(hash)) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          scrollToSection(hash, false);
        }, 100);
      }
    };

    // Handle popstate (browser back/forward)
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && VALID_SECTIONS.includes(hash)) {
        scrollToSection(hash, false);
      } else {
        // If no hash or invalid, scroll to intro
        scrollToSection('intro', false);
      }
    };

    // Run on mount
    handleInitialHash();

    // Listen for popstate
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [scrollToSection]);
}
