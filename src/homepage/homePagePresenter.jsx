import React, { useEffect, useState } from "react";
import HomePageView from "./homePageView";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiResults,
  searchBySpoonacularApiAsync,
} from "../store/spoonacularAPISlice";
import {
  incrementLikesCounter,
  getLikesCounter,
  toggleInfoView,
  getShowInfo,
} from "./homePageSlice";
import { getExcludeTags, getIncludeTags } from "../filterpage/filterPageSlice";
import { useNavigate } from "react-router-dom";
import { objects } from "../assets/constObjects";
import {getApiResultsState, popFirstRecipe} from "../store/spoonacularAPISlice"

const HomePagePresenter = () => {
  //TODO: uncomment dispatch functions to work with the API
  //TODO: Change objetcs[0] to apiResult in order to bring back the API functionality
  //TODO: uncomment apiResult to work with the API

  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();
  const apiResult = useSelector(getApiResults)
  const likesCounter = useSelector(getLikesCounter) //TODO: remove when api is working
  const showInfo = useSelector(getShowInfo)
  const excludeTags = useSelector(getExcludeTags)
  const includeTags = useSelector(getIncludeTags)
  const apiResultsState = useSelector(getApiResultsState)
  const navigate = useNavigate()

  const handleGetRandomReceipt = () => {
    // setCounter((counter + 1) % 15)  //TODO: remove when api is working
dispatch(popFirstRecipe())
    if(apiResult.length < 6){
      dispatch(searchBySpoonacularApiAsync({excludeTags:excludeTags, includeTags:includeTags}));
    }

    //If info view is active, go back to photo view after dislike.
    if (showInfo) {
      dispatch(toggleInfoView());
    }
  };
  const handleLike = () => {
    //dispatch(addToReocemmendationList(apiResult.recipes[0]))
    if (likesCounter === 7) {
      navigate("/recommendation")
    }
    dispatch(incrementLikesCounter(apiResult[0]));
dispatch(popFirstRecipe())

    if(apiResult.lentgh <6){
      dispatch(searchBySpoonacularApiAsync({excludeTags:excludeTags, includeTags:includeTags}));
    }
    //setCounter((counter + 1) % 15); // TODO: remove when api is working


    //If info view is active, go back to photo view after like.
    if (showInfo) {
      dispatch(toggleInfoView());
    }
  };

  const handleNavigateToFilterPage = () => {
    navigate("/filterpage-test");
  };

  const handleToggleInfoView = () => {
    dispatch(toggleInfoView());
  }

  // Necessary for presenting a dish before user has pressed like the first time.
  useEffect(() => {
    console.log("USE EFFECT")
    if (apiResult.length == 0) {
      console.log("fetching")
      dispatch(searchBySpoonacularApiAsync({excludeTags:excludeTags, includeTags:includeTags}));
    }
  }, []);

  return (
    <HomePageView
      apiResults={apiResult}
      apiResultsState={apiResultsState}
      getRandomReceipt={handleGetRandomReceipt}
      sendLike={handleLike}
      toggleInfoView={handleToggleInfoView}
      navigateToFilterPage={handleNavigateToFilterPage}
      info={showInfo}
    />
  );
};

export default HomePagePresenter;
