import { createSlice } from "@reduxjs/toolkit";
import { connectStorageEmulator } from "firebase/storage";

const shoplistSlice = createSlice({
  name: "Shoplist",
  initialState: {
    allItems: [],
  },
  reducers: {
    generateShoplist: (state, action) => {
        //console.log("InkopslistaPresenter, shoplistObject, InArray, ERROR here ");
        

      const stripIngr = (meal) => {
          //wanted number of portions specified by user
          const portions = meal.portions
          //number of servings for recipe
          const servings = meal.result.servings
          const ingredients = meal.result.extendedIngredients
          const ingrArr = []
          for(let i = 0; i < ingredients.length; i++){
            let calcAmount = 0
            if (ingredients[i].measures.metric.amount > 0.1){
              calcAmount = ingredients[i].measures.metric.amount * (portions / servings)
            }
            else{
              calcAmount = ingredients[i].measures.metric.amount
            }
            ingrArr.push({name: ingredients[i].nameClean, amount: calcAmount, unit: ingredients[i].measures.metric.unitShort})
        }
        return ingrArr
      }
      console.log(stripIngr(action.payload[0]))

      const updateAllItems = (props) => {
        for(let i = 0; i < props.length; i++){
          let flag = -1
          for(let j = 0; j < state.allItems.length; j++){
            if(props[i].name === state.allItems[j].name){
              console.log("!!DUPE FOUND!!" + props[i].name + " and " + state.allItems[j].name)
              state.allItems[j].amount += props[i].amount
              state.allItems[j].amount = Math.round(state.allItems[j].amount * 10) / 10
              flag = 1
            }
          }
          if(flag == -1){
            props[i].amount = Math.round(props[i].amount * 10) / 10
            state.allItems.push(props[i])
          }
        }
        console.log("allItems:" + state.allItems[0].amount)
      }
      
      for(let i = 0; i < action.payload.length; i++){
        updateAllItems(stripIngr(action.payload[i]))
      }
     },
   },
 }
);
export const getAllItems = (state) => state.shoplist.allItems;
export const { generateShoplist } = shoplistSlice.actions;
export default shoplistSlice.reducer;
