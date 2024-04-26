import React, { useEffect, useState } from "react";
import HomePageView from "./homePageView";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiResults,
  searchBySpoonacularApiAsync,
  searchComplexBySpoonacularApiAsync
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
import {
  getApiResultsState,
  popFirstRecipe,
} from "../store/spoonacularAPISlice";
import { sortLikedDishes } from "../recommendation_page/recommendationPageSlice";
import { flushRecommendationList } from "../recommendation_page/recommendationPageSlice";
import { flushShoplist } from "../shoplist/shoplistSlice";

const HomePagePresenter = () => {
  //TODO: uncomment dispatch functions to work with the API
  //TODO: Change objetcs[0] to apiResult in order to bring back the API functionality
  //TODO: uncomment apiResult to work with the API

  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();
  const apiResult = useSelector(getApiResults);
  const likesCounter = useSelector(getLikesCounter); //TODO: remove when api is working
  const showInfo = useSelector(getShowInfo);
  const excludeTags = useSelector(getExcludeTags);
  const includeTags = useSelector(getIncludeTags);
  const apiResultsState = useSelector(getApiResultsState);
  const navigate = useNavigate();


  const handleGetRandomReceipt = () => {
    // setCounter((counter + 1) % 15)  //TODO: remove when api is working
    if (apiResult.length < 6 && apiResult.length > 3) {
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
      dispatch(sortLikedDishes());
      navigate("/recommendation");
    }
    dispatch(incrementLikesCounter(apiResult[0]));
    dispatch(popFirstRecipe());
    // console.log("homepage presenter")
    // console.log(apiResult.recipes[0])

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
  };

  // const [reloadOnce, setReloadOnce] = useState(true);

  // useEffect(() => {
  //   if (reloadOnce) {
  //     window.location.reload();
  //     setReloadOnce(false);
  //   }
  // }, [reloadOnce]);

  // Necessary for presenting a dish before user has pressed like the first time.
  useEffect(() => {
    // console.log("USE EFFECT")
    // window.location.reload();
// dispatch(flushRecommendationList())
// dispatch(flushShoplist())
    if (apiResult.length == 0) {
      // console.log("fetching")
      dispatch(
        searchComplexBySpoonacularApiAsync({
          intolerances: excludeTags,
          diet: includeTags,
        })
      );
    }
            // window.location.reload();
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
