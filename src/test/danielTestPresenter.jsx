import React, { useEffect } from "react";
import DanielTestView from "./danielTestView";
import { useDispatch, useSelector } from "react-redux";
import {
  searchBySpoonacularApiAsync,
} from "../store/spoonacularAPISlice";
import { saveShoplistToMenumaticDb, fetchUserShopinglist } from "../store/menumaticServerAPISlice";
const DanielTestPresenter = () => {
  const dispatch = useDispatch();
 const userId = useSelector((state) => state.userAccount.userId);
 useEffect(()=>{
    dispatch(fetchUserShopinglist({userId: userId}));
 })
  const handleGetRandomReceipt = () => {
    // console.log("Button Clicked");
    // dispatch(saveShoplistToMenumaticDb({userId: userId, data:{name: "test", ingredients: ["test1", "test2"]}}));
    // dispatch(fetchUserShopinglist({userId: userId}));
    const test = ['include-Vegetarian', 'include-Vegan', 'exclude-Egg', 'exclude-Shellfish']



  };
  return (
    <DanielTestView
      getRandomReceipt={handleGetRandomReceipt}
    />
  );
};

export default DanielTestPresenter;
