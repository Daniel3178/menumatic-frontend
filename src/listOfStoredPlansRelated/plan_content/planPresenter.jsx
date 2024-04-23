import React from "react";
import { useSelector } from "react-redux";
import {
  getRecommendationList,
  updateCount,
  addToReocemmendationList,
} from "./recommendationPageSlice";
import RecommendationPageView from "./recommendationPageView";
import { useNavigate } from "react-router-dom";

const PlanPresenter = () => {
  const navigate = useNavigate();
  const recommendationList = useSelector(getRecommendationList);

  /**
   * [depricated]: navigate is done in the view
   * Handles request to go to shoplist page
   * By Daniel
   */
  const handleGoToShoplist = () => {
    navigate("/shoplist-test");
  };
  return (
    <PlanView
      listOfMeals={recommendationList}
      goToShoplist={handleGoToShoplist}
    />
  );
};

export default PlanPresenter;
