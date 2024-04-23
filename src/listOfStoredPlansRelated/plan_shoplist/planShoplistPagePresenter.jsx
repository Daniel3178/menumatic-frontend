import React, { useEffect } from "react";
import ShoplistPageView from "../../shoplist/shoplistPageView"
import { useDispatch, useSelector } from 'react-redux';
import { generateShoplist, getAllItems } from "../../shoplist/shoplistSlice";
import { getRecommendationList } from "../../recommendation_page/recommendationPageSlice";

/**
 * ShoplistPagePresenter fetches and manages the state for the shopping list,
 * and renders the ShoplistPageView component.
 */
const PlanShoplistPagePresenter = () =>{
  const dispatch = useDispatch();
  const allItems = useSelector(getAllItems);
  const shoplist = useSelector(getRecommendationList);

  // Fetch and generate the shopping list when the component mounts or shoplist changes
  useEffect(()=>{
    dispatch(generateShoplist(shoplist))
  },[dispatch, shoplist])

  return (
    <ShoplistPageView
      allItems={allItems}
      // generatePDF = {handleGeneratePDF}
    />
  );
};

export default PlanShoplistPagePresenter;