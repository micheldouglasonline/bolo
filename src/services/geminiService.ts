import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: "Nome da receita do bolo." },
    description: { type: Type.STRING, description: "Uma breve descrição do bolo, apetitosa e convidativa." },
    prepTime: { type: Type.STRING, description: "Tempo de preparo. Ex: '20 minutos'" },
    cookTime: { type: Type.STRING, description: "Tempo de cozimento. Ex: '40 minutos'" },
    servings: { type: Type.STRING, description: "Rendimento da receita. Ex: '12 porções'" },
    ingredients: {
      type: Type.OBJECT,
      properties: {
        massa: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Lista de ingredientes para a massa."
        },
        cobertura: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Lista de ingredientes para a cobertura (opcional)."
        }
      },
      required: ['massa']
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Passo a passo detalhado do modo de preparo."
    }
  },
  required: ['recipeName', 'description', 'prepTime', 'cookTime', 'servings', 'ingredients', 'instructions']
};

export const generateCakeRecipe = async (flavor: string): Promise<Recipe> => {
  const prompt = `Gere uma receita detalhada e deliciosa para um bolo de ${flavor}. A receita deve ser clara, fácil de seguir e inspiradora.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.7,
        systemInstruction: "Você é um mestre confeiteiro renomado, especializado em criar receitas de bolo que são ao mesmo tempo deliciosas e acessíveis para cozinheiros de todos os níveis. Responda sempre em português do Brasil.",
      },
    });

    const jsonText = response.text.trim();
    const recipeData = JSON.parse(jsonText);
    
    // Basic validation
    if (!recipeData.recipeName || !recipeData.ingredients || !recipeData.instructions) {
        throw new Error("Resposta da IA está em um formato inválido.");
    }
    
    return recipeData as Recipe;
  } catch (error) {
    console.error("Error calling Gemini API for recipe:", error);
    throw new Error("Falha ao gerar a receita. Verifique o sabor e tente novamente.");
  }
};

export const generateBusinessTips = async (): Promise<string[]> => {
    const prompt = "Liste 5 dicas curtas e práticas para quem quer começar a vender bolos caseiros. Foque em marketing, precificação e qualidade. As dicas devem ser em formato de lista simples, sem formatação complexa.";
     try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "Você é um consultor de negócios experiente no setor de alimentos e confeitaria. Forneça conselhos práticos e diretos em português do Brasil.",
                temperature: 0.6,
            }
        });
        return response.text.split('\n').filter(tip => tip.trim() !== '' && tip.length > 10).map(tip => tip.replace(/^[*-]?\s*/, ''));
    } catch (error) {
        console.error("Error fetching business tips:", error);
        return ["Não foi possível carregar as dicas de negócio. Tente recarregar a página."];
    }
};

export const generateUnusualCakes = async (): Promise<string[]> => {
    const prompt = "Liste 5 ideias de sabores de bolo inusitados e criativos que chamem a atenção. Apenas os nomes dos sabores, em uma lista simples.";
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "Você é um chef de confeitaria experimental e inovador, sempre buscando combinações de sabores surpreendentes. Responda em português do Brasil.",
                temperature: 0.8,
            }
        });
        return response.text.split('\n').filter(idea => idea.trim() !== '').map(idea => idea.replace(/^[*-]?\s*/, ''));
    } catch (error) {
        console.error("Error fetching unusual cakes:", error);
        return ["Não foi possível carregar as ideias de bolos. Tente recarregar a página."];
    }
};

export const generateCakeImage = async (flavor: string): Promise<string> => {
    const prompt = `Uma fotografia profissional e de alta qualidade de um lindo e delicioso bolo de ${flavor}. O bolo é o assunto principal, bem iluminado, sobre um fundo limpo e simples. Deve parecer muito apetitoso.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        throw new Error("Nenhuma imagem foi gerada pela IA.");

    } catch (error) {
        console.error(`Error generating image for ${flavor}:`, error);
        throw new Error(`Falha ao gerar a imagem para o bolo de ${flavor}.`);
    }
};
