import React, { useEffect, useState } from "react";
import HomePageView from "./homePageView";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiResults,
  searchBySpoonacularApiAsync,
  searchComplexBySpoonacularApiAsync,
  searchComplexBySpoonacularApiAsyncFoodPref,
} from "../store/spoonacularAPISlice";
import {
  incrementLikesCounter,
  getLikesCounter,
  toggleInfoView,
  getShowInfo,
} from "./homePageSlice";
import {
  getExcludeTags,
  getIncludeTags,
  getMealsInPlan,
} from "../menu/filterPageSlice";
import { useNavigate } from "react-router-dom";
import { objects } from "../assets/constObjects";
import {
  getApiResultsState,
  popFirstRecipe,
} from "../store/spoonacularAPISlice";
import { sortLikedDishes } from "../recommendation_page/recommendationPageSlice";
import { getIsLoggedIn, getUserId } from "../signUp_page/userAccountSlice";
import { flushRecommendationList } from "../recommendation_page/recommendationPageSlice";
import { flushShoplist } from "../shoplist/shoplistSlice";
import {getMenumaticStates, setUserFoodPrefState} from "../store/menumaticServerAPISlice";
import { setStateRecommendBtn, setStateRecommendDialog } from "../menu/menuSlice";
// import {getApiResultsState} from "../store/spoonacularAPISlice";

const HomePagePresenter = () => {

  const dispatch = useDispatch();
  const apiResult = useSelector(getApiResults);
  const likesCounter = useSelector(getLikesCounter); 
  const showInfo = useSelector(getShowInfo);
  const excludeTags = useSelector(getExcludeTags);
  const includeTags = useSelector(getIncludeTags);
  const apiResultsState = useSelector(getApiResultsState);
  const navigate = useNavigate();
  const mealsInPlan = useSelector(getMealsInPlan);
  const likeLimit = mealsInPlan * 2;
  const userStatus = useSelector(getIsLoggedIn);


  const {allListState, userFoodPrefState, excludedIngredientState} = useSelector(getMenumaticStates);
  

  const handleGetRandomReceipt = () => {
    if (apiResult.length < 6) {
      dispatch(
        searchComplexBySpoonacularApiAsync({
          intolerances: excludeTags,
          diet: includeTags,
        })
      );
    }
    dispatch(popFirstRecipe());

    //If info view is active, go back to photo view after dislike.
    if (showInfo) {
      dispatch(toggleInfoView());
    }
  };
  

  const handleLike = () => {
    //dispatch(addToReocemmendationList(apiResult.recipes[0]))
    if (apiResult.length < 6 && apiResult.length > 3) {
      dispatch(
        searchComplexBySpoonacularApiAsync({
          intolerances: excludeTags,
          diet: includeTags,
        })
      );
    }
    if (likesCounter === 0) {
      dispatch(sortLikedDishes(mealsInPlan));
      navigate("/recommendation");
    }
    
    if(likesCounter == mealsInPlan){
      dispatch(setStateRecommendBtn(true))
      dispatch(setStateRecommendDialog(true))
    }
    

    dispatch(incrementLikesCounter({recipe:apiResult[0], likeLimit: likeLimit}));
    dispatch(popFirstRecipe());
  
    // //console.log("homepage presenter")
    // //console.log(apiResult.recipes[0])

    //setCounter((counter + 1) % 15); // TODO: remove when api is working

    //If info view is active, go back to photo view after like.
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

  // Necessary for presenting a dish before user has pressed like the first time.
  useEffect(() => {
    dispatch(flushRecommendationList());
    dispatch(flushShoplist());
    
  }, []);


  return (
    <div>
      <HomePageView
      apiResults={apiResult}
      apiResultsState={apiResultsState}
      getRandomReceipt={handleGetRandomReceipt}
      sendLike={handleLike}
      toggleInfoView={handleToggleInfoView}
      navigateToFilterPage={handleNavigateToFilterPage}
      navigateToPlanList={handleNavigateToPlanList}
      info={showInfo}
      likesCounter={likesCounter}
      mealsInPlan={mealsInPlan}

      userStatus= {userStatus}
      foodPrefState={userFoodPrefState}
    />
    </div>
  );
};

export default HomePagePresenter;
