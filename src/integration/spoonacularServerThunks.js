import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  options,
  spoonacularComplexSearchBaseURL,
  spoonacularRandomSearchBaseURL,
  spoonacularBulkSearchBaseURL,
} from "../config/spoonacularApiConfig.js";

export const searchBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiAsync",
  async (props) => {
    const { excludeTags, includeTags } = props;
    const customUrl = spoonacularRandomSearchBaseURL;

    if (includeTags.length) {
      const includeString = includeTags.join();
      customUrl.concat(",", includeString);
    }

    if (excludeTags.length) {
      const substring = "&exclude-tags=";
      const excludeString = substring.concat(excludeTags.join());
      customUrl.concat(excludeString);
    }

    customUrl.toLowerCase();
    const response = await fetch(customUrl, options);
    return response.json();
  }
);

//new
export const searchComplexBySpoonacularApiAsync = createAsyncThunk(
  "spoonacularApi/searchComplexBySpoonacularApiAsync",
  async (props) => {
    const { diet, intolerances, saveOptOverwrite } = props;

    const buildURL = (baseURL, params) => {
      const paramStrings = params.map((param) => `${param.key}=${param.value}`);
      const queryString = paramStrings.join("&");
      const fullURL = `${baseURL}?${queryString}`;
      return fullURL;
    };

    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    };

    const params = [
      { key: "query", value: "" },
      { key: "type", value: "main%20course" },
      { key: "instructionsRequired", value: "true" },
      { key: "fillIngredients", value: "true" },
      { key: "addRecipeInformation", value: "true" },
      { key: "ignorePantry", value: "true" },
      { key: "sort", value: "popularity" },
      { key: "number", value: "10" },
      { key: "limitLicense", value: "false" },
      { key: "offset", value: getRandomInt(900) },
      { key: "maxReadyTime", value: 90 },
      { key: "diet", value: diet.join() },
      { key: "intolerances", value: intolerances.join() },
    ];
    const generatedUrl = buildURL(spoonacularComplexSearchBaseURL, params);
    const response = await fetch(generatedUrl, options);
    const jsonResponse = await response.json();

    return {
      results: jsonResponse.results,
      saveOptOverwrite: saveOptOverwrite,
    };
  }
);

export const searchBySpoonacularApiBulkAsync = createAsyncThunk(
  "spoonacularApi/searchBySpoonacularApiBulkAsync",
  async (props) => {
    const ids = props.map((recipe) => recipe.id);

    const customUrl = spoonacularBulkSearchBaseURL;
    const recipeIdString = ids.join();
    const fullUrl = customUrl.concat(recipeIdString);

    const response = await fetch(fullUrl, options);
    const jsonResponse = await response.json();

    const findPortion = (id) => {
      const portion = props.find((item) => item.id === id);
      return portion ? portion.portions : undefined;
    };

    const normalizeIngrAmount = (meal, portions) => {
      const {id, imageType, title, analyzedInstructions,servings, extendedIngredients } =
        meal;
      const ingrArr = extendedIngredients.map((ingredient) => {
        const { measures: {metric: {amount, unitShort}}, name, nameClean } = ingredient;
        const calcAmount =
          amount > 0.1 ? amount * (portions / servings) : amount;
        return {
          nameClean: nameClean || name,
          measures: {
            metric: {
              amount: calcAmount,
              unitShort: unitShort,
            },
          },
        };
      });

      return {
        id: id,
        title: title,
        imageType: imageType,
        analyzedInstructions: analyzedInstructions,
        extendedIngredients: ingrArr,
      };
    };

    const result = jsonResponse.map((recipe) => {
      const foundedPortions = findPortion(recipe.id);
      return {
        portions: foundedPortions,
        result: normalizeIngrAmount(recipe, foundedPortions),
      };
    });

    return { apiData: jsonResponse, userData: result };
  }
);
