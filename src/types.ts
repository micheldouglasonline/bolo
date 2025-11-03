export interface Recipe {
  recipeName: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: {
    massa: string[];
    cobertura?: string[];
  };
  instructions: string[];
}
