import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = 'http://130.229.176.192 q:8080/api/daniel-test';


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
    console.log(options)
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const responseData = await response.json();
    console.log("Response:", responseData);
    console.log(responseData.data);
    return responseData;
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
    return await response.json();
  }
);

/**
 * [deprecated]
 */
export const fetchUserRecepiesByListId = createAsyncThunk(
  "menumaticServerApi/fetchUserRecepiesByListId",
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
    return await response.json();
  }
);

const menumaticServerApi = createSlice({
  name: "spoonacularApi",
  initialState: {
    allList: [],
    selectedList:{
      listId: null,
      recepies:[]
    }
  },
  reducers: {
    setSelectedListId: (state, action) => {
      state.selectedList.listId = action.payload;
    },
    flushUserData: (state, action) => {
      state.allList = [];
      state.selectedList.listId = null;
      state.selectedList.recepies = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserShopinglist.fulfilled, (state, action) => {
      state.allList = action.payload;
    }).addCase(fetchUserRecepiesByListId.fulfilled, (state, action) => {
      state.selectedList.recepies = action.payload;
    });
  },
});
export const getMenumaticAllList = (state) => state.menumaticServerApi.allList;
export const getMenumaticSelecedList = (state) => state.menumaticServerApi.selectedList;
export const { setSelectedListId, flushUserData } = menumaticServerApi.actions;
export default menumaticServerApi.reducer;
