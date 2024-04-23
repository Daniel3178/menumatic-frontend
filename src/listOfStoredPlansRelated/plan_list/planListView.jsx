import React from "react";
import '../../recommendation_page/RecepiesForAWeekViewCSS.css';
import { useNavigate } from "react-router-dom";

const plansData = {
  result: [
    { planID: 1, plansData: "aaa" },
    { planID: 2, plansData: "bbb" },
    { planID: 3, plansData: "ccc" },
  ],
}; // Dummy values

const PlanListView = (props) => {
  const navigate = useNavigate();
  const RecepiePlanOverviewRow = (props) => {
    // Potentially make `id={props.dayOfTheWeek}` into one where `props.dayOfWeek` is provides the week names. Will nonetheless have to take into account a calendar..
    return (
      <tr
        onClick={() => {
          viewSpecificPlan(props.planID);
        }}
      >
        <td>{props.planName}</td>
        {/* Possible iteration of the recipe names contained wtihin a plan. Make so all contents are displayed and possibly overflow to a new row. Until that this is implemented, make the line above's content conspicously large */}
      </tr>
    );
  };

  function viewSpecificPlan(planIdentifier) {
    navigate("/plan", {state: {planIdentifier: planIdentifier}});
  }

  function renderList() {
    return props.plansData.result.map((planData) => {
      return (
        <RecepiePlanOverviewRow
          planID={planData.planID}
          planName={planData.planName}
        ></RecepiePlanOverviewRow>
      );
    });
  }

  return (
    <table style={{ width: "100%" }}>
      <tr>
        <th style={{ width: "100%" }}>
          100% until that other column assuredly added
        </th>
      </tr>
      {renderList()}
    </table>
  );
};

export default PlanListView;
