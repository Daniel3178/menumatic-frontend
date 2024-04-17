import { createSlice } from "@reduxjs/toolkit";

const shoplistSlice = createSlice({
  name: "Shoplist",
  initialState: {
    allItems: [],
  },
  reducers: {
    generateShoplist: (state, action) => {
        console.log("InkopslistaPresenter, shoplistObject, InArray, ERROR here ");
        
      let inArray = action.payload;
      let outArray = [];
      outArray.push({name: "ingredient", amount: "amount", unit: "unit"})
      console.log(inArray[0]);
      for (let i = 0; i < inArray.length; i++) {
        console.log("list of recipes for each day")
        console.log(inArray[i])
        for (let j = 0; j < inArray[i].result.extendedIngredients.length; j++) {
            console.log("ingredients of recipe")
            console.log("ingredient array size: " + inArray[i].result.extendedIngredients.length)
            console.log("outArray length: " + outArray.length)
          for (let k = 0; k <= outArray.length; k++) {
            console.log("[STATE 1] check for already existing ingredients")
            let addAmount =
              inArray[i].result.extendedIngredients[j].amount *
              (inArray[i].portions / inArray[i].result.servings);
              console.log("addAmount: " + addAmount)
            if (outArray[k].name === inArray[i].result.extendedIngredients[j].name) {
                console.log("if statement")
              outArray[k].amount += addAmount;
              console.log(outArray);
            } else {
                console.log("else statement")
              outArray.push(
                {
                  name: inArray[i].result.extendedIngredients[j].name,
                  amount: addAmount,
                  unit: inArray[i].result.extendedIngredients[j].unitShort
                }
              );
              console.log(outArray);
            }
          }
        }
      }
      console.log("EROR maybe here ")
      console.log(outArray);
      state.allItems = outArray;
    },
  },
});
export const getAllItems = (state) => state.shoplist.allItems;
export const { generateShoplist } = shoplistSlice.actions;
export default shoplistSlice.reducer;
