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
import { addToReocemmendationList } from "../recommendation_page/recommendationPageSlice";
import { useNavigate } from "react-router-dom";
import { objects } from "../assets/constObjects";

const HomePagePresenter = () => {
  //TODO: uncomment dispatch functions to work with the API
  //TODO: Change objetcs[0] to apiResult in order to bring back the API functionality
  //TODO: uncomment apiResult to work with the API

  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();
  // const apiResult = useSelector(getApiResults)
  const likesCounter = useSelector(getLikesCounter); //TODO: remove when api is working
  const showInfo = useSelector(getShowInfo);
  const navigate = useNavigate();
  const handleGetRandomReceipt = () => {
    console.log("Button Clicked");
    setCounter((counter + 1) % 15); //TODO: remove when api is working
    // dispatch(searchBySpoonacularApiAsync());

    if (showInfo) {
      dispatch(toggleInfoView());
    }
  };
  const handleLike = () => {
    // dispatch(addToReocemmendationList(apiResult.recipes[0]))
    dispatch(incrementLikesCounter(objects[counter]));
    setCounter((counter + 1) % 15); // TODO: remove when api is working
    // dispatch(searchBySpoonacularApiAsync());
    if (likesCounter === 7) {
      console.log("LIKE LIMIT REACHED");
      navigate("/recommendation");
    }
    console.log(likesCounter);
    if (showInfo) {
      dispatch(toggleInfoView());
    }
  };

  const handleNavigateToFilterPage = () => {
    navigate("/filterpage-test");
  };

  const handleToggleInfoView = () => {
    dispatch(toggleInfoView());
    console.log(showInfo);
  };

  useEffect(() => {
    // dispatch(searchBySpoonacularApiAsync());
  }, []);

  return (
    <HomePageView
      apiResults={objects[counter]}
      getRandomReceipt={handleGetRandomReceipt}
      sendLike={handleLike}
      toggleInfoView={handleToggleInfoView}
      navigateToFilterPage={handleNavigateToFilterPage}
      info={showInfo}
    />
  );
};

export default HomePagePresenter;
