import { createSlice } from "@reduxjs/toolkit";
import { signOutCurrentUser } from "../menu/userAccountSlice";
import { searchBySpoonacularApiBulkAsync } from "../integration/spoonacularServerThunks";
import {
  fetchUserShopinglist,
  fetchUserFoodPref,
  fetchExcludedIngredients,
} from "../integration/menumaticServerThunks";

const menumaticServerApi = createSlice({
  name: "spoonacularApi",
  initialState: {
    userAllListPromise: {
      data: [],
      state: "loading",
      error: null,
    },
    userCurrentRecipesPromise: {
      data: JSON.parse(localStorage.getItem("userCurrentRecipes")) || [],
      state: "loading",
      error: null,
    },
    userFoodPrefPromise: {
      data: [],
      state: "loading",
      error: null,
    },
    excludedIngredientsPromise: {
      data: {
        mealplanId: null,
        ingredients: [],
      },
      state: "loading",
      error: null,
    },
    selectedList: JSON.parse(localStorage.getItem("selectedList")) || {},
  },

  reducers: {
    deleteList: (state, action) => {
      const { listId } = action.payload;
      const updatedData = state.userAllListPromise.data.filter(
        (item) => item.id !== listId
      );
      state.userAllListPromise.data = updatedData;
    },
    setSelectedList: (state, action) => {
      const { id } = action.payload;
      if (state.userAllListPromise.state === "ready") {
        state.selectedList = state.userAllListPromise.data.find(
          (item) => item.id === id
        );
      } else {
        state.selectedList = { id: id, name: "", recepies: [] };
      }
      localStorage.setItem("selectedList", JSON.stringify(state.selectedList));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserShopinglist.pending, (state, action) => {
        state.userAllListPromise.state = "loading";
      })
      .addCase(fetchUserShopinglist.fulfilled, (state, action) => {
        state.userAllListPromise.data = action.payload;
        state.userAllListPromise.state = "ready";
      })
      .addCase(fetchUserShopinglist.rejected, (state, action) => {
        state.userAllListPromise.state = "failed";
      })
      .addCase(fetchUserFoodPref.pending, (state, action) => {
        state.userFoodPrefPromise.state = "loading";
      })
      .addCase(fetchUserFoodPref.fulfilled, (state, action) => {
        state.userFoodPrefPromise.data = action.payload.rawData;
        state.userFoodPrefPromise.state = "ready";
      })
      .addCase(fetchUserFoodPref.rejected, (state, action) => {
        state.userFoodPrefPromise.state = "failed";
      })
      .addCase(fetchExcludedIngredients.pending, (state, action) => {
        state.excludedIngredientsPromise.state = "loading";
      })
      .addCase(fetchExcludedIngredients.fulfilled, (state, action) => {
        state.excludedIngredientsPromise.state = "ready";
        state.excludedIngredientsPromise.data.mealplanId =
          action.payload.mealplanId;
        state.excludedIngredientsPromise.data.ingredients =
          action.payload.ingredients;
      })
      .addCase(fetchExcludedIngredients.rejected, (state, action) => {
        state.excludedIngredientsPromise.state = "failed";
      })
      .addCase(searchBySpoonacularApiBulkAsync.pending, (state, action) => {
        state.userCurrentRecipesPromise.state = "loading";
      })
      .addCase(searchBySpoonacularApiBulkAsync.fulfilled, (state, action) => {
        const { userData } = action.payload;
        state.userCurrentRecipesPromise.data = userData;
        localStorage.setItem("userCurrentRecipes", JSON.stringify(userData));
        state.userCurrentRecipesPromise.state = "ready";
      })
      .addCase(searchBySpoonacularApiBulkAsync.rejected, (state, action) => {
        state.userSavedRecipesPromise.state = "failed";
      })
      .addCase(signOutCurrentUser, (state, action) => {
        state.userAllListPromise = {
          data: [],
          state: "loading",
          error: null,
        };
        state.userCurrentRecipesPromise = {
          data: [],
          state: "loading",
          error: null,
        };
        state.excludedIngredientsPromise = {
          data: {
            mealplanId: null,
            ingredients: [],
          },
          state: "loading",
          error: null,
        };
        state.userFoodPrefPromise = {
          data: [],
          state: "loading",
          error: null,
        };
      });
  },
});

export const getUserAllListPromise = (state) =>
  state.menumaticServerApi.userAllListPromise;
export const getUserCurrentRecipes = (state) =>
  state.menumaticServerApi.userCurrentRecipesPromise.data;
export const getMenumaticSelecedList = (state) =>
  state.menumaticServerApi.selectedList;
export const getExcludedIngredients = (state) =>
  state.menumaticServerApi.excludedIngredientsPromise.data.ingredients;
export const { setSelectedList, deleteList } = menumaticServerApi.actions;
export default menumaticServerApi.reducer;
