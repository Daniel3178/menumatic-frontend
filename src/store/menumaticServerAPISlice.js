import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = 'https://localhost:8080';


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

export const fetchUserShopinglist = createAsyncThunk(
  "menumaticServerApi/saveShoplistToMenumaticDb",
  async (info) => {
    const userId = info.userId;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-id': userId,
      },
    };

    const response = await fetch(url, options);
    return response.json();
  }
);

export const fetchUserRecepiesByListId = createAsyncThunk(
  "menumaticServerApi/saveShoplistToMenumaticDb",
  async (info) => {

    const userId = info.userId;
    const listId = info.listId;
    const paramUrl = `https://localhost:8080?id=${listId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-id': userId,
      },
    };

    const response = await fetch(paramUrl, options);
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
