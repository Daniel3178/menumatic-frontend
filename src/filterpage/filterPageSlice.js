import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const filterPage = createSlice({
    name: "filterPage",
    initialState: {
        apiPrefs: {
            includeTags: {
                title: "food preference",
                paramsArray: [],
            },
            excludeTags: {
                title: "allergies",
                paramsArray: [],
            }
        }
    },
    reducers: {
        saveIncludeTags: (state, action) => {
            if (state.apiPrefs.includeTags.paramsArray.length !== 0) {
                state.apiPrefs.includeTags.paramsArray.length = 0;
            }
            state.apiPrefs.includeTags.paramsArray.push(action.payload);
        },
        saveExcludeTags: (state, action) => {
            if (state.apiPrefs.excludeTags.paramsArray.length !== 0) {
                state.apiPrefs.excludeTags.paramsArray.length = 0;
            }
            state.apiPrefs.excludeTags.paramsArray.push(action.payload);
        },
    },
    });

    export default filterPage.reducer;

    export const {saveIncludeTags, saveExcludeTags} = filterPage.actions;