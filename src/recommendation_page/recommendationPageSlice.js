import { createSlice } from "@reduxjs/toolkit";
import { url, options } from "../config/spoonacularApiConfig";


const recommendation = createSlice({
    name: "recommendation",
    initialState: {
        recommendationList: [],
    },
    reducers: {
        addToReocemmendationList: (state, action) => {
        state.recommendationList.push({count: 1, result: action.payload});
        },
        updateCount: (state, action) => {
            state.recommendationList.map((item) =>{
                
                if(item.result.id === action.payload.id)
                {
                    item.count = action.payload.count;
                }});
        }
    },
    });


export const  {addToReocemmendationList, updateCount } = recommendation.actions; // export function 

    export const getRecommendationList = (state) => state.recommendation.recommendationList;
    export default recommendation.reducer;