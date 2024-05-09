import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://localhost:8080/api/user/create/";
const deleteUrl = "http://localhost:8080/api/mealplan/delete/";
import { searchBySpoonacularApiBulkAsync } from "../store/spoonacularAPISlice";
import { signOutCurrentUser } from "../menu/userAccountSlice";

export const saveShoplistToMenumaticDb = createAsyncThunk(
  "menumaticServerApi/saveShoplistToMenumaticDb",
  async (info, { dispatch }) => {
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
      const { mealplan_id } = await response.json();
      dispatch(
        saveExcludedIngredients({ mealplanId: mealplan_id, excluded: excluded })
      );
      alert("Data saved successfully");
    } catch (error) {
      alert("Saving failed, server is down");
      return error;
    }
  }
);

export const saveFoodPrefToMenumaticDb = createAsyncThunk(
  "menumaticServerApi/saveFoodPrefToMenumaticDb",
  async (info) => {
    const userId = info.userId;
    const data = info.data;
    const parseData = (dataP) => {
      const result = [];
      dataP.includeTags.map((tag) => {
        result.push(`include-${tag}`);
      });
      dataP.excludeTags.map((tag) => {
        result.push(`exclude-${tag}`);
      });
      result.push(`mealsInPlan-${dataP.mealsInPlan}`);
      return result;
    };
    const newData = parseData(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-id": userId,
      },
      body: JSON.stringify(newData),
    };
    const custUrl = "http://localhost:8080/api/food-preferences/set/";
    try {
      await fetch(custUrl, options);
    } catch (error) {
      alert("Saving failed, server is down");
      return error;
    }
  }
);

export const deleteMealPlan = createAsyncThunk(
  "menumaticServerApi/deleteMealPlan",
  async (info, { dispatch }) => {
    const userId = info.userId;
    const mealPlanId = info.mealPlanId;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "User-id": userId,
      },
      body: JSON.stringify({ mealplanId: mealPlanId }),
    };
    await fetch(deleteUrl, options);
    if (!response.ok) {
      throw new Error("Failed to delete the meal plan.");
    }
  }
);
export const deleteUser = createAsyncThunk(
  "menumaticServerApi/deleteMealPlan",
  async (info) => {
    const userId = info.userId;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-id": userId,
      },
    };
    const deleteUserUrl = "http://localhost:8080/api/user/delete/";
    await fetch(deleteUserUrl, options);
    if (!response.ok) {
      throw new Error("Failed to delete the meal plan.");
    }
  }
);

export const saveExcludedIngredients = createAsyncThunk(
  "menumaticServerApi/saveExcludedIngredients",
  async (info) => {
    const customUrl =
      "http://localhost:8080/api/mealplan/excluded-ingredients/set/";
    const mealplanId = info.mealplanId;
    const data = info.excluded;

    const extractIngredientsName = (ingr) => {
      const result = [];
      ingr.map((each) => {
        each.ingredients.map((ing) => {
          result.push(ing.name);
        });
      });
      return result;
    };
    const ingredients = extractIngredientsName(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mealplan-id": mealplanId,
      },
      body: JSON.stringify(ingredients),
    };

    await fetch(customUrl, options);
  }
);

export const fetchExcludedIngredients = createAsyncThunk(
  "menumaticServerApi/fetchExcludedIngredients",
  async (info) => {
    const customUrl =
      "http://localhost:8080/api/mealplan/excluded-ingredients/get/";
    const mealplanId = info;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "mealplan-id": mealplanId,
      },
    };
    const response = await fetch(customUrl, options);
    const data = await response.json();

    return { mealplanId: mealplanId, ingredients: data };
  }
);

export const fetchUserShopinglist = createAsyncThunk(
  "menumaticServerApi/fetchUserShopinglist",
  async (info, { dispatch }) => {
    const customUrl = "http://localhost:8080/api/user/mealplans/";
    const userId = info;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-id": userId,
      },
    };
    console.log("Fetching user shopping list is CALLED");
    const response = await fetch(customUrl, options);

    if (!response.ok) {
      throw new Error("Failed to fetch user shopList");
    }
    return await response.json();
  }
);

export const fetchUserFoodPref = createAsyncThunk(
  "menumaticServerApi/fetchUserFoodPref",
  async (info, { dispatch }) => {
    const customUrl = "http://localhost:8080/api/food-preferences/get/";
    const userId = info;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-id": userId,
      },
    };

    const response = await fetch(customUrl, options);
    const fetchedData = await response.json();

    const includeList = [];
    const excludeList = [];
    let mealsInPlan = 7;

    fetchedData.forEach((item) => {
      const [type, value] = item.split("-");
      if (type === "include") {
        includeList.push(value);
      } else if (type === "exclude") {
        excludeList.push(value);
      } else if (type === "mealsInPlan") {
        mealsInPlan = value;
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user shopList");
    }
    return {
      rawData: fetchedData,
      includeTags: includeList,
      excludeTags: excludeList,
      mealNum: mealsInPlan,
    };
  }
);

