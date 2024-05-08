import React from "react";
import "../../recommendation_page/RecepiesForAMealViewCSS.css";
import { useNavigate } from "react-router-dom";
import { render } from "react-dom";
import { useDispatch } from "react-redux";
import { backBlack, logo, closeBtn, trashCan } from "../../assets";
import { deleteMealPlan } from "../../store/menumaticServerAPISlice";

const plansData = {
  result: [
    { planID: 1, plansData: "aaa" },
    { planID: 2, plansData: "bbb" },
    { planID: 3, plansData: "ccc" },
  ],
}; // Dummy values

const PlanListView = (props) => {

  const dispatch = useDispatch();

  const renderMeals = (recipesName) => {
    return recipesName.map((recipe) => {
      return (<p className="text-[18px] font-outfit text-whiteSmoke truncate mt-2 mb-2">{recipe.name}</p>);
    });
  };
  const RecepiePlanOverviewRow = (list) => {
    // Potentially make `id={props.dayOfTheMeal}` into one where `props.dayOfMeal` is provides the meal names. Will nonetheless have to take into account a calendar..


    const handleNavigate = () => {
      props.selectAndNavigateToMealPlan(list.planID);
    };

    const handleDelete = (event, mealPlanId) => {
      event.stopPropagation(); // Prevent click event from bubbling up to the parent
      dispatch(deleteMealPlan({ userId: props.userId, mealPlanId }));
    };

    return (
      <div className="flex flex-row">
        <button className="bg-cerulean rounded-2xl my-4 px-4 shadow-xl w-[840px] h-[180px] content-center hover:brightness-75 hover:shadow-mid"
          onClick={() => { props.selectAndNavigateToMealPlan(list.planID) }}>
          <div className="grid grid-cols-4 gap-4">
            <div className="border-r border-whiteSmoke flex justify-center">
              <div>
                <p className="text-[24px] font-outfit font-medium text-whiteSmoke">meal</p>
                <p className="text-[64px] font-outfit font-bold text-whiteSmoke flex justify-center">{list.planID}</p>
              </div>
            </div>
            <div>
              {renderMeals(list.planRecipes.slice(0, 4))}
            </div>
            <div>
              {renderMeals(list.planRecipes.slice(4, 7))}
            </div>
            <div className="relative">
              {/*add remove button here*/}


            </div>

          </div>

          {/* Possible iteration of the recipe names contained wtihin a plan. Make so all contents are displayed and possibly overflow to a new row. Until that this is implemented, make the line above's content conspicously large */}
        </button>

        <button className="ml-4 flex justify-center items-center rounded-md hover:brightness-200"
          onClick={(event) => handleDelete(event, list.planID)} aria-label="Delete meal plan">
          <img src={closeBtn} />
        </button>
      </div>


    );
  };

  function renderList() {
    return props.allLists.map((planData, index) => {
      // console.log("planData", planData)
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
    return <p>Loading...</p>
  }
  else if (props.serverState === "ready") {
    return (
      <div className="bg-smokeWhite min-h-screen w-full top-0 right-0 bottom-0 left-0 flex justify-center">
        <div className="w-[840px] mr-10 ml-10">
          <div>
            <button className="text-whiteSmoke hover:shadow-xl"
              onClick={() => props.navigateBack()} aria-label="go back">
              <img src={backBlack} />
            </button>
          </div>
          <div>
            <p className="text-[48px] font-outfit font-bold text-gunmetal tracking-wider">MEAL PLANS</p>
          </div>
          <div>
            {renderList()}
          </div>
        </div>
      </div>


    );
  }
  else if (props.serverState === "failed") {
    return <p>Server is down</p>
  }
};

export default PlanListView;
