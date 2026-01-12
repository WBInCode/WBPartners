import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import wbFoundationLogo from '../assets/wb-foundation-logo.png';

/**
 * WB Foundation - Strona podrzędna
 * Na razie pusta, będzie uzupełniana
 */
export function FoundationPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-[var(--accent-foundation)] transition-colors">
            <ArrowLeft size={20} />
            <span>Powrót do WB Partners</span>
          </Link>
          <img src={wbFoundationLogo} alt="WB Foundation" className="h-10" />
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <img src={wbFoundationLogo} alt="WB Foundation Logo" className="h-24 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--accent-foundation)' }}>
            WB Foundation
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Strona w budowie. Wkrótce więcej informacji.
          </p>
          <Button 
            variant="outline"
            href="/"
            className="!border-[var(--accent-foundation)] !text-[var(--accent-foundation)]"
          >
            <ArrowLeft size={18} className="mr-2" />
            Wróć na stronę główną
          </Button>
        </div>
      </main>
    </div>
  );
}
