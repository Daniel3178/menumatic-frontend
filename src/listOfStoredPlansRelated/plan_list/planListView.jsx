import React from "react";
import "../../recommendation_page/RecepiesForAMealViewCSS.css";
import { backBlack, logo, closeBtn, trashCan } from "../../assets";

const PlanListView = (props) => {
  const renderMeals = (recipesName) => {
    return recipesName.map((recipe, index) => {
      return (
        <p
          key={index}
          className="text-[14px] font-outfit text-whiteSmoke truncate mb-1"
        >
          {recipe.name}
        </p>
      );
    });
  };
  const RecepiePlanOverviewRow = (list) => {
    // Potentially make `id={props.dayOfTheMeal}` into one where `props.dayOfMeal` is provides the meal names. Will nonetheless have to take into account a calendar..

    const handleDelete = (event, mealPlanId) => {
      event.stopPropagation();
      props.deleteList(mealPlanId);
    };

    return (
      <div className="flex flex-row">
        <div
          className="bg-cerulean  items-start rounded-2xl mt-4 shadow-xl w-full h-fit hover:brightness-110 hover:shadow-mid"
          onClick={() => {
            props.selectAndNavigateToMealPlan(list.planID);
          }}
        >
          <div className="flex flex-col justify-center ">
            <div className="border-b  border-whiteSmoke flex self-center  pt-4 pb-3 justify-center w-full">
              <div className="flex flex-row w-full">
                <p className="text-[16px] w-[92%] font-outfit  pl-[4%] font-bold text-whiteSmoke flex justify-center">
                  {list.planName}
                </p>
                <button
                  className="w-[4%] aspect-square bg-cerulean  flex items-center justify-center"
                  onClick={(event) => handleDelete(event, list.planID)}
                  aria-label="Delete meal plan"
                >
                  <img src={closeBtn} />
                </button>
              </div>
            </div>
            <div className="pt-5 pb-5 pl-6 pr-6">
              {renderMeals(list.planRecipes)}
            </div>
            <div className="relative">{/*add remove button here*/}</div>
          </div>

          {/* Possible iteration of the recipe names contained wtihin a plan. Make so all contents are displayed and possibly overflow to a new row. Until that this is implemented, make the line above's content conspicously large */}
        </div>
      </div>
    );
  };

  function renderList() {
    return props.allLists.slice().reverse().map((planData, index) => {
      return (
        <div key={index}>
          <RecepiePlanOverviewRow
            planID={planData.id}
            planName={planData.name}
            planRecipes={planData.recipes}
          ></RecepiePlanOverviewRow>
        </div>
      );
    });
  }

  if (props.serverState === "loading") {
    return (
      // <p>Loading...</p>
      <div className="h-svh w-screen flex flex-col items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin fill-gunmetal"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <span className="animate-pulse font-outfit font-medium text-lg text-gunmetal">
          Loading...
        </span>
      </div>
    );
  } else if (props.serverState === "ready") {
    return (
      <div className="pt-32 flex flex-col bg-smokeWhite min-h-screen w-screen pr-2 pl-2 lg:pr-80 ">
        <div className="self-center max-w-[840px] w-full">
          <button
            className="text-whiteSmoke hover:shadow-xl "
            onClick={() => props.navigateBack()}
            aria-label="go back"
          >
            <img src={backBlack} />
          </button>
          <p className="text-[48px] w-full text-center font-outfit font-bold text-gunmetal tracking-wider">
            MEAL PLANS
          </p>
          <div>{renderList()}</div>
        </div>
      </div>
    );
  } else if (props.serverState === "failed") {
    return <p>Server is down</p>;
  }
};

export default PlanListView;
