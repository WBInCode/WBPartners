import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import wbPartnersLogo from '../assets/wb-partners-logo.png';

export function ProjectsPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] p-4 text-center">
            {/* Logo */}
            <img
                src={wbPartnersLogo}
                alt="WB Partners Logo"
                className="h-16 md:h-20 lg:h-24 mb-6 md:mb-8"
            />

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--wb-primary)] mb-4">
                Projekty
            </h1>

            {/* Under Construction Message */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 md:p-8 max-w-md shadow-lg mb-8">
                <div className="w-16 h-16 bg-[var(--wb-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚧</span>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text)] mb-2">
                    Strona w budowie
                </h2>
                <p className="text-[var(--text-muted)]">
                    Pracujemy nad przygotowaniem prezentacji naszych projektów. Zapraszamy wkrótce!
                </p>
            </div>

            {/* Back Button */}
            <Button
                variant="outline"
                onClick={() => navigate('/')}
                iconLeft={<ArrowLeft className="w-4 h-4" />}
            >
                Powrót do strony głównej
            </Button>
        </div>
    );
}
