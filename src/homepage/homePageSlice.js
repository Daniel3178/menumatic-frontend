import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const homePage = createSlice({
    name: "homePage",
    initialState: {
        likesCounter: 0,
    },
    reducers: {
        incrementLikesCounter: (state, action) => {
            state.likesCounter += 1;
        }
    },
    });
    export const getLikesCounter = (state) => state.homePage.likesCounter;
    export default homePage.reducer;
    export const {incrementLikesCounter} = homePage.action;