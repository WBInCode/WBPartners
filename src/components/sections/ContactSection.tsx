import { memo } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { ContactForm } from '../ui/ContactForm';
import { ContactInfo } from '../ui/ContactInfo';

/**
 * Sekcja Kontakt
 * - Nagłówek "Kontakt"
 * - Opis zachęcający do kontaktu
 * - Grid: formularz po lewej, info po prawej
 * - Responsywność: stack na mobile, pełna responsywność dla wszystkich urządzeń
 * - Pełnoekranowy layout z lepszym wykorzystaniem przestrzeni
 */
export const ContactSection = memo(function ContactSection() {
  return (
    <Section id="kontakt" ariaLabel="Formularz kontaktowy" className="section-contact section-bg">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <SectionHeader
            title="Kontakt"
            subtitle="Porozmawiajmy o Twoim projekcie"
            description="Masz pomysł na projekt? Chcesz dowiedzieć się więcej o naszych usługach? Napisz do nas – odpowiemy najszybciej jak to możliwe."
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 md:gap-5 lg:gap-8 items-start mt-3 xs:mt-4 md:mt-6">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[var(--bg-card)] rounded-lg xs:rounded-xl shadow-lg p-2.5 xs:p-3 sm:p-4 md:p-5 border border-[var(--border)] text-[var(--text)] transition-colors duration-200">
              <h3 className="text-sm xs:text-base md:text-lg font-semibold text-[var(--text)] mb-2 xs:mb-3 md:mb-4">Wyślij wiadomość</h3>
              <ContactForm />
            </div>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </Section>
  );
});
