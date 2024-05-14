import { createSlice } from "@reduxjs/toolkit";
import {
  searchBySpoonacularApiBulkAsync,
  searchBySpoonacularApiAsync,
  searchComplexBySpoonacularApiAsync,
} from "../integration/spoonacularServerThunks";

const spoonacularApi = createSlice({
  name: "spoonacularApi",
  initialState: {
    // new
    complexSearchPromise: {
      data: [],
      state: "loading",
      error: null,
    },
    bulkSearchPromise: {
      data: [],
      state: "loading",
      error: null,
    },
    randomSearchPromise: {
      data: [],
      state: "loading",
      error: null,
    },
  },
  reducers: {
    popFirstRecipe: (state, action) => {
      state.complexSearchPromise.data.shift();
    },
    flushSpoonacularResults: (state, action) => {
      state.complexSearchPromise = {
        data: [],
        state: "loading",
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBySpoonacularApiAsync.pending, (state, action) => {
        state.randomSearchPromise.state = "loading";
      })
      .addCase(searchBySpoonacularApiAsync.fulfilled, (state, action) => {
        state.randomSearchPromise.data.push(...action.payload.recipes);
        state.randomSearchPromise.state = "ready";
      })
      .addCase(searchBySpoonacularApiAsync.rejected, (state, action) => {
        state.randomSearchPromise.state = "failed";
      })
      .addCase(searchBySpoonacularApiBulkAsync.pending, (state, action) => {
        state.bulkSearchPromise.state = "loading";
      })
      .addCase(searchBySpoonacularApiBulkAsync.fulfilled, (state, action) => {
        const { apiData } = action.payload;
        state.bulkSearchPromise.data = apiData;
        state.bulkSearchPromise.state = "ready";
      })
      .addCase(searchBySpoonacularApiBulkAsync.rejected, (state, action) => {
        state.bulkSearchPromise.state = "failed";
      })
      .addCase(searchComplexBySpoonacularApiAsync.pending, (state, action) => {
        state.complexSearchPromise.state = "loading";
      })
      .addCase(
        searchComplexBySpoonacularApiAsync.fulfilled,
        (state, action) => {
          const { results, saveOptOverwrite } = action.payload;
          if (saveOptOverwrite) {
            state.complexSearchPromise.data = results;
          } else {
            state.complexSearchPromise?.data?.push(...results);
          }
          state.complexSearchPromise.state = "ready";
        }
      )
      .addCase(searchComplexBySpoonacularApiAsync.rejected, (state, action) => {
        state.complexSearchPromise.state = "failed";
      });
  },
});
export const { popFirstRecipe, flushSpoonacularResults } =
  spoonacularApi.actions;

// new
export const getRandomSearchPromise = (state) =>
  state.spoonacularApi.randomSearchPromise;
export const getComplexSearchPromise = (state) =>
  state.spoonacularApi.complexSearchPromise;
export const getBulkSearchPromise = (state) =>
  state.spoonacularApi.bulkSearchPromise;

export default spoonacularApi.reducer;
