import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const filterPage = createSlice({
    name: "filterPage",
    initialState: {
        apiPrefs: {
            boundel1: {
                title: "food preference",
                paramsArray: [],
            },
            boundel2: {
                title: "allergies",
                paramsArray: [],
            }
        }
    },
    reducers: {
        saveBoundel1: (state, action) => {
            state.apiPrefs.boundel1.paramsArray.push(action.payload)
        },
        saveBoundel2: (state, action) => {
            state.apiPrefs.boundel2.paramsArray.push(action.payload)
        },
    },
    });

    export default filterPage.reducer;

    export const {saveBoundel1, saveBoundel2} = filterPage.actions;