
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RecipeCard from './components/RecipeCard';
import BusinessTips from './components/BusinessTips';
import UnusualCakes from './components/UnusualCakes';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { generateCakeRecipe } from './services/geminiService';
import type { Recipe } from './types';

const App: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const handleGenerateRecipe = useCallback(async (flavor: string) => {
    if (!flavor) {
      setError('Por favor, digite um sabor de bolo.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    setInitialLoad(false);

    try {
      const result = await generateCakeRecipe(flavor);
      setRecipe(result);
    } catch (e) {
      console.error(e);
      setError('Desculpe, não foi possível gerar a receita. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero onGenerate={handleGenerateRecipe} isLoading={isLoading} />
        
        {error && (
          <div className="my-8 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <p>{error}</p>
          </div>
        )}

        <div id="recipe-section" className="my-12">
          {isLoading && (
             <div className="flex flex-col items-center justify-center text-center p-8">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-accent mb-4"></div>
                <p className="text-xl font-medium text-brand-brown">Preparando uma receita deliciosa para você...</p>
             </div>
          )}
          {recipe && <RecipeCard recipe={recipe} />}
          {initialLoad && !isLoading && (
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg">Digite um sabor acima e clique em "Gerar Receita" para começar a mágica!</p>
            </div>
          )}
        </div>

        <BusinessTips />
        <UnusualCakes />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default App;
