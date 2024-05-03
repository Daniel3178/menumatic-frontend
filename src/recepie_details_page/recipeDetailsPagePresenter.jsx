import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { objects } from "../assets/constObjects";
import { getSelectedRecipe } from "../listOfStoredPlansRelated/plan_content/planSlice";
import RecipeDetailsPageView from "./recepieDetailsPageView";
import { getUserSavedRecipes } from "../store/spoonacularAPISlice";

const RecipeDetailsPagePresenter = () => {
  const selectedRecipes = useSelector(getUserSavedRecipes)
  const recipeIndex = useSelector(getSelectedRecipe)
  const selectedRecipe = selectedRecipes[recipeIndex]
  console.log("selected", selectedRecipe)
  const navigate = useNavigate();
  // const recommendationList = useSelector(getRecommendationList);

  //const selectedRecipe = objects[0];
  // console.log(selectedRecipe[0].analyzedInstructions)

  const handleNavigateBack = () => {
    navigate("/plan");
  };

  // console.log("name ",selectedRecipe[0].name)
  return (
    <RecipeDetailsPageView
      name={selectedRecipe.result.title}
      image={"https://img.spoonacular.com/recipes/" + selectedRecipe.result.id + "-636x393." + selectedRecipe.result.imageType}
      ingredients={selectedRecipe.result.extendedIngredients}
      instructions={selectedRecipe.result.analyzedInstructions[0].steps}
      navigateBack={handleNavigateBack}
      
    />
  );
};

export default RecipeDetailsPagePresenter;
