import React from "react";
import { useNavigate } from "react-router-dom";
import PlanPresenter from "./planPresenter";

const PlanView = ({ week, recipes, goToShoplist }) => {

  return (
    <div>
      <h1 className="text-center font-bold py-4">Recipes for {week}</h1>
      <div>
        <div className="flex flex-row w-full justify-between">
          <h1 className="font-semibold">Recipe</h1>
          <h1 className="font-semibold">Portions</h1>
        </div>
      </div>
      <div>
        {recipes.map((recipe, index) => (
          <div className="flex flex-row w-full justify-between" key={index}>
          <h1 >{recipe.name}</h1>
          <h1>{recipe.portions}</h1>
          </div>
        ))}
        </div>
      <div className="flex justify-center">
      <button
        className="w-[160px] h-[50px] mt-4 text-[14px] bg-green-400 rounded "
        onClick={goToShoplist}
        type="button"
      >
        Go to Shop List
      </button>
      </div>
    </div>
  );
};

export default PlanView;
