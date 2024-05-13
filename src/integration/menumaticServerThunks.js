import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  menumaticServerBaseURL,
  RequestOptFactory,
} from "../config/menumaticApiConfig";

export const saveShoplistToMenumaticDb = createAsyncThunk(
  "menumaticServerApi/saveShoplistToMenumaticDb",
  async (info, { dispatch }) => {
    const { userId, data, excluded } = info;
    const url = menumaticServerBaseURL + "user/create/";
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

    const { userId, data } = info;
    const url = menumaticServerBaseURL + "food-preferences/set/";
    const options = RequestOptFactory.createPostOptWithUserId(
      userId,
      parseData(data)
    );

    try {
      await fetch(url, options);
    } catch (error) {
      alert("Saving failed, server is down");
      return error;
    }
  }
);

export const deleteMealPlan = createAsyncThunk(
  "menumaticServerApi/deleteMealPlan",
  async (info) => {
    const { userId, mealPlanId } = info;

    const url = menumaticServerBaseURL + "mealplan/delete/";
    const options = RequestOptFactory.createDeleteOptForMealPlan(
      userId,
      mealPlanId
    );

    await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to delete the meal plan.");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "menumaticServerApi/deleteMealPlan",
  async (info) => {
    const { userId } = info;

    const url = menumaticServerBaseURL + "user/delete/";
    const options = RequestOptFactory.createDeleteOptWithUserId(userId);

    await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to delete the meal plan.");
    }
  }
);

export const saveExcludedIngredients = createAsyncThunk(
  "menumaticServerApi/saveExcludedIngredients",
  async (info) => {
    const extractIngredientsName = (ingr) => {
      const result = [];
      ingr.map((each) => {
        each.ingredients.map((ing) => {
          result.push(ing.name);
        });
      });
      return result;
    };

    const { mealplanId, excluded: data } = info;

    const url = menumaticServerBaseURL + "mealplan/excluded-ingredients/set/";
    const options = RequestOptFactory.createPostOptForExclIngr(
      mealplanId,
      extractIngredientsName(data)
    );

    await fetch(url, options);
  }
);

export const fetchExcludedIngredients = createAsyncThunk(
  "menumaticServerApi/fetchExcludedIngredients",
  async (info) => {
    const mealplanId = info;
    const url = menumaticServerBaseURL + "mealplan/excluded-ingredients/get/";
    const options = RequestOptFactory.createGetOptWithMealPlanId(mealplanId);

    const response = await fetch(url, options);
    const data = await response.json();

    return { mealplanId: mealplanId, ingredients: data };
  }
);

export const fetchUserShopinglist = createAsyncThunk(
  "menumaticServerApi/fetchUserShopinglist",
  async (info) => {
    const userId = info;
    const url = menumaticServerBaseURL + "user/mealplans/";
    const options = RequestOptFactory.createGetOptWithUserId(userId);
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch user shopList");
    }
    return data;
  }
);

export const fetchUserFoodPref = createAsyncThunk(
  "menumaticServerApi/fetchUserFoodPref",
  async (info) => {
    const splitData = (data) => {
      const includeList = [];
      const excludeList = [];
      let mealsInPlan = 7;
      data.forEach((item) => {
        const [type, value] = item.split("-");
        if (type === "include") {
          includeList.push(value);
        } else if (type === "exclude") {
          excludeList.push(value);
        } else if (type === "mealsInPlan") {
          mealsInPlan = value;
        }
      });
      return { includeList, excludeList, mealsInPlan };
    };

    const userId = info;
    const url = menumaticServerBaseURL + "food-preferences/get/";
    const options = RequestOptFactory.createGetOptWithUserId(userId);

    const response = await fetch(url, options);
    const fetchedData = await response.json();

    const { includeList, excludeList, mealsInPlan } = splitData(fetchedData);

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
