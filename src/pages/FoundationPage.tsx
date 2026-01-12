import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AnimatedChipGroup } from '../components/ui/AnimatedChipGroup';
import { Logo } from '../components/ui/Logo';

/**
 * WB Foundation - Strona podrzędna
 * Strona w budowie z informacjami o fundacji
 */
export function FoundationPage() {
  const chips = ['CSR', 'Edukacja', 'Społeczność', 'Mentoring', 'Granty'];
  const accentColor = 'var(--accent-foundation)';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7fa] via-[#e8f4f8] to-[#dceef5] text-gray-900">
      {/* Header - tylko logo */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 xs:h-16 sm:h-[72px] bg-white/70 backdrop-blur-xl backdrop-saturate-150">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          {/* Logo - po lewej */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size="md" clickable />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-[#8FD2E9]/20 text-[#2a8ab0] px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-[#2a8ab0] rounded-full animate-pulse" />
                STRONA W BUDOWIE
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                WB Foundation
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                Budujemy lepszą przyszłość poprzez społeczność i innowacje. 
                Nasza nowa platforma wystartuje już wkrótce, łącząc liderów zmian 
                z realnym wpływem społecznym.
              </motion.p>

              {/* Chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <AnimatedChipGroup 
                  chips={chips}
                  variant="accent"
                  accentColor={accentColor}
                  className="justify-start"
                />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <Button 
                  variant="primary"
                  href="mailto:kontakt@wb-partners.pl?subject=WB Foundation - Powiadom mnie"
                  className="!bg-[var(--accent-foundation)] hover:!opacity-90 !rounded-lg !px-6 sm:!px-8 !py-3"
                >
                  <Mail size={18} className="mr-2" />
                  Powiadom mnie
                </Button>
                <Button 
                  variant="outline"
                  href="/#kontakt"
                  className="!border-[var(--accent-foundation)] !text-[var(--accent-foundation)] hover:!bg-[var(--accent-foundation)]/10 !rounded-lg !px-6 sm:!px-8 !py-3"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Kontakt
                </Button>
              </motion.div>

              {/* Back link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-[#2a8ab0] transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  Wróć na stronę główną WB Partners
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: 3D Heart Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden lg:flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Background circle */}
                <div className="w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] rounded-full bg-gradient-to-br from-[#c5e4ef]/60 to-[#8FD2E9]/30 flex items-center justify-center">
                  {/* Card with heart */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[280px] h-[280px] xl:w-[340px] xl:h-[340px] bg-gradient-to-br from-[#6bb8d4] to-[#4a9fc2] rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden"
                  >
                    {/* Decorative circles */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full" />
                    <div className="absolute top-4 right-14 w-4 h-4 bg-white/10 rounded-full" />
                    
                    {/* Heart icon */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Heart 
                        size={120} 
                        className="text-[#4a9fc2] drop-shadow-lg" 
                        fill="#5aafce"
                        strokeWidth={1}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Floating icon */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-8 left-8 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <Heart size={28} className="text-[#2a8ab0]" fill="#2a8ab0" />
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile heart visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:hidden flex justify-center"
            >
              <div className="w-48 h-48 bg-gradient-to-br from-[#6bb8d4] to-[#4a9fc2] rounded-3xl shadow-xl flex items-center justify-center">
                <Heart size={80} className="text-[#4a9fc2]" fill="#5aafce" strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
