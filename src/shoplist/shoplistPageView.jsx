import React from 'react';

const ShoplistPageView = ({ allItems }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Inköpslista</h1>
      <div className="bg-white shadow-md rounded-lg py-4 px-6">
        {allItems.length > 0 ? (
          <ul className="space-y-2">
            {allItems.map((ingredient, index) => (
              <li key={index} className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-500">{`${ingredient.amount} ${ingredient.unit}`}</span>
                <span className="text-lg text-gray-700">{ingredient.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 text-center">Ingen inköpslista tillgänglig.</p>
        )}
      </div>
    </div>
  );
};

export default ShoplistPageView;
