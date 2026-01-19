
import { useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScrollProgress } from '../components/ui/ScrollProgress';
import { BackToTop } from '../components/ui/BackToTop';

export function PrivacyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--bg)]">
            <ScrollProgress />
            {/* Mock activeSection for Navbar - maybe introduce a 'plain' mode or just pass empty */}
            <Navbar activeSection="privacy" />

            <main className="pt-24 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--wb-primary)]">Polityka Prywatności</h1>

                <div className="prose prose-lg text-gray-700">
                    <p className="mb-4">
                        Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazywanych przez Użytkowników w związku z korzystaniem ze strony internetowej WB Partners.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Administrator Danych</h2>
                    <p className="mb-4">
                        Administratorem danych osobowych jest WB PARTNERS Sp. z o.o. z siedzibą w Rzeszowie (35-060), przy ul. Juliusza Słowackiego 24/11, NIP: 5170455185, REGON: 540735769.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Zakres zbierania danych</h2>
                    <p className="mb-4">
                        Zbieramy dane podane dobrowolnie przez użytkownika w formularzu kontaktowym (imię, adres e-mail, treść wiadomości) w celu umożliwienia kontaktu i odpowiedzi na zapytanie.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Prawa użytkownika</h2>
                    <p className="mb-4">
                        Użytkownik ma prawo wglądu do swoich danych, ich poprawiania, żądania ich usunięcia oraz ograniczenia przetwarzania.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Kontakt</h2>
                    <p className="mb-4">
                        W sprawach związanych z ochroną danych osobowych prosimy o kontakt pod adresem e-mail: support@wb-partners.pl.
                    </p>
                </div>
            </main>

            <Footer />
            <BackToTop />
        </div>
    );
}
