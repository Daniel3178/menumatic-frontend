import React, { useState } from "react";
import { dislike_btn, like_btn, clock_icon, noimage } from "../assets";

import TinderCard from "react-tinder-card";

const ingredientsList = (items) => {
  // Remove duplicates from item.nameClean
  const uniqueIngredients = Array.from(
    new Set(items.map((item) => item.nameClean))
  );

  return (
    <div className="pl-8 pr-4">
      <ul className="space-y-1 list-disc">
        {uniqueIngredients.map((nameClean, index) => (
          <li
            key={index}
            className="font-outfit font-normal text-sm text-gunmetal"
          >
            {nameClean}
          </li>
        ))}
      </ul>
    </div>
  );
};

const HomePageView = (props) => {
  //conditionalRender either renders the info view for the current dish, or the photo for the current dish.

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction) => {
    setLastDirection(direction);
    if (direction === "left") {
      props.getRandomReceipt();
    } else if (direction === "right") {
      props.sendLike();
    }
  };

  const outOfFrame = (name) => {};

  const conditionalRender = (recipe) => {
    //if info has been toggled the infopage is shown.

    if (props.info) {
      return (
        <div className="flex bg-vanilla h-full w-full rounded-large relative shadow-xl">
          <div className="p-2 w-full h-full">
            <div className="">
              <p className="h-[30%] text-gunmetal truncate text-wrap font-outfit text-base font-medium">
                {recipe.title}
              </p>
            </div>
            <div className="h-[70%] overflow-auto">
              {ingredientsList(recipe.extendedIngredients)}
            </div>
          </div>

          <div className="absolute bottom-0 right-0 pr-1 xs:pr-2 pb-4 xs:pb-4">
            <button
              onClick={props.toggleInfoView}
              className="pressable tracking-wider flex justify-center items-center rounded-full bg-whiteSmoke text-gunmetal font-outfit text-[8px] xs:text-sm text-bold hover:shadow-mid foucs:shadow-in p-2 xs:p-4 h-6 xs:h-10"
            >
              VIEW LESS
            </button>
          </div>
        </div>
      );
    }
    //if result from api exists render image. This code can only be reached if previous if statement is not true
    if (props.apiResults) {
      return (
        <div className="w-full h-full">
          <img
            src={
              "https://img.spoonacular.com/recipes/" +
              recipe.id +
              "-636x393." +
              recipe.imageType
            }
            className="object-cover h-full w-full rounded-large"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = noimage;
            }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-cerulean bg-opacity-50 backdrop-blur-sm rounded-b-large h-[27%]">
            <div className="pt-1 pl-1 xs:pt-3 xs:pl-2">
              <p className="text-whiteSmoke font-outfit text-base xs:text-xl lg:text-2xl font-medium truncate">
                {recipe.title}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex space-x-4 items-center justify-between p-1 xs:p-2">
              <div className="flex space-x-2 items-center">
                <div className="mt-2 ml-2 flex text-whiteSmoke">
                  <img src={clock_icon} className="pb-2" />
                </div>
                <div className="text-whiteSmoke font-outfit text-sm xs:text-lg font-thin">
                  {recipe.readyInMinutes} min
                </div>
              </div>
              <div className="items-center flex justify-end">
                <button
                  onClick={props.toggleInfoView}
                  className="pressable tracking-wider flex justify-center items-center rounded-full bg-whiteSmoke text-gunmetal font-outfit text-[8px] xs:text-sm text-bold hover:shadow-mid foucs:shadow-in p-2 xs:p-4 h-6 xs:h-10"
                >
                  VIEW MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderHomePage = () => {
    if (props.apiResultsState === "ready" || props.apiResults.length > 1) {
      return (
        <div className="h-svh overflow-hidden w-screen pt-32 flex items-center justify-center">
          <div className="h-full max-h-[750px] max-w-full aspect-[3/5] pl-4 pr-4">
            <div className="h-[80%] w-full relative">
              {props.apiResults
                .slice(1, 2)
                .map((recipe) => (
                  <div
                    className="h-full w-full absolute z-10"
                  >
                    <div className="flex justify-center h-full">
                      <div className="rounded-large w-full">
                        {conditionalRender(recipe)}
                      </div>
                    </div>
                  </div>
                ))
                .reverse()}
              {props.apiResults
                .slice(0, 1)
                .map((recipe) => (
                  <TinderCard
                    className="h-full w-full absolute z-10"
                    swipeRequirementType={"position"}
                    swipeThreshold={100}
                    key={props.apiResults}
                    onSwipe={(dir) => swiped(dir, dir)}
                    preventSwipe={['up', 'down']}
                    onCardLeftScreen={() => outOfFrame(props.apiResults)}
                  >
                    <div className="flex justify-center h-full">
                      <div className="w-full rounded-large shadow-xl transition-all duration-1000">
                        {conditionalRender(recipe)}
                      </div>
                    </div>
                  </TinderCard>
                ))
                .reverse()}
            </div>
            <div className="h-[20%] flex justify-center p-2">
              <button
                onClick={props.getRandomReceipt}
                className="w-1/2 flex justify-center"
              >
                <img
                  className="h-full rounded-full shadow-xl hover:shadow-mid foucs:shadow-in"
                  src={dislike_btn}
                />
              </button>
              <button
                onClick={props.sendLike}
                className="w-1/2 flex justify-center"
              >
                <img
                  className="h-full rounded-full shadow-xl hover:shadow-mid foucs:shadow-in"
                  src={like_btn}
                />
              </button>
            </div>
          </div>
        </div>
      );
    } else if (props.apiResultsState === "loading") {
      return (
        <div className="h-svh w-screen flex flex-col items-center justify-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-gunmetal"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <span className="animate-pulse font-outfit font-medium text-lg text-gunmetal">
            Loading...
          </span>
        </div>
      );
    } else {
      return <div>Not ready</div>;
    }
  };

  return (
    <div className="flex justify-center h-[80%] w-screen lg:pr-72">
      {renderHomePage()}
    </div>
  );
};

export default HomePageView;
