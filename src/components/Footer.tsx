import React from 'react';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-brown text-brand-cream mt-16 py-8">
      <div className="container mx-auto px-4 text-center">
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-8 gap-y-4 mb-6">
            <a href="mailto:micheldouglasonline@gmail.com" className="flex items-center gap-2 hover:text-brand-pink transition-colors">
                <MailIcon />
                <span>micheldouglasonline@gmail.com</span>
            </a>
            <p className="flex items-center gap-2">
                <PhoneIcon />
                <span>(99) 99999-9999</span>
            </p>
        </div>

        <p>
          &copy; {currentYear} Gerador de Receitas de Bolo. Todos os direitos reservados.
        </p>
        <p className="mt-2 font-semibold">
          Desenvolvido por <span className="text-brand-pink">Michel Douglas Online</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;