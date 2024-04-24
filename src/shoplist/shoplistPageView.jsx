import { useState }  from "react";
import { generateShoppingListPDFLink } from "../pdf/pdfgen_component";

/**
 * Represents the view component of the shopping list page.
 * @param {Object} props - Component props
 * @param {Array} props.allItems - Array of shopping list items
 */



const ShoplistPageView = (props) => {

  const [showOverlay, setShowOverlay] = useState(false);

  const Overlay = () => {

    if(showOverlay){
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-6 rounded-lg">
          <p className="text-center text-gray-800">Sign in to save meal plan in the app or export as PDF.</p>
  
          <button
            className="m-1 p-1 w-40 h-12 border border-green-500 rounded-md bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            id="save"
            onClick={props.saveMealPlan}
          >
            Save
          </button>
  
          <button
            className="m-1 p-1 w-40 h-12 border border-gray-500 rounded-md bg-gray-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            id="signup"
            type="exportPDF"
          //onClick={generateShoppingListPDFLink(parseToStringArray())}
          >
            Export PDF
          </button>
  
        </div>
      </div>
    );}
  };

  const parseToStringArray = () => {
    const resultArray = [];
    props.allItems.forEach((ingredient) => {
      resultArray.push(
        `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`
      );
    });
    return resultArray;
  };

  
  const renderFirstSaveButton = () => {
    
    if (props.isLoggedIn) {
      return(
      <button
        className="m-1 p-1 w-40 h-12 border border-green-500 rounded-md bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        id="save"
        onClick={props.saveMealPlan}
      > 
        Save!
      </button>)
    }else{
      return(
        <button
          className="m-1 p-1 w-40 h-12 border border-green-500 rounded-md bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          id="save"
          onClick={() => setShowOverlay(true)}
        >
          Save?
        </button>)
    }
  }


  /**
   * Generates a button component for PDF download
   */
  const pdfButtonCom = () => {
    return (
      <div className="bg-blue-500 w-[150px] h-[50px] mt-4 mb-6 justify-center items-center  flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {generateShoppingListPDFLink(parseToStringArray())}
      </div>
    );
  };

  /**
   * Renders a list of ingredients as part of the shopping list. If there are items
   * in the allItems prop, it displays each ingredient with its amount and unit, along with a
   * header for 'Amount' and 'Ingredient'. It also includes a button for PDF generation
   * via the pdfButtonCom function. If allItems is empty, it shows a message indicating
   * that no shopping list is available.
   *
   * @function
   * @returns {JSX.Element} A JSX element representing the list of ingredients and their
   * amounts or a message if no items are present.
   */

  function renderTheIngredientList() {
    if (props.allItems.length > 0) {
      return (
        <div className="w-full">
          <div className="flex items-center  justify-between border-b pb-2">
            <div className=" " style={{ width: "50%" }}>
              <h1 className="  text-[21px] font-bold text-end pr-[40px]">
                Amount
              </h1>
            </div>
            <div
              className=" flex flex-row justify-between font-bold fon items-center "
              style={{ width: "50%" }}
            >
              <h1 className="  text-[21px] text-bold pl-[40px]">Ingredient</h1>
              {renderFirstSaveButton()}
              {/* {pdfButtonCom()} */}
            </div>
            {/* <button onClick={()=>{
              setViewPdf(true)
            
            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download PDF</button>
             */}
          </div>
          {props.allItems.map((ingredientData, index) => (
            <div key={index} className="flex border-b pb-2">
              <div
                className="self-start text-end pr-[40px] "
                style={{ width: "50%" }}
              >{`${ingredientData.amount} ${ingredientData.unit}`}</div>
              <div
                className="self-end text-start pl-[40px]"
                style={{ width: "50%" }}
              >
                {ingredientData.name}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <p className="text-gray-700 text-center">No shopping list available.</p>
      );
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Shopping List</h1>
      {renderTheIngredientList()}
      {Overlay()}
    </div>
  );
};

export default ShoplistPageView;
