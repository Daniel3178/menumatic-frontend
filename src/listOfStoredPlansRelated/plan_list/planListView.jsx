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
    return props.allLists.map((planData, index) => {
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
    return <p>Loading...</p>;
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
