import React from "react";
import HomePageView from "./homePageView";
import { useDispatch, useSelector } from "react-redux";
import {
  getComplexSearchPromise,
  popFirstRecipe,
} from "../store/spoonacularAPISlice";
import {
  incrementLikesCounter,
  getLikesCounter,
  toggleInfoView,
  getShowInfo,
} from "./homePageSlice";
import { getMealsInPlan } from "../menu/filterPageSlice";
import { useNavigate } from "react-router-dom";
import { sortLikedDishes } from "../recommendation_page/recommendationPageSlice";

import {
  setStateRecommendBtn,
  setStateRecommendDialog,
} from "../menu/menuSlice";

const HomePagePresenter = () => {
  const dispatch = useDispatch();
  const likesCounter = useSelector(getLikesCounter);
  const showInfo = useSelector(getShowInfo);
  const navigate = useNavigate();
  const mealsInPlan = useSelector(getMealsInPlan);
  const likeLimit = mealsInPlan * 2;

  const { data: complexSearchResult, state: complexSearchState } = useSelector(
    getComplexSearchPromise
  );

  const handleGetRandomReceipt = () => {
    dispatch(popFirstRecipe());

    //If info view is active, go back to photo view after dislike.
    if (showInfo) {
      dispatch(toggleInfoView());
    }
  };

  const handleLike = () => {
    if (likesCounter === 0) {
      dispatch(sortLikedDishes(mealsInPlan));
      navigate("/recommendation");
    }

    if (likesCounter == mealsInPlan) {
      dispatch(setStateRecommendBtn(true));
      dispatch(setStateRecommendDialog(true));
    }

    dispatch(
      incrementLikesCounter({
        recipe: complexSearchResult[0],
        likeLimit: likeLimit,
      })
    );

    dispatch(popFirstRecipe());

    if (showInfo) {
      dispatch(toggleInfoView());
    }
  };

  const handleNavigateToFilterPage = () => {
    navigate("/filterpage-test");
  };

  const handleNavigateToPlanList = () => {
    navigate("/plan_list");
  };

  const handleToggleInfoView = () => {
    dispatch(toggleInfoView());
  };

  return (
    <div>
      <HomePageView
        info={showInfo}
        mealsInPlan={mealsInPlan}
        likesCounter={likesCounter}
        apiResults={complexSearchResult}
        apiResultsState={complexSearchState}
        sendLike={handleLike}
        toggleInfoView={handleToggleInfoView}
        getRandomReceipt={handleGetRandomReceipt}
        navigateToPlanList={handleNavigateToPlanList}
        navigateToFilterPage={handleNavigateToFilterPage}
      />
    </div>
  );
};

export default HomePagePresenter;
