import React from "react";
import { render } from "react-dom";

const RecipeDetailsPageView = (props) => {
  const renderIngredients = (ingr) => {
    return ingr.map((ingredient, index) => {
      return (
        <div key={index} className="w-full flex justify-between items-center">
          <div className="flex justify-between flex-row">
            <p className="text-[11px]">{ingredient.amount}</p>
            <p className="text-[11px] px-1">{ingredient.unit}</p>
            <p className="text-[11px] px-2">{ingredient.nameClean}</p>
          </div>
        </div>
      );
    });
  };
  const renderIntroSection = () => {
    return (
      <div>
        <h1 className="w-full text-center text-[18px] font-bold py-10 h-10">
          {props.name}
        </h1>
        <div className="w-full flex felx-row">
          <div className="w-1/2">{renderIngredients(props.ingredients)}</div>
          <div className="w-1/2">
            <img
              src={props.image}
              alt="recepie"
              className="w-full object-contain h-full"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderInstructionsSteps = (steps) => {
    return steps.map((step, index) => {
      return (
        <div key={index} className="w-full flex flex-col ">
          <p>{step.number}</p>
          <p>{step.step}</p>
        </div>
      );
    });
  };

  return (
    <div>
      {renderIntroSection()}
      <div className="mt-20">{renderInstructionsSteps(props.instructions)}</div>
    </div>
  );
};

export default RecipeDetailsPageView;
