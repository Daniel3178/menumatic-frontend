import { createSlice } from "@reduxjs/toolkit";
// Additional imports for API calls, etc.

export const planListSlice = createSlice({
  name: "planList",
  initialState: {
    listOfPlans: [],
  },
  reducers: {
    addToPlanList: (state, action) => {
      state.listOfPlans.push({ count: 1, result: action.payload });
    },
    // Reducers to manage weekPlan state, such as updating portions or adding new meals
  },
  updateCount: (state, action) => {
    // Titta här Daniel, taget ifrån recommendationPageSlice.js
    /* state.listOfPlans.map((item) => {
      if (item.result.id === action.payload.id) {
        item.count = action.payload.count;
      }
    }); */
  },

  // Taget ifrån recommendationPageSlice.js
  /* extraReducers: (builder) => {
    builder.addCase(incrementLikesCounter, (state, action) => {
      state.recommendationList.push({
        portions: 1,
        result: { ...action.payload[0] },
      });
    });
  }, */
});

export const { addToPlanList, updateCount } = planListSlice.actions;

export const getListOfPlans = (state) => state.planList.listOfPlans;
export default planListSlice.reducer;
