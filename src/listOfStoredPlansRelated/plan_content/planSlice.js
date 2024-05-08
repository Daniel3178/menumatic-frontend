import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedListId: null,
};

const planSlice = createSlice({
  name: "plan",
  initialState: {
    selectedRecipe: null
  },
  reducers: {
    setSelectedRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
      console.log("payload", action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedRecipe} = planSlice.actions;

/**
 * Purpose: Returns the selected list ID from the state
 * @param {*} state: the store
 */
export const getSelectedListId = (state) => state.plan.selectedListId;
export const getSelectedRecipe = (state) => state.plan.selectedRecipe;

export default planSlice.reducer;
