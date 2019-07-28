import express from 'express';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import uniqid from 'uniqid';

import Ingredient from './types/Ingredient';
import Menu from './types/Menu';
import Recipe from './types/Recipe';

const adapter = new FileSync(
  process.env.NODE_ENV === 'test' ? 'test.json' : 'db.json',
);
const db = low(adapter);
const app = express();

app.use(express.json());
db.defaults({
  ingredients: [],
  menus: [],
  recipes: [],
}).write();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const entities = ['menus', 'recipes', 'ingredients'];

entities.forEach((entity: string) => {
  app.get(`/api/${entity}`, (req, res) => {
    const records = db.get(entity).value();
    res.send({ [entity]: records });
  });
});

app.post('/api/menus', (req, res) => {
  const { name, recipes, description } = req.body.menu;

  try {
    const menu = new Menu(name, recipes, description);
    db.get('menus')
      // @ts-ignore
      .push(menu)
      .write();
    res.send({ id: menu.id });
  } catch (e) {
    res.status(422).send(e.toString());
  }
});

app.delete('/api/menus/:id', (req, res) => {
  try {
    const { id: deleteId } = req.params;
    db.get('menus')
      // @ts-ignore
      .filter(({ id }) => id !== deleteId)
      .write();
    res.send({ id: deleteId });
  } catch (e) {
    res.status(422).send(e.toString());
  }
});

app.post('/api/ingredients', (req, res) => {
  const { name, description } = req.body.ingredient;

  try {
    if (!name) {
      throw new Error('name is required');
    }

    const id = uniqid();
    const ingredient: Ingredient = {
      description,
      id,
      name,
    };
    db.get('ingredients')
      // @ts-ignore
      .push(ingredient)
      .write();
    res.send({ id });
  } catch (e) {
    res.status(422).send(e.toString());
  }
});

app.delete('/api/ingredients/:id', (req, res) => {
  try {
    const { id: deleteId } = req.params;
    db.get('ingredients')
      // @ts-ignore
      .filter(({ id }) => id !== deleteId)
      .write();
    res.send({ id: deleteId });
  } catch (e) {
    res.status(422).send(e.toString());
  }
});

app.post('/api/recipes', (req, res) => {
  const { name, ingredients, description } = req.body.recipe;

  try {
    if (!name) {
      throw new Error('name is required');
    }

    const id = uniqid();
    const ingredient: Recipe = {
      description,
      id,
      ingredients,
      name,
    };
    db.get('recipes')
      // @ts-ignore
      .push(ingredient)
      .write();
    res.send({ id });
  } catch (e) {
    res.status(422).send(e.toString());
  }
});

app.delete('/api/recipes/:id', (req, res) => {
  try {
    const { id: deleteId } = req.params;
    db.get('recipes')
      // @ts-ignore
      .filter(({ id }) => id !== deleteId)
      .write();
    res.send({ id: deleteId });
  } catch (e) {
    res.status(422).send(e.toString());
  }
});

module.exports = app;

export default app;
