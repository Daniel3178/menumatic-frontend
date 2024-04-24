import React from 'react';
import { clock, thumbs_up, thumbs_down, close, info_i, tune } from "../assets";

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
      // console.log(props.apiResults)
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-[550px] h-[550px] bg-gray-100 p-8 rounded-lg shadow-md">
            <img src={props.apiResults[0].image} alt="food" className="rounded-lg" />
            <h1 className="text-3xl font-bold mb-4">{props.apiResults[0].title}</h1>
            <div className="flex items-center">
              <img src={clock} alt="clock" className="w-6 h-6 mr-2 pb-2" /> 
              <h1 className="text-3xl font-bold mb-4">{props.apiResults[0].readyInMinutes} min</h1>
            </div>
          </div>
          <button onClick={props.toggleInfoView} className="hover:scale-110 shadow-md m-2 bg-gray-100 hover:bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center focus:outline-none">
            <img src={info_i} alt="Image" className="w-7 h-7 rounded-full" />
          </button>
        </div>

      );
    }
  };

  const renderHomePage = () =>{
    if(props.apiResultsState === "ready"){
      return(
        <div className="flex flex-col items-center justify-center h-screen">
        <div className=" w-[550px] flex justify-end">
          <button onClick={props.navigateToFilterPage} className="flex items-center justify-end m-2 bg-white  w-20 h-20 focus:outline-none">
            <img src={tune} alt="Image" className="w-10 h-10 rounded-full hover:scale-110" />
          </button>
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
      )
    }
    else if(props.apiResultsState === "loading"){
      return(
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
        </div>
      )
    }
    else{
      return(
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
