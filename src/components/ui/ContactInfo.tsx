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
    <div className="flex items-start gap-2 xs:gap-3">
      <div className="flex-shrink-0 w-6 h-6 xs:w-8 xs:h-8 bg-[var(--wb-primary)]/10 rounded-md xs:rounded-lg flex items-center justify-center text-[var(--wb-primary)]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] xs:text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-900 text-xs xs:text-sm break-words">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className="block hover:bg-gray-50 -mx-3 px-3 py-1.5 rounded-lg transition-colors link-animated"
      >
        {content}
      </a>
    );
  }

  return <div className="py-1.5">{content}</div>;
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
        'bg-white rounded-lg xs:rounded-xl shadow-lg',
        'p-3 xs:p-4 sm:p-5',
        'w-full',
        'border border-gray-100',
        'card'
      )}
      data-card
    >
      <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-3 xs:mb-4">
        Informacje kontaktowe
      </h3>

      <div className="space-y-1.5 xs:space-y-2">
        {/* Email */}
        <ContactItem
          icon={<Mail className="w-4 h-4" />}
          label="Email"
          value="support@wb-partners.pl"
          href="mailto:support@wb-partners.pl"
        />

        {/* Telefon */}
        <ContactItem
          icon={<Phone className="w-4 h-4" />}
          label="Telefon"
          value="+48 570 034 367"
          href="tel:+48570034367"
        />

        {/* Adres */}
        <ContactItem
          icon={<MapPin className="w-4 h-4" />}
          label="Adres"
          value="ul. Juliusza Słowackiego 24/11, 35-060 Rzeszów"
        />

        {/* Dane firmy */}
        <ContactItem
          icon={<Clock className="w-4 h-4" />}
          label="Dane firmy"
          value="WB PARTNERS Sp. z o.o. | NIP: 5170455185 | REGON: 540735769"
        />
      </div>
    </div>
  );
}
