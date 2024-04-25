import React from 'react';
import { clock, thumbs_up, thumbs_down, info, close, info_i, tune, dislike_btn, like_btn, logo, clock_icon, noimage } from "../assets";

const HomePageView = (props) => {

  // TODO: Change apiResults[0] to apiResults.recipes[0] accross the file to work with the API
  //conditionalRender either renders the info view for the current dish, or the photo for the current dish.
  const conditionalRender = () => {


    //if info has been toggled the infopage is shown.

    if (props.info) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-[550px] h-[550px] bg-gray-100 rounded-xl shadow-md overflow-auto">
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4 text-balance">{props.apiResults[0].title} </h1>
              <div>
                <div className="flex items-center">
                  <img src={clock} alt="clock" className="w-6 h-6 mr-2 mb-4" />
                  <h1 className="text-3xl font-bold mb-4">{props.apiResults[0].readyInMinutes} min</h1>
                </div>
                <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
                <ul className="h-50 list-disc pl-5 overflow-auto">
                  {props.apiResults[0].extendedIngredients.map((item, index) => (
                    <li key={index} className="text-lg">{item.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <button onClick={props.toggleInfoView} className=" hover:scale-110 shadow-md m-2 bg-gray-100 hover:bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center focus:outline-none">
            <img src={close} alt="Image" className="w-10 h-10 rounded-full" />
          </button>
        </div>
      );
    }
    //if result from api exists render image. This code can only be reached if previous if statement is not true
    if (props.apiResults) {
      //console.log(props.apiResults)
      return (
        <div className="flex justify-center">
          <div className="w-405 h-540 rounded-large relative shadow-xl">
            <img src={"https://img.spoonacular.com/recipes/" + props.apiResults[0].id + "-636x393." + props.apiResults[0].imageType} className="object-cover w-full h-full rounded-large" alt="Example Image" />
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
        </div>

      );
    }
  };

  const renderHomePage = () => {
    if (props.apiResultsState === "ready") {
      return (
        <div className="bg-page min-h-screen w-full fixed top-0 right-0 bottom-0 left-0">
          <div className="flex justify-center w-444 h-102 mt-8 mb-16">
            <img src={logo} />
          </div>
          {conditionalRender()}
          <div className="flex space-x-20 justify-center mt-8">
            <button onClick={props.sendLike} className="flex rounded-full shadow-xl hover:shadow-mid foucs:shadow-in">
              <img src={like_btn} />
            </button>
            <button onClick={props.getRandomReceipt} className="flex rounded-full shadow-xl hover:shadow-mid foucs:shadow-in">
              <img src={dislike_btn} />
            </button>
          </div>
        </div>
      )
    }
    else if (props.apiResultsState === "loading") {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
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
    <div>
      {renderHomePage()}
    </div>
  );
};

export default HomePageView;
