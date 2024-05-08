import { createSlice } from "@reduxjs/toolkit";
import {generateShopListUtil,parseIngredients, restoreItemUtil, removeItemUtil } from "./shoplistUtilities";

import {searchBySpoonacularApiBulkAsync} from "../store/spoonacularAPISlice";




const shoplistSlice = createSlice({
  name: "Shoplist",
  initialState: {
    generalShoplist:{
      allItems: [],
      removedItems: [],
    },
    allItems: [],
    removedItems: [],
    userShoplistPromise:{
      data: {
        allItems: [],
        removedItems: [],
      },
      state: "loading",
      error: null,
    }
  },
  reducers: {
    flushShoplist: (state, action) => {
      state.allItems = [];
      state.removedItems = [];
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
      // const updateOrAddItems = (props) => {
      //   props.forEach(prop => {
      //     const existingItemIndex = state.allItems.findIndex(item => item.name === prop.name);
      //     if (existingItemIndex !== -1) {
      //       state.allItems[existingItemIndex].amount += prop.amount;
      //     } else {
      //       state.allItems.push(prop);
      //     }
      //   });
      //   state.allItems.forEach(item => {
      //     item.amount = Math.ceil(item.amount * 10) / 10;
      //   });
      // };

      // action.payload.forEach(item => {
      //   updateOrAddItems(calcPortionIngredients(item));
      // });

      // const categorizedIngredients = [];
      // state.allItems.forEach((item) => {
      //   const category = item.category;
      //   const index = categorizedIngredients.findIndex(
      //     (categorizedItem) => categorizedItem.category === category
      //   );
      //   if (index === -1) {
      //     categorizedIngredients.push({
      //       category: category,
      //       ingredients: [item],
      //     });
      //   } else {
      //     categorizedIngredients[index].ingredients.push(item);
      //   }
      // });
      // categorizedIngredients.forEach((category) =>
      // normalizeCategoryIngredients(category)
      // );
      const categorizedIngredients = generateShopListUtil({payload: action.payload});
      state.allItems = categorizedIngredients; // depricated
      state.generalShoplist.allItems = categorizedIngredients;
    },
    removeItem: (state, action) => {

      // const tempItems = [];
      // state.allItems.forEach((category) => {
      //   tempItems.push({
      //     category: category.category,
      //     ingredients: parseIngredients(category.ingredients),
      //   });
      // });
      // tempItems.map((category) => {
      //   category.ingredients = category.ingredients.filter(
      //     (item) => item.name !== action.payload.name
      //   );
      // });
      // state.allItems = tempItems;
      // const tempRemovedItems = [];
      // state.removedItems.forEach((category) => {
      //   tempRemovedItems.push({
      //     category: category.category,
      //     ingredients: parseIngredients(category.ingredients),
      //   });
      // });
      // const index = tempRemovedItems.findIndex(
      //   (item) => item.category === action.payload.category
      // );
      // if (index === -1) {
      //   tempRemovedItems.push({
      //     category: action.payload.category,
      //     ingredients: [action.payload],
      //   });
      // } else {
      //   tempRemovedItems[index].ingredients.push(action.payload);
      // }

      const {allItems, removedItems} = removeItemUtil({payload: action.payload, allItems: state.allItems, removedItems: state.removedItems});
      state.removedItems = removedItems; // depricated
      state.allItems = allItems; // depricated
      state.generalShoplist.removedItems = removedItems;
      state.generalShoplist.allItems = allItems;
    },
    restoreItem: (state, action) => {

      // const tempItems = [];
      // state.removedItems.forEach((category) => {
      //   tempItems.push({
      //     category: category.category,
      //     ingredients: parseIngredients(category.ingredients),
      //   });
      // });
      // tempItems.map((category) => {
      //   category.ingredients = category.ingredients.filter(
      //     (item) => item.name !== action.payload.name
      //   );
      // });
      // state.removedItems = tempItems;
      // const tempRemovedItems = [];
      // state.allItems.forEach((category) => {
      //   tempRemovedItems.push({
      //     category: category.category,
      //     ingredients: parseIngredients(category.ingredients),
      //   });
      // });

      // const index = tempRemovedItems.findIndex(
      //   (item) => item.category === action.payload.category
      // );
      // if (index === -1) {
      //   tempRemovedItems.push({
      //     category: action.payload.category,
      //     ingredients: [action.payload],
      //   });
      // } else {
      //   tempRemovedItems[index].ingredients.push(action.payload);
      // }
      const {allItems, removedItems} = restoreItemUtil({payload: action.payload, allItems: state.allItems, removedItems: state.removedItems});
      state.allItems = allItems; // depricated
      state.removedItems = removedItems;  // depricated
      state.generalShoplist.allItems = allItems;
      state.generalShoplist.removedItems = removedItems;
    },

    removeUserItem: (state, action) => {
      const {allItems, removedItems} = removeItemUtil({payload: action.payload, allItems: state.userShoplistPromise.data.allItems, removedItems: state.userShoplistPromise.data.removedItems});
      state.userShoplistPromise.data.allItems = allItems;
      state.userShoplistPromise.data.removedItems = removedItems;
    },
    restoreUserItem: (state, action) => {
      const {allItems, removedItems} = restoreItemUtil({payload: action.payload, allItems: state.userShoplistPromise.data.allItems, removedItems: state.userShoplistPromise.data.removedItems});
      state.userShoplistPromise.data.allItems = allItems;
      state.userShoplistPromise.data.removedItems = removedItems;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBySpoonacularApiBulkAsync.pending, (state, action) => {
        state.userShoplistPromise.state = "loading";
      })
      .addCase(searchBySpoonacularApiBulkAsync.fulfilled, (state, action) => {
        const {userData} = action.payload;
        state.userShoplistPromise.data.allItems = generateShopListUtil({payload: userData});
        state.userShoplistPromise.state = "ready";
      })
      .addCase(searchBySpoonacularApiBulkAsync.rejected, (state, action) => {
        state.userShoplistPromise.state = "failed";
      });
  },
});
export const getAllItems = (state) => state.shoplist.allItems;
export const getRemovedItems = (state) => state.shoplist.removedItems;

// new
export const getUserShoplistPromise = (state) => state.shoplist.userShoplistPromise;
export const getGeneralShoplist = (state) => state.shoplist.generalShoplist;

export const { generateShoplist, removeUserItem, restoreUserItem , flushShoplist, removeItem, restoreItem } =
  shoplistSlice.actions;
export default shoplistSlice.reducer;
