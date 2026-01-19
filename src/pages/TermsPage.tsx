
import { useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScrollProgress } from '../components/ui/ScrollProgress';
import { BackToTop } from '../components/ui/BackToTop';

export function TermsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--bg)]">
            <ScrollProgress />
            <Navbar activeSection="terms" />

            <main className="pt-24 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--wb-primary)]">Regulamin Serwisu</h1>

                <div className="prose prose-lg text-gray-700">
                    <p className="mb-4">
                        Niniejszy Regulamin określa zasady korzystania ze strony internetowej WB Partners.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Postanowienia ogólne</h2>
                    <p className="mb-4">
                        Właścicielem serwisu jest firma WB PARTNERS Sp. z o.o. z siedzibą w Rzeszowie. Korzystanie z serwisu jest dobrowolne i bezpłatne.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Własność intelektualna</h2>
                    <p className="mb-4">
                        Wszelkie treści zamieszczone na stronie, w tym teksty, grafiki, logotypy, są chronione prawem autorskim i należą do WB PARTNERS Sp. z o.o. lub podmiotów współpracujących.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Odpowiedzialność</h2>
                    <p className="mb-4">
                        Administrator dokłada wszelkich starań, aby treści na stronie były aktualne i rzetelne, jednak nie ponosi odpowiedzialności za skutki wykorzystania informacji zawartych w serwisie.
                    </p>
                </div>
            </main>

            <Footer />
            <BackToTop />
        </div>
    );
}
