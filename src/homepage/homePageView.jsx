import React from 'react';
import { clock, thumbs_up, thumbs_down, info, close, info_i, tune, dislike_btn, like_btn, logo, clock_icon } from "../assets";

const HomePageView = (props) => {
  
  // TODO: Change apiResults[0] to apiResults.recipes[0] accross the file to work with the API
  //conditionalRender either renders the info view for the current dish, or the photo for the current dish.
  const conditionalRender = () => {

    
    //if info has been toggled the infopage is shown.

    if (props.info) {
      return (
        <div>

        </div>
      );
    }
    //if result from api exists render image. This code can only be reached if previous if statement is not true
    if (props.apiResults) {
      //console.log(props.apiResults)
      return (
        <div>
        </div>
      );
    }
  };

  return (
    <div className="bg-page min-h-screen w-full fixed top-0 right-0 bottom-0 left-0">
      <div className="flex justify-center w-444 h-102 mt-8 mb-16">
        <img src={logo} />
      </div>
      <div className="flex justify-center">
        <div className="w-405 h-540 rounded-large relative shadow-xl">
          <img src={props.apiResults[0].image} className="object-cover w-full h-full rounded-large" alt="Example Image" />
          <div className="absolute inset-x-0 bottom-0 bg-cerulean bg-opacity-50 backdrop-blur-sm rounded-b-large w-405 h-130">
            <div className='mt-2 ml-2'>
              <p className="text-whiteSmoke font-outfit text-2xl font-medium">{props.apiResults[0].title}</p>
            </div>
            <div className='mb-4 absolute inset-x-0 bottom-0 flex space-x-4 items-center'>
              <div className='mt-2 ml-2 flex text-whiteSmoke'>
                <img src={clock_icon} className="" />
              </div>
              <div className='text-whiteSmoke font-outfit text-2xl font-thin'>
                {props.apiResults[0].readyInMinutes} min
              </div>
            </div>
          </div>
        </div>
        {conditionalRender()}
        <div className="mb-8 flex flex-col items-center ">
          <div className="flex items-center">
            <button onClick={props.getRandomReceipt} className="hover:scale-105 shadow-md mt-15 mr-20 bg-red-500 hover:bg-red-600 rounded-full w-40 h-40 flex items-center justify-center focus:outline-none">
              <img src={thumbs_down} alt="Image" className="w-20 h-20 rounded-full" />
            </button>
            <button onClick={props.sendLike} className="hover:scale-105 shadow-md mt-15 ml-20 bg-green-500 hover:bg-green-600 rounded-full w-40 h-40 flex items-center justify-center focus:outline-none">
              <img src={thumbs_up} alt="Image" className="w-20 h-20 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-20 justify-center mt-8">
        <button onClick={props.sendLike} className="flex rounded-full shadow-xl hover:shadow-mid foucs:shadow-in">
          <img src={like_btn} />
        </button>
        <button onClick={props.getRandomReceipt} className="flex rounded-full shadow-xl hover:shadow-mid foucs:shadow-in">
          <img src={dislike_btn} />
        </button>
      </div>
    </div>
  );
};

export default HomePageView;
