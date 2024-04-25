import { createSlice } from "@reduxjs/toolkit";

export const planListSlice = createSlice({
  name: "planList",
  initialState: {
    selectedListId: null,
  },
  reducers: {
    setSelectedListId: (state, action) => {
      state.selectedListId = action.payload;
    },
  },
});

export const { setSelectedListId } = planListSlice.actions;

export const getSelectedListId = (state) => state.planList.selectedListId;
export default planListSlice.reducer;
