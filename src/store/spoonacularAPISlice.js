import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { options } from "../config/spoonacularApiConfig";
import { generateShoplist } from "../shoplist/shoplistSlice";
import { set } from "firebase/database";

function buildURL(baseURL, params) {
  //console.log("Entering build url")
  // Use map to create an array of parameter strings
  const paramStrings = params.map((param) => `${param.key}=${param.value}`);
  //console.log("paramStrings: ", paramStrings)
  // Join the parameter strings with '&' to form the query string
  let queryString = paramStrings.join("&");
  //console.log("querystring: ", queryString)

  // Concatenate the base URL with the query string
  let fullURL = `${baseURL}?${queryString}`;
  //console.log("full url: ", fullURL)
  // Return the full URL
  return fullURL;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const searchBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiAsync",
  async (props) => {
    const excludeTags = props.excludeTags;
    const includeTags = props.includeTags;

    let customUrl =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10&include-tags=dinner";

    if (includeTags.length) {
      let includeString = includeTags.join();
      customUrl = customUrl.concat(",", includeString);
    }

    if (excludeTags.length) {
      let substring = "&exclude-tags=";
      let excludeString = substring.concat(excludeTags.join());
      customUrl = customUrl.concat(excludeString);
    }

    customUrl = customUrl.toLowerCase();

    // console.log(customUrl)

    const response = await fetch(customUrl, options);
    // console.log("response", response)
    return response.json();
  }
);

//new
export const searchComplexBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchComplexBySpoonacularApiAsync",
  async (props) => {
    //console.log("search recipes")
    console.log("spoonacular request", props)
    const diet = props.diet.join();
    //console.log("diets joined")
    const intolerances = props.intolerances.join();
    //console.log("intolerances joined")

    let baseUrl =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";

    let params = [
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
      { key: "diet", value: diet },
      { key: "intolerances", value: intolerances },
    ];
    //console.log("before build url")
    const generatedUrl = buildURL(baseUrl, params);

    // dispatch(setResultsState("loading"));
    //console.log("API url: ", generatedUrl)
    const response = await fetch(generatedUrl, options);
    //console.log("Response: ", response)
    const jsonResponse = await response.json();
    //console.log(jsonResponse)
    const customResponse = jsonResponse.results;
    //console.log(customResponse)
    return customResponse;
  }
);

//new
export const searchComplexBySpoonacularApiAsyncFoodPref = createAsyncThunk(
  "spoonacularApi/searchComplexBySpoonacularApiAsyncFoodPref",
  async (props) => {
    //console.log("search recipes")
    console.log("SPOONACULAR REQUEST NEW", props)
    const diet = props.diet.join();
    //console.log("diets joined")
    const intolerances = props.intolerances.join();
    //console.log("intolerances joined")

    let baseUrl =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";

    let params = [
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
      { key: "diet", value: diet },
      { key: "intolerances", value: intolerances },
    ];
    //console.log("before build url")
    const generatedUrl = buildURL(baseUrl, params);

    // dispatch(setResultsState("loading"));
    //console.log("API url: ", generatedUrl)
    const response = await fetch(generatedUrl, options);
    //console.log("Response: ", response)
    const jsonResponse = await response.json();
    //console.log(jsonResponse)
    const customResponse = jsonResponse.results;
    //console.log(customResponse)
    return customResponse;
  }
);

export const searchBySpoonacularApiBulkAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiBulkAsync",
  async (props, { dispatch }) => {
    //  dispatch(setSavedRecipesState("loading"));
    // console.log(props)
    const copyProp = props[0];
    // console.log("PROPS", copyProp)
    const ids = [];
    copyProp.map((recipe) => ids.push(recipe.id));
    let customUrl =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=";
    let recipeIdString = ids.join();
    customUrl = customUrl.concat(recipeIdString);

    const response = await fetch(customUrl, options);
    const jsonResponse = await response.json();
    const result = [];

    const findPoriont = (id) => {
      for (let i = 0; i < copyProp.length; i++) {
        if (copyProp[i].id === id) {
          // console.log("FOUND PORTION", copyProp[i].id)
          // console.log("FOUND PORTION", copyProp[i].id)
          return copyProp[i].portions;
        }
      }
    };

    jsonResponse.map((recipe) => {
      result.push({
        portions: findPoriont(recipe.id),
        result: recipe,
      });
    });
    dispatch(generateShoplist(result));
    return result;
  }
);

const spoonacularApi = createSlice({
  name: "spoonacularApi",
  initialState: {
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
        state.userSavedRecipes.push(...action.payload);
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
          console.log("RESPONSE FROM API ", action.payload)
          state.results.push(...action.payload);
          state.resultsState = "ready";
        }
      )
      .addCase(searchComplexBySpoonacularApiAsync.rejected, (state, action) => {
        state.resultsState = "failed";
      }).addCase(searchComplexBySpoonacularApiAsyncFoodPref.pending, (state, action) => {
        state.resultsState = "loading";
      })
      .addCase(
        searchComplexBySpoonacularApiAsyncFoodPref.fulfilled,
        (state, action) => {
          console.log("RESPONSE FROM API ", action.payload)
          state.results = [...action.payload];
          state.resultsState = "ready";
        }
      )
      .addCase(searchComplexBySpoonacularApiAsyncFoodPref.rejected, (state, action) => {
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
