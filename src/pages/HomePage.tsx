import { useCallback } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { ScrollIndicator } from '../components/layout/ScrollIndicator'
import { ScrollProgress } from '../components/ui/ScrollProgress'
import { BackToTop } from '../components/ui/BackToTop'
import { Footer } from '../components/layout/Footer'
import { useScrollToSection } from '../hooks/useScrollToSection'
import { useActiveSection } from '../hooks/useActiveSection'
import { useHashNavigation } from '../hooks/useHashNavigation'

// Section components
import { IntroSection } from '../components/sections/IntroSection'
import { TradeSection } from '../components/sections/TradeSection'
import { InCodeSection } from '../components/sections/InCodeSection'
import { RentSection } from '../components/sections/RentSection'
import { FoundationSection } from '../components/sections/FoundationSection'
import { ContactSection } from '../components/sections/ContactSection'

export function HomePage() {
  const scrollToSection = useScrollToSection();
  const activeSection = useActiveSection();

  // Handle URL hash navigation (initial load + back/forward)
  useHashNavigation();

  // Memoized navigation handler
  const handleNavigate = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
  }, [scrollToSection]);

  // Memoized skip link handler
  const handleSkipLink = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('intro');
  }, [scrollToSection]);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-[var(--bg)] overscroll-none touch-pan-y">
      {/* Skip to content link for accessibility */}
      <a
        href="#intro"
        className="skip-link"
        onClick={handleSkipLink}
      >
        Przejdź do treści
      </a>

      <ScrollProgress />
      <Navbar activeSection={activeSection} />
      <ScrollIndicator activeSection={activeSection} onDotClick={handleNavigate} />
      <BackToTop />

      <main id="main-content" role="main">
        <IntroSection onNavigate={handleNavigate} />
        <TradeSection onNavigate={handleNavigate} />
        <InCodeSection onNavigate={handleNavigate} />
        <RentSection onNavigate={handleNavigate} />
        <FoundationSection onNavigate={handleNavigate} />
        <ContactSection />
      </main>

      <div className="snap-start">
        <Footer />
      </div>
    </div>
  )
}
