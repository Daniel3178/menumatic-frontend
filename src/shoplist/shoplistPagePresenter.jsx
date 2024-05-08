import React, { useEffect } from "react";
import ShoplistPageView from "./shoplistPageView";
import { useDispatch, useSelector } from "react-redux";
import {
  generateShoplist,
  getRemovedItems,
  getAllItems,
  removeItem,
  restoreItem,
} from "./shoplistSlice";
import {
  getAffordableDishesList,
  getPopularDishesList,
  getSelectedTab,
  getQuickDishesList,
} from "../recommendation_page/recommendationPageSlice";
import { getIsLoggedIn, getUserId } from "../signUp_page/userAccountSlice";
import { saveShoplistToMenumaticDb } from "../store/menumaticServerAPISlice";
import { useNavigate, useLocation } from "react-router-dom";
import { getExcludedIngredients } from "../store/menumaticServerAPISlice";
import { useState } from "react";
/**
 * ShoplistPagePresenter fetches and manages the state for the shopping list,
 * and renders the ShoplistPageView component.
 */
const ShoplistPagePresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allItemsRedux = useSelector(getAllItems);

  const [allItems, setAllItems] = useState(allItemsRedux)

  useEffect(() => {
    setAllItems(allItemsRedux);
    console.log("UPDATING ALLITEMS: " , allItemsRedux)
  },[allItemsRedux]);

  const isLoggedIn = useSelector(getIsLoggedIn);
  const userId = useSelector(getUserId);
  const affordableDishes = useSelector(getAffordableDishesList);
  const popularDishes = useSelector(getPopularDishesList);
  const quickDishes = useSelector(getQuickDishesList);
  const selectedTab = useSelector(getSelectedTab);
  const removedItems = useSelector(getRemovedItems);
  const location = useLocation();
  const userExcludedIngredients = useSelector(getExcludedIngredients);

  /**
   * @brief Handles saving meal plans to the database.
   * This function retrieves meal information from the shoplist and saves it to the database.
   * @remarks The function assumes that the shoplist variable is defined and contains necessary meal information.
   */

  const handleOriginPath = (props) => {
    if (props.location.state === "/recommendation") {
      const currentList = props.recommendationList;
      // if(allItems.length === 0){
        console.log("GENERATING SHOP LIST currentList", currentList)
        dispatch(generateShoplist(currentList));
      // }
    } else if (props.location.state === "/plan") {
      userExcludedIngredients.map((ingr) => {
        allItems.map((category) => {
          category.ingredients.map((item) => {
            if (item.name === ingr) {
              dispatch(removeItem(item));
            }
          });
        });
      });
    }
  };

  const extractRecepies = (list) => {
    // Array to store recipe objects
    const recipes = [];
    // Iterating over each meal in the shoplist
    list.map((meal) => {
      // Creating a recipe object with meal information
      const recipeDbObject = {
        name: meal.result.title,
        portion: meal.portions,
        id: meal.result.id,
      };
      // Adding the recipe object to the recipes array
      recipes.push(recipeDbObject);
    });
    return recipes;
  };
  const handleSaveMealPlan = (nameInput) => {
    let resultRecipes = [];
    switch (selectedTab) {
      case "Affordable": {
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
    dispatch(
      saveShoplistToMenumaticDb({
        userId: userId,
        data: {
          planName: nameInput,
          recipes: resultRecipes,
        },
        excluded: removedItems,
      })
    );
    navigate("/");
    // window.location.reload();
    // window.location.reload();
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };
  const handleRestoreItem = (item) => {
    dispatch(restoreItem(item));
  };

  const handleNavigateToLogIn = () => {
    navigate("/signin");
  };

  // Fetch and generate the shopping list when the component mounts or shoplist changes
  useEffect(() => {
    let recommendationList = [];
    switch (selectedTab) {
      case "Affordable":
        recommendationList = affordableDishes;
        break;
      case "Popular":
        recommendationList = popularDishes;
        break;
      case "Quick":
        recommendationList = quickDishes;
        break;
    }
    handleOriginPath({
      location: location,
      recommendationList: recommendationList,
    });
  }, []);

  console.log(allItems);
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
