import React from "react";
import { backBlack, logo } from "../assets";

const RecipeDetailsPageView = (props) => {
  const renderIngredients = (ingr) => {
    return ingr.map((ingredient, index) => {
      return (
        <div key={index} className="w-full flex justify-between items-center">
          <div className="flex justify-between flex-row">
            <p className="text-base font-outfit font-bold text-gunmetal">
              {Math.ceil(ingredient.measures.metric.amount)}
            </p>
            <p className="text-base px-1 font-outfit font-bold text-gunmetal">
              {ingredient.measures.metric.unitShort}
            </p>
            <p className="text-base px-2 font-outfit font-regular text-gunmetal">
              {ingredient.nameClean}
            </p>
          </div>
        </div>
      );
    });
  };
  const renderIntroSection = () => {
    return (
      <div>
        <div className="w-full flex flex-col lg:flex-row ">
          <div className="hidden lg:block text-nowrap pr-20">
            {renderIngredients(props.ingredients)}
          </div>
          <div className="w-full mb-8 ">
            <img
              src={props.image}
              alt="recepie"
              className="object-cover h-full rounded-2xl"
            />
          </div>
          <div className=" lg:hidden w-full ">
            {renderIngredients(props.ingredients)}
          </div>
        </div>
      </div>
    );
  };

  const renderInstructionsSteps = (steps) => {
    return steps.map((step, index) => {
      return (
        <div key={index} className="w-full flex flex-col-2 gap-4 mt-4">
          <p className="text-base font-outfit font-bold text-gunmetal">
            {step.number}
          </p>
          <p className="text-base font-outfit font-regular text-gunmetal">
            {step.step}
          </p>
        </div>
      );
    });
  };

  const renderRecipe = () => {
    if(props.bulkSearchApiState === "failed") {
      return (
        <p className="text-gray-700 text-center">Service is not available at the moment. Please try again later.</p>
      )}else{
        return(
          <>
          <div>
          <p className="mb-8 text-3xl md:text-5xl font-outfit font-bold text-gunmetal tracking-wider">
            {props.name}
          </p>
        </div>
        <div>
          {renderIntroSection()}
          <div className="mt-8 mb-8">
            {renderInstructionsSteps(props.instructions)}
          </div>
        </div>
        </>
        )
        
      }
  }

  return (
    <div className="pt-32 flex w-screen lg:pl-8 lg:pr-80 justify-center">
      <div className=" pr-4 pl-4 max-w-[840px]">
        <div>
          <button
            className="text-whiteSmoke hover:shadow-xl"
            onClick={() => props.navigateBack()}
            aria-label="go back"
          >
            <img src={backBlack} />
          </button>
        </div>
        {renderRecipe()}
        
      </div>
    </div>
  );
};

export default RecipeDetailsPageView;
