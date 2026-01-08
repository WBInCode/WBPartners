import { useState, useEffect } from 'react';
import { SECTIONS } from '../constants/content';

/**
 * Hook to track the currently active section using IntersectionObserver
 */
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('intro');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: '-72px 0px 0px 0px', // Account for sticky header
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return activeSection;
}
