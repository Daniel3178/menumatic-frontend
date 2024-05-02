import React from "react";
import { useNavigate } from "react-router-dom";
import PlanPresenter from "./planPresenter";
import { logo, backBlack } from "../../assets";

const PlanView = ({ week, recipes, goToShoplist, state, navigateBack, navigateToRecipe }) => {
  if (state === "ready") {

    return (
      
      <div className="flex-col w-[840px] font-outfit">
        <div className="flex justify-center w-444 h-102 mt-8 mb-16">
          <img src={logo} />
        </div>
        <button className="text-whiteSmoke hover:shadow-xl"
              onClick={() => navigateBack()} aria-label="go back">
              <img src={backBlack} />
            </button>
        <h1 className="text-center font-regular pb-10 text-cerulean">Recipes for {week}</h1>
        <div>
          <div className="mb-4 font-outfit text-2xl font-medium w-full flex items-center justify-center">
            <span className="text-center w-[10%]">Day</span>
            <span className="text-center w-[60%]">Meal</span>
            <span className="text-center w-[30%]">Portions</span>
          </div>
        </div>

        {recipes.map((recipe, index) => (
          <div className='bg-cerulean mb-5 w-full h-[45px] rounded-small font-outfit text-whiteSmoke shadow-mid flex items-center justify-center' key={index} onClick={() => navigateToRecipe(recipe)}>
            <span className="text-center w-[10%]">{index + 1}</span>
            <span className="text-center w-[60%]">{recipe.name}</span>
            <span className="text-center w-[30%]">{recipe.portions}</span>
          </div>
        ))}

        <div className="flex w-full justify-end">
          <button
            className="w-[180px] h-[54px] bg-cerulean rounded-[100px] font-outfit font-base font-medium text-whiteSmoke shadow-mid"
            onClick={goToShoplist}
            role="button"
          >
            SHOPPING LIST
          </button>
        </div>
      </div>
    );
  }
  else if (state === "loading") {
    return (
      <div>
        <h1 className="text-center font-bold py-4">Recipes for {week}</h1>
        <h1 className="text-center font-bold py-4">Loading...</h1>
      </div>
    )
  }
  else if (state === "failed") {
    return (
      <div>
        <h1 className="text-center font-bold py-4">Server is down</h1>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1 className="text-center font-bold py-4">Something went wrong</h1>
      </div>
    )
  }
};

export default PlanView;
