import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { options } from "../config/spoonacularApiConfig";
import { generateShoplist } from "../shoplist/shoplistSlice";

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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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
      { key: "query", value: '' },
      { key: "type", value: 'main%20course' },
      { key: "instructionsRequired", value: 'true' },
      { key: "fillIngredients", value: 'true' },
      { key: "addRecipeInformation", value: 'true' },
      { key: "ignorePantry", value: 'true' },
      { key: "sort", value: 'popularity' },
      { key: "number", value: '10' },
      { key: "limitLicense", value: 'false' },
      { key: "offset", value: getRandomInt(900) },
      { key: "maxReadyTime", value: 90},
      { key: "diet", value: diet },
      { key: "intolerances", value: intolerances }
    ];
    //console.log("before build url")
    const generatedUrl = buildURL(baseUrl, params);

    
    //console.log("API url: ", generatedUrl)
    const response = await fetch(generatedUrl, options);
    //console.log("Response: ", response)
    const jsonResponse = await response.json()
    //console.log(jsonResponse)
    const customResponse = jsonResponse.results
    //console.log(customResponse)
    return customResponse;
  }
);




export const searchBySpoonacularApiBulkAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiBulk",
  async (props, {dispatch}) => {
   dispatch(setSavedRecipesState("loading"));
    // console.log(props)
    const copyProp = props[0];
    // console.log("PROPS", copyProp)
    const ids = [];
    copyProp.map((recipe) => ids.push(recipe.id))
    console.log("IDS", ids);
    let customUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids='
    let recipeIdString = ids.join()
    customUrl = customUrl.concat(recipeIdString)

    const response = await fetch(customUrl, options);
    const jsonResponse = await response.json()
    const result = [];

    const findPoriont = (id)=>{
      for(let i = 0; i < copyProp.length; i++){
        if(copyProp[i].id === id){
          console.log("FOUND PORTION", copyProp[i].id)
          console.log("FOUND PORTION", copyProp[i].id)
          return copyProp[i].portions;
        }
      }
    }

    jsonResponse.map((recipe) => {
      result.push( {
        portions: findPoriont(recipe.id),
        result: recipe
      })
    })


console.log("Result Rebuilt", result)
    dispatch(generateShoplist(result))
    return result;
  }
);

const spoonacularApi = createSlice({
  name: "spoonacularApi",
  initialState: {
    results: [],
    resultsState: "loading",
    savedRecipesState: "",
    userSavedRecipes: [],

  },
  reducers: {
    popFirstRecipe: (state, action) => {
      state.results.shift();
    },
    setSavedRecipesState: (state, action) => {
      state.savedRecipesState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchBySpoonacularApiAsync.fulfilled, (state, action) => {
      // console.log(action.payload)
      state.results.push(...action.payload.recipes);
      state.resultsState = "ready";
    }).addCase(searchBySpoonacularApiBulkAsync.fulfilled, (state, action) => {
      state.userSavedRecipes.push(...action.payload);
      state.savedRecipesState = "ready";
    }).addCase(searchComplexBySpoonacularApiAsync.fulfilled, (state, action) => {
      state.results.push(...action.payload);
      state.resultsState = "ready";})
  },
});
export const { popFirstRecipe, setSavedRecipesState } = spoonacularApi.actions;
export const getApiResults = (state) => state.spoonacularApi.results;
export const getApiResultsState = (state) => state.spoonacularApi.resultsState;
export const getSavedRecipesState = (state) => state.spoonacularApi.savedRecipesState;
export default spoonacularApi.reducer;
