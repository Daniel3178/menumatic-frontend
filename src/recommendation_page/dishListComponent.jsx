import React from "react";

const DishListComponent = (props) => {
  const incrementValue = (index, action) => {
    const input = document.getElementById(`inputField-${index}`);
    if (!input) return;
    let newValue = parseInt(input.value, 10);
    if (action === "increment") {
      newValue++;
    } else if (action === "decrement" && newValue > 1) {
      newValue--;
    }
    input.value = newValue;

    const event = new Event("input", { bubbles: true });
    input.dispatchEvent(event);
  };

  /**
   * @param {props.dayOfTheMeal} props.dayOfTheMeal: The mealIndex + 1 (i.e starting with day 1).
   * @param {props.dish} props.dish: The title of the dish fetched from the API.
   * @param {props.priceLevel} props.priceLevel: The price interval fetched for the dish from the prince range function.
   * Returns a table to display a row of the fetched day
   */
  const RecepieForADay = (recipe) => {
    return (
      <div className="bg-cerulean mb-5 w-full h-[45px] rounded-small font-outfit text-whiteSmoke shadow-mid flex items-center justify-center">
        <span className="text-center w-[10%]"> {recipe.dayOfTheMeal}</span>
        <span className="text-center w-[55%] whitespace-nowrap truncate truncate-hover">
          {recipe.dish}
        </span>
        <span className="text-center w-[10%]">{recipe.priceLevel}</span>
        <span className="text-center w-[25%]">
          <div className="py-2 px-3 inline-block">
            <div className="flex items-center gap-x-1.0">
              <button
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-gunmetal text-whiteSmoke shadow-sm hover:opacity-90"
                onClick={() => incrementValue(recipe.dayOfTheMeal, "decrement")}
              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                </svg>
              </button>
              <input
                type="text"
                id={`inputField-${recipe.dayOfTheMeal}`}
                name="quantity"
                value={recipe.portionCount}
                onInput={(e) => {
                  e.preventDefault();
                  props.updateCount({
                    id: recipe.id,
                    portions: e.target.value,
                    list: props.selectedTab,
                  });
                }}
                className="p-0 w-4 bg-transparent border-0 text-whiteSmoke text-center focus:ring-0 "
              />
              <button
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-gunmetal text-whiteSmoke shadow-sm hover:opacity-90"
                onClick={() => incrementValue(recipe.dayOfTheMeal, "increment")}
              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
            </div>
          </div>
        </span>
      </div>
    );
  };

  //renderList
  /**
   * @param {props.dayOfTheMeal} props.dayOfTheMeal: The mealIndex + 1 (i.e starting with day 1).
   * @param {props.dish} props.dish: The title of the dish fetched from the API.
   * @param {props.priceLevel} props.priceLevel: The price interval fetched for the dish from the prince range function.
   * Returns a table to display a row of the fetched day
   */
  const renderList = () => {
    return props.listOfMeals.map((mealDataForTheDay, mealIndex) => {
      return (
        <RecepieForADay
          key={mealIndex}
          dayOfTheMeal={mealIndex + 1}
          dish={mealDataForTheDay.result.title}
          id={mealDataForTheDay.result.id}
          portionCount={mealDataForTheDay.portions}
          priceLevel={pricePerServingToApproximatePriceLevel(
            mealDataForTheDay.result.pricePerServing
          )}
        ></RecepieForADay>
      );
    });
  };
  return (
    <div className="flex-col justify-end w-full ">
      <div className="font-outfit text-base font-medium w-full flex items-center justify-center">
        <span className="text-center pb-4 w-[10%]">Day</span>
        <span className="text-center pb-4 w-[55%]">Meal</span>
        <span className="text-center pb-4 w-[10%]">Price</span>
        <span className="text-center pb-4 w-[25%]">Portions</span>
      </div>
      {renderList()}
      <div className="flex w-full justify-end">
        <button
          className="w-40 h-12 bg-cerulean rounded-[100px] font-outfit font-base font-medium text-whiteSmoke shadow-mid"
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
  if (instancePricePerServing < 110) {
    return "$";
  } else if (instancePricePerServing < 420) {
    return "$$";
  } else {
    return "$$$";
  }
}

export default DishListComponent;
