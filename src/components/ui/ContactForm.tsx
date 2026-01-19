import { useState } from 'react';
import { User, Mail, FileText, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { cn } from '../../utils';
import { Button } from './Button';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface TouchedFields {
  name: boolean;
  email: boolean;
  subject: boolean;
  message: boolean;
}

/**
 * ContactForm komponent
 * - Pole: Imię, Email, Temat, Wiadomość
 * - Przycisk: "Wyślij wiadomość"
 * - Walidacja formularza
 * - Stan loading i sukcesu
 */
export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot - should remain empty
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Imię jest wymagane';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Temat jest wymagany';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Wiadomość musi mieć min. 10 znaków';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation if field was already touched
    if (touched[name as keyof TouchedFields]) {
      validateField(name, value);
    }
  };

  // Real-time validation for a single field
  const validateField = (name: string, value: string) => {
    let error: string | undefined;

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Imię jest wymagane';
        break;
      case 'email':
        if (!value.trim()) error = 'Email jest wymagany';
        else if (!validateEmail(value)) error = 'Nieprawidłowy format email';
        break;
      case 'subject':
        if (!value.trim()) error = 'Temat jest wymagany';
        break;
      case 'message':
        if (!value.trim()) error = 'Wiadomość jest wymagana';
        else if (value.trim().length < 10) error = 'Wiadomość musi mieć min. 10 znaków';
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle blur - mark field as touched and validate
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot - if filled, it's likely a bot
    if (formData.website) {
      console.log('Bot detected');
      return;
    }

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          website: formData.website
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        setTouched({ name: false, email: false, subject: false, message: false });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error(data.error || 'Failed to send');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = cn(
    'w-full px-3 py-2 rounded-lg',
    'border border-[var(--border)]',
    'bg-[var(--bg)]',
    'text-[var(--text)] placeholder-[var(--text-light)] text-sm',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-[var(--wb-primary)] focus:border-transparent'
  );

  const errorInputClasses = 'border-red-500 focus:ring-red-500';

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-success">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Wiadomość wysłana!
        </h3>
        <p className="text-green-600">
          Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 xs:space-y-3">
      {/* Honeypot field - hidden from users, catches bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Imię i Email - 2 kolumny na tablet+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3">
        {/* Imię */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text)] mb-1">
            Imię
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)] pointer-events-none" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Twoje imię"
              className={cn(inputClasses, 'pl-11', errors.name && errorInputClasses)}
            />
          </div>
          {errors.name && touched.name && (
            <p className="mt-1 text-sm text-red-600 animate-shake">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text)] mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)] pointer-events-none" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="twoj@email.com"
              className={cn(inputClasses, 'pl-11', errors.email && errorInputClasses)}
            />
          </div>
          {errors.email && touched.email && (
            <p className="mt-1 text-sm text-red-600 animate-shake">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Temat */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--text)] mb-1">
          Temat
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)] pointer-events-none" />
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Temat wiadomości"
            className={cn(inputClasses, 'pl-11', errors.subject && errorInputClasses)}
          />
        </div>
        {errors.subject && touched.subject && (
          <p className="mt-1 text-sm text-red-600 animate-shake">{errors.subject}</p>
        )}
      </div>

      {/* Wiadomość */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--text)] mb-1">
          Wiadomość
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[var(--text-light)] pointer-events-none" />
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Twoja wiadomość..."
            className={cn(inputClasses, 'pl-11', errors.message && errorInputClasses, 'resize-none')}
          />
        </div>
        {errors.message && touched.message && (
          <p className="mt-1 text-sm text-red-600 animate-shake">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        loading={isLoading}
        disabled={isLoading}
        className="w-full"
        iconRight={<Send className="w-4 h-4" />}
      >
        Wyślij wiadomość
      </Button>
    </form>
  );
}
