import React from "react";
import './RecepiesForAWeekViewCSS.css';

const RecommendationPageView = (props) => { //renderList

    const renderList = () =>{
        console.log("RENDERING LIST");
        console.log(props.listOfMeals); //Tar emot recommendationlist, alltså array av likeade meals.
        return props.listOfMeals.map((mealDataForTheDay, mealIndex) => {
            //Loopar igenom listan av meals, där meals är det nuvarande elementet som inspekteras i array:en.
            console.log(meal); //printar ut den meal som nuvarande inspekterades i loop. {portions: 1, result: {...}} där {...} består av alla data om meal.
            console.log(meal.result.title); //Printar ut namn av current meal i loop.
            return (
             <RecepieForADay dayOfTheWeek={mealIndex + 1} dish={mealDataForTheDay.result.title} priceLevel={pricePerServingToApproximatePriceLevel(mealDataForTheDay.result.pricePerServing)}></RecepieForADay>
            );
          });
    }

  return (     //returnerar till hemsidan
   <div>
            <ul className="category-menu">
                <li>Billig</li>
                <li>Rekommenderas</li>
                <li>Dyr</li>
                <li>Snabb</li>
            </ul>
            <table style={{ width: "100%" }}>
                <tr>
                    <th style={{ width: "30%" }}>Day</th> 
                    <th style={{ width: "50%" }}>Dish</th> 
                    <th style={{ width: "20%" }}>Price level</th> 
                    <th>Portions</th>
                </tr>
                {renderTheFoodRecommendationsPerDay()}
                <tr>
                    <td>Default portions</td>
                    <td></td>
                    <td></td>
                    <td><input type="number" id="defaultPortions" name="quantity" min="1" defaultValue="1" max="100"></input></td>
                </tr>
            </table>
            <button onClick={props.myButtonHandler} class="button" role="button">Show Shopping List</button>
        </div>
  );
};

function pricePerServingToApproximatePriceLevel(instancePricePerServing){

    if(instancePricePerServing < 100){
        return "$"
    }
    else if (instancePricePerServing < 1000){
        return "$$"
    }
    else{
        return "$$$"
    }
}

// These are lists which are made to be horisontal through CSS. Find template of this?
const RecepieForADay = (props) => {
    // Potentially make `id={props.dayOfTheWeek}` into one where `props.dayOfWeek` is provides the week names. Will nonetheless have to take into account a calendar..
    return (
        <tr>
            <td>Day {props.dayOfTheWeek}</td>
            <td>{props.dish}</td>
            <td>{props.priceLevel}</td>
            <td><input type="number" id={props.dayOfTheWeek} name="quantity" min="1" defaultValue="1"></input></td>
        </tr>
    )
}


export default RecommendationPageView;
