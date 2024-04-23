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
    return recipesName.map((name) => {
      <p>{name}</p>;
    });
  };
  const RecepiePlanOverviewRow = (list) => {
    // Potentially make `id={props.dayOfTheWeek}` into one where `props.dayOfWeek` is provides the week names. Will nonetheless have to take into account a calendar..
    console.log("list", list)
    return (
      <div
      onClick = {() => {props.selectAndNavigateToWeekPlan(list.planID)}}>
        <h1>{list.planName}</h1>
        {renderMeals(list.planRecipes)}
        {/* Possible iteration of the recipe names contained wtihin a plan. Make so all contents are displayed and possibly overflow to a new row. Until that this is implemented, make the line above's content conspicously large */}
      </div>
    );
  };

  function renderList() {
    console.log("renderList")
    console.log("allList", props.allLists)
    return props.allLists.map((planData) => {
      return (

        <RecepiePlanOverviewRow
          planID={planData.id}
          planName={planData.name}
          planRecipes={planData.recipesName}
        ></RecepiePlanOverviewRow>
      );
    });
  }

  return (
    <div>{renderList()}</div>
  );
};

export default PlanListView;
