import React from 'react';
import { clock, thumbs_up, thumbs_down, info } from "../assets";

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

  if(true){
    
    return(<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-balance">{props.apiResults.recipes[0].title}</h1>
      <div>
      <div className="flex items-center">
            <img src={clock} alt="clock" className="w-6 h-6 mr-2 mb-4" /> {/* Adjust size as needed */}
            <h1 className="text-3xl font-bold mb-4">{props.apiResults.recipes[0].readyInMinutes} min</h1>
          </div>
        <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
        <ul className="list-disc pl-5">
          {props.apiResults.recipes[0].extendedIngredients.map((item, index) => (
            <li key={index} className="text-lg">{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {conditialRender()}
      <div className="mb-8 flex flex-col items-center">

        <button  className="m-2 bg-gray-100 hover:bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center focus:outline-none">
          <img src={info} alt="Image" className="w-10 h-10 rounded-full"/>
        </button>

        <div className="flex items-center">
          <button onClick={props.getRandomReceipt} className="mt-20 mr-20 bg-red-500 hover:bg-red-600 rounded-full w-40 h-40 flex items-center justify-center focus:outline-none">
            <img src={thumbs_down} alt="Image" className="w-20 h-20 rounded-full"/>
          </button>
          <button onClick={props.sendLike} className="mt-20 ml-20 bg-green-500 hover:bg-green-600 rounded-full w-40 h-40 flex items-center justify-center focus:outline-none">
            <img src={thumbs_up} alt="Image" className="w-20 h-20 rounded-full"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageView;