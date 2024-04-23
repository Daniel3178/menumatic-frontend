import React from "react";
import { useSelector } from "react-redux";
import PlanListView from "./planListView";
import { useNavigate } from "react-router-dom";
import { getListOfPlans } from "./planListSlice";

export default planListPresenter = () => {
  const navigate = useNavigate();
  const listOfPlans = useSelector(getListOfPlans);

  const handleGoToWeekPlan = () => {
    navigate("/weekplan");
  };

  return (
    <planListView listOfWeekPlans={listOfPlans}>
      goToWeekPlan={handleGoToWeekPlan}
    </planListView>
  );
};
