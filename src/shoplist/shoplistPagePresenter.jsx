import React, { useEffect } from "react";
import ShoplistPageView from "./shoplistPageView"
import { useDispatch, useSelector } from 'react-redux';
import { generateShoplist, getAllItems } from "./shoplistSlice";
import { getRecommendationList } from "../recommendation_page/recommendationPageSlice";
import { getIsLoggedIn, getUserId } from "../signUp_page/userAccountSlice"
import {saveShoplistToMenumaticDb} from "../store/menumaticServerAPISlice"

/**
 * ShoplistPagePresenter fetches and manages the state for the shopping list,
 * and renders the ShoplistPageView component.
 */
const ShoplistPagePresenter = () => {
  const dispatch = useDispatch();
  const allItems = useSelector(getAllItems);
  const shoplist = useSelector(getRecommendationList);
  const isLoggedIn = useSelector(getIsLoggedIn)
  const userId = useSelector(getUserId)

  /**
 * @brief Handles saving meal plans to the database.
 * This function retrieves meal information from the shoplist and saves it to the database. 
 * @remarks The function assumes that the shoplist variable is defined and contains necessary meal information.
 */
const handleSaveMealPlan = () => {

  // Array to store recipe objects
  const recipes = [];

  // Iterating over each meal in the shoplist
  shoplist.map((meal) => {
    
    // Creating a recipe object with meal information
    const recipeDbObject = {
      name: meal.result.title,
      portion: meal.portions,
      id: meal.result.id
    };

    // Adding the recipe object to the recipes array
    recipes.push(recipeDbObject);
  });
  
  // Dispatching action to save the shoplist to the database
  dispatch(saveShoplistToMenumaticDb(
    {
      userId: userId,
      data: {
        planName: "test",
        recipes: recipes
      }
    }));
};

  // Fetch and generate the shopping list when the component mounts or shoplist changes
  useEffect(() => {
    dispatch(generateShoplist(shoplist))
  }, [dispatch, shoplist])

  return (
    <ShoplistPageView
      allItems={allItems}
      isLoggedIn={isLoggedIn}
      saveMealPlan={handleSaveMealPlan}
    // generatePDF = {handleGeneratePDF}
    />
  );
};

export default ShoplistPagePresenter;
