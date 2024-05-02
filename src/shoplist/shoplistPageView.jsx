import { useState } from "react";
import { generateShoppingListPDFLink } from "../pdf/pdfgen_component";
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
            <div className="text-[12px] font-normal text-cerulean">shopping list name</div>
            <input
              className="h-8  border-b-[2px] border-yellowGreen text-gunmetal font-semibold outline-none"
              type="text"
              id="nameInput"
              value={nameInput}
              onChange={handleNameInputChange}
            />
          </div>
          <button
            className="mr-2 p-1 w-40 h-12 rounded-[100px] text-lg bg-yellowGreen transition-all duration-500 ease-in-out hover:shadow-mid text-whiteSmoke font-medium"
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
        <div className="ml-2 text-base font-normal text-cerulean">Log in to save the meal plan in Menumatic, or export as PDF.</div>
        <button
          className="mr-2 p-1 w-40 h-12 rounded-[100px] text-lg bg-cerulean transition-all duration-500 ease-in-out hover:shadow-mid text-whiteSmoke font-medium"
          id="save"
          // onClick={() => setShowOverlay(true)}
        >
          EXPORT  PDF
        </button>
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
            //onClick={generateShoppingListPDFLink(parseToStringArray())}
            >
              Export PDF
            </button>
          </div>
        </div>
      );
    }
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

  const showIngredientsRemove = (ing) => {
    if (ing.ingredients.length > 0) {
      return ing.ingredients.map((ingr, index) => (
        <div
          key={index}
          className="flex mb-2 flex-row items-center justify-between "
        >
          <button
            onClick={() => props.removeItem(ingr)}
            className=" border-2 border-black-300 h-6 w-6 rounded-[100px] font-bold text-whiteSmoke transition-all duration-700 ease-in-out hover:bg-yellowGreen"
          >
          </button>
          <div className="">
            {ingr.measures.map((measure, index) => {
              return (
                <div className="flex pr-[40px] justify-end">
                  <div className="w-20">{parseFloat(measure.amount.toFixed(2))}</div>
                  <div className="w-10">{measure.unit}</div>
                </div>
              );
            })}
          </div>
          <div className=" w-[30%] self-end text-start pl-[40px]">{ingr.name}</div>
        </div>
      ));
    } else if (ing.ingredients.length === 0) {
      return <div></div>;
    }
  };

  const showIngredientsRestore = (ing) => {
    if (ing.ingredients.length > 0) {
      return ing.ingredients.map((ingr, index) => (
        <div
          key={index}
          className="flex mb-2 flex-row items-center justify-between text-gray-500"
        >
          <button
            onClick={() => props.restoreItem(ingr)}
            className=" border-2 border-yellowGreen bg-yellowGreen h-6 w-6 rounded-[100px] font-bold transition-all duration-700 ease-in-out hover:bg-white"
          >

          </button>
          <div className="">
            {ingr.measures.map((measure, index) => {
              return (
                <div className="flex pr-[40px] justify-end ">
                  <div className="w-20">{parseFloat(measure.amount.toFixed(2))}</div>
                  <div className="w-10">{measure.unit}</div>
                </div>
              );
            })}
          </div>
          <div className=" w-[30%] self-end text-start pl-[40px]">{ingr.name}</div>
        </div>
      ));
    } else if (ing.ingredients.length === 0) {
      return <div></div>;
    }
  };

  const renderIngredients = (list, shoIngr) => {
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
      <div key={index} className="flex flex-col border-b pb-2 w-[640px]">
        {conditionRender(ingredientData)}
        {shoIngr(ingredientData)}
      </div>
    ));
  };

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
            <div className=" " >

            </div>
            <div
              className=" flex flex-row justify-between font-bold fon items-center w-[100%] "

            >

              {renderSaveButton()}
              {/* {pdfButtonCom()} */}
            </div>
            {/* <button onClick={()=>{
              setViewPdf(true)
            
            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download PDF</button>
             */}
          </div>
          {renderIngredients(props.allItems, showIngredientsRemove)}
          <h1>REMOVED ITEMS</h1>
          {renderIngredients(props.removedItems, showIngredientsRestore)}
        </div>
      );
    } else {
      return (
        <p className="text-gray-700 text-center">No shopping list available.</p>
      );
    }
  }

  return (
    <div className="container mx-auto p-4 font-outfit">
      <div className="flex justify-center w-444 h-102 mt-8 mb-16">
          <img src={logo} />
        </div>
      <h1 className="text-xxl text-gunmetal font-bold text-center mb-4">SHOPPING LIST</h1>
      {renderTheIngredientList()}
      {overlay()}
    </div>
  );
};

export default ShoplistPageView;
