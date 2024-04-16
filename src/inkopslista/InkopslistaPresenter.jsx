import React from "react";

const inkopslista = createslice(
    {
        name: ""
    }
)

const outArray = [];
const inArray = [object:wantedPortions];

function outObj(name, amount, unit){
    return {
        name: name,
        amount: amount,
        unit: unit
    };
}

const outObj = {
    name:
}

while(inArray[i] != null){
    while(inArray[i].extendedIngredients[j] != null){
            while(outArray[k] != null){
                addAmount = (inArray[i].extendedIngredients[j].amount * (wantedPortions / inArray[i].servings));
                if(outArray[k].name == inArray[i].extendedIngredients[j].name){
                outArray[k].amount += addAmount
                }
                else{
                    outArray.last = {inArray[i].extendedIngredients[j].name, addAmount, inArray[i].extendedIngredients[j].unitShort}
                }
                k++
            }
        j++;
    }
    i++;
}