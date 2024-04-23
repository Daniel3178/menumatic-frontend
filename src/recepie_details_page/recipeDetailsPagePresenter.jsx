import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { objects } from "../assets/constObjects";
import RecipeDetailsPageView from "./recepieDetailsPageView";

const RecipeDetailsPagePresenter = () => {
  const navigate = useNavigate();
  // const recommendationList = useSelector(getRecommendationList);

  const selectedRecipe = objects[0];
  // console.log(selectedRecipe[0].analyzedInstructions)

  // console.log("name ",selectedRecipe[0].name)
  return (
    <RecipeDetailsPageView
      name={selectedRecipe[0].title}
      image={selectedRecipe[0].image}
      ingredients={selectedRecipe[0].extendedIngredients}
      instructions={selectedRecipe[0].analyzedInstructions[0].steps}
    />
  );
};

export default RecipeDetailsPagePresenter;
