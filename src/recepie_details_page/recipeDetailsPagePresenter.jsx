import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelectedRecipe } from "../listOfStoredPlansRelated/plan_content/planSlice";
import RecipeDetailsPageView from "./recepieDetailsPageView";
import { getUserCurrentRecipes } from "../store/menumaticServerAPISlice";

const RecipeDetailsPagePresenter = () => {
  const selectedRecipes = useSelector(getUserCurrentRecipes);
  const recipeIndex = useSelector(getSelectedRecipe);
  const selectedRecipe = selectedRecipes[recipeIndex];
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate("/plan");
  };

  return (
    <RecipeDetailsPageView
      name={selectedRecipe.result.title}
      image={
        "https://img.spoonacular.com/recipes/" +
        selectedRecipe.result.id +
        "-636x393." +
        selectedRecipe.result.imageType
      }
      ingredients={selectedRecipe.result.extendedIngredients}
      instructions={selectedRecipe.result.analyzedInstructions[0].steps}
      navigateBack={handleNavigateBack}
    />
  );
};

export default RecipeDetailsPagePresenter;
