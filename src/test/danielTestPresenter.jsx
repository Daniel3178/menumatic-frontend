import React from "react";
import DanielTestView from "./danielTestView";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiResults,
  searchBySpoonacularApiAsync,
} from "../store/spoonacularAPISlice";

const DanielTestPresenter = () => {
  const dispatch = useDispatch();
  const apiResult = useSelector(getApiResults);

  const handleGetRandomReceipt = () => {
    console.log("Button Clicked");
    dispatch(searchBySpoonacularApiAsync());
  };
  return (
    <DanielTestView
      apiResults={apiResult}
      getRandomReceipt={handleGetRandomReceipt}
    />
  );
};

export default DanielTestPresenter;
