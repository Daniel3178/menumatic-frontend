import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedListId: null,
};

const planSlice = createSlice({
  name: "plan",
  initialState: {
    selectedList: null,
    allRecipes: []
  },
  reducers: {
    setSelectedListId: (state, action) => {
      state.selectedListId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedListId } = planSlice.actions;

/**
 * Purpose: Returns the selected list ID from the state
 * @param {*} state: the store
 */
export const getSelectedListId = (state) => state.plan.selectedListId;

export default planSlice.reducer;
