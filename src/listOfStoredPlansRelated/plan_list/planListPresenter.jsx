import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PlanListView from "./planListView";
import { useNavigate } from "react-router-dom";
import { getUserAllListPromise } from "../../store/menumaticServerAPISlice";
import { getUserId } from "../../signUp_page/userAccountSlice";
import { setSelectedList } from "../../store/menumaticServerAPISlice";
import { deleteList } from "../../store/menumaticServerAPISlice";

const PlanListPresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const { data: allList, state: allListState } = useSelector(
    getUserAllListPromise
  );

  const selectAndNavigateHandler = (mealPlanID) => {
    dispatch(setSelectedList({ id: mealPlanID }));
    navigate("/plan");
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleDeleteList = (listId) => {
    dispatch(deleteList({ listId: listId }));
  };

  return (
    <PlanListView
      userId={userId}
      allLists={allList}
      serverState={allListState}
      deleteList={handleDeleteList}
      navigateBack={handleNavigateBack}
      selectAndNavigateToMealPlan={selectAndNavigateHandler}
    />
  );
};

export default PlanListPresenter;
