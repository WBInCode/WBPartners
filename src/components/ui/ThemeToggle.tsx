import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils';

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                'p-2 rounded-lg transition-colors duration-200',
                'hover:bg-gray-100 dark:hover:bg-gray-800',
                'text-gray-600 dark:text-gray-300',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wb-primary)]',
                className
            )}
            aria-label="Przełącz motyw"
            title={theme === 'light' ? 'Włącz tryb ciemny' : 'Włącz tryb jasny'}
        >
            {theme === 'light' ? (
                <Moon className="w-5 h-5" />
            ) : (
                <Sun className="w-5 h-5" />
            )}
        </button>
    );
}
