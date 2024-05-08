import React from 'react';
import { useState } from 'react'
import { dislike_btn, like_btn, clock_icon, noimage } from "../assets";

import TinderCard from 'react-tinder-card'

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

  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    if (direction === 'left') {
      props.getRandomReceipt()
      
    } else if (direction === 'right') {
      props.sendLike()
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const conditionalRender = () => {


    //if info has been toggled the infopage is shown.

    if (props.info) {
      return (
        <div className="flex bg-vanilla h-full w-full rounded-large relative shadow-xl">


          <div className='p-2'>
            <div className=''>
              <p className="text-gunmetal text-wrap font-outfit text-[24px] font-medium">{props.apiResults[0].title}</p>
            </div>
            <div className="h-[70%] overflow-auto">
              {ingredientsList(props.apiResults[0].extendedIngredients)}
            </div>
          </div>

          <div className="absolute bottom-0 right-0 pr-2 pb-4">
            <button onClick={props.toggleInfoView} className="pressable tracking-wider flex justify-center items-center rounded-full bg-whiteSmoke text-gunmetal font-outfit text-sm text-bold hover:shadow-mid foucs:shadow-in p-4 h-10">
              VIEW LESS
            </button>
          </div>
        </div>
      );
    }
    //if result from api exists render image. This code can only be reached if previous if statement is not true
    if (props.apiResults) {
      ////console.log(props.apiResults)
      return (

        <div className='w-full h-full'>
          <img src={"https://img.spoonacular.com/recipes/" + props.apiResults[0].id + "-636x393." + props.apiResults[0].imageType} className="object-cover h-full w-full rounded-large"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = noimage;
            }} />
          <div className="absolute inset-x-0 bottom-0 bg-cerulean bg-opacity-50 backdrop-blur-sm rounded-b-large h-[27%]">
            <div className='pt-3 pl-2'>
              <p className="text-whiteSmoke font-outfit text-xl lg:text-3xl font-medium truncate">{props.apiResults[0].title}</p>
            </div>
            <div className='absolute inset-x-0 bottom-0 flex space-x-4 items-center justify-between p-2'>
              <div className='flex space-x-2 items-center'>
                <div className='mt-2 ml-2 flex text-whiteSmoke'>
                  <img src={clock_icon} className="pb-2" />
                </div>
                <div className='text-whiteSmoke font-outfit text-lg font-thin'>
                  {props.apiResults[0].readyInMinutes} min
                </div>
              </div>
              <div className='items-center flex justify-end'>
                <button onClick={props.toggleInfoView} className="pressable tracking-wider flex justify-center items-center rounded-full bg-whiteSmoke text-gunmetal font-outfit text-sm text-bold hover:shadow-mid foucs:shadow-in p-4 h-10">
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
    if (props.apiResultsState === "ready") {
      return (
        <div className="h-svh overflow-hidden w-screen pt-32 flex items-center justify-center">

          <div className='h-full max-h-[750px] max-w-full aspect-[3/5] pl-4 pr-4'>
        
            <TinderCard className="h-[80%] w-full" swipeThreshold={10} key={props.apiResults} onSwipe={(dir) => swiped(dir, dir)} onCardLeftScreen={() => outOfFrame(props.apiResults)}>
              <div className='flex justify-center h-full'>

                <div className="max-h-[540px] rounded-large relative shadow-xl">
                  {conditionalRender()}
                </div>

              </div>
            </TinderCard>
            <div className="h-[20%] flex justify-center p-2">
              <button onClick={props.getRandomReceipt} className="w-1/2 flex justify-center">
                <img className="h-full rounded-full shadow-xl hover:shadow-mid foucs:shadow-in" src={dislike_btn} />
              </button>
              <button onClick={props.sendLike} className="w-1/2 flex justify-center">
                <img className="h-full rounded-full shadow-xl hover:shadow-mid foucs:shadow-in" src={like_btn} />
              </button>
            </div>
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
    <div className='flex justify-center h-[80%] w-screen lg:pr-72'>
      {renderHomePage()}
    </div>
  );
};

export default HomePageView;
