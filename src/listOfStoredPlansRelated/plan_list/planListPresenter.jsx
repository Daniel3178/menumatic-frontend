import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlanListView from "./planListView";
import { useNavigate } from "react-router-dom";
import { getMenumaticAllList, getMenumaticStates, fetchUserShopinglist,getUserAllListPromise, fetchExcludedIngredients } from "../../store/menumaticServerAPISlice";
import { getUserId } from "../../signUp_page/userAccountSlice";
import {setSelectedList} from "../../store/menumaticServerAPISlice";


const PlanListPresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const {data: allList, state: allListState} = useSelector(getUserAllListPromise);


  const selectAndNavigateHandler = (mealPlanID) => {
    dispatch(setSelectedList({id: mealPlanID}));
    // dispatch(fetchExcludedIngredients(mealPlanID))
    navigate("/plan");
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  // const dummyData = [
  //   {id: 1, name: 'W1', recipesName: ['m1', 'm2']},
  //   {id: 2, name: 'W2', recipesName: ['m3', 'm4']}
  // ]

  // useEffect(() => {
  //   dispatch(fetchUserShopinglist( userId))
  // },[])

  return (
    <PlanListView
      serverState = {allListState}
      allLists={allList}
      selectAndNavigateToMealPlan={selectAndNavigateHandler}
      userId={userId}
      navigateBack={handleNavigateBack}
      
    />
  );
};

export default PlanListPresenter;
