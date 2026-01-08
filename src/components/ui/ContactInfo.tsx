import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { cn } from '../../utils';

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-[var(--wb-primary)]/10 rounded-lg flex items-center justify-center text-[var(--wb-primary)]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-0.5">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className="block hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors link-animated"
      >
        {content}
      </a>
    );
  }

  return <div className="py-2">{content}</div>;
}

/**
 * ContactInfo komponent
 * - Tytuł "Informacje kontaktowe"
 * - Email, telefon, adres
 * - Ikony przy danych (lucide-react)
 * - Stylowanie karty (cień, zaokrąglenie)
 */
export function ContactInfo() {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-xl',
        'p-6 md:p-8',
        'w-full max-w-md',
        'border border-gray-100',
        'card'
      )}
      data-card
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Informacje kontaktowe
      </h3>

      <div className="space-y-4">
        {/* Email */}
        <ContactItem
          icon={<Mail className="w-5 h-5" />}
          label="Email"
          value="kontakt@wbpartners.pl"
          href="mailto:kontakt@wbpartners.pl"
        />

        {/* Telefon */}
        <ContactItem
          icon={<Phone className="w-5 h-5" />}
          label="Telefon"
          value="+48 123 456 789"
          href="tel:+48123456789"
        />

        {/* Adres */}
        <ContactItem
          icon={<MapPin className="w-5 h-5" />}
          label="Adres"
          value="ul. Przykładowa 123, 00-001 Warszawa"
        />

        {/* Godziny */}
        <ContactItem
          icon={<Clock className="w-5 h-5" />}
          label="Godziny pracy"
          value="Pon - Pt: 9:00 - 17:00"
        />
      </div>
    </div>
  );
}
