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
            state.recommendationList.push({portions: 1, result: {...action.payload[0]}});
            if(state.recommendationList.length == 2){
                console.log(state.recommendationList) 
                console.log("RecommendationPageSlice, state.recommendationList")
                console.log(...state.recommendationList)
            }
        });
    }
    });


export const  {addToReocemmendationList, updateCount } = recommendation.actions; // export function 

    export const getRecommendationList = (state) => state.recommendation.recommendationList;
    export default recommendation.reducer;