
import React, { useState } from 'react';
import { clock, thumbs_up, thumbs_down, info, close, info_i, tune, done } from "../assets";

const FilterPageView = (props) => {


  // TODO: Change apiResults[0] to apiResults.recipes[0] accross the file to work with the API
  
  const [switchValue, setSwitchValue] = useState(false); // Initialize switch value as false

  // Function to handle switch toggle
  const handleSwitchToggle = (e) => {
    console.log(e.target.checked)
    setSwitchValue(e.target.checked); // Toggle switch value
  };

  const includeTags = ["Vegetarian", "Vegan"];
  let excludeTags = ["Gluten", "Shellfish", "Nuts", "Egg"];

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
      <h1>FOOD PREFERENCE</h1>

      <ul>
        {includeTags.map((ingredient, index) =>
          <li key={index}>
            <div className="inline-block  w-32 mr-4 m-2">
              <div className="flex justify-start">
                <span>{ingredient}</span>
              </div>
            </div>
            <div className="inline-block  w-32 mr-4">
              <div className="flex items-end justify-end">
                <label className="relative inline-flex cursor-pointer">
                  <input id={'switch-${index}'} type="checkbox" checked={switchValue} onChange={handleSwitchToggle} className="peer sr-only" />
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
            <div className="inline-block  w-32 mr-4 m-2">
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


      <button onClick={props.toggleInfoView} className=" hover:scale-110 shadow-md m-7 bg-green-500 rounded-full w-20 h-20 flex items-center justify-center focus:outline-none">
            <img src={done} alt="Image" className="w-10 h-10 rounded-full" />
          </button>

          
    </div>
    
  );
};

export default FilterPageView;