import { memo } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { ContactForm } from '../ui/ContactForm';
import { ContactInfo } from '../ui/ContactInfo';
import { TestimonialsSlider, WB_TESTIMONIALS } from '../ui/TestimonialsSlider';
import { DecorativeDots, GlowOrb } from '../ui/DecorativeElements';

/**
 * Sekcja Kontakt
 * - Nagłówek "Kontakt"
 * - Opis zachęcający do kontaktu
 * - Testimonials slider
 * - Grid: formularz po lewej, info po prawej
 * - Responsywność: stack na mobile
 * - Profesjonalny layout z animacjami
 * - Elementy dekoracyjne
 */
export const ContactSection = memo(function ContactSection() {
  return (
    <Section id="kontakt" ariaLabel="Formularz kontaktowy" className="section-contact section-bg !py-16 lg:!py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <GlowOrb 
        className="left-[-100px] top-[20%]" 
        color="var(--accent-trade)" 
        size={300} 
        intensity={0.15} 
      />
      <GlowOrb 
        className="right-[-100px] bottom-[30%]" 
        color="var(--accent-incode)" 
        size={250} 
        intensity={0.12} 
      />
      <DecorativeDots 
        className="absolute top-20 right-10 hidden lg:block" 
        color="var(--wb-primary)" 
        rows={5} 
        cols={5}
      />
      <DecorativeDots 
        className="absolute bottom-40 left-10 hidden lg:block" 
        color="var(--accent-foundation)" 
        rows={4} 
        cols={4}
      />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
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

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 lg:mt-12 mb-12 lg:mb-16"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Co mówią nasi klienci</h3>
          <TestimonialsSlider 
            testimonials={WB_TESTIMONIALS} 
            autoPlay 
            autoPlayInterval={6000}
            className="max-w-3xl mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Contact Form - takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Wyślij wiadomość</h3>
              <ContactForm />
            </div>
          </motion.div>

          {/* Right: Contact Info - takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </Section>
  );
});
