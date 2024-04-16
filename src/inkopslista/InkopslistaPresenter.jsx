import React from "react";

const inkopslista = createslice(
    {
        name: ""
    }
)

const outArray = [];
const inArray = [object:wantedPortions];

function outObj(name, amount, unit){
    this.name = name
    this.amount = amount
    this.unit = unit
}



while(inArray[i] != null){
    while(inArray[i].extendedIngredients[j] != null){
            while(outArray[k] != null){
                addAmount = (inArray[i].extendedIngredients[j].amount * (wantedPortions / inArray[i].extendedIngredients[j].servings));
                if(outArray[k].name == inArray[i].extendedIngredients[j].name){
                outArray[k].amount += addAmount
                }
                else{
                    outArray.last = {inArray[i].extendedIngredients[j].name, inArray[i].extendedIngredients[j].amount, inArray[i].extendedIngredients[j].unitShort}
                }
                k++
            }
        j++;
    }
    i++;
}