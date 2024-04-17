import React from "react";
import ShoplistPageView from "./shoplistPageView"
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from "./shoplistSlice";
import { useEffect } from "react";
const ShoplistPagePresenter = () =>{
  const dispatch = useDispatch();
  const allItems = useSelector(getAllItems())
  return(
<ShoplistPageView
allItems = {allItems}
/>
  )
}

export default ShoplistPagePresenter;

