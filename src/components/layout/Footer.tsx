import { Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '../../utils';
import { NAV_LINKS, CONTACT_INFO } from '../../constants/content';
import { useScrollToSection } from '../../hooks/useScrollToSection';

/**
 * Footer - stopka strony z linkami i informacjami kontaktowymi
 */
export function Footer() {
  const scrollToSection = useScrollToSection();
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              WB Partners
            </h3>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-6">
              Budujemy marki i projekty, które rosną. Innowacyjne rozwiązania w obszarze software, e-commerce, usług oraz inicjatyw społecznych.
            </p>

            {/* Company Info */}
            <div className="text-sm text-gray-500 mt-6 space-y-1">
              <p className="font-semibold text-gray-400">WB PARTNERS Sp. z o.o.</p>
              <p>NIP: 5170455185</p>
              <p>REGON: 540735769</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Nawigacja</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.sectionId}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={cn(
                      'text-gray-400 hover:text-white transition-colors duration-200',
                      'flex items-center gap-2 text-sm'
                    )}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: link.accentColor }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Brands */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Nasze marki</h4>
            <ul className="space-y-2">
              <BrandLink name="WB Trade" description="E-commerce" color="var(--accent-trade)" />
              <BrandLink name="WB InCode" description="Software house" color="var(--accent-incode)" />
              <BrandLink name="WB Rent" description="Wynajem" color="var(--accent-rent)" />
              <BrandLink name="WB Foundation" description="Inicjatywy społeczne" color="var(--accent-foundation)" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Kontakt</h4>
            <ul className="space-y-3">
              <ContactItem icon={Mail} text={CONTACT_INFO.email} href={`mailto:${CONTACT_INFO.email}`} />
              <ContactItem icon={Phone} text={CONTACT_INFO.phone} href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} />
              <ContactItem icon={MapPin} text={CONTACT_INFO.address} />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} WB Partners. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/polityka-prywatnosci" className="text-gray-500 hover:text-white transition-colors">Polityka prywatności</a>
              <a href="/regulamin" className="text-gray-500 hover:text-white transition-colors">Regulamin</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



function BrandLink({ name, description, color }: { name: string; description: string; color: string }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className="w-3 h-3 rounded-sm"
        style={{ backgroundColor: color }}
      />
      <div>
        <span className="text-white text-sm font-medium">{name}</span>
        <span className="text-gray-500 text-xs block">{description}</span>
      </div>
    </li>
  );
}

function ContactItem({ icon: Icon, text, href }: { icon: typeof Mail; text: string; href?: string }) {
  const content = (
    <span className="flex items-start gap-3 text-gray-400 text-sm">
      <Icon className="w-4 h-4 mt-0.5 shrink-0" />
      <span>{text}</span>
    </span>
  );

  if (href) {
    return (
      <li>
        <a href={href} className="hover:text-white transition-colors duration-200">
          {content}
        </a>
      </li>
    );
  }

  return <li>{content}</li>;
}
