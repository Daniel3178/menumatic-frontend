import { createSlice } from "@reduxjs/toolkit";
import { incrementLikesCounter } from "../homepage/homePageSlice";

const recommendation = createSlice({
  name: "recommendation",
  initialState: {
    recommendationList: [],
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
    /*
     * Parameters: state: the current state. action: The dispatched action to be performed.
     * Event: Iterates over each element in the recommendationList array.
     * Condition (if-check): If the id of the currently iterated item in the recommendationList matches the payload's id.
     * Then: Update the count of the currently iterated item (in recommendationList) with the instructed count.
     */
    updateCount: (state, action) => {
      state.recommendationList.map((item) => {
        if (item.result.id === action.payload.id) {
          item.count = action.payload.count;
        }
      });
    },
  },
  /*
   * The first case listen to increamentLikesCounter from homePageSlice.js and adds its argument to
   * recommendation list.
   */
  extraReducers: (builder) => {
    builder.addCase(incrementLikesCounter, (state, action) => {
      state.recommendationList.push({
        portions: 1,
        result: action.payload,
      });
    });
  },
});

/**
 * Purpose: Takes the actions retrieved from the recommendation slice and sets them to fixed variables.
 * Export reducers in the slice
 */
export const { addToReocemmendationList, updateCount } = recommendation.actions;
/**
 * Purpose: Returns the recommendationList from the state
 * @param {*} state: the store
 */
export const getRecommendationList = (state) =>
  state.recommendation.recommendationList;
export default recommendation.reducer;
