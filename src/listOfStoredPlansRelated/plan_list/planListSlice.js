import { createSlice } from "@reduxjs/toolkit";

export const planListSlice = createSlice({
  name: "planList",
  initialState: {
    selectedListId: null,
  },
  reducers: {
  },
});

// export const { setSelectedListId } = planListSlice.actions;

export const getSelectedListId = (state) => state.planList.selectedListId;
export default planListSlice.reducer;
