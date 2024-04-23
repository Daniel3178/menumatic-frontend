import React, { useState } from 'react'; // Importing necessary modules
import { clock, thumbs_up, thumbs_down, info, close, info_i, tune, done } from "../assets"; // Importing necessary assets
import { getExcludeTags, getIncludeTags } from "../filterpage/filterPageSlice";

const FilterPageView = (props) => { // Creating a functional component FilterPageView with props

  const includeTags = ["Vegetarian", "Vegan"]; // Array of tags that can be include
  const excludeTags = ["Gluten"]; // Array of tags that can be exclude

  const [includedItems, setIncludedItems] = useState(props.storedIncludeTags); // State hook for included items
  const [excludedItems, setExcludedItems] = useState(props.storedExcludeTags); // State hook for excluded items
  
  // Function to handle inclusion of tags
  function includeCheckboxHandler(event) {
    let isSelected = event.target.checked;
    let value = event.target.value;

    if (isSelected) {
      setIncludedItems([...includedItems, value]); // If checked, add to included items
      console.log(value + " isChecked");
    } else {
      console.log(value + " isUnChecked");
      setIncludedItems((prevData) => { // If unchecked, remove from included items
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  }

  // Function to handle exclusion of tags
  function excludeCheckboxHandler(event) {
    let isSelected = event.target.checked;
    let value = event.target.value;

    if (isSelected) {
      setExcludedItems([...excludedItems, value]); // If checked, add to excluded items
      console.log(value + " isChecked");
    } else {
      console.log(value + " isUnChecked");
      setExcludedItems((prevData) => { // If unchecked, remove from excluded items
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen"> {/* Main container */}
      <h1 className="font-bold m-1">FOOD PREFERENCE</h1> {/* Heading for food preference */}
      <ul> {/* List of included tag switches */}
        {includeTags.map((ingredient, index) => ( // Mapping through includeTags array
          <li key={index}> {/* Each tag */}
            <div className="inline-block w-32 mr-4 m-2"> {/* Tag container */}
              <div className="flex justify-start">{ingredient}</div> {/* Tag name */}
            </div>
            <div className="inline-block w-32 mr-4"> {/* Checkbox container */}
              <div className="flex items-end justify-end"> {/* Checkbox position */}
                <label className="relative inline-flex cursor-pointer"> {/* Checkbox label */}
                  <input
                    type="checkbox"
                    checked = {includedItems.includes(ingredient)}
                    value={ingredient}
                    onChange={(event) => includeCheckboxHandler(event)} // On change event for inclusion
                    className="peer sr-only"
                  />
                  <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div> {/* Styling for checkbox */}
                </label>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h1 className="font-bold m-1">ALLERGIES</h1> {/* Heading for allergies */}
      <ul> {/* List of exclude tag switches */}
        {excludeTags.map((ingredient, index) => ( // Mapping through excludeTags array
          <li key={index}> {/* Each tag */}
            <div className="inline-block w-32 mr-4 m-2"> {/* Tag container */}
              <div className="flex justify-start">{ingredient}</div> {/* Tag name */}
            </div>
            <div className="inline-block w-32 mr-4"> {/* Checkbox container */}
              <div className="flex items-end justify-end"> {/* Checkbox position */}
                <label className="relative inline-flex cursor-pointer"> {/* Checkbox label */}
                  <input
                    type="checkbox"
                    checked = {excludedItems.includes(ingredient)}
                    value={ingredient}
                    onChange={(event) => excludeCheckboxHandler(event)} // On change event for exclusion
                    className="peer sr-only"
                  />
                  <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div> {/* Styling for checkbox */}
                </label>
              </div>
            </div>
          </li>
        ))}
      </ul>

      
      <div className="flex">
        {/* Button to apply filters */}
        <button onClick={() => props.cancel()} className="hover:scale-110 shadow-md m-7 bg-gray-150 rounded-full w-20 h-20 flex items-center justify-center focus:outline-none">
          <img src={close} alt="Image" className="w-10 h-10 rounded-full" />
        </button>
        {/* Button to cancel */}
        <button onClick={() => props.applyFilter(includedItems, excludedItems)} className="hover:scale-110 shadow-md m-7 bg-green-500 rounded-full w-20 h-20 flex items-center justify-center focus:outline-none">
          <img src={done} alt="Image" className="w-10 h-10 rounded-full" />
        </button>
      </div>

      {/* Displaying included and excluded tags for debugging */}
      <span>Include tags: {includedItems}</span>
      <span>Exclude tags: {excludedItems}</span>
    </div>
  );
};

export default FilterPageView; // Exporting the component
