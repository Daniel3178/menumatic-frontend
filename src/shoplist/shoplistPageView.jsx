import React from 'react';

function renderTheIngredientList(allItems) {
  if (allItems.length > 0) {
    return (
      <div className="w-full">
        <div className="flex justify-between border-b pb-2">
          <div style={{ width: "50%" }}>Amount</div>
          <div style={{ width: "50%" }}>Ingredient</div>
        </div>
        {allItems.map((ingredientData, index) => (
          <div key={index} className="flex justify-between items-center border-b pb-2">
            <div style={{ width: "50%" }}>{`${ingredientData.amount} ${ingredientData.unit}`}</div>
            <div style={{ width: "50%" }}>{ingredientData.name}</div>
          </div>
        ))}
      </div>
    );
  } else {
    return (<p className="text-gray-700 text-center">No shopping list available.</p>);
  }
}


const ShoplistPageView = ({ allItems }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Shopping List</h1>
      {
        renderTheIngredientList(allItems)
      }
      
    </div>
  );
};

export default ShoplistPageView;
