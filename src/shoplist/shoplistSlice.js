import { createSlice } from "@reduxjs/toolkit";

const shoplistSlice = createSlice({
  name: "Shoplist",
  initialState: {
    allItems: [],
  },
  reducers: {
    flushShoplist: (state, action) => {
state.allItems = [];
    },
    generateShoplist: (state, action) => {
      console.log("generateShoplist SLICE", action.payload)
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
      const stripIngr = (meal) => {
        const portions = meal.portions;
        const servings = meal.result.servings;
        const ingredients = meal.result.extendedIngredients;

        const ingrArr = [];
        for (let i = 0; i < ingredients.length; i++) {
          let calcAmount = 0;
          if (ingredients[i].measures.metric.amount > 0.1) {
            calcAmount =
              ingredients[i].measures.metric.amount * (portions / servings);
          } else {
            calcAmount = ingredients[i].measures.metric.amount;
          }
          ingrArr.push({
            category: ingredients[i].aisle,
            name: ingredients[i].nameClean === null? ingredients[i].name : ingredients[i].nameClean,
            measures:[{amount: calcAmount, unit: ingredients[i].measures.metric.unitShort}],
            // amount: calcAmount,
            // unit: ingredients[i].measures.metric.unitShort,
          });
        }
        return ingrArr;
      };

      /**
       * Updates the allItems state with the provided list of items. For each item in the input list,
       * the function checks if the item already exists in the state's allItems list. If an item exists,
       * it increments the item's amount by the amount specified in the input list. If the item does not
       * exist, it is added to the allItems list. After processing all items, it rounds the amount
       * of each item in the allItems list to the nearest tenth.
       *
       * @param {Array<Object>} props - An array of item objects to be added or updated in the allItems list.
       * Each object in the array should have a name property (string) representing the item's name,
       * and an amount property (number) representing the quantity of the item.
       */

      const updateAllItems = (props) => {
        for (let i = 0; i < props.length; i++) {
          let flag = -1;
          for (let j = 0; j < state.allItems.length; j++) {
            if (props[i].name === state.allItems[j].name) {
              // console.log("!!DUPE FOUND!!" + props[i].name + " and " + state.allItems[j].name)
              state.allItems[j].amount += props[i].amount;
              flag = 1;
            }
          }
          if (flag == -1) {
            state.allItems.push(props[i]);
          }
        }
        for (let i = 0; i < state.allItems.length; i++) {
          let cur = state.allItems[i].amount;
          state.allItems[i].amount = Math.ceil(cur * 10) / 10;
        }
      };

      for (let i = 0; i < action.payload.length; i++) {
        // console.log("LOOP", action.payload[i])
        updateAllItems(stripIngr(action.payload[i]));
      }
      const categorizedIngredients = [];
      state.allItems.forEach((item) => {
        const category = item.category;
        const index = categorizedIngredients.findIndex(
          (categorizedItem) => categorizedItem.category === category
        );
        if (index === -1) {
          console.log("NOT FOUND PUSHING TO Categorized", categorizedIngredients, category)
          categorizedIngredients.push({
            category: category,
            ingredients: [item],
          });
        } else {
          console.log("FOUND PUSHING TO Categorized", categorizedIngredients, category)
          categorizedIngredients[index].ingredients.push(item);
        }
      });

      const normalizedIngredients = (category) => {
        const newIngredients = [];
        category.ingredients.forEach((ingredient) => {
          const ingrIndex = newIngredients.findIndex(
            (newIngredient) => newIngredient.name === ingredient.name
          );
          if (ingrIndex === -1) {
            newIngredients.push({
              category: ingredient.category,
              name: ingredient.name,
              measures: ingredient.measures,
            });
          } else {
            newIngredients[ingrIndex].measures.push(ingredient.measures[0]);
          }

        });
        category.ingredients = newIngredients;
      };

      categorizedIngredients.forEach((category) => normalizedIngredients(category));
      state.allItems = categorizedIngredients;
      console.log("Categorized Ingredients final", categorizedIngredients)
    },
  },
});
export const getAllItems = (state) => state.shoplist.allItems;
export const { generateShoplist, flushShoplist } = shoplistSlice.actions;
export default shoplistSlice.reducer;
