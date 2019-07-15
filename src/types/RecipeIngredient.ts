import Ingredient from 'Ingredient';
import Unit from 'Unit';

export default interface RecipeIngredient {
  ingredient: Ingredient;
  quantity: number;
  unit?: Unit;
  description?: string;
}
