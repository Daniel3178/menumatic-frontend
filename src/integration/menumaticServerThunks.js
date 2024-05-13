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
      return (
        <div class="h-screen w-screen flex flex-col items-center justify-center bg-smokeWhite lg:mr-72 max-w-lg mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-32 h-32 text-gunmetal mb-10 stroke-cerulean stroke-[1.75]"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
          <h1 class="text-5xl font-extrabold text-gunmetal mb-4">
            Saving failed. Server is down.
          </h1>
          <p class="text-lg text-gunmetal">
            We're sorry for the inconvenience. Please try checking back later.
          </p>
        </div>
      );
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
      return (
        <div class="h-screen w-screen flex flex-col items-center justify-center bg-smokeWhite lg:mr-72 max-w-lg mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-32 h-32 text-gunmetal mb-10 stroke-cerulean stroke-[1.75]"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
          <h1 class="text-5xl font-extrabold text-gunmetal mb-4">
            Saving failed. Server is down.
          </h1>
          <p class="text-lg text-gunmetal">
            We're sorry for the inconvenience. Please try checking back later.
          </p>
        </div>
      );
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
