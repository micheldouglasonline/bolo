
import React from 'react';

const CakeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v1a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
        <path fillRule="evenodd" d="M2 10a2 2 0 012-2h12a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5zm3 2a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm5 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <CakeIcon />
        <h1 className="ml-3 text-2xl md:text-3xl font-serif font-bold text-brand-brown tracking-wide">
          Gerador de Receitas de Bolo
        </h1>
      </div>
    </header>
  );
};

export default Header;
