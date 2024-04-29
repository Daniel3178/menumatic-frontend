import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const menuPage = createSlice({
    name: "menuPage",
    initialState: {
        menuState: "loggedOut",
    },
    reducers: {
        setMenuView: (state, action) => {
            state.menuState = action.payload;
        }
    },
    });
    export const getMenuState = (state) => state.menuState;
    export default menuPage.reducer;
    export const {menuState} = menuPage.actions;