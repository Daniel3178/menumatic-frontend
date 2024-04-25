import React, { useEffect } from "react";
import ShoplistPageView from "../../shoplist/shoplistPageView";
import PlanShoplistPageView from "./planShoplistPageView";
import {getMenumaticState,getMenumaticSavedRecipes } from "../../store/menumaticServerAPISlice";
import { useDispatch, useSelector } from "react-redux";
import { generateShoplist, getAllItems } from "../../shoplist/shoplistSlice";
import { getRecommendationList } from "../../recommendation_page/recommendationPageSlice";
import { getSavedRecipesState } from "../../store/spoonacularAPISlice";

/**
 * ShoplistPagePresenter fetches and manages the state for the shopping list,
 * and renders the ShoplistPageView component.
 */
const PlanShoplistPagePresenter = () => {

  const dispatch = useDispatch();
  const allItems = useSelector(getAllItems);
  const savedRecipeState = useSelector(getSavedRecipesState);
  // const shoplist = useSelector(getRecommendationList);
  
const shoplist = useSelector(getMenumaticSavedRecipes)
  // Fetch and generate the shopping list when the component mounts or shoplist changes
  useEffect(() => {
    console.log("shoplist PLAN", shoplist)
    // dispatch(generateShoplist(shoplist))
  }, [dispatch, shoplist]);

  return (
    <PlanShoplistPageView
      allItems={allItems}
      state={savedRecipeState}
      // generatePDF = {handleGeneratePDF}
    />
  );
};

export default PlanShoplistPagePresenter;
