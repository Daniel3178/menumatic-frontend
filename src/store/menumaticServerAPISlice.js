import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = 'http://localhost:8080/api/user/create/';


export const saveShoplistToMenumaticDb = createAsyncThunk(
  "menumaticServerApi/saveShoplistToMenumaticDb",
  async (info, {dispatch}) => {
    const userId = info.userId;
    const shoplistData = info.data;
    const excludeItems = info.excludeItems;
    console.log("Save SHOPLIST MENUMATIC", userId)
    console.log("Save SHOPLIST MENUMATIC", shoplistData)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-id': userId,
      },
      body: JSON.stringify(shoplistData),
    };

    // console.log("MY STATE:",options)
    try {
      await fetch(url, options);
      const mealplanId = 2;
      console.log("EVERYTHING IS FINE")
      // console.log("Response", response.state)
      // if (!response.ok) {
      //   throw new Error('Failed to post data');
      // }
      dispatch(saveExcluded({mealplanId: mealplanId, data: excludeItems}));
      // const responseData = await response.json();
      // console.log("Response:", responseData);
      // console.log(responseData.data);

      alert("Data saved successfully")
      // return responseData;
    }
    catch (error) {
      // console.log("Error:", error);
      alert("Saving failed, server is down");
      return error;
    
    }
  }
);


export const saveExcluded = createAsyncThunk(
  "menumaticServerApi/saveExcluded",
  async (info) => {
    const custUrl = "http://localhost:8080/api/mealplan/excluded-ingredients/";
    const mealplanId = info.mealplanId;
    const data = info.data;

    const parseData = (list)=>{
      const result = [];
      list.map((item)=>{
        result.push(
          JSON.stringify(item)
        )
      });
      return result;
    }


    console.log("DATA SENT TO EXCLUDED", data)
    console.log("DATA SENT TO EXCLUDED PARSED", JSON.stringify(parseData( data)))
    console.log("DATA SENT TO EXCLUDED MEALPLAN ID", mealplanId)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mealplan-Id': mealplanId,
      },
      body: JSON.stringify(parseData(data)),
    };
    // console.log("MY STATE:",options)
    try {
      await fetch(custUrl, options);
      // console.log("Response", response.state)
      // if (!response.ok) {
      //   throw new Error('Failed to post data');
      // }
      // const responseData = await response.json();
      // console.log("Response:", responseData);
      // console.log(responseData.data);
      alert("Data saved successfully")
      // return responseData;
    }
    catch (error) {
      // console.log("Error:", error);
      alert("Saving failed, server is down");
      return error;
    
    }
  }
);

export const saveFoodPrefToMenumaticDb = createAsyncThunk(
  "menumaticServerApi/saveFoodPrefToMenumaticDb",
  async (info) => {
    console.log(info)
    const userId = info.userId;
    const data = info.data;
    console.log("Data sent to menumatic food prefernece is Called", data)
    const parseData = (dataP) => {
      const result = [];
      console.log("Data sent to menumatic food prefernece", dataP)
      dataP.includeTags.map((tag)=>{
        result.push(`include-${tag}`);
      });
      dataP.excludeTags.map((tag)=>{
        result.push(`exclude-${tag}`);
      });
      return result;
    }
    const newData = parseData(data);
    console.log("Data sent to menumatic food prefernece USER ID ", userId)
    console.log("Data sent to menumatic food prefernece PARSED", newData)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-id': userId,
      },
      body: JSON.stringify(newData),
    };
    // console.log( "Data sent to menumatic food prefernece", JSON.stringify(newData))
    const custUrl = 'http://localhost:8080/api/food-preferences/set/'
    // console.log("MY STATE:",options)
    try {
      await fetch(custUrl, options);
      // console.log("Response", response.state)
      // if (!response.ok) {
      //   throw new Error('Failed to post data');
      // }
      // const responseData = await response.json();
      // console.log("Response:", responseData);
      // console.log(responseData.data);
      alert("Data saved successfully")
      // return responseData;
    }
    catch (error) {
      console.log("Error HERE HERE:", error);
      alert("Saving failed, server is down");
      return error;
    
    }
  }
);

export const fetchUserShopinglist = createAsyncThunk(
  "menumaticServerApi/fetchUserShopinglist",
  async (info, {dispatch}) => {
    dispatch(setMenumaticServerState("loading"));
    const customUrl = "http://localhost:8080/api/user/mealplans/";
    const userId = info;
    // console.log(info)
    // console.log(userId)
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-id': userId,
      },
    };
    console.log("Fetching user shopping list is CALLED");
  // dispatch(setMenumaticServerState("loading"));    
    const response = await fetch(customUrl, options);

    if (!response.ok) {
      throw new Error('Failed to fetch user shopList');
    }
    // console.log(response)
    return await response.json();
  }
);

export const fetchUserFoodPref = createAsyncThunk(
  "menumaticServerApi/fetchUserFoodPref",
  async (info, {dispatch}) => {
    dispatch(setMenumaticServerState("loading"));
    const customUrl = "http://localhost:8080/api/food-preferences/get/";
    const userId = info;
    // console.log(info)
    // console.log(userId)
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-id': userId,
      },
    };
    console.log("Fetching user shopping list is CALLED");
  // dispatch(setMenumaticServerState("loading"));    
    const response = await fetch(customUrl, options);

    if (!response.ok) {
      throw new Error('Failed to fetch user shopList');
    }
    // console.log(response)
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
    userFoodPref:[],
    state: "loading",
    selectedList:{
      listId: null,
      recepies:[]
    }
  },

  reducers: {
    setMenumaticServerState: (state, action) => {
      state.state = action.payload;
    },
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
      // console.log("FETCHING IS DONE")
      // console.log(action.payload)
      state.allList = action.payload;
      state.state = "ready";
    }).addCase(fetchUserFoodPref.fulfilled, (state, action) => {
      // console.log("FETCHING IS DONE")
      // console.log(action.payload)
      state.userFoodPref = action.payload;
      state.state = "ready";
    }).addCase(fetchUserShopinglist.rejected, (state, action) => {
      // console.log("FETCHING IS FAILED")
      state.state = "failed";
    }).addCase(fetchUserRecepiesByListId.fulfilled, (state, action) => {
      state.selectedList.recepies = action.payload;
    }).addCase(fetchUserRecepiesByListId.rejected, (state, action) => {
      state.state = "failed";
    });
  },
});
export const getMenumaticAllList = (state) => state.menumaticServerApi.allList;
export const getMenumaticSavedRecipes = (state) => state.menumaticServerApi.userSavedRecipes;
export const getMenumaticSelecedList = (state) => state.menumaticServerApi.selectedList;
export const getMenumaticState = (state) => state.menumaticServerApi.state;
export const { setSelectedListId, flushUserData, setMenumaticServerState } = menumaticServerApi.actions;
export default menumaticServerApi.reducer;
