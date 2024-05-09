import React from "react";
import ShoplistPageView from "./shoplistPageView";
import { useDispatch, useSelector } from "react-redux";
import {
  getGeneralShoplist,
  getUserShoplistPromise,
  removeItem,
  restoreItem,
  removeUserItem,
  restoreUserItem,
} from "./shoplistSlice";
import { getSelectedTab } from "../recommendation_page/recommendationPageSlice";
import { getIsLoggedIn, getUserId } from "../menu/userAccountSlice";
import { saveShoplistToMenumaticDb } from "../store/menumaticServerAPISlice";
import { useNavigate, useLocation } from "react-router-dom";
/**
 * ShoplistPagePresenter fetches and manages the state for the shopping list,
 * and renders the ShoplistPageView component.
 */
const ShoplistPagePresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allItems: allItemsGeneral, removedItems: removedItemsGeneral } =
    useSelector(getGeneralShoplist);
  const {
    data: { allItems: allItemsUser, removedItems: removedItemsUser },
  } = useSelector(getUserShoplistPromise);

  const isLoggedIn = useSelector(getIsLoggedIn);
  const userId = useSelector(getUserId);
  const location = useLocation();

  const { dishes: selectedDishes } = useSelector(getSelectedTab);

  const extractRecepies = (list) => {
    const recipes = [];
    list.map((meal) => {
      const recipeDbObject = {
        name: meal.result.title,
        portion: meal.portions,
        id: meal.result.id,
      };
      recipes.push(recipeDbObject);
    });
    return recipes;
  };

  const handleSaveMealPlan = (nameInput) => {
    const resultRecipes = extractRecepies(selectedDishes);
    dispatch(
      saveShoplistToMenumaticDb({
        userId: userId,
        data: {
          planName: nameInput,
          recipes: resultRecipes,
        },
        excluded: removedItemsGeneral,
      })
    );
    navigate("/");
  };

  const handleRemoveItem = (item) => {
    if (location.state === "/recommendation") {
      dispatch(removeItem(item));
    } else {
      dispatch(removeUserItem(item));
    }
  };
  const handleRestoreItem = (item) => {
    if (location.state === "/recommendation") {
      dispatch(restoreItem(item));
    } else {
      dispatch(restoreUserItem(item));
    }
  };

  const handleNavigateToLogIn = () => {
    navigate("/signin");
  };

  return (
    <ShoplistPageView
      removedItems={
        location.state === "/recommendation"
          ? removedItemsGeneral
          : removedItemsUser
      }
      allItems={
        location.state === "/recommendation" ? allItemsGeneral : allItemsUser
      }
      isLoggedIn={isLoggedIn}
      removeItem={handleRemoveItem}
      restoreItem={handleRestoreItem}
      saveMealPlan={handleSaveMealPlan}
      navigateToLogin={handleNavigateToLogIn}
    />
  );
};

export default ShoplistPagePresenter;
