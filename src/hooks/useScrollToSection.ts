import { useCallback } from 'react';
import { scrollToElement } from '../utils';

/**
 * Hook to scroll to a section by ID
 * Updates URL hash for browser back/forward support
 */
export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string, updateHash: boolean = true) => {
    // Remove # if present
    const id = sectionId.replace('#', '');
    scrollToElement(id, 72);
    
    // Update URL hash without triggering scroll
    if (updateHash && window.history) {
      // Use replaceState to avoid cluttering history
      window.history.replaceState(null, '', `#${id}`);
    }
  }, []);

  return scrollToSection;
}
