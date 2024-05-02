import React from "react";
import { render } from "react-dom";
import { backBlack, logo } from "../assets";

const RecipeDetailsPageView = (props) => {
  const renderIngredients = (ingr) => {
    return ingr.map((ingredient, index) => {
      return (
        <div key={index} className="w-full flex justify-between items-center">
          <div className="flex justify-between flex-row">
            <p className="text-[16px] font-outfit font-bold text-gunmetal">{Math.ceil(ingredient.measures.metric.amount)}</p>
            <p className="text-[16px] px-1 font-outfit font-bold text-gunmetal">{ingredient.measures.metric.unitShort}</p>
            <p className="text-[16px] px-2 font-outfit font-regular text-gunmetal">{ingredient.nameClean}</p>
          </div>
        </div>
      );
    });
  };
  const renderIntroSection = () => {
    return (
      <div>
        <div className="w-full flex flex-row">
          <div className="w-1/2">{renderIngredients(props.ingredients)}</div>
          <div className="w-1/2">
            <img
              src={props.image}
              alt="recepie"
              className="w-full object-cover h-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderInstructionsSteps = (steps) => {
    return steps.map((step, index) => {
      return (
        <div key={index} className="w-full flex flex-col-2 gap-4">
          <p className="text-[16px] font-outfit font-bold text-gunmetal">{step.number}</p>
          <p className="text-[16px] font-outfit font-regular text-gunmetal">{step.step}</p>
        </div>
      );
    });
  };

  return (
    <div className="bg-smokeWhite min-h-screen w-full top-0 right-0 bottom-0 left-0 flex justify-center">
    <div className="w-[840px] mr-10 ml-10">
      <div className="flex justify-center w-444 h-102 mt-8 mb-16">
        <img src={logo} />
      </div>
      <div>
        <button className="text-whiteSmoke hover:shadow-xl"
          onClick={() => props.navigateBack()} aria-label="go back">
          <img src={backBlack} />
        </button>
      </div>
      <div>
        <p className="mb-8 text-[48px] font-outfit font-bold text-gunmetal tracking-wider">{props.name}</p>
      </div>
      <div>
      {renderIntroSection()}
      <div className="mt-20">{renderInstructionsSteps(props.instructions)}</div>
    </div>
    </div>
  </div>
    
  );
};

export default RecipeDetailsPageView;
