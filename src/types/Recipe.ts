import RecipeIngredient from 'RecipeIngredient';

export default interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  description?: string;
}
