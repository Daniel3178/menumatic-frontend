import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedListId: null,
};

const planSlice = createSlice({
  name: "plan",
  initialState: {
    selectedListId: null,
    allRecipes: [],
    selectedRecipe: null
  },
  reducers: {
    setSelectedListId: (state, action) => {
      state.selectedListId = action.payload;
    },
    setSelectedRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
      console.log("payload", action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedListId, setSelectedRecipe} = planSlice.actions;

/**
 * Purpose: Returns the selected list ID from the state
 * @param {*} state: the store
 */
export const getSelectedListId = (state) => state.plan.selectedListId;
export const getSelectedRecipe = (state) => state.plan.selectedRecipe;

export default planSlice.reducer;
