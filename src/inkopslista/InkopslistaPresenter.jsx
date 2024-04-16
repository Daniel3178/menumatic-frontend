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

<<<<<<< Updated upstream

=======
const outObj = {
    name:
}
>>>>>>> Stashed changes

while(inArray[i] != null){
    while(inArray[i].extendedIngredients[j] != null){
            while(outArray[k] != null){
<<<<<<< Updated upstream
                addAmount = (inArray[i].extendedIngredients[j].amount * (wantedPortions / inArray[i].extendedIngredients[j].servings));
=======
                addAmount = (inArray[i].extendedIngredients[j].amount * (wantedPortions / inArray[i].servings));
>>>>>>> Stashed changes
                if(outArray[k].name == inArray[i].extendedIngredients[j].name){
                outArray[k].amount += addAmount
                }
                else{
<<<<<<< Updated upstream
                    outArray.last = {inArray[i].extendedIngredients[j].name, inArray[i].extendedIngredients[j].amount, inArray[i].extendedIngredients[j].unitShort}
=======
                    outArray.last = {inArray[i].extendedIngredients[j].name, addAmount, inArray[i].extendedIngredients[j].unitShort}
>>>>>>> Stashed changes
                }
                k++
            }
        j++;
    }
    i++;
}