import { createSlice } from "@reduxjs/toolkit";
import { incrementLikesCounter } from "../homepage/homePageSlice";
import { saveShoplistToMenumaticDb } from "../store/menumaticServerAPISlice";

const recommendation = createSlice({
  name: "recommendation",
  initialState: {
    recommendationList: [],
    state: "loading",
    selectedTab: "Popular",
    affordableDishesList: {
      name: "Cheap",
      dishes: [],
    },
    popularDishesList: {
      name: "Popular",
      dishes: [],
    },
    quickDishesList: {
      name: "Quick",
      dishes: [],
    },
  },
  reducers: {
    /**
     * [deprecated]
     * adds dish to recommendationList
     * @param {*} state: state of the slice
     * @param {*} action: a dish object to be added to recommendationList
     * by Daniel
     */
    addToReocemmendationList: (state, action) => {
      state.recommendationList.push({ count: 1, result: action.payload });
    },

    // flushRecommendationList: (state) => {
    //   state.recommendationList = [];
    //   state.affordableDishesList.dishes = [];
    //   state.popularDishesList.dishes = [];
    //   state.quickDishesList.dishes = [];
    // },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    sortLikedDishes: (state, action) => {
      state.state = "loading";
      const mealsInPlan = action.payload;
      const testArr = [];
      state.recommendationList.map((item) => {
        testArr.push(item);
      });
      state.affordableDishesList.dishes.push(
        ...testArr
          .sort((a, b) => a.result.pricePerServing - b.result.pricePerServing)
          .slice(0, mealsInPlan)
      );
      state.popularDishesList.dishes.push(
        ...testArr
          .sort((a, b) => b.result.spoonacularScore - a.result.spoonacularScore)
          .slice(0, mealsInPlan)
      );
      state.quickDishesList.dishes.push(
        ...testArr
          .sort((a, b) => a.result.readyInMinutes - b.result.readyInMinutes)
          .slice(0, mealsInPlan)
      );
      state.state = "ready";
    },
    /*
     * Parameters: state: the current state. action: The dispatched action to be performed.
     * Event: Iterates over each element in the recommendationList array.
     * Condition (if-check): If the id of the currently iterated item in the recommendationList matches the payload's id.
     * Then: Update the count of the currently iterated item (in recommendationList) with the instructed count.
     */
    updateCount: (state, action) => {
      switch (action.payload.list) {
        case "Cheap": {
          state.affordableDishesList.dishes.map((item) => {
            if (item.result.id === action.payload.id) {
              item.portions = action.payload.portions;
            }
          });
          break;
        }
        case "Popular": {
          state.popularDishesList.dishes.map((item) => {
            if (item.result.id === action.payload.id) {
              item.portions = action.payload.portions;
            }
          });
          break;
        }
        case "Quick": {
          state.quickDishesList.dishes.map((item) => {
            if (item.result.id === action.payload.id) {
              item.portions = action.payload.portions;
            }
          });
          break;
        }
      }
    },
  },
  /*
   * The first case listen to increamentLikesCounter from homePageSlice.js and adds its argument to
   * recommendation list.
   */
  extraReducers: (builder) => {
    builder
      .addCase(incrementLikesCounter, (state, action) => {
        if (state.recommendationList.length > 15) {
          state.recommendationList = [];
        }
        console.log("recipe ", action.payload.recipe);
        state.recommendationList.push({
          portions: 1,
          result: action.payload.recipe,
        });
      })
      .addCase(saveShoplistToMenumaticDb.fulfilled, (state, action) => {
        state.recommendationList = [];
        state.affordableDishesList.dishes = [];
        state.popularDishesList.dishes = [];
        state.quickDishesList.dishes = [];
      });
  },
});

/**
 * Purpose: Takes the actions retrieved from the recommendation slice and sets them to fixed variables.
 * Export reducers in the slice
 */
export const {
  addToReocemmendationList,
  // flushRecommendationList,
  setSelectedTab,
  updateCount,
  sortLikedDishes,
} = recommendation.actions;
/**
 * Purpose: Returns the recommendationList from the state
 * @param {*} state: the store
 */
export const getRecommendationList = (state) =>
  state.recommendation.recommendationList;
// export const getSelectedTab = (state) => state.recommendation.selectedTab;
export const getAffordableDishesList = (state) =>
  state.recommendation.affordableDishesList.dishes;
export const getQuickDishesList = (state) =>
  state.recommendation.quickDishesList.dishes;
export const getPopularDishesList = (state) =>
  state.recommendation.popularDishesList.dishes;

// new
export const getSelectedTab = (state) => {
  switch (state.recommendation.selectedTab) {
    case "Popular":
      return state.recommendation.popularDishesList;
    case "Cheap":
      return state.recommendation.affordableDishesList;
    case "Quick":
      return state.recommendation.quickDishesList;
    default:
      return state.recommendation.popularDishesList;
  }
};

export default recommendation.reducer;
