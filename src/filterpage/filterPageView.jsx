import React from 'react';
import { clock, thumbs_up, thumbs_down, info, close, info_i, tune } from "../assets";

const FilterPageView = (props) => {


  // TODO: Change apiResults[0] to apiResults.recipes[0] accross the file to work with the API


  const includeTags = ["Vegetarian", "Vegan"];
  let excludeTags = ["Gluten", "Shellfish", "Nuts", "Egg"];

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
      <h1>FOOD PREFERENCE</h1>

      <ul>
        {includeTags.map((ingredient, index) =>
          <li key={index}>
            <div className="inline-block  w-32 mr-4">
              <div className="flex justify-start">
                <span>{ingredient}</span>
              </div>
            </div>
            <div className="inline-block  w-32 mr-4">
              <div className="flex items-end justify-end">
                <label className="relative inline-flex cursor-pointer">
                  <input id={'switch-${index}'} type="checkbox" className="peer sr-only" />
                  <label htmlFor="switch-2" className="hidden"></label>
                  <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
                </label>
              </div>
            </div>


          </li>
        )
        }
      </ul>

      <h1>ALLERGIES</h1>
      <ul>
        {excludeTags.map((ingredient, index) =>
          <li key={index}>
            <div className="inline-block  w-32 mr-4">
              <div className="flex justify-start">
                <span>{ingredient}</span>
              </div>
            </div>
            <div className="inline-block  w-32 mr-4">
              <div className="flex items-end justify-end">
                <label className="relative inline-flex cursor-pointer">
                  <input id={'switch-${index}'} type="checkbox" className="peer sr-only" />
                  <label htmlFor="switch-2" className="hidden"></label>
                  <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
                </label>
              </div>
            </div>


          </li>
        )
        }
      </ul>



    </div>
  );
};

export default FilterPageView;