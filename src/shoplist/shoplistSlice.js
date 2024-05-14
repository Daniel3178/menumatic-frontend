import { createSlice } from "@reduxjs/toolkit";
import {
  generateShopListUtil,
  restoreItemUtil,
  removeItemUtil,
} from "./shoplistUtilities";

import { searchBySpoonacularApiBulkAsync } from "../integration/spoonacularServerThunks";
import {
  saveShoplistToMenumaticDb,
  fetchExcludedIngredients,
} from "../integration/menumaticServerThunks";

const shoplistSlice = createSlice({
  name: "Shoplist",
  initialState: {
    generalShoplist: {
      allItems: [],
      removedItems: [],
    },
    userShoplistPromise: {
      data: JSON.parse(localStorage.getItem("userShoplistData")) || {
        allItems: [],
        removedItems: [],
      },
      state: "loading",
      error: null,
    },
  },
  reducers: {
    flushData: (state, action) => {
      state.generalShoplist.allItems = [];
      state.generalShoplist.removedItems = [];
      state.userShoplistPromise.data.allItems = [];
      state.userShoplistPromise.data.removedItems = [];
    },
    setData: (state, action) => {
      action.payload.allItems.map((element) => {
        const ingredients = [];
        element.ingredients.map((item) => {
          ingredients.push(item);
        });
        state.generalShoplist.allItems.push({
          category: element.category,
          ingredients: [...ingredients],
        });
      });
      state.generalShoplist.removedItems = action.payload.removedItems;
    },
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
        allItems: state.generalShoplist.allItems,
        removedItems: state.generalShoplist.removedItems,
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

        localStorage.removeItem("userShoplistData");
        localStorage.removeItem("shoplist");
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

        localStorage.setItem(
          "userShoplistData",
          JSON.stringify(state.userShoplistPromise.data)
        );
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
  setData,
  flushData
} = shoplistSlice.actions;
export default shoplistSlice.reducer;
