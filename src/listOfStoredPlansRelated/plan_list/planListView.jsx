import React from "react";
import "../../recommendation_page/RecepiesForAWeekViewCSS.css";
import { useNavigate } from "react-router-dom";
import { render } from "react-dom";

const plansData = {
  result: [
    { planID: 1, plansData: "aaa" },
    { planID: 2, plansData: "bbb" },
    { planID: 3, plansData: "ccc" },
  ],
}; // Dummy values

const PlanListView = (props) => {

  const renderMeals = (recipesName) => {
    return recipesName.map((recipe) => {
      return(<p >{recipe.name}</p>);
    });
  };
  const RecepiePlanOverviewRow = (list) => {
    // Potentially make `id={props.dayOfTheWeek}` into one where `props.dayOfWeek` is provides the week names. Will nonetheless have to take into account a calendar..
    // console.log("list", list)
    // console.log("list.planRecipes", list.planRecipes)
    return (
      <div className="border border-black rounded my-4 px-4"
      onClick = {() => {props.selectAndNavigateToWeekPlan(list.planID)}}>
        <h1 className="text-[24px] text-center">{list.planName}</h1>
        {renderMeals(list.planRecipes)}
        {/* Possible iteration of the recipe names contained wtihin a plan. Make so all contents are displayed and possibly overflow to a new row. Until that this is implemented, make the line above's content conspicously large */}
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

  if(props.serverState === "loading"){
    return <p>Loading...</p>
  }
  else if(props.serverState === "ready"){
  return (
    <div>{renderList()}</div>
  );}
  else if(props.serverState === "failed"){
    return <p>Server is down</p>
  }
};

export default PlanListView;
