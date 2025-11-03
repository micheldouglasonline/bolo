
import React, { useState } from 'react';

interface HeroProps {
  onGenerate: (flavor: string) => void;
  isLoading: boolean;
}

const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white"></div>
);

const Hero: React.FC<HeroProps> = ({ onGenerate, isLoading }) => {
  const [flavor, setFlavor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(flavor);
  };

  return (
    <section className="text-center bg-white rounded-2xl shadow-lg p-6 md:p-10 my-8">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-brown mb-2">
        Descubra sua Próxima Obra-Prima Culinária
      </h2>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
        Qual sabor de bolo você deseja criar hoje? Digite abaixo e deixe a nossa inteligência artificial te surpreender!
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <input
          type="text"
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          placeholder="Ex: Chocolate com morango, Fubá com goiabada..."
          className="flex-grow w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition duration-200"
          aria-label="Sabor do bolo"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center bg-brand-accent hover:bg-red-500 text-white font-bold text-lg px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? <LoadingSpinner /> : 'Gerar Receita'}
        </button>
      </form>
    </section>
  );
};

export default Hero;
