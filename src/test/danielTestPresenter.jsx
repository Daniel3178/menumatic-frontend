import React, { useEffect } from "react";
import DanielTestView from "./danielTestView";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserShopinglist } from "../integration/menumaticServerThunks";
const DanielTestPresenter = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userAccount.userId);
  useEffect(() => {
    dispatch(fetchUserShopinglist({ userId: userId }));
  });
  const handleGetRandomReceipt = () => {
    const test = [
      "include-Vegetarian",
      "include-Vegan",
      "exclude-Egg",
      "exclude-Shellfish",
    ];
  };
  return <DanielTestView getRandomReceipt={handleGetRandomReceipt} />;
};

export default DanielTestPresenter;
