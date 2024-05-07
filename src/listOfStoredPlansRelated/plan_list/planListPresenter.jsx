import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlanListView from "./planListView";
import { useNavigate } from "react-router-dom";
import { getMenumaticAllList, getMenumaticState, fetchUserShopinglist, fetchExcludedIngredients } from "../../store/menumaticServerAPISlice";
import { setSelectedListId } from "./planListSlice";
import { getUserId } from "../../signUp_page/userAccountSlice";

const PlanListPresenter = () => {
  const navigate = useNavigate();
  const allList = useSelector(getMenumaticAllList);
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const menumaticServerState = useSelector(getMenumaticState);

  const selectAndNavigateHandler = (mealPlanID) => {
    dispatch(setSelectedListId(mealPlanID));
    dispatch(fetchExcludedIngredients(mealPlanID))
    navigate("/plan");
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const dummyData = [
    {id: 1, name: 'W1', recipesName: ['m1', 'm2']},
    {id: 2, name: 'W2', recipesName: ['m3', 'm4']}
  ]

  useEffect(() => {
    dispatch(fetchUserShopinglist( userId))
  },[])

  return (
    <PlanListView
    serverState = {menumaticServerState}
      allLists={allList}
      selectAndNavigateToMealPlan={selectAndNavigateHandler}
      userId={userId}
      navigateBack={handleNavigateBack}
      
    />
  );
};

export default PlanListPresenter;
