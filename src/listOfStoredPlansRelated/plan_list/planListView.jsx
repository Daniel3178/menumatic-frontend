import React from "react";
import "../../recommendation_page/RecepiesForAWeekViewCSS.css";
import { useNavigate } from "react-router-dom";
import { render } from "react-dom";
import { useDispatch } from "react-redux";
import { backBlack, logo, closeBtn } from "../../assets";
import {deleteMealPlan} from "../../store/menumaticServerAPISlice";

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
    // Potentially make `id={props.dayOfTheWeek}` into one where `props.dayOfWeek` is provides the week names. Will nonetheless have to take into account a calendar..
    // console.log("list", list)
    // console.log("list.planRecipes", list.planRecipes)

    const handleNavigate = () => {
      props.selectAndNavigateToWeekPlan(list.planID);
    };

    const handleDelete = (event, mealPlanId) => {
      event.stopPropagation(); // Prevent click event from bubbling up to the parent
      console.log("STEP 1")
      dispatch(deleteMealPlan({ userId: props.userId, mealPlanId }));
    };

    return (
      <div className="flex flex-row">
      <button className="bg-cerulean rounded-2xl my-4 px-4 shadow-xl w-[840px] h-[180px] content-center hover:brightness-75 hover:shadow-mid"
        onClick={() => { props.selectAndNavigateToWeekPlan(list.planID) }}>
        <div className="grid grid-cols-4 gap-4">
          <div className="border-r border-whiteSmoke flex justify-center">
            <div>
              <p className="text-[24px] font-outfit font-medium text-whiteSmoke">week</p>
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
      <button className=" top-0 right-0 rounded-md hover:brightness-200"
              onClick={(event) => handleDelete(event, list.planID)} aria-label="Delete meal plan">
              <img src={closeBtn} />
            </button>
      </div>

      
    );
  };

  function renderList() {
    // console.log("renderList")
    // console.log("allList", props.allLists)
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
          <div className="flex justify-center w-444 h-102 mt-8 mb-16">
            <img src={logo} />
          </div>
          <div>
            <button className="text-whiteSmoke hover:shadow-xl"
              onClick={() => props.navigateBack()} aria-label="go back">
              <img src={backBlack} />
            </button>
          </div>
          <div>
            <p className="text-[48px] font-outfit font-bold text-gunmetal tracking-wider">WEEK PLANS</p>
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
