import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

// Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const InfoIcon: React.FC<{ icon: React.ReactElement; text: string }> = ({ icon, text }) => (
    <div className="flex items-center gap-2 bg-brand-cream p-3 rounded-lg">
        {icon}
        <span className="font-medium text-brand-brown">{text}</span>
    </div>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
        <div className="p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-brown mb-2">{recipe.recipeName}</h2>
            <p className="text-gray-600 mb-6">{recipe.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <InfoIcon icon={<ClockIcon />} text={recipe.prepTime} />
                <InfoIcon icon={<ClockIcon />} text={recipe.cookTime} />
                <InfoIcon icon={<UsersIcon />} text={recipe.servings} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-serif font-bold text-brand-brown mb-4">Ingredientes</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-lg mb-2 text-gray-700">Massa:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {recipe.ingredients.massa.map((item, index) => <li key={`massa-${index}`}>{item}</li>)}
                            </ul>
                        </div>
                        {recipe.ingredients.cobertura && recipe.ingredients.cobertura.length > 0 && (
                            <div>
                                <h4 className="font-bold text-lg mb-2 text-gray-700">Cobertura:</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-600">
                                    {recipe.ingredients.cobertura.map((item, index) => <li key={`cobertura-${index}`}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-serif font-bold text-brand-brown mb-4">Modo de Preparo</h3>
                    <ol className="list-decimal list-inside space-y-3 text-gray-600">
                        {recipe.instructions.map((step, index) => <li key={`step-${index}`}>{step}</li>)}
                    </ol>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RecipeCard;