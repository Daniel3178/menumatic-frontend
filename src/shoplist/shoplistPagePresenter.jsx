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
import { normalizeIngrAmount } from "../recepie_details_page/recipeDetailsUtilites";
import {getMenumaticSelecedList} from "../store/menumaticServerAPISlice"
import { getSelectedTab } from "../recommendation_page/recommendationPageSlice";
import { getIsLoggedIn, getUserId } from "../menu/userAccountSlice";
import { saveShoplistToMenumaticDb,saveExcludedIngredients } from "../integration/menumaticServerThunks";
import { useNavigate, useLocation } from "react-router-dom";
import { getBulkSearchPromise } from "../store/spoonacularAPISlice";
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
  const bulkSearchApiState = useSelector(getBulkSearchPromise).state

  const { dishes: selectedDishes } = useSelector(getSelectedTab);
  const {id: selectedListId} = useSelector(getMenumaticSelecedList)
  const {data:{allItems: userAllItems, removedItems: userRemovedItems}, state: userShoplistState} = useSelector(getUserShoplistPromise)
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

  const handleUpdateMealPlan = (nameInput)=>{
    // if(userShoplistState === "ready"){
      dispatch(saveExcludedIngredients({mealplanId: selectedListId, excluded: removedItemsUser}))
      alert("Meal plan updated")
      // }
    // else{
      // alert("Required info is not loaded yet, please wait a moment and try again.")
    // }
  }

  const generateRecepiesData = () =>{
    const dataForPdf =  selectedDishes.map((meal)=>{
      const {result:recpies, portions} = meal;
      const {result:{title, analyzedInstructions, extendedIngredients}, portions:normalizedPortions} = normalizeIngrAmount(recpies, portions)

      const ingredients = extendedIngredients.map((ingredient) => {
        return `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort} ${ingredient.nameClean}`
      })
      // console.log("STEPS IN GENERATION: ", steps)
      console.log("ANALYZED IN GENERATION: ", analyzedInstructions)
      const instructions = analyzedInstructions[0].steps.map((step) => {
        return step.step;
      })
      return {
        title: title,
        ingredients: ingredients,
        instructions: instructions
      }
    })

    return dataForPdf;
  }

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
      saveMealPlan={location.state ==="/recommendation"? handleSaveMealPlan : handleUpdateMealPlan}
      navigateToLogin={handleNavigateToLogIn}
      bulkSearchApiState={bulkSearchApiState}

      generateRecepiesData={generateRecepiesData}
    />
  );
};

export default ShoplistPagePresenter;
