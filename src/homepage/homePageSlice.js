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
      state.likesCounter = (prevCount + 1) % action.payload.likeLimit;
    },
    resetLikesCounter: (state) => {
      state.likesCounter = 1;
    },
    
    toggleInfoView: (state, action) => {
      state.showInfo = !state.showInfo;
    },
  },
});
export const getLikesCounter = (state) => state.homePage.likesCounter;
export const getShowInfo = (state) => state.homePage.showInfo;
export default homePage.reducer;
export const { incrementLikesCounter, toggleInfoView, resetLikesCounter } = homePage.actions;
