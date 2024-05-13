import { createSlice } from "@reduxjs/toolkit";

const homePage = createSlice({
  name: "homePage",
  initialState: {
    likesCounter: 1,
    showInfo: false,
  },
  reducers: {
    incrementLikesCounter: (state, action) => {
      const prevCount = state.likesCounter;

      console.log("prevCount", prevCount);
      console.log("likeLimit", action.payload.likeLimit);
      state.likesCounter = (prevCount + 1) % action.payload.likeLimit;
    },
    toggleInfoView: (state, action) => {
      state.showInfo = !state.showInfo;
    },
  },
});
export const getLikesCounter = (state) => state.homePage.likesCounter;
export const getShowInfo = (state) => state.homePage.showInfo;
export default homePage.reducer;
export const { incrementLikesCounter, toggleInfoView } = homePage.actions;
