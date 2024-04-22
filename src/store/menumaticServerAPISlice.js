import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = 'localhost:5000';
// const options = {
// 	method: 'POST',
// 	headers: {
// 		'User-id': '4e9db78df8msh8414202f72976fap1cb9c3jsn17e6a5ffdd16',
//     	'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
// 	}
// };





export const saveShoplistToMenumaticDb = createAsyncThunk(
  "menumaticServerApi/saveShoplistToMenumaticDb",
  async (info) => {

    const userId = info.userId;
    const data = info.data;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-id': userId,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    return response.json();
  }
);

const menumaticServerApi = createSlice({
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
export const getApiResults = (state) => state.menumaticServerApi.results;
export default menumaticServerApi.reducer;
