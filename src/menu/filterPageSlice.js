import { createSlice } from "@reduxjs/toolkit";
import { fetchUserFoodPref } from "../store/menumaticServerAPISlice";
export const filterPage = createSlice({
  name: "filterPage",
  initialState: {
    apiPrefs: {
      includeTags: {
        title: "food preference",
        paramsArray: [],
      },
      excludeTags: {
        title: "allergies",
        paramsArray: [],
      },
    },
    mealsInPlan: 7,
  },
  reducers: {
    saveIncludeTags: (state, action) => {
      if (state.apiPrefs.includeTags.paramsArray.length !== 0) {
        state.apiPrefs.includeTags.paramsArray.length = 0;
      }
      state.apiPrefs.includeTags.paramsArray.push(...action.payload);
    },
    saveExcludeTags: (state, action) => {
      if (state.apiPrefs.excludeTags.paramsArray.length !== 0) {
        state.apiPrefs.excludeTags.paramsArray.length = 0;
      }
      state.apiPrefs.excludeTags.paramsArray.push(...action.payload);
    },
    saveTags: (state, action) => {
      if (state.apiPrefs.includeTags.paramsArray.length !== 0) {
        state.apiPrefs.includeTags.paramsArray.length = 0;
      }
      if (state.apiPrefs.excludeTags.paramsArray.length !== 0) {
        state.apiPrefs.excludeTags.paramsArray.length = 0;
      }
      state.apiPrefs.includeTags.paramsArray.push(
        ...action.payload.includeTags
      );
      state.apiPrefs.excludeTags.paramsArray.push(
        ...action.payload.excludeTags
      );
      state.mealsInPlan = parseInt(action.payload.mealsInPlan);
    },
    saveTagsByServer: (state, action) => {
      if (state.apiPrefs.includeTags.paramsArray.length !== 0) {
        state.apiPrefs.includeTags.paramsArray.length = 0;
      }
      if (state.apiPrefs.excludeTags.paramsArray.length !== 0) {
        state.apiPrefs.excludeTags.paramsArray.length = 0;
      }
      state.apiPrefs.includeTags.paramsArray.push(
        ...action.payload.includeTags
      );
      state.apiPrefs.excludeTags.paramsArray.push(
        ...action.payload.excludeTags
      );
      state.mealsInPlan = parseInt(action.payload.mealsInPlan);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFoodPref.fulfilled, (state, action) => {
        const { excludeTags, includeTags, mealNum } = action.payload;
        state.apiPrefs.includeTags.paramsArray = includeTags;
        state.apiPrefs.excludeTags.paramsArray = excludeTags;
        state.mealsInPlan = mealNum;
      })
      .addCase(fetchUserFoodPref.rejected, (state, action) => {
        state.apiPrefs.includeTags.paramsArray = [];
        state.apiPrefs.excludeTags.paramsArray = [];
      });
  },
});

export default filterPage.reducer;

export const { saveIncludeTags, saveExcludeTags, saveTags, saveTagsByServer } =
  filterPage.actions;
export const getExcludeTags = (state) =>
  state.filterPage.apiPrefs.excludeTags.paramsArray;
export const getIncludeTags = (state) =>
  state.filterPage.apiPrefs.includeTags.paramsArray;
export const getMealsInPlan = (state) => state.filterPage.mealsInPlan;
