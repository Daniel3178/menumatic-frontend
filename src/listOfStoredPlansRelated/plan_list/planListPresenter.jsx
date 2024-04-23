import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PlanListView from "./planListView";
import { useNavigate } from "react-router-dom";
import { getMenumaticAllList } from "../../store/menumaticServerAPISlice";
import { setSelectedListId } from "./planListSlice";

const PlanListPresenter = () => {
  const navigate = useNavigate();
  const allList = useSelector(getMenumaticAllList);
  const dispatch = useDispatch();

  const selectAndNavigateHandler = (weekId) => {
    dispatch(setSelectedListId(weekId));
    navigate("/weekplan");
  };

  const dummyData = [
    {id: 1, name: 'W1', recipesName: ['m1', 'm2']},
    {id: 2, name: 'W2', recipesName: ['m3', 'm4']}
  ]

  return (
    <PlanListView
      allLists={dummyData}
      selectAndNavigateToWeekPlan={selectAndNavigateHandler}
    />
  );
};

export default PlanListPresenter;
