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
const calcPortionIngredients = (meal) => {
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

const normalizeCategoryIngredients = (category) => {
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

const parseIngredients = (ingredients) => {
  return ingredients.map((ingr) => ({
    category: ingr.category,
    name: ingr.name,
    measures: ingr.measures,
  }));
};

export const generateShopListUtil = (props) => {
  const { payload } = props;
  const tempItems = [];
  const updateOrAddItems = (props) => {
    props.forEach((prop) => {
      const existingItemIndex = tempItems.findIndex(
        (item) => item.name === prop.name
      );
      if (existingItemIndex !== -1) {
        tempItems[existingItemIndex].amount += prop.amount;
      } else {
        tempItems.push(prop);
      }
    });
    tempItems.forEach((item) => {
      item.amount = Math.ceil(item.amount * 10) / 10;
    });
  };

  payload.forEach((item) => {
    updateOrAddItems(calcPortionIngredients(item));
  });

  const categorizedIngredients = [];
  tempItems.forEach((item) => {
    const category = item.category;
    const index = categorizedIngredients.findIndex(
      (categorizedItem) => categorizedItem.category === category
    );
    if (index === -1) {
      categorizedIngredients.push({
        category: category,
        ingredients: [item],
      });
    } else {
      categorizedIngredients[index].ingredients.push(item);
    }
  });
  categorizedIngredients.forEach((category) =>
    normalizeCategoryIngredients(category)
  );
  return categorizedIngredients;
};

export const removeItemUtil = (prop) => {
  const { payload, allItems, removedItems } = prop;

  const resultAllItem = [];
  allItems.forEach((category) => {
    resultAllItem.push({
      category: category.category,
      ingredients: parseIngredients(category.ingredients),
    });
  });
  resultAllItem.map((category) => {
    category.ingredients = category.ingredients.filter(
      (item) => item.name !== payload.name
    );
  });
  const resultRemovedItem = [];
  removedItems.forEach((category) => {
    resultRemovedItem.push({
      category: category.category,
      ingredients: parseIngredients(category.ingredients),
    });
  });
  const index = resultRemovedItem.findIndex(
    (item) => item.category === payload.category
  );
  if (index === -1) {
    resultRemovedItem.push({
      category: payload.category,
      ingredients: [payload],
    });
  } else {
    resultRemovedItem[index].ingredients.push(payload);
  }
  return { allItems: resultAllItem, removedItems: resultRemovedItem };
};

export const restoreItemUtil = (prop) => {
  const { payload, allItems, removedItems } = prop;
  const resultRemovedItems = [];
  removedItems.forEach((category) => {
    resultRemovedItems.push({
      category: category.category,
      ingredients: parseIngredients(category.ingredients),
    });
  });
  resultRemovedItems.map((category) => {
    category.ingredients = category.ingredients.filter(
      (item) => item.name !== payload.name
    );
  });
  const resultAllItems = [];
  allItems.forEach((category) => {
    resultAllItems.push({
      category: category.category,
      ingredients: parseIngredients(category.ingredients),
    });
  });

  const index = resultAllItems.findIndex(
    (item) => item.category === payload.category
  );
  if (index === -1) {
    resultAllItems.push({
      category: payload.category,
      ingredients: [payload],
    });
  } else {
    resultAllItems[index].ingredients.push(payload);
  }

  return { allItems: resultAllItems, removedItems: resultRemovedItems };
};
