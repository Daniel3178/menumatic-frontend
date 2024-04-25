import React from "react";
import { useSelector } from "react-redux";
import { getSelectedListId } from "../plan_list/planListSlice"; // Ensure correct import paths
import { useNavigate } from "react-router-dom";
import PlanView from "./planView";

const PlanPresenter = () => {
  const navigate = useNavigate();
  const selectedListId = useSelector(getSelectedListId); // Retrieve the selected list ID from Redux state

  const dummyData = [
    { id: 1, week: "W1", recipes: ["Chicken Salad", "Beef Stew"] },
    { id: 2, week: "W2", recipes: ["Fish Tacos", "Pork Ribs"] },
  ];

  // Find the selected week plan based on selectedListId
  const selectedWeekPlan = dummyData.find(plan => plan.id === selectedListId);
console.log("TESTING DANA ", selectedListId);
  if (!selectedWeekPlan) {
    return <div>No week selected or week does not exist.</div>;
  }

  const handleGoToShoplist = () => {
    navigate("/shoplist-test");
  };

  return (
    <PlanView
      week={selectedWeekPlan.week}
      recipes={selectedWeekPlan.recipes}
      goToShoplist={handleGoToShoplist}
    />
  );
};

export default PlanPresenter;
