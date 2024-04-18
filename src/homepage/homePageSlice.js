import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const homePage = createSlice({
    name: "homePage",
    initialState: {
        likesCounter: 0,
        showInfo: false,
    },
    reducers: {
        incrementLikesCounter: (state, action) => {
            state.likesCounter += 1;
        },
        toggleInfoView: (state, action) => {
            state.showInfo = !state.showInfo;
        }
    },
    });
    export const getLikesCounter = (state) => state.homePage.likesCounter;
    export const getShowInfo = (state) => state.homePage.showInfo;
    export default homePage.reducer;
    export const {incrementLikesCounter, toggleInfoView} = homePage.actions;