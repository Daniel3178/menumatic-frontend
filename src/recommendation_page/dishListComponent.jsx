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
      <div className='bg-cerulean mb-5 w-full h-[45px] rounded-small font-outfit text-whiteSmoke shadow-mid flex items-center justify-center'>

        <span className="text-center w-[10%]"> {recipe.dayOfTheWeek}</span>
        <span className="text-center w-[60%] whitespace-nowrap truncate truncate-hover">{recipe.dish}</span>
        <span className="text-center w-[10%]">{recipe.priceLevel}</span>
        <span className="text-center w-[20%]">
          <input className='bg-cerulean'
            type='number'
            id={recipe.dayOfTheWeek}
            name="quantity"
            value={recipe.portionCount}
            onChange={(e) => {
              e.preventDefault();
              console.log("e.target.value", e.target.value);
              props.updateCount({ id: recipe.id, portions: e.target.value, list: props.selectedTab });
            }
            }
            min="1"
          ></input>
        </span>

      </div>
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
          key={mealIndex}
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
    <div className="flex-col justify-end w-full ">


      <div className="font-outfit text-2xl font-medium w-full flex items-center justify-center">
        <span className="text-center pb-6 w-[10%]"> Day</span>
        <span className="text-center pb-6 w-[60%]">Meal</span>
        <span className="text-center pb-6 w-[10%]">Price</span>
        <span className="text-center pb-6 w-[20%]">Portions</span>
      </div>
      {renderList()}
      <div className="flex w-full justify-end"> 
      <button
        className="w-[180px] h-[54px] bg-cerulean rounded-[100px] font-outfit font-base font-medium text-whiteSmoke shadow-mid"
        onClick={props.goToShoplist}
        role="button"
      >
        SHOPPING LIST
      </button>
      </div>
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