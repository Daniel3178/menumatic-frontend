import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { options } from "../config/spoonacularApiConfig";
import {
  spoonacularComplexSearchBaseURL,
  spoonacularRandomSearchBaseURL,
  spoonacularBulkSearchBaseURL,
} from "./APIConstants";

export const searchBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiAsync",
  async (props) => {
    const { excludeTags, includeTags } = props;
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
    const { diet, intolerances, saveOptOverwrite } = props;

    const buildURL = (baseURL, params) => {
      const paramStrings = params.map((param) => `${param.key}=${param.value}`);
      const queryString = paramStrings.join("&");
      const fullURL = `${baseURL}?${queryString}`;
      return fullURL;
    };

    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    };

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

    return {
      results: jsonResponse.results,
      saveOptOverwrite: saveOptOverwrite,
    };
  }
);

export const searchBySpoonacularApiBulkAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiBulkAsync",
  async (props, { dispatch }) => {
    const ids = props.map((recipe) => recipe.id);

    const customUrl = spoonacularBulkSearchBaseURL;
    const recipeIdString = ids.join();
    const fullUrl = customUrl.concat(recipeIdString);

    const response = await fetch(fullUrl, options);
    const jsonResponse = await response.json();

    const findPortion = (id) => {
      const portion = props.find((item) => item.id === id);
      return portion ? portion.portions : undefined;
    };

    const result = jsonResponse.map((recipe) => ({
      portions: findPortion(recipe.id),
      result: recipe,
    }));

    return { apiData: jsonResponse, userData: result };
  }
);

const spoonacularApi = createSlice({
  name: "spoonacularApi",
  initialState: {
    // new
    complexSearchPromise: {
      data: [],
      state: "loading",
      error: null,
    },
    bulkSearchPromise: {
      data: [],
      state: "loading",
      error: null,
    },
    randomSearchPromise: {
      data: [],
      state: "loading",
      error: null,
    },
  },
  reducers: {
    popFirstRecipe: (state, action) => {
      state.complexSearchPromise.data.shift();
    },
    flushSpoonacularResults: (state, action) => {
      state.complexSearchPromise = {
        data: [],
        state: "loading",
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBySpoonacularApiAsync.pending, (state, action) => {
        state.randomSearchPromise.state = "loading";
      })
      .addCase(searchBySpoonacularApiAsync.fulfilled, (state, action) => {
        state.randomSearchPromise.data.push(...action.payload.recipes);
        state.randomSearchPromise.state = "ready";
      })
      .addCase(searchBySpoonacularApiAsync.rejected, (state, action) => {
        state.randomSearchPromise.state = "failed";
      })
      .addCase(searchBySpoonacularApiBulkAsync.pending, (state, action) => {
        state.bulkSearchPromise.state = "loading";
      })
      .addCase(searchBySpoonacularApiBulkAsync.fulfilled, (state, action) => {
        const { apiData } = action.payload;
        state.bulkSearchPromise.data = apiData;
        state.bulkSearchPromise.state = "ready";
      })
      .addCase(searchBySpoonacularApiBulkAsync.rejected, (state, action) => {
        state.bulkSearchPromise.state = "failed";
      })
      .addCase(searchComplexBySpoonacularApiAsync.pending, (state, action) => {
        state.complexSearchPromise.state = "loading";
      })
      .addCase(
        searchComplexBySpoonacularApiAsync.fulfilled,
        (state, action) => {
          const { results, saveOptOverwrite } = action.payload;
          if (saveOptOverwrite) {
            state.complexSearchPromise.data = results;
          } else {
            state.complexSearchPromise.data.push(...results);
          }
          state.complexSearchPromise.state = "ready";
        }
      )
      .addCase(searchComplexBySpoonacularApiAsync.rejected, (state, action) => {
        state.complexSearchPromise.state = "failed";
      });
  },
});
export const { popFirstRecipe, flushSpoonacularResults } =
  spoonacularApi.actions;

// new
export const getRandomSearchPromise = (state) =>
  state.spoonacularApi.randomSearchPromise;
export const getComplexSearchPromise = (state) =>
  state.spoonacularApi.complexSearchPromise;
export const getBulkSearchPromise = (state) =>
  state.spoonacularApi.bulkSearchPromise;

export default spoonacularApi.reducer;
