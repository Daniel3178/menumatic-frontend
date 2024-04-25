import React from "react";
import { useNavigate } from "react-router-dom";
import PlanPresenter from "./planPresenter";

const PlanView = ({ week, recipes, goToShoplist }) => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="w-[160px] h-[50px] text-[14px] bg-green-400 rounded self-center"
        onClick={goToShoplist}
        type="button"
      >
        Go to Shop List
      </button>
      <h1>Recipes for {week}</h1>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlanView;
