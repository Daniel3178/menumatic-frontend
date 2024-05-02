/**
 * Takes an object meal: {{result}, portions}
 * retrieves the data needed for creating the shopping list:
 *    *portions: number of portions specified by user
 *    *servings: number of servings for the recipe
 *    *ingredients: array of ingredients for recipe from which following is retrieved
 *        *nameClean: name of ingredient
 *        *measures.metric.amount: amount of ingredient in metric
 *        *measures.metric.unitShort: unit for the ingredient in metric
 *
 * calcAmount: calculates amount of each ingredient in order to get wanted amount of portions
 * pushes stripped objects {name, amount, unit} into IngrArr (to be returned to next function)
 *
 * @param {Objct} meal - A meal object containing portions (number) and result (object),
 * where result includes serving details and a list of ingredients.
 * @function
 * @returns {Array<Object>} ingrArr - An array of objects, each representing an ingredient
 * with its name, calculated amount, and unit.
 *
 */
export const calcPortionIngredients = (meal) => {
  const {
    portions,
    result: { servings, extendedIngredients: ingredients },
  } = meal;
  const ingrArr = ingredients.map((ingredient) => {
    const {
      measures: {
        metric: { amount, unitShort },
      },
      aisle,
      name,
      nameClean,
    } = ingredient;
    const calcAmount = amount > 0.1 ? amount * (portions / servings) : amount;
    return {
      category: aisle,
      name: nameClean || name,
      measures: [{ amount: calcAmount, unit: unitShort }],
    };
  });
  return ingrArr;
};

export const normalizeCategoryIngredients = (category) => {
  const newIngredients = [];
  category.ingredients.forEach((ingredient) => {
    const ingrIndex = newIngredients.findIndex(
      (newIngredient) => newIngredient.name === ingredient.name
    );
    if (!(ingredient.name == undefined && ingredient.measures == undefined)) {
      if (ingrIndex === -1) {
        newIngredients.push({
          category: ingredient.category,
          name: ingredient.name,
          measures: ingredient.measures,
        });
      } else {
        newIngredients[ingrIndex].measures.push(ingredient.measures[0]);
      }
    }
  });
  category.ingredients = newIngredients;
};

export const parseIngredients = (ingredients) => {
  return ingredients.map((ingr) => ({
    category: ingr.category,
    name: ingr.name,
    measures: ingr.measures,
  }));
};
