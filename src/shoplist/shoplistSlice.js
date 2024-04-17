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
        
      let inArray = action.payload;
      let outArray = [];

      const stripIngr = (meal) => {
          const portions = meal.portions
          const servings = meal.result.servings
          const ingredients = meal.result.extendedIngredients
          const ingrArr = []
          for(let i = 0; i < ingredients.length; i++){
            const calcAmount = ingredients[i].amount * (portions / servings)
            ingrArr.push({name: ingredients[i].originalName, amount: calcAmount, unit: ingredients[i].unitShort})
        }
        return ingrArr
      }
      console.log(stripIngr(action.payload[0]))

      const updateAllItems = (props) => {
        for(let i = 0; i < props.length; i++){
          let flag = -1
          for(let j = 0; j < state.allItems.length; j++){
            if(props[i].name == state.allItems[j]?.name){
              allItems[j].amount += props[i].amount
              flag = 1
            }
          }
          if(flag = -1){
            state.allItems.push(props[i])
          }
        }
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
