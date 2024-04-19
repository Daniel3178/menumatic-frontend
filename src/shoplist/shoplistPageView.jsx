import React from "react";
import { generateShoplist } from "./shoplistSlice";
import { generateShoppingListPDFLink } from "../pdf/pdfgen_component";
import { useState } from "react";
const ShoplistPageView = (props) => {
  const parseToStringArray = () => {
    // console.log("[STATE1]")
    console.log("[FINAL]");
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

  const [viewPdf, setViewPdf] = useState(false);

  const pdfButtonCom = () => {
    return (
      <div className="bg-blue-500 w-[150px] h-[50px] mt-4 mb-6 justify-center items-center  flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {generateShoppingListPDFLink(parseToStringArray())}
      </div>
    );
  };

  function renderTheIngredientList() {
    if (props.allItems.length > 0) {
      console.log("[STATE1]");

      console.log(props);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Shopping List</h1>
      {viewPdf ? pdfButtonCom() : null}
      {renderTheIngredientList()}

      {console.log("[STATE2]")}
    </div>
  );
};

export default ShoplistPageView;
