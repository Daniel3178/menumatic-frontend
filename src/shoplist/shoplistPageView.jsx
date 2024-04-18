import React from 'react';

const dummyValues = [
  {amount:69, unit:"Lulz", name:"Bobama sauce"},
  {amount:69, unit:"Lulz", name:"Bobama sauce"},
  {amount:69, unit:"Lulz", name:"Bobama sauce"},
]

function renderTheIngredientList(allItems){
  if(allItems.length > 0){
    return(
      <table style={{ width: "100%" }}>
      <tr>
        <th style={{ width: "50%" }}>Amount</th>
        <th style={{ width: "50%" }}>Ingredient</th>
      </tr> 
      {
        allItems.map((ingredientData, index) => (
          <tr key={index} className="flex justify-between items-center border-b pb-2">
            <td>{`${ingredientData.amount} ${ingredientData.unit}`}</td>
            <td>{ingredientData.name}</td>
          </tr>
        )) 
      }
      </table>
    )
    /* Alternative solution to statement above:
      <ul className="space-y-2">
        {allItems.map((ingredient, index) => (
          <li key={index} className="flex justify-between items-center border-b pb-2">
            <span className="text-sm text-gray-500">{`${ingredient.amount} ${ingredient.unit}`}</span>
            <span className="text-lg text-gray-700">{ingredient.name}</span>
          </li>
        ))}
      </ul>
    */
  }
  else{
    return (<p className="text-gray-700 text-center">Ingen inköpslista tillgänglig.</p>)
  }
}

const ShoplistPageView = ({ allItems }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Inköpslista</h1>
      {
        renderTheIngredientList(allItems)
      }
    </div>
  );
};

export default ShoplistPageView;
