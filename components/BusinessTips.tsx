
import React, { useState, useEffect } from 'react';
import { generateBusinessTips } from '../services/geminiService';

const BusinessTips: React.FC = () => {
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTips = async () => {
      setLoading(true);
      const fetchedTips = await generateBusinessTips();
      setTips(fetchedTips);
      setLoading(false);
    };
    fetchTips();
  }, []);

  return (
    <section className="my-16 p-6 md:p-8 bg-brand-brown text-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-serif font-bold text-center mb-6 text-brand-pink">
        Dicas para Empreender no Setor
      </h2>
      
      {loading ? (
        <div className="text-center">Carregando dicas...</div>
      ) : (
        <ul className="space-y-4 mb-8 list-disc list-inside">
          {tips.map((tip, index) => (
            <li key={index} className="text-lg">{tip}</li>
          ))}
        </ul>
      )}

      <div className="mt-8 p-6 bg-white/10 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Eleve a apresentação dos seus bolos!</h3>
        <p className="mb-4">Embalagens de qualidade fazem toda a diferença na hora de vender e encantar seus clientes.</p>
        <a 
          href="https://s.shopee.com.br/qbNJN3YyS" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-brand-pink hover:bg-pink-300 text-brand-brown font-bold px-8 py-3 rounded-lg transition-transform transform hover:scale-105"
        >
          Ver Embalagens de Bolo na Shopee
        </a>
      </div>
    </section>
  );
};

export default BusinessTips;
