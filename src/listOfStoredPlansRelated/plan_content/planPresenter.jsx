import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedListId } from "../plan_list/planListSlice"; // Ensure correct import paths
import { setSelectedRecipe } from "./planSlice";
import { useNavigate } from "react-router-dom";
import PlanView from "./planView";
import {
  getMenumaticAllList,
  getMenumaticStates, fetchExcludedIngredients
} from "../../store/menumaticServerAPISlice";
import { searchBySpoonacularApiBulkAsync } from "../../store/spoonacularAPISlice";
import { memoryLruGarbageCollector } from "firebase/firestore";
const PlanPresenter = () => {
  const navigate = useNavigate();
  const selectedListId = useSelector(getSelectedListId); // Retrieve the selected list ID from Redux state
  const userAllList = useSelector(getMenumaticAllList);
  const {allListState, userFoodPrefState, excludedIngredientState} = useSelector(getMenumaticStates);
  const dummyData = [
    { id: 1, memoryLruGarbageCollector: "W1", recipes: ["Chicken Salad", "Beef Stew"] },
    { id: 2, memoryLruGarbageCollector: "W2", recipes: ["Fish Tacos", "Pork Ribs"] },
  ];
  const dispatch = useDispatch();
  // Find the selected meal plan based on selectedListId
  const selectedMealPlan = userAllList.find((plan) => plan.id === selectedListId);
  // console.log("TESTING DANA ", selectedMealPlan);
  if (!selectedMealPlan) {
    return <div>No meal plan selected or meal plan does not exist.</div>;
  }

  const handleGoToShoplist = () => {
    navigate("/shoplist-test", { state: "/plan" });
  };

  const handleNavigateBack = () => {
    navigate(-1);
  }

  const handleNavigateToRecipe = (recipe) => {
    console.log("passed recipe", recipe)
    dispatch(setSelectedRecipe(recipe))
    navigate("/recipeDetails")
  }

  useEffect(() => {
    const allIds = [];
    allIds.push(
      selectedMealPlan.recipes.map((recipe) => {
        return { id: recipe.id, portions: recipe.portions };
      })
    );
    dispatch(searchBySpoonacularApiBulkAsync(allIds));
  }, []);

  return (
    <PlanView
      meal={selectedMealPlan.name}
      recipes={selectedMealPlan.recipes}
      goToShoplist={handleGoToShoplist}
      state={allListState}
      navigateBack={handleNavigateBack}
      navigateToRecipe= {handleNavigateToRecipe}
    />
  );
};

export default PlanPresenter;
