import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { options } from "../config/spoonacularApiConfig";
import { generateShoplist } from "../shoplist/shoplistSlice";
import {spoonacularComplexSearchBaseURL,spoonacularRandomSearchBaseURL,spoonacularBulkSearchBaseURL } from "./APIConstants";


export const searchBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiAsync",
  async (props) => {

    const {excludeTags, includeTags} = props;
    const customUrl = spoonacularRandomSearchBaseURL;

    if (includeTags.length) {
      const includeString = includeTags.join();
      customUrl.concat(",", includeString);
    }

    if (excludeTags.length) {
      const substring = "&exclude-tags=";
      const excludeString = substring.concat(excludeTags.join());
      customUrl.concat(excludeString);
    }

    customUrl.toLowerCase();
    const response = await fetch(customUrl, options);
    return response.json();
  }
);

//new
export const searchComplexBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchComplexBySpoonacularApiAsync",
  async (props) => {

    const {diet, intolerances, saveOptOverwrite} = props;

    const buildURL = (baseURL, params) => {
      const paramStrings = params.map((param) => `${param.key}=${param.value}`);
      const queryString = paramStrings.join("&");
      const fullURL = `${baseURL}?${queryString}`;
      return fullURL;
    }

    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    }

    const params = [
      { key: "query", value: "" },
      { key: "type", value: "main%20course" },
      { key: "instructionsRequired", value: "true" },
      { key: "fillIngredients", value: "true" },
      { key: "addRecipeInformation", value: "true" },
      { key: "ignorePantry", value: "true" },
      { key: "sort", value: "popularity" },
      { key: "number", value: "10" },
      { key: "limitLicense", value: "false" },
      { key: "offset", value: getRandomInt(900) },
      { key: "maxReadyTime", value: 90 },
      { key: "diet", value: diet.join() },
      { key: "intolerances", value: intolerances.join() },
    ];
    const generatedUrl = buildURL(spoonacularComplexSearchBaseURL, params);
    const response = await fetch(generatedUrl, options);
    const jsonResponse = await response.json();
    
    return {results:jsonResponse.results, saveOptOverwrite: saveOptOverwrite};
  }
);

export const searchBySpoonacularApiBulkAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiBulkAsync",
  async (props, { dispatch }) => {
    // const copyProp = props[0];

    const ids = props.map(recipe => recipe.id);

    const customUrl = spoonacularBulkSearchBaseURL;
    const recipeIdString = ids.join();
    const fullUrl = customUrl.concat(recipeIdString);

    const response = await fetch(fullUrl, options);
    const jsonResponse = await response.json();

    const findPortion = (id) => {
      const portion = props.find(item => item.id === id);
      return portion ? portion.portions : undefined;
    };


    const result = jsonResponse.map(recipe => ({
      portions: findPortion(recipe.id),
      result: recipe,
    }));

    // dispatch(generateShoplist(result));
    return {apiData: jsonResponse, userData: result};
  }
);

const spoonacularApi = createSlice({
  name: "spoonacularApi",
  initialState: {

    // new
    randomSearchPromise:{
      data: [],
      state: "loading",
      error: null,
    },
    complexSearchPromise:{
      data: [],
      state: "loading",
      error: null,
    },
    bulkSearchPromise:{
      data: [],
      state: "loading",
      error: null,
    },

    results: [],
    resultsState: "loading",
    savedRecipesState: "loading",
    userSavedRecipes: [],
  },
  reducers: {
    setResultsState: (state, action) => {
      state.resultsState = action.payload;
    },
    popFirstRecipe: (state, action) => {
      state.results.shift();
    },
    setSavedRecipesState: (state, action) => {
      state.savedRecipesState = action.payload;
    },
    flushSpoonacularResults: (state, action) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBySpoonacularApiAsync.pending, (state, action) => {
        state.resultsState = "loading";
      })
      .addCase(searchBySpoonacularApiAsync.fulfilled, (state, action) => {
        state.results.push(...action.payload.recipes);
        state.resultsState = "ready";
      })
      .addCase(searchBySpoonacularApiAsync.rejected, (state, action) => {
        state.resultsState = "failed";
      })
      .addCase(searchBySpoonacularApiBulkAsync.pending, (state, action) => {
        state.savedRecipesState = "loading";
      })
      .addCase(searchBySpoonacularApiBulkAsync.fulfilled, (state, action) => {
        const {apiData} = action.payload;
        state.userSavedRecipes= apiData;
        state.savedRecipesState = "ready";
      })
      .addCase(searchBySpoonacularApiBulkAsync.rejected, (state, action) => {
        state.userSavedRecipes = "failed";
      })
      .addCase(searchComplexBySpoonacularApiAsync.pending, (state, action) => {
        state.resultsState = "loading";
      })
      .addCase(
        searchComplexBySpoonacularApiAsync.fulfilled,
        (state, action) => {
          const {results, saveOptOverwrite} = action.payload;
          if(saveOptOverwrite){
            state.results = results;
          }
          else{
            state.results.push(...results);
          }
          state.resultsState = "ready";
        }
      )
      .addCase(searchComplexBySpoonacularApiAsync.rejected, (state, action) => {
        state.resultsState = "failed";
      });
  },
});
export const {
  setResultsState,
  popFirstRecipe,
  setSavedRecipesState,
  flushSpoonacularResults,
} = spoonacularApi.actions;
export const getApiResults = (state) => state.spoonacularApi.results;
export const getApiResultsState = (state) => state.spoonacularApi.resultsState;
export const getSavedRecipesState = (state) =>
  state.spoonacularApi.savedRecipesState;
export const getUserSavedRecipes = (state) =>
  state.spoonacularApi.userSavedRecipes;
export default spoonacularApi.reducer;
