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
 * - Responsywność: stack na mobile
 * - Pełnoekranowy layout
 */
export const ContactSection = memo(function ContactSection() {
  return (
    <Section id="kontakt" ariaLabel="Formularz kontaktowy" className="section-contact section-bg">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Kontakt"
            subtitle="Porozmawiajmy o Twoim projekcie"
            description="Masz pomysł na projekt? Chcesz dowiedzieć się więcej o naszych usługach? Napisz do nas – odpowiemy najszybciej jak to możliwe."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-start mt-4 md:mt-6">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-5 border border-gray-100">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Wyślij wiadomość</h3>
              <ContactForm />
            </div>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </Section>
  );
});
