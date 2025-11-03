import React, { useState, useEffect } from 'react';
import { generateCakeImage } from '../services/geminiService';

const cakeFlavors = [
  'chocolate', 'strawberry', 'vanilla', 'red-velvet', 'lemon', 'carrot',
  'coconut', 'orange', 'coffee', 'passion-fruit', 'pineapple', 'blueberry'
];

const SkeletonLoader: React.FC = () => (
    <div className="aspect-square w-full rounded-lg bg-gray-200 animate-pulse"></div>
);

const GeneratedGalleryImage: React.FC<{ flavor: string }> = ({ flavor }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const altText = `Imagem gerada por IA de um bolo sabor ${flavor.replace('-', ' ')}`;

    useEffect(() => {
        const fetchImage = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const url = await generateCakeImage(flavor);
                setImageUrl(url);
            } catch (err) {
                setError('Falha ao gerar imagem.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImage();
    }, [flavor]);

    if (isLoading) {
        return <SkeletonLoader />;
    }

    if (error || !imageUrl) {
        return (
            <div className="aspect-square w-full flex items-center justify-center rounded-lg bg-red-100 text-red-700 text-center p-2">
                <p>{error || 'Erro desconhecido.'}</p>
            </div>
        );
    }

    return (
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
            <img
                src={imageUrl}
                alt={altText}
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
            />
        </div>
    );
};


const Gallery: React.FC = () => {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-serif font-bold text-center mb-8 text-brand-brown">
        Galeria de Inspiração
      </h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {cakeFlavors.map((flavor) => (
          <div key={flavor} className="group">
            <GeneratedGalleryImage flavor={flavor.replace('-', ' ')} />
            <h3 className="mt-4 text-sm text-gray-700 capitalize text-center">{flavor.replace('-', ' ')}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
