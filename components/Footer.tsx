
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-brown text-brand-cream mt-16 py-6">
      <div className="container mx-auto px-4 text-center">
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
