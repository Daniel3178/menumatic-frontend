import { createSlice } from "@reduxjs/toolkit";
import { incrementLikesCounter } from "../homepage/homePageSlice";


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
    extraReducers: (builder) => {
        builder
        .addCase(incrementLikesCounter, (state, action) => {
            state.recommendationList.push({count: 1, result: {...action.payload.recipes[0]}});
        });
    }
    });


export const  {addToReocemmendationList, updateCount } = recommendation.actions; // export function 

    export const getRecommendationList = (state) => state.recommendation.recommendationList;
    export default recommendation.reducer;