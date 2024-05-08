import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedRecipe } from "./planSlice";
import { useNavigate } from "react-router-dom";
import PlanView from "./planView";
import {
  getMenumaticSelecedList,getUserAllListPromise
} from "../../store/menumaticServerAPISlice";


const PlanPresenter = () => {
  const navigate = useNavigate();
  const selectedList = useSelector(getMenumaticSelecedList); 

  const {state: allListState} = useSelector(getUserAllListPromise);

  const dispatch = useDispatch();

  const handleGoToShoplist = () => {
    navigate("/shoplist-test", { state: "/plan" });
  };

  const handleNavigateBack = () => {
    navigate(-1);
  }

  const handleNavigateToRecipe = (recipe) => {
    // console.log("passed recipe", recipe)
    dispatch(setSelectedRecipe(recipe))
    navigate("/recipeDetails")
  }

  return (
    <PlanView
      meal={selectedList.name}
      recipes={selectedList.recipes}
      goToShoplist={handleGoToShoplist}
      state={allListState}
      navigateBack={handleNavigateBack}
      navigateToRecipe= {handleNavigateToRecipe}
    />
  );
};

export default PlanPresenter;
