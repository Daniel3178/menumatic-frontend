import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { objects } from "../assets/constObjects";
import { getSelectedRecipe } from "../listOfStoredPlansRelated/plan_content/planSlice";
import RecipeDetailsPageView from "./recepieDetailsPageView";

const RecipeDetailsPagePresenter = () => {
  const selectedRecipe = useSelector(getSelectedRecipe)
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
      name={selectedRecipe.title}
      image={"https://img.spoonacular.com/recipes/" + selectedRecipe.id + "-636x393." + selectedRecipe.imageType}
      ingredients={selectedRecipe.extendedIngredients}
      instructions={selectedRecipe.analyzedInstructions.steps}
      navigateBack={handleNavigateBack}
      
    />
  );
};

export default RecipeDetailsPagePresenter;
