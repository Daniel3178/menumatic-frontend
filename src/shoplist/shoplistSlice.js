import { createSlice } from "@reduxjs/toolkit";
import {
  generateShopListUtil,
  restoreItemUtil,
  removeItemUtil,
} from "./shoplistUtilities";

import { searchBySpoonacularApiBulkAsync } from "../store/spoonacularAPISlice";
import {
  saveShoplistToMenumaticDb,
  fetchExcludedIngredients,
} from "../store/menumaticServerAPISlice";

const shoplistSlice = createSlice({
  name: "Shoplist",
  initialState: {
    generalShoplist: {
      allItems: [],
      removedItems: [],
    },
    userShoplistPromise: {
      data: {
        allItems: [],
        removedItems: [],
      },
      state: "loading",
      error: null,
    },
  },
  reducers: {
    generateShoplist: (state, action) => {
      const categorizedIngredients = generateShopListUtil({
        payload: action.payload,
      });
      state.generalShoplist.allItems = categorizedIngredients;
    },
    removeItem: (state, action) => {
      const { allItems, removedItems } = removeItemUtil({
        payload: action.payload,
        allItems: state.generalShoplist.allItems,
        removedItems: state.generalShoplist.removedItems,
      });
      state.generalShoplist.removedItems = removedItems;
      state.generalShoplist.allItems = allItems;
    },
    restoreItem: (state, action) => {
      const { allItems, removedItems } = restoreItemUtil({
        payload: action.payload,
        allItems: state.allItems,
        removedItems: state.removedItems,
      });
      state.generalShoplist.allItems = allItems;
      state.generalShoplist.removedItems = removedItems;
    },

    removeUserItem: (state, action) => {
      const { allItems, removedItems } = removeItemUtil({
        payload: action.payload,
        allItems: state.userShoplistPromise.data.allItems,
        removedItems: state.userShoplistPromise.data.removedItems,
      });
      state.userShoplistPromise.data.allItems = allItems;
      state.userShoplistPromise.data.removedItems = removedItems;
    },
    restoreUserItem: (state, action) => {
      const { allItems, removedItems } = restoreItemUtil({
        payload: action.payload,
        allItems: state.userShoplistPromise.data.allItems,
        removedItems: state.userShoplistPromise.data.removedItems,
      });
      state.userShoplistPromise.data.allItems = allItems;
      state.userShoplistPromise.data.removedItems = removedItems;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBySpoonacularApiBulkAsync.pending, (state, action) => {
        state.userShoplistPromise.state = "loading";
      })
      .addCase(searchBySpoonacularApiBulkAsync.fulfilled, (state, action) => {
        const { userData } = action.payload;
        state.userShoplistPromise.data.allItems = generateShopListUtil({
          payload: userData,
        });
        state.userShoplistPromise.state = "ready";
      })
      .addCase(searchBySpoonacularApiBulkAsync.rejected, (state, action) => {
        state.userShoplistPromise.state = "failed";
      })
      .addCase(saveShoplistToMenumaticDb.fulfilled, (state, action) => {
        state.userShoplistPromise.data.allItems = [];
        state.userShoplistPromise.data.removedItems = [];
        state.generalShoplist.allItems = [];
        state.generalShoplist.removedItems = [];
      })
      .addCase(fetchExcludedIngredients.fulfilled, (state, action) => {
        const { ingredients } = action.payload;
        state.userShoplistPromise.data.removedItems = [];
        const copyAllItems = state.userShoplistPromise.data.allItems;
        ingredients.map((ingr) => {
          copyAllItems.map((category) => {
            category.ingredients.map((item) => {
              if (item.name === ingr) {
                const { allItems, removedItems } = removeItemUtil({
                  payload: item,
                  allItems: state.userShoplistPromise.data.allItems,
                  removedItems: state.userShoplistPromise.data.removedItems,
                });
                state.userShoplistPromise.data.allItems = allItems;
                state.userShoplistPromise.data.removedItems = removedItems;
              }
            });
          });
        });
      });
  },
});

// new
export const getUserShoplistPromise = (state) =>
  state.shoplist.userShoplistPromise;
export const getGeneralShoplist = (state) => state.shoplist.generalShoplist;

export const {
  generateShoplist,
  removeUserItem,
  restoreUserItem,
  removeItem,
  restoreItem,
} = shoplistSlice.actions;
export default shoplistSlice.reducer;
