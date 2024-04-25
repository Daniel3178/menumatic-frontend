import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { options } from "../config/spoonacularApiConfig";

function buildURL(baseURL, params) {
  //console.log("Entering build url")
  // Use map to create an array of parameter strings
  const paramStrings = params.map(param => `${param.key}=${param.value}`);
  //console.log("paramStrings: ", paramStrings)
  // Join the parameter strings with '&' to form the query string
  let queryString = paramStrings.join('&');
  //console.log("querystring: ", queryString)

  // Concatenate the base URL with the query string
  let fullURL = `${baseURL}?${queryString}`;
  //console.log("full url: ", fullURL)
  // Return the full URL
  return fullURL;
}

export const searchBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApi",
  async (props) => {
    const excludeTags = props.excludeTags
    const includeTags = props.includeTags

    let customUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10&include-tags=dinner'


    if (includeTags.length) {
      let includeString = includeTags.join()
      customUrl = customUrl.concat(",", includeString)
    }

    if (excludeTags.length) {
      let substring = "&exclude-tags="
      let excludeString = substring.concat(excludeTags.join())
      customUrl = customUrl.concat(excludeString)
    }



    customUrl = customUrl.toLowerCase()

    // console.log(customUrl)

    const response = await fetch(customUrl, options);
    // console.log("response", response)
    return response.json();
  }
);

//new
export const searchComplexBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchComplexBySpoonacularApi",
  async (props) => {
    //console.log("search recipes")
    const diet = props.diet.join()
    //console.log("diets joined")
    const intolerances = props.intolerances.join()
    //console.log("intolerances joined")

    let baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch"

    let params = [
      { key: "query", value: 'food' },
      { key: "type", value: 'main%20course' },
      { key: "instructionsRequired", value: 'true' },
      { key: "fillIngredients", value: 'true' },
      { key: "addRecipeInformation", value: 'true' },
      { key: "ignorePantry", value: 'true' },
      { key: "sort", value: 'random' },
      { key: "number", value: '10' },
      { key: "limitLicense", value: 'false' },
      { key: "diet", value: diet },
      { key: "intolerances", value: intolerances }
    ];
    //console.log("before build url")
    const generatedUrl = buildURL(baseUrl, params);

    
    //console.log("API url: ", generatedUrl)
    const response = await fetch(generatedUrl, options);
    const jsonResponse = await response.json()
    const customResponse = jsonResponse.results
    //console.log(customResponse)
    return customResponse;
  }
);




export const searchBySpoonacularApiBulkAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiBulk",
  async (props) => {

    // console.log(props)

    let customUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids='
    let recipeIdString = props.join()
    customUrl = customUrl.concat(recipeIdString)

    console.log(customUrl)

    const response = await fetch(customUrl, options);
    return response.json();
  }
);

const spoonacularApi = createSlice({
  name: "spoonacularApi",
  initialState: {
    results: [],
    resultsState: "loading",
    userSavedRecipes: [],

  },
  reducers: {
    popFirstRecipe: (state, action) => {
      state.results.shift();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchBySpoonacularApiAsync.fulfilled, (state, action) => {
      // console.log(action.payload)
      state.results.push(...action.payload.recipes);
      state.resultsState = "ready";
    }).addCase(searchBySpoonacularApiBulkAsync.fulfilled, (state, action) => {
      state.userSavedRecipes.push(action.payload);
    }).addCase(searchComplexBySpoonacularApiAsync.fulfilled, (state, action) => {
      state.results.push(...action.payload);
      state.resultsState = "ready";})
  },
});
export const { popFirstRecipe } = spoonacularApi.actions;
export const getApiResults = (state) => state.spoonacularApi.results;
export const getApiResultsState = (state) => state.spoonacularApi.resultsState;
export default spoonacularApi.reducer;
