import React, { useState, useEffect } from 'react';
import { generateUnusualCakes } from '../services/geminiService';

const UnusualCakes: React.FC = () => {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      const fetchedIdeas = await generateUnusualCakes();
      setIdeas(fetchedIdeas);
      setLoading(false);
    };
    fetchIdeas();
  }, []);

  return (
    <section className="my-16">
      <h2 className="text-3xl font-serif font-bold text-center mb-6 text-brand-brown">
        Bolos Inusitados Para Inspirar
      </h2>
      {loading ? (
        <div className="text-center text-gray-500">Buscando ideias criativas...</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {ideas.map((idea, index) => (
            <div key={index} className="bg-white shadow-md rounded-full px-5 py-2 text-brand-brown font-semibold">
              {idea}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UnusualCakes;
