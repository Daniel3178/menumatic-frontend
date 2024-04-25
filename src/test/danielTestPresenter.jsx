import React, { useEffect } from "react";
import DanielTestView from "./danielTestView";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiResults,
  searchBySpoonacularApiAsync,
} from "../store/spoonacularAPISlice";
import { saveShoplistToMenumaticDb, fetchUserShopinglist } from "../store/menumaticServerAPISlice";
const DanielTestPresenter = () => {
  const dispatch = useDispatch();
  const apiResult = useSelector(getApiResults);
 const userId = useSelector((state) => state.userAccount.userId);
 useEffect(()=>{
    dispatch(fetchUserShopinglist({userId: userId}));
 })
  const handleGetRandomReceipt = () => {
    // console.log("Button Clicked");
    // dispatch(saveShoplistToMenumaticDb({userId: userId, data:{name: "test", ingredients: ["test1", "test2"]}}));
    dispatch(fetchUserShopinglist({userId: userId}));
  };
  return (
    <DanielTestView
      apiResults={apiResult}
      getRandomReceipt={handleGetRandomReceipt}
    />
  );
};

export default DanielTestPresenter;
