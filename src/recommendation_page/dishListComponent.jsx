import React from 'react'

const DishListComponent = (props) => {
/**
 * @param {props.dayOfTheWeek} props.dayOfTheWeek: The mealIndex + 1 (i.e starting with day 1).
 * @param {props.dish} props.dish: The title of the dish fetched from the API.
 * @param {props.priceLevel} props.priceLevel: The price interval fetched for the dish from the prince range function.
 * Returns a table to display a row of the fetched day
 */
const RecepieForADay = (recipe) => {
  // console.log("RecepieForADay", recipe);
  // Potentially make `id={props.dayOfTheWeek}` into one where `props.dayOfWeek` is provides the week names. Will nonetheless have to take into account a calendar..
  return (
    <tr>
      <td className="pl-10">Day {recipe.dayOfTheWeek}</td>
      <td>{recipe.dish}</td>
      <td>{recipe.priceLevel}</td>
      <td>
        <input
          type="number"
          id={recipe.dayOfTheWeek}
          name="quantity"
          value={recipe.portionCount}
          onChange={(e) => {
            e.preventDefault();
            console.log("e.target.value", e.target.value);
            props.updateCount({id: recipe.id, portions: e.target.value, list: props.selectedTab});}
          }
          min="1"
          defaultValue="1"
        ></input>
      </td>
    </tr>
  );
};

  //renderList
  /**
 * @param {props.dayOfTheWeek} props.dayOfTheWeek: The mealIndex + 1 (i.e starting with day 1).
 * @param {props.dish} props.dish: The title of the dish fetched from the API.
 * @param {props.priceLevel} props.priceLevel: The price interval fetched for the dish from the prince range function.
 * Returns a table to display a row of the fetched day
 */
  const renderList = () => {
    return props.listOfMeals.map((mealDataForTheDay, mealIndex) => {
      return (
        <RecepieForADay
          dayOfTheWeek={mealIndex + 1}
          dish={mealDataForTheDay.result.title}
          id={mealDataForTheDay.result.id}
          portionCount={mealDataForTheDay.portions}
          priceLevel={
            pricePerServingToApproximatePriceLevel(mealDataForTheDay.result.pricePerServing)
          }
        ></RecepieForADay>
      );
    });
  };
  return (
    <div className="flex flex-col justify-center">
      <table style={{ width: "100%" }}>
        {/* <tr className="bg-[#48abe0] h-14">
                    <th className="text-left pl-8">Billig</th> 
                    <th className="text-left">Rekommenderas</th> 
                    <th className="text-left">Dyr</th> 
                    <th className="text-left">Snabb</th>
                </tr> */}
        <tr className="bg-red-400 h-10">
          <th className="text-left pl-8">Day</th>
          <th className="text-left">Dish</th>
          <th className="text-left">Price level</th>
          <th className="text-left">Portions</th>
        </tr>
        {renderList()}
        <tr>
          <td className="pl-8">Default portions</td>
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
        className="w-[160px] h-[50px] text-[14px] bg-green-400 rounded self-center text-white font-semibold"
        onClick={props.goToShoplist}
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
    // console.log("instancePricePerServing", instancePricePerServing);
    return "$";
  } else if (instancePricePerServing < 1000) {
    // console.log("instancePricePerServing", instancePricePerServing);

    return "$$";
  } else {
    // console.log("instancePricePerServing", instancePricePerServing);

    return "$$$";
  }
}

export default DishListComponent