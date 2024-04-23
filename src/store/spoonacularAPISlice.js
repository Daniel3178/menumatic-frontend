import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {options } from "../config/spoonacularApiConfig";

export const searchBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApi",
  async (props) => {
    const excludeTags = props.excludeTags
    const includeTags = props.includeTags

    let customUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&include-tags=dinner'


    if(includeTags.length){
      let includeString = includeTags.join()
      customUrl = customUrl.concat(",", includeString)
    }

    if(excludeTags.length){
      let substring = "&exclude-tags="
      let excludeString = substring.concat(excludeTags.join())
      customUrl = customUrl.concat(excludeString) 
    }

    

    customUrl = customUrl.toLowerCase()

    console.log(customUrl)

    const response = await fetch(customUrl, options);
    return response.json();
  }
);

export const searchBySpoonacularApiBulkAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiBulk",
  async (props) => {

    console.log(props)

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
    results: null,
  },
  reducers: {
    setSpoonacularApi: (state, action) => {
      state.spoonacularApi = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchBySpoonacularApiAsync.fulfilled, (state, action) => {
      state.results = action.payload;
    });
  },
});
export const getApiResults = (state) => state.spoonacularApi.results;
export default spoonacularApi.reducer;
