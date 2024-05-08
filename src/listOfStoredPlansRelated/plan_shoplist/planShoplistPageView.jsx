import React from "react";
import { generateShoplist } from "../../shoplist/shoplistSlice";
import { generateShoppingListPDFLink } from "../../pdf/CreateShoplistPDF";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Represents the view component of the shopping list page.
 * @param {Object} props - Component props
 * @param {Array} props.allItems - Array of shopping list items
 */

const PlanShoplistPageView = (props) => {
  const parseToStringArray = () => {
    // console.log("[STATE1]")
    // console.log("[FINAL]");
    const resultArray = [];
    props.allItems.forEach((ingredient) => {
      resultArray.push(
        `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`
      );
    });
    return resultArray;
  };

  // const handleGeneratePDF = () => {
  //   console.log("PDF")
  //   const inpuArray = parseToStringArray();

  //   const test = generateShoppingListPDFLink(inpuArray)
  //   console.log(test)
  // }

const navigate = useNavigate();

  /**
   * Generates a button component for PDF download
   */
  const pdfButtonCom = () => {
    return (
      <div className="bg-blue-500 w-[150px] h-[50px] mt-4 mb-6 justify-center items-center  flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {
        generateShoppingListPDFLink(parseToStringArray())
        }
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
      // console.log("[STATE1]");

      // console.log(props);
      return (
        <div className="w-full">
          <div className="flex items-center  justify-between border-b pb-2">
            <div className="flex justify-between " style={{ width: "50%" }}>
              <button onClick={()=> {
                navigate("/");
                window.location.reload();
            }} className="bg-green-500 hover:bg-green-700 text-white  font-bold py-2 h-[50px] px-4 rounded">Back to Home</button>
              <h1 className=" text-[21px] font-bold pt-2 pr-[40px]">
                Amount
              </h1>
            </div>
            <div
              className=" flex flex-row justify-between font-bold fon items-center "
              style={{ width: "50%" }}
            >
              <h1 className="  text-[21px]  text-bold pl-[40px]">Ingredient</h1>
              {pdfButtonCom()}
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

  if(props.state === "ready"){

    return (
      <div className="pt-32 container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Shopping List</h1>
      {renderTheIngredientList()}

      {/* {console.log("[STATE2]")} */}
    </div>
  );
}
else if(props.state === "loading"){
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Loading...</h1>
    </div>
  );
}
};
export default PlanShoplistPageView;
