import React from 'react';

const HomePageView = (props) => {
  console.log(props.apiResults);

  const conditialRender = () => {
    if (props.apiResults) {
      return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{props.apiResults.recipes[0].title}</h1>
          <img src={props.apiResults.recipes[0].image} alt="food" className="rounded-lg" />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {conditialRender()}
      <div className="mb-8">
        <button onClick={props.getRandomReceipt} className="m- bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">
          Dislike
        </button>
        <button onClick={props.sendLike} className="m-5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Like
        </button>
      </div>
    </div>
  );
};

export default HomePageView;
