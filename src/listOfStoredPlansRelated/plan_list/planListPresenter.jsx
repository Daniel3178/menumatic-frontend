import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlanListView from "./planListView";
import { useNavigate } from "react-router-dom";
import { getMenumaticAllList, getMenumaticState, fetchUserShopinglist } from "../../store/menumaticServerAPISlice";
import { setSelectedListId } from "./planListSlice";
import { getUserId } from "../../signUp_page/userAccountSlice";

const PlanListPresenter = () => {
  const navigate = useNavigate();
  const allList = useSelector(getMenumaticAllList);
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const menumaticServerState = useSelector(getMenumaticState);

  const selectAndNavigateHandler = (weekId) => {
    dispatch(setSelectedListId(weekId));
    navigate("/plan");
  };

  const dummyData = [
    {id: 1, name: 'W1', recipesName: ['m1', 'm2']},
    {id: 2, name: 'W2', recipesName: ['m3', 'm4']}
  ]

  useEffect(() => {
    console.log("Fetching user shopping list")
    dispatch(fetchUserShopinglist( userId))
  },[])

  return (
    <PlanListView
    serverState = {menumaticServerState}
      allLists={allList}
      selectAndNavigateToWeekPlan={selectAndNavigateHandler}
    />
  );
};

export default PlanListPresenter;
