import Recipe from 'Recipe';
import uniqid from 'uniqid';

export default class Menu {
  public recipes: Recipe[];
  public name: string;
  public id: string;
  public description?: string;

  constructor(name: string, recipes: Recipe[], description?: string) {
    this.id = uniqid();
    this.name = name;
    this.recipes = recipes;
    this.description = description;

    if (!Array.isArray(recipes)) {
      throw new Error('recipes must be an array');
    }
    if (!recipes) {
      throw new Error('recipes must be defined');
    }
    if (!name) {
      throw new Error('name must be defined');
    }
  }
}