const menumaticServerApi = createSlice({
  name: "spoonacularApi",
  initialState: {
    userAllListPromise: {
      data: [],
      state: "loading",
      error: null,
    },
    userCurrentRecipesPromise: {
      data: JSON.parse(localStorage.getItem("userCurrentRecipes")) || [],
      state: "loading",
      error: null,
    },
    userFoodPrefPromise: {
      data: [],
      state: "loading",
      error: null,
    },
    excludedIngredientsPromise: {
      data: {
        mealplanId: null,
        ingredients: [],
      },
      state: "loading",
      error: null,
    },
    selectedList: JSON.parse(localStorage.getItem("selectedList")) || {},
  },

  reducers: {
    deleteList: (state, action) => {
      const { listId } = action.payload;
      const updatedData = state.userAllListPromise.data.filter(
        (item) => item.id !== listId
      );
      state.userAllListPromise.data = updatedData;
    },
    setSelectedList: (state, action) => {
      const { id } = action.payload;
      if (state.userAllListPromise.state === "ready") {
        state.selectedList = state.userAllListPromise.data.find(
          (item) => item.id === id
        );
      } else {
        state.selectedList = { id: id, name: "", recepies: [] };
      }
      localStorage.setItem("selectedList", JSON.stringify(state.selectedList));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserShopinglist.pending, (state, action) => {
        state.userAllListPromise.state = "loading";
      })
      .addCase(fetchUserShopinglist.fulfilled, (state, action) => {
        state.userAllListPromise.data = action.payload;
        state.userAllListPromise.state = "ready";
      })
      .addCase(fetchUserShopinglist.rejected, (state, action) => {
        state.userAllListPromise.state = "failed";
      })
      .addCase(fetchUserFoodPref.pending, (state, action) => {
        state.userFoodPrefPromise.state = "loading";
      })
      .addCase(fetchUserFoodPref.fulfilled, (state, action) => {
        state.userFoodPrefPromise.data = action.payload.rawData;
        state.userFoodPrefPromise.state = "ready";
      })
      .addCase(fetchUserFoodPref.rejected, (state, action) => {
        state.userFoodPrefPromise.state = "failed";
      })
      .addCase(fetchExcludedIngredients.pending, (state, action) => {
        state.excludedIngredientsPromise.state = "loading";
      })
      .addCase(fetchExcludedIngredients.fulfilled, (state, action) => {
        state.excludedIngredientsPromise.state = "ready";
        state.excludedIngredientsPromise.data.mealplanId =
          action.payload.mealplanId;
        state.excludedIngredientsPromise.data.ingredients =
          action.payload.ingredients;
      })
      .addCase(fetchExcludedIngredients.rejected, (state, action) => {
        state.excludedIngredientsPromise.state = "failed";
      })
      .addCase(searchBySpoonacularApiBulkAsync.pending, (state, action) => {
        state.userCurrentRecipesPromise.state = "loading";
      })
      .addCase(searchBySpoonacularApiBulkAsync.fulfilled, (state, action) => {
        const { userData } = action.payload;
        state.userCurrentRecipesPromise.data = userData;
        localStorage.setItem("userCurrentRecipes", JSON.stringify(userData));
        state.userCurrentRecipesPromise.state = "ready";
      })
      .addCase(searchBySpoonacularApiBulkAsync.rejected, (state, action) => {
        state.userSavedRecipesPromise.state = "failed";
      })
      .addCase(signOutCurrentUser, (state, action) => {
        state.userAllListPromise = {
          data: [],
          state: "loading",
          error: null,
        };
        state.userCurrentRecipesPromise = {
          data: [],
          state: "loading",
          error: null,
        };
        state.excludedIngredientsPromise = {
          data: {
            mealplanId: null,
            ingredients: [],
          },
          state: "loading",
          error: null,
        };
        state.userFoodPrefPromise = {
          data: [],
          state: "loading",
          error: null,
        };
      });
  },
});

export const getUserAllListPromise = (state) =>
  state.menumaticServerApi.userAllListPromise;
export const getUserCurrentRecipes = (state) =>
  state.menumaticServerApi.userCurrentRecipesPromise.data;
export const getMenumaticSelecedList = (state) =>
  state.menumaticServerApi.selectedList;
export const getExcludedIngredients = (state) =>
  state.menumaticServerApi.excludedIngredientsPromise.data.ingredients;
export const { setSelectedList, deleteList } = menumaticServerApi.actions;
export default menumaticServerApi.reducer;
