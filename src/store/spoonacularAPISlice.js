import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url, options } from "../config/spoonacularApiConfig";

export const searchBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApi",
  async () => {
    const response = await fetch(url, options);
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
