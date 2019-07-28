/* tslint:disable */

const request = require("supertest");
const fs = require("fs");
const path = require("path");

const app = require("./app");

describe("/api/recipes", () => {
  describe("GET", () => {
    it("should return a list of recipes", done => {
      request(app)
        .get("/api/recipes")
        .then((response: any) => {
          expect(response.body.recipes).toEqual([]);
          done();
        });
    });
  });
});

describe("/api/recipes", () => {
  afterEach(() => {
    const dbPath = path.join(__dirname, "../test.json");
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  });

  const goodRecipe = {
    recipe: {
      name: "good recipe",
      ingredients: [
        {
          ingredient: "forty-two",
          quantity: 42,
          unit: "oz",
          description: "the answer"
        }
      ],
      description: "recipe description"
    }
  };

  const badRecipe = {
    recipe: "bad recipe"
  };

  describe("DELETE", () => {
    it("should delete recipes", done => {
      request(app)
        .post("/api/recipes")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(goodRecipe)
        .then((response: any) => {
          const { id } = response.body;
          request(app)
            .delete(`/api/recipes/${id}`)
            .then((response: any) => {
              expect(response.status).toBe(200);
              done();
            });
        });
    });
  });

  describe("POST", () => {
    it("should persist a valid recipe and return its id", done => {
      request(app)
        .post("/api/recipes")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(goodRecipe)
        .then((response: any) => {
          const db = JSON.parse(
            fs.readFileSync(path.join(__dirname, "../test.json"), "utf8")
          );
          expect(db.recipes[0].name).toEqual(goodRecipe.recipe.name);
          expect(response.body.id).toBeTruthy();
          done();
        });
    });

    it("should respond with an error for an invalid recipe", done => {
      request(app)
        .post("/api/recipes")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(badRecipe)
        .then((response: any) => {
          expect(response.status).toBe(422);
          done();
        });
    });
  });

  describe("GET", () => {
    it("should return a list of ingredients", done => {
      request(app)
        .post("/api/recipes")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(goodRecipe)
        .then(() => {
          request(app)
            .get("/api/recipes")
            .then((response: any) => {
              expect(response.body.recipes[0].name).toEqual(
                goodRecipe.recipe.name
              );
              done();
            });
        });
    });
  });
});

describe("/api/ingredients", () => {
  afterEach(() => {
    const dbPath = path.join(__dirname, "../test.json");
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  });

  const goodIngredient = {
    ingredient: {
      name: "Test",
      description: "test ingredient"
    }
  };

  const badIngredient = {
    ingredient: "bad ingredient"
  };

  describe("DELETE", () => {
    it("should delete ingredients", done => {
      request(app)
        .post("/api/ingredients")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(goodIngredient)
        .then((response: any) => {
          const { id } = response.body;
          request(app)
            .delete(`/api/ingredients/${id}`)
            .then((response: any) => {
              expect(response.status).toBe(200);
              done();
            });
        });
    });
  });

  describe("POST", () => {
    it("should persist a valid ingredient and return its id", done => {
      request(app)
        .post("/api/ingredients")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(goodIngredient)
        .then((response: any) => {
          const db = JSON.parse(
            fs.readFileSync(path.join(__dirname, "../test.json"), "utf8")
          );
          expect(db.ingredients[0].name).toEqual(
            goodIngredient.ingredient.name
          );
          expect(response.body.id).toBeTruthy();
          done();
        });
    });

    it("should respond with an error for an invalid ingredient", done => {
      request(app)
        .post("/api/ingredients")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(badIngredient)
        .then((response: any) => {
          expect(response.status).toBe(422);
          done();
        });
    });
  });

  describe("GET", () => {
    it("should return a list of ingredients", done => {
      request(app)
        .post("/api/ingredients")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(goodIngredient)
        .then(() => {
          request(app)
            .get("/api/ingredients")
            .then((response: any) => {
              expect(response.body.ingredients[0].name).toEqual(
                goodIngredient.ingredient.name
              );
              done();
            });
        });
    });
  });
});

describe("/api/menu", () => {
  afterEach(() => {
    const dbPath = path.join(__dirname, "../test.json");
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  });

  const goodOrder = {
    menu: {
      recipes: ["recipe4", "recipe2"],
      name: "TestMenu"
    }
  };

  const badOrder = {
    menu: "bad menu"
  };

  describe("DELETE", () => {
    it("should delete menus", done => {
      request(app)
        .post("/api/menus")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(goodOrder)
        .then((response: any) => {
          const { id } = response.body;
          request(app)
            .delete(`/api/menus/${id}`)
            .then((response: any) => {
              expect(response.status).toBe(200);
              done();
            });
        });
    });
  });

  describe("POST", () => {
    it("should persist a valid menu and return its id", done => {
      request(app)
        .post("/api/menus")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(goodOrder)
        .then((response: any) => {
          const db = JSON.parse(
            fs.readFileSync(path.join(__dirname, "../test.json"), "utf8")
          );
          expect(db.menus[0].recipes).toEqual(goodOrder.menu.recipes);
          expect(response.body.id).toBeTruthy();
          done();
        });
    });

    it("should respond with an error for an invalid menu", done => {
      request(app)
        .post("/api/menus")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(badOrder)
        .then((response: any) => {
          expect(response.status).toBe(422);
          done();
        });
    });
  });

  describe("GET", () => {
    it("should return a list of menus", done => {
      request(app)
        .post("/api/menus")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(goodOrder)
        .then(() => {
          request(app)
            .get("/api/menus")
            .then((response: any) => {
              expect(response.body.menus[0].recipes).toEqual(
                goodOrder.menu.recipes
              );
              done();
            });
        });
    });
  });
});
