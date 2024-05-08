import { createSlice } from "@reduxjs/toolkit";
import {calcPortionIngredients, normalizeCategoryIngredients,parseIngredients } from "./shoplistUtilities";

const shoplistSlice = createSlice({
  name: "Shoplist",
  initialState: {
    allItems: [],
    removedItems: [],
  },
  reducers: {
    flushShoplist: (state, action) => {
      state.allItems = [];
      state.removedItems = [];
    },
    setData: (state, action) => {
      console.log("LOADING DATA FROM LOCAL, SHOPLIST: ", action.payload.allItems)
      state.allItems = action.payload.allItems;
      action.payload.allItems.map((element)=>{
        const ingredients = [];
        element.ingredients.map((item)=>{
          ingredients.push(item);
        })
        console.log("INGREDIENTS: ", ingredients)
        state.allItems.push({category: element.category, ingredients: [...ingredients]});
      })
      state.removedItems = action.payload.removedItems;
    },
    generateShoplist: (state, action) => {
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
      const updateOrAddItems = (props) => {
        props.forEach(prop => {
          const existingItemIndex = state.allItems.findIndex(item => item.name === prop.name);
          if (existingItemIndex !== -1) {
            state.allItems[existingItemIndex].amount += prop.amount;
          } else {
            state.allItems.push(prop);
          }
        });
        state.allItems.forEach(item => {
          item.amount = Math.ceil(item.amount * 10) / 10;
        });
      };

      action.payload.forEach(item => {
        updateOrAddItems(calcPortionIngredients(item));
      });

      const categorizedIngredients = [];
      state.allItems.forEach((item) => {
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
      state.allItems = categorizedIngredients;
      state.removedItems = [];
    },
    removeItem: (state, action) => {
      const tempItems = [];
      state.allItems.forEach((category) => {
        tempItems.push({
          category: category.category,
          ingredients: parseIngredients(category.ingredients),
        });
      });
      tempItems.map((category) => {
        category.ingredients = category.ingredients.filter(
          (item) => item.name !== action.payload.name
        );
      });
      state.allItems = tempItems;
      const tempRemovedItems = [];
      state.removedItems.forEach((category) => {
        tempRemovedItems.push({
          category: category.category,
          ingredients: parseIngredients(category.ingredients),
        });
      });
      const index = tempRemovedItems.findIndex(
        (item) => item.category === action.payload.category
      );
      if (index === -1) {
        tempRemovedItems.push({
          category: action.payload.category,
          ingredients: [action.payload],
        });
      } else {
        tempRemovedItems[index].ingredients.push(action.payload);
      }
      state.removedItems = tempRemovedItems;
    },
    restoreItem: (state, action) => {
      const tempItems = [];
      state.removedItems.forEach((category) => {
        tempItems.push({
          category: category.category,
          ingredients: parseIngredients(category.ingredients),
        });
      });
      tempItems.map((category) => {
        category.ingredients = category.ingredients.filter(
          (item) => item.name !== action.payload.name
        );
      });
      state.removedItems = tempItems;
      const tempRemovedItems = [];
      state.allItems.forEach((category) => {
        tempRemovedItems.push({
          category: category.category,
          ingredients: parseIngredients(category.ingredients),
        });
      });

      const index = tempRemovedItems.findIndex(
        (item) => item.category === action.payload.category
      );
      if (index === -1) {
        tempRemovedItems.push({
          category: action.payload.category,
          ingredients: [action.payload],
        });
      } else {
        tempRemovedItems[index].ingredients.push(action.payload);
      }
      state.allItems = tempRemovedItems;
    },
  },
});
export const getAllItems = (state) => state.shoplist.allItems;
export const getRemovedItems = (state) => state.shoplist.removedItems;

export const { generateShoplist,setData, flushShoplist, removeItem, restoreItem } =
  shoplistSlice.actions;
export default shoplistSlice.reducer;
