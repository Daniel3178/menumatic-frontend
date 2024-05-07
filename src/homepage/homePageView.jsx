import React from 'react';
import {dislike_btn, like_btn, clock_icon, noimage } from "../assets";

const ingredientsList = (items) => {
  // Remove duplicates from item.nameClean
  const uniqueIngredients = Array.from(new Set(items.map(item => item.nameClean)));

  return (
    <div className="ml-8 mr-4">
      <ul className="space-y-1 list-disc">
        {uniqueIngredients.map((nameClean, index) => (
          <li key={index} className="font-outfit font-normal text-[18px] text-gunmetal">
            {nameClean}
          </li>
        ))}
      </ul>
    </div>
  );
}

const HomePageView = (props) => {

  // TODO: Change apiResults[0] to apiResults.recipes[0] accross the file to work with the API
  //conditionalRender either renders the info view for the current dish, or the photo for the current dish.
  const conditionalRender = () => {


    //if info has been toggled the infopage is shown.

    if (props.info) {
      return (
        <div className="flex justify-center">
          <div className="bg-vanilla h-full max-h-[540px] aspect-[3/4] rounded-large relative shadow-xl">

            <div className='p-2'>
              <p className="text-gunmetal font-outfit text-[24px] font-medium">{props.apiResults[0].title}</p>
            </div>

            <div className="overflow-y-auto h-[380px]">
              {ingredientsList(props.apiResults[0].extendedIngredients)}
            </div>

            <div className="flex absolute bottom-0 min-w-405 right-0 mb-4">
              <button onClick={props.toggleInfoView} className="tracking-wider mr-2 flex justify-center items-center rounded-full bg-whiteSmoke text-gunmetal font-outfit text-bold hover:shadow-mid foucs:shadow-in w-32 h-12">
                VIEW LESS
              </button>
            </div>
          </div>
        </div>
      );
    }
    //if result from api exists render image. This code can only be reached if previous if statement is not true
    if (props.apiResults) {
      ////console.log(props.apiResults)
      return (
        <div className="flex justify-center">
          <div className="h-full max-h-[540px] aspect-[3/4] rounded-large relative shadow-xl">
            <img src={"https://img.spoonacular.com/recipes/" + props.apiResults[0].id + "-636x393." + props.apiResults[0].imageType} className="object-cover w-full h-full rounded-large"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = noimage;
              }} />
            <div className="absolute inset-x-0 bottom-0 bg-cerulean bg-opacity-50 backdrop-blur-sm rounded-b-large min-w-405 lg:h-[25%] h-[27%]">
              <div className='pt-3 pl-2 lg:pl-4'>
                <p className="text-whiteSmoke font-outfit text-xl lg:text-3xl font-medium truncate">{props.apiResults[0].title}</p>
              </div>
              <div className='absolute inset-x-0 bottom-0 flex space-x-4 items-center justify-between p-2 lg:p-4'>
                <div className='flex space-x-2 items-center'>
                  <div className='mt-2 ml-2 flex text-whiteSmoke'>
                    <img src={clock_icon} className="lg:size-12 pb-2" />
                  </div>
                  <div className='text-whiteSmoke font-outfit text-lg lg:text-2xl font-thin'>
                    {props.apiResults[0].readyInMinutes} min
                  </div>
                </div>
                <div className='items-center flex justify-end'>
                  <button onClick={props.toggleInfoView} className="tracking-wider flex justify-center items-center rounded-full bg-whiteSmoke text-gunmetal font-outfit text-sm text-bold hover:shadow-mid foucs:shadow-in w-28 h-10">
                    VIEW MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderHomePage = () => {
    if (props.apiResultsState === "ready") {
      return (
        <div className="w-[75%] h-full">
          
            <div>
              {conditionalRender()}
            </div>
            <div className="flex space-x-12 place-content-evenly justify-center pt-6 pb-6 pr-6 pl-6">
              <button onClick={props.getRandomReceipt} className="flex rounded-full shadow-xl hover:shadow-mid foucs:shadow-in">
                <img src={dislike_btn} />
              </button>
              <button onClick={props.sendLike} className="flex rounded-full shadow-xl hover:shadow-mid foucs:shadow-in">
                <img src={like_btn} />
              </button>
            </div>
          
        </div>
      )
    }
    else if (props.apiResultsState === "loading") {
      return (
        <div className="flex flex-col items-center justify-center h-full max-h-[640px]">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
        </div>
      )
    }
    else {
      return (
        <div>Not ready</div>
      )
    }
  }

  return (
    <div className='flex justify-center h-4/5 w-screen lg:pr-72'>
      {renderHomePage()}
    </div>
  );
};

export default HomePageView;
