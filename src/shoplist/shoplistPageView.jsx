import React from 'react';

const ShoplistPageView = ({ allItems }) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Shopping List</h2>
      <ul>
        {allItems.map((item, index) => (
          <li key={index} className="mb-2">
            <span className="mr-2">{item.amount} {item.unit}</span> - {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoplistPageView;
