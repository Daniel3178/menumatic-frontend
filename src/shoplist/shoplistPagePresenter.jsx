import React, { useEffect } from "react";
import ShoplistPageView from "./shoplistPageView"
import { useDispatch, useSelector } from 'react-redux';
import { generateShoplist,getRemovedItems, getAllItems, removeItem, restoreItem } from "./shoplistSlice";
import { getRecommendationList, getAffordableDishesList, getPopularDishesList,getSelectedTab, getQuickDishesList } from "../recommendation_page/recommendationPageSlice";
import { getIsLoggedIn, getUserId } from "../signUp_page/userAccountSlice"
import { saveShoplistToMenumaticDb } from "../store/menumaticServerAPISlice"
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserSavedRecipes } from "../store/spoonacularAPISlice";


/**
 * ShoplistPagePresenter fetches and manages the state for the shopping list,
 * and renders the ShoplistPageView component.
 */
const ShoplistPagePresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allItems = useSelector(getAllItems);
  const isLoggedIn = useSelector(getIsLoggedIn)
  const userId = useSelector(getUserId)
  const affordableDishes = useSelector(getAffordableDishesList);
  const popularDishes = useSelector(getPopularDishesList);
  const quickDishes = useSelector(getQuickDishesList);
  const selectedTab = useSelector(getSelectedTab);
  const removedItems = useSelector(getRemovedItems);
  const location = useLocation();
  const userSavedRecipes = useSelector(getUserSavedRecipes);

  /**
 * @brief Handles saving meal plans to the database.
 * This function retrieves meal information from the shoplist and saves it to the database. 
 * @remarks The function assumes that the shoplist variable is defined and contains necessary meal information.
 */


   const  whichPath = (props)=> {
    console.log("WHICH PATH",props)
    if (props.location.state === "/recommendation") {
      const currentList = props.recommendationList;
      return currentList;
    } else if (
      props.location.state === "/plan" 
    ) {
      const currentList = props.userList;
      return currentList;
    }
  }

  const extractRecepies = (list) =>{
    // Array to store recipe objects
    const recipes = [];
    // Iterating over each meal in the shoplist
    list.map((meal) => {
      // Creating a recipe object with meal information
      const recipeDbObject = {
        name: meal.result.title,
        portion: meal.portions,
        id: meal.result.id
      };
      // Adding the recipe object to the recipes array
      recipes.push(recipeDbObject);
    });
    return recipes;
  }
  const handleSaveMealPlan = (nameInput) => {

    let resultRecipes = [];
    switch(selectedTab){

      case "Affordable":{

        resultRecipes = extractRecepies(affordableDishes);
        break;
      }
      case "Popular": {
        resultRecipes = extractRecepies(popularDishes);
        break;
      }
      case "Quick": {
        resultRecipes = extractRecepies(quickDishes);
        break;
        }
    }
        dispatch(saveShoplistToMenumaticDb({
          userId: userId,
          data: {
            planName: nameInput,
            recipes: resultRecipes
          },
          excluded:removedItems
        }));
        navigate("/")
        // window.location.reload();
        // window.location.reload();
    }
    // Dispatching action to save the shoplist to the database
    // dispatch(saveShoplistToMenumaticDb(

    const handleRemoveItem = (item) => {
      dispatch(removeItem(item))
    }
const handleRestoreItem = (item) => {
  dispatch(restoreItem(item))
}

  const handleNavigateToLogIn = () => {
    navigate("/signin")
  }

  // Fetch and generate the shopping list when the component mounts or shoplist changes
  useEffect(() => {
    let recommendationList =[]
    switch(selectedTab){
      case "Affordable":
        recommendationList = affordableDishes;
        // dispatch(generateShoplist(affordableDishes))
        break;
      case "Popular":
        recommendationList = popularDishes;
        // dispatch(generateShoplist(popularDishes))
        break;
      case "Quick":
        recommendationList = quickDishes;
        // dispatch(generateShoplist(quickDishes))
        break;
    }
    const currentList = whichPath({location:location,
      recommendationList:recommendationList,
      userList:userSavedRecipes
    });
    console.log("currentList",currentList)
    dispatch(generateShoplist(currentList))
  }, [])

  console.log(allItems)
  return (
    <ShoplistPageView
      allItems={allItems}
      isLoggedIn={isLoggedIn}
      saveMealPlan={handleSaveMealPlan}
      navigateToLogin={handleNavigateToLogIn}
      removeItem={handleRemoveItem}
      restoreItem={handleRestoreItem}
      removedItems={removedItems}
    // generatePDF = {handleGeneratePDF}
    />
  );
};

export default ShoplistPagePresenter;
