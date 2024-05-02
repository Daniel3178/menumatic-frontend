import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveTags } from "../menu/filterPageSlice";
const url = "http://localhost:8080/api/user/create/";
const deleteUrl = 'localhost:8080/api/user/mealplan/delete';


export const saveShoplistToMenumaticDb = createAsyncThunk(
  "menumaticServerApi/saveShoplistToMenumaticDb",
  async (info, {dispatch}) => {
    const userId = info.userId;
    const data = info.data;
    const excluded = info.excluded;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-id": userId,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      const {mealplan_id} = await response.json();
      dispatch(saveExcludedIngredients({mealplanId: mealplan_id, excluded: excluded}));
      alert("Data saved successfully")
    }
    catch (error) {
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
    const parseData = (dataP) => {
      const result = [];
      dataP.includeTags.map((tag)=>{
        result.push(`include-${tag}`);
      });
      dataP.excludeTags.map((tag)=>{
        result.push(`exclude-${tag}`);
      });
      return result;
    }
    const newData = parseData(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-id': userId,
      },
      body: JSON.stringify(newData),
    };
    const custUrl = 'http://localhost:8080/api/food-preferences/set/'
    try {
      await fetch(custUrl, options);
    }
    catch (error) {
      alert("Saving failed, server is down");
      return error;
    
    }});
export const deleteMealPlan = createAsyncThunk(
  "menumaticServerApi/deleteMealPlan",
  async ({ info }) => {
    const userId = info.userId;
    const mealPlanId = info.mealPlanId;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "User-id": userId,
      },
      body: JSON.stringify({ mealPlanId }),
    };
    console.log("Fetching user shopping list is CALLED");
    // dispatch(setMenumaticServerState("loading"));
    const response = await fetch(`${deleteUrl}`, options);
    if (!response.ok) {
      throw new Error("Failed to delete the meal plan.");
    }
    return await response.json();
  }
);

export const saveExcludedIngredients = createAsyncThunk(
  "menumaticServerApi/saveExcludedIngredients",
  async (info) => {
    const customUrl = "http://localhost:8080/api/mealplan/excluded-ingredients/set/";
    const mealplanId = info.mealplanId;
    const data = info.excluded;

    const extractIngredientsName = (ingr)=>{
      const result =[];
      ingr.map((each)=>{
        each.ingredients.map((ing) =>{
          result.push(ing.name)
        })
      })
      return result;
    }
    const ingredients = extractIngredientsName(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mealplan-id': mealplanId,
      },
      body: JSON.stringify(ingredients),
    };
  
    await fetch(customUrl, options);

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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-id": userId,
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
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-id': userId,
      },
    };  

    const response = await fetch(customUrl, options);
    const fetchedData = await response.json();

    const includeList = [];
    const excludeList = [];

fetchedData.forEach(item => {
    const [type, value] = item.split('-');
    if (type === 'include') {
        includeList.push(value);
    } else if (type === 'exclude') {
        excludeList.push(value);
    }
});
dispatch(saveTags({includeTags: includeList, excludeTags: excludeList}));

    if (!response.ok) {
      throw new Error("Failed to fetch user shopList");
    }
    return await fetchedData;
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-id": userId,
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
    selectedList: {
      listId: null,
      recepies: [],
    },
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
      state.allList = action.payload;
      state.state = "ready";
    }).addCase(fetchUserFoodPref.fulfilled, (state, action) => {
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
export const getMenumaticSavedRecipes = (state) =>
  state.menumaticServerApi.userSavedRecipes;
export const getMenumaticSelecedList = (state) =>
  state.menumaticServerApi.selectedList;
export const getMenumaticState = (state) => state.menumaticServerApi.state;
export const { setSelectedListId, flushUserData, setMenumaticServerState } =
  menumaticServerApi.actions;
export default menumaticServerApi.reducer;
