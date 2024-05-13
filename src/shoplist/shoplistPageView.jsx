import { useState } from "react";
import { generateShoppingListPDFLink } from "../pdf/CreateShoplistPDF";
import { logo } from "../assets";

/**
 * Represents the view component of the shopping list page.
 * @param {Object} props - Component props
 * @param {Array} props.allItems - Array of shopping list items
 */

const ShoplistPageView = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [nameInput, setNameInput] = useState(Date().substring(0, 24));

  const handleNameInputChange = (event) => {
    setNameInput(event.target.value);
  };

  const PDFDownloadButton = () => {
    return (
      <div className="mr-2 p-3 w-40 uppercase text-nowrap h-12 rounded-[100px] text-[1rem] text-center bg-cerulean transition-all duration-500 ease-in-out hover:shadow-mid text-whiteSmoke font-medium">
        {generateShoppingListPDFLink(props.allItems)}
      </div>
    );
  };

  /**
   * Renders a save button.
   * If the user is logged in the button sends the meal plan to the server to be stored, it also render an input box for assigning a name to the plan.
   * If the user is not logged in it opens a pop-up window with login/export pdf.
   */
  const renderSaveButton = () => {
    if (props.isLoggedIn) {
      return (
        <div className="flex justify-between  w-full">
          <div className="ml-2 flex-col justify-between w-full">
            <div className="text-[12px] font-normal text-cerulean">
              shopping list name
            </div>
            <input
              className="h-8  border-b-[2px] border-yellowGreen text-gunmetal font-semibold outline-none max-w-[70%] bg-whiteSmoke"
              type="text"
              id="nameInput"
              value={nameInput}
              onChange={handleNameInputChange}
            />
          </div>
          <button
            className="mr-2 p-3 w-40 h-12 rounded-[100px] text-[1rem] bg-yellowGreen transition-all duration-500 ease-in-out hover:shadow-mid text-whiteSmoke font-medium"
            id="save"
            onClick={() => props.saveMealPlan(nameInput)}
          >
            SAVE
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex justify-between items-center w-full">
          <div className="ml-2 text-base font-normal text-cerulean">
            Log in to save the meal plan in Menumatic, or download as PDF.
          </div>
          {PDFDownloadButton()}
        </div>
      );
    }
  };

  /**
   * Renders a pop-up window with login/export pdf, if a non logged in user presses "save".
   */
  const overlay = () => {
    if (showOverlay) {
      return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-center text-gray-800">
              Log in to save meal plan in the app or export as PDF.
            </p>

            <button
              className="m-1 p-1 w-40 h-12 border border-green-500 rounded-md bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              id="signIn"
              onClick={props.navigateToLogin}
            >
              Log in
            </button>

            <button
              className="m-1 p-1 w-40 h-12 border border-gray-500 rounded-md bg-gray-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              id="exportPDF"
              type="exportPDF"
              onClick={function () {
                generateShoppingListPDFLink(
                  transformallItemsIntoStringArray(props.allItems)
                );
              }}
            >
              Export PDF
            </button>
          </div>
        </div>
      );
    }
  };

  const showRemovableIngredients = (ing) => {
    if (ing.ingredients.length > 0) {
      return ing.ingredients.map((ingr, index) => (
        <div
          key={`shop${index}`}
          className="flex w-full mb-2 flex-row items-center justify-between "
        >
          <button
            onClick={() => props.removeItem(ingr)}
            className=" peer border-2 border-black-300 h-6 aspect-square rounded-[100px] font-bold text-whiteSmoke transition-all duration-700 ease-in-out hover:bg-yellowGreen"
          ></button>
          <div className="flex w-full   flex-row peer-hover:line-through">
            {ingr.measures.map((measure, index) => {
              return (
                <div className="flex  w-full  " key={`shoplis${index}`}>
                  <div className="w-[50%] self-start text-center">
                    {measure.amount > 10
                      ? Math.round(measure.amount)
                      : parseFloat(measure.amount.toFixed(2))}
                  </div>
                  <div className="w-[50%] self-end pl-1">{measure.unit}</div>
                </div>
              );
            })}
          </div>
          <div className="peer-hover:line-through w-[65%] max-w-[180px] self-end text-start  ">
            {ingr.name}
          </div>
        </div>
      ));
    } else if (ing.ingredients.length === 0) {
      return <> </>;
    }
  };

  const showRestorableIngredients = (ing) => {
    if (ing.ingredients.length > 0) {
      return ing.ingredients.map((ingr, index) => (
        <div
          key={`ingr${index}`}
          className="flex w-full items-center justify-between flex-row text-gray-500"
        >
          <button
            onClick={() => props.restoreItem(ingr)}
            className=" border-2 border-yellowGreen bg-yellowGreen h-6 aspect-square rounded-[100px] font-bold transition-all duration-700 ease-in-out hover:bg-white"
          ></button>

          {ingr.measures.map((measure, index) => {
            return (
              <div
                className="flex w-full   flex-row "
                key={`ingredient${index}`}
              >
                <div className="w-[50%]  self-start text-center">
                  {measure.amount > 10
                    ? Math.round(measure.amount)
                    : parseFloat(measure.amount.toFixed(2))}
                </div>
                <div className="w-[50%] self-end pl-1">{measure.unit}</div>
              </div>
            );
          })}

          <div className=" w-[65%] max-w-[180px] self-end text-start ">
            {ingr.name}
          </div>
        </div>
      ));
    } else if (ing.ingredients.length === 0) {
      return <></>;
    }
  };

  const renderIngredients = (list, showIngredientFunction) => {
    const conditionRender = (ingr) => {
      if (ingr.ingredients.length > 0) {
        return (
          <div>
            <h1 className="h-3"></h1>
          </div>
        );
      } else {
        return <div></div>;
      }
    };

    return list.map((ingredientData, index) => (
      <div key={index} className="flex flex-col border-b pb-2 w-[100%]">
        {conditionRender(ingredientData)}
        {/* {console.log(ingredientData)} */}
        {showIngredientFunction(ingredientData)}
      </div>
    ));
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
          <div className="flex items-center w-full justify-between border-b pb-2">
            <div className=" flex flex-row justify-between font-bold fon items-center w-full ">
              {renderSaveButton()}
              {/* {pdfButtonCom()} */}
            </div>
            {/* <button onClick={()=>{
              setViewPdf(true)
            
            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download PDF</button>
             */}
          </div>
          {renderIngredients(props.allItems, showRemovableIngredients)}
          <h1>REMOVED ITEMS</h1>
          {renderIngredients(props.removedItems, showRestorableIngredients)}
        </div>
      );
    } else if (props.bulkSearchApiState === "failed") {
      return (
      <p className="text-gray-700 text-center">Service is not available at the moment. Please try again later.</p>
      )
    } else {
      return (
        <p className="text-gray-700 text-center">No shopping list available.</p>
      );
    }
  }

  return (
    <div className="pt-32 p-4 font-outfit w-screen max-w-[1080px] min-w-[350px] lg:pl-8  lg:pr-80 ">
      <h1 className="text-xxl text-gunmetal font-bold text-center mb-4">
        SHOPPING LIST
      </h1>
      {renderTheIngredientList()}
      {/* {overlay()} */}
    </div>
  );
};

export default ShoplistPageView;
