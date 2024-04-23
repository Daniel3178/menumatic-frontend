import React from "react";
import ".../recommendation_page/RecepiesForAplanListViewCSS.css";
import { useNavigate } from "react-router-dom";

export const PlanRecommendationPageView = (props) => {
  //renderList
  const navigate = useNavigate();

  /**
   *  Method: Iterates over props.listOfMeals, i.e the array of liked meals.
   *  @param {mealDataForTheDay} mealDataForTheDay: The name of the currently iterated element in the array.
   *  @param {mealIndex} mealIndex: The index of the currently iterated element.
   *  Returns: A row of the data from the API.
   */
  const renderList = () => {
    return props.listOfMeals.map((mealDataForTheDay, mealIndex) => {
      return (
        <RecepieForADay
          dayOfTheWeek={mealIndex + 1}
          dish={mealDataForTheDay.result.title}
          priceLevel={pricePerServingToApproximatePriceLevel(
            mealDataForTheDay.result.pricePerServing
          )}
        ></RecepieForADay>
      );
    });
  };

  return (
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
        {renderList()}
        <tr>
          <td>Default portions</td>
          <td></td>
          <td></td>
          <td>
            <input
              type="number"
              id="defaultPortions"
              name="quantity"
              min="1"
              defaultValue="1"
              max="100"
            ></input>
          </td>
        </tr>
      </table>
      <button
        onClick={() => {
          navigate("/plan/shoplist", { state : { planIdentifier : planIdentifier} });
        }}
        class="button"
        role="button"
      >
        Show Shopping List
      </button>
    </div>
  );
};

/**
 * @param {instancePricePerServing} instancePricePerServing: The current price for a serving.
 * Purpose: Determines a range of a price level to be displayed on the screen, represented by dollar signs.
 */
function pricePerServingToApproximatePriceLevel(instancePricePerServing) {
  if (instancePricePerServing < 100) {
    return "$";
  } else if (instancePricePerServing < 1000) {
    return "$$";
  } else {
    return "$$$";
  }
}

/**
 * @param {props.dayOfTheWeek} props.dayOfTheWeek: The mealIndex + 1 (i.e starting with day 1).
 * @param {props.dish} props.dish: The title of the dish fetched from the API.
 * @param {props.priceLevel} props.priceLevel: The price interval fetched for the dish from the prince range function.
 * Returns a table to display a row of the fetched day
 */
const RecepieForADay = (props) => {
  // Potentially make `id={props.dayOfTheWeek}` into one where `props.dayOfWeek` is provides the week names. Will nonetheless have to take into account a calendar..
  return (
    <tr>
      <td>Day {props.dayOfTheWeek}</td>
      <td>{props.dish}</td>
      <td>{props.priceLevel}</td>
      <td>
        <input
          type="number"
          id={props.dayOfTheWeek}
          name="quantity"
          min="1"
          defaultValue="1"
        ></input>
      </td>
    </tr>
  );
};
