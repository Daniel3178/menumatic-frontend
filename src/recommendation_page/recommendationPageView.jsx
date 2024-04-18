import React from 'react'
import './RecepiesForAWeekViewCSS.css';

const dummyData = [
  {dish:"lorem ipsum aaaaa I LOVE BIG CHUNGUS ", priceLevel: "$"},
  {dish:"lorem ipsum", priceLevel: "$"},
  {dish:"lorem ipsum", priceLevel: "$$$"},
  {dish:"lorem ipsum", priceLevel: "$"},
  {dish:"lorem ipsum", priceLevel: "$"},
  {dish:"lorem ipsum", priceLevel: "$"},
  {dish:"lorem ipsum", priceLevel: "$"}
];

// These are lists which are made to be horisontal through CSS. Find template of this?
const RecepieForADay = (props) => {
    // Potentially make `id={props.dayOfTheWeek}` into one where `props.dayOfWeek` is provides the week names. Will nonetheless have to take into account a calendar... 
    return (
        <tr>
            <td>Day {props.dayOfTheWeek}</td>
            <td>{props.dish}</td>
            <td>{props.priceLevel}</td>
            <td><input type="number" id={props.dayOfTheWeek} name="quantity" min="1" defaultValue="1"></input></td>
        </tr>
    )
}

const RecommendationPageView = (props) => {

    const renderTheFoodRecommendationsPerDay = () => {
        console.log("RENDERING LIST")
        console.log(props.listOfMeals)
        return (props.listOfMeals.map((mealDataForTheDay, mealIndex) => {
            return (
                <RecepieForADay dayOfTheWeek={mealIndex + 1} dish={mealDataForTheDay.result.title} priceLevel={mealDataForTheDay.result.pricePerServing}></RecepieForADay>
            )
        }))
    }

    return (
        <div>
            <ul className="category-menu">
                <li>Kateogri 1 att göra till horisonetll lista</li>
                <li>Kategori 2</li>
                <li>Kategori 3</li>
            </ul>
            <table style={{ width: "100%" }}>
                <tr>
                    <th style={{ width: "30%" }}></th> 
                    <th style={{ width: "50%" }}></th> 
                    <th style={{ width: "20%" }}></th> 
                    <th></th>
                </tr>
                {renderTheFoodRecommendationsPerDay()}
                <tr>
                    <td>Default portions</td>
                    <td></td>
                    <td></td>
                    <td><input type="number" id="defaultPortions" name="quantity" min="1" defaultValue="1" max="100"></input></td>
                </tr>
            </table>

            <button class="button" role="button">Show Shopping List</button>
        </div>
    )
}

export default RecommendationPageView

/*
export function App(props) {
  return (
    <div className='App'>
      <RecommendationPageView listOfMeals={dummyData}></RecommendationPageView>
    </div>
  );
}

// Log to console
console.log('Hello console')
*/
