import React from 'react';
import { clock } from "../assets";

const HomePageView = (props) => {
  console.log(props.apiResults);
  
  // TODO: Change apiResults[0] to apiResults.recipes[0] accross the file to work with the API
  const conditialRender = () => {
    if (props.apiResults) {
      return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <img src={props.apiResults[0].image} alt="food" className="rounded-lg" />
          <h1 className="text-3xl font-bold mb-4">{props.apiResults[0].title}</h1>
          <div className="flex items-center">
            <img src={clock} alt="clock" className="w-6 h-6 mr-2 pb-2" /> {/* Adjust size as needed */}
            <h1 className="text-3xl font-bold mb-4">{props.apiResults[0].readyInMinutes} min</h1>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {conditialRender()}
      <div className="mb-8">
        <button onClick={props.getRandomReceipt} className="m-5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">
          Dislike
        </button>
        <button onClick={props.sendLike} className="m-5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Like
        </button>
      </div>
    </div>
  );
};

export default HomePageView;
