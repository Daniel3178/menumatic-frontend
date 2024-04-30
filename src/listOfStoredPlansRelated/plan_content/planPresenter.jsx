import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedListId } from "../plan_list/planListSlice"; // Ensure correct import paths
import { useNavigate } from "react-router-dom";
import PlanView from "./planView";
import { getMenumaticAllList, getMenumaticState } from "../../store/menumaticServerAPISlice";
import { searchBySpoonacularApiBulkAsync } from "../../store/spoonacularAPISlice";
const PlanPresenter = () => {
  const navigate = useNavigate();
  const selectedListId = useSelector(getSelectedListId); // Retrieve the selected list ID from Redux state
 const allList = useSelector(getMenumaticAllList);
 const menumaticServerState = useSelector(getMenumaticState);
  const dummyData = [
    { id: 1, week: "W1", recipes: ["Chicken Salad", "Beef Stew"] },
    { id: 2, week: "W2", recipes: ["Fish Tacos", "Pork Ribs"] },
  ];
const dispatch = useDispatch();
  // Find the selected week plan based on selectedListId
  const selectedWeekPlan = allList.find(plan => plan.id === selectedListId);
// console.log("TESTING DANA ", selectedWeekPlan);
  if (!selectedWeekPlan) {
    return <div>No week selected or week does not exist.</div>;
  }

  const handleGoToShoplist = () => {
    const allIds = [];
    allIds.push(selectedWeekPlan.recipes.map((recipe) => {
      return {id: recipe.id,
              portions: recipe.portions}
    }
  ));
    dispatch(searchBySpoonacularApiBulkAsync(allIds))
    navigate("/plan-shoplist");
  };

  return (
    <PlanView
      week={selectedWeekPlan.name}
      recipes={selectedWeekPlan.recipes}
      goToShoplist={handleGoToShoplist}
      state={menumaticServerState}
    />
  );
};

export default PlanPresenter;
