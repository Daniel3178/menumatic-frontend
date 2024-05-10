import { createAsyncThunk } from "@reduxjs/toolkit";
import { RequestOptFactory } from "../config/menumaticApiConfig";
const url = "http://localhost:8080/api/user/create/";
const deleteUrl = "http://localhost:8080/api/mealplan/delete/";

export const saveShoplistToMenumaticDb = createAsyncThunk(
  "menumaticServerApi/saveShoplistToMenumaticDb",
  async (info, { dispatch }) => {
    const userId = info.userId;
    const data = info.data;
    const excluded = info.excluded;
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "User-id": userId,
    //   },
    //   body: JSON.stringify(data),
    // };

    const options = RequestOptFactory.createPostOptWithUserId(userId, data);

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
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "User-id": userId,
    //   },
    //   body: JSON.stringify(newData),
    // };
    const options = RequestOptFactory.createPostOptWithUserId(userId, newData);

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
    // const options = {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "User-id": userId,
    //   },
    //   body: JSON.stringify({ mealplanId: mealPlanId }),
    // };
    const options = RequestOptFactory.createDeleteOptForMealPlan(
      userId,
      mealPlanId
    );
    await fetch(deleteUrl, options);
    if (!response.ok) {
      throw new Error("Failed to delete the meal plan.");
    }
  }
);

//TODO: The method should be delete
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
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "mealplan-id": mealplanId,
    //   },
    //   body: JSON.stringify(ingredients),
    // };
    const options = RequestOptFactory.createPostOptForExclIngr(
      mealplanId,
      ingredients
    );

    await fetch(customUrl, options);
  }
);

export const fetchExcludedIngredients = createAsyncThunk(
  "menumaticServerApi/fetchExcludedIngredients",
  async (info) => {
    const customUrl =
      "http://localhost:8080/api/mealplan/excluded-ingredients/get/";
    const mealplanId = info;

    // const options = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "mealplan-id": mealplanId,
    //   },
    // };
    const options = RequestOptFactory.createGetOptWithMealPlanId(mealplanId);
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
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "User-id": userId,
    //   },
    // };
    const options = RequestOptFactory.createGetOptWithUserId(userId);
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
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "User-id": userId,
    //   },
    // };
    const options = RequestOptFactory.createGetOptWithUserId(userId);

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
