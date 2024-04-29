import React from 'react';
import { clock, thumbs_up, thumbs_down, info, close, info_i, tune, dislike_btn, like_btn, logo, clock_icon, noimage } from "../assets";

const ingredientsList = (items) => {
  return (
    <div className="ml-8 mr-4">
      <ul className="space-y-1 list-disc">
        {items.map((item, index) => (
          <li key={index} className="font-outfit text-gunmetal">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

const HomePageView = (props) => {

  // TODO: Change apiResults[0] to apiResults.recipes[0] accross the file to work with the API
  //conditionalRender either renders the info view for the current dish, or the photo for the current dish.
  const conditionalRender = () => {


    //if info has been toggled the infopage is shown.

    if (props.info) {
      return (
        <div className="flex justify-center">
          <div className="bg-vanilla w-405 h-540 rounded-large relative shadow-xl">

            <div className='p-2'>
              <p className="text-gunmetal font-outfit text-2xl font-medium">{props.apiResults[0].title}</p>
            </div>

            <div className="overflow-y-auto h-400">
              {ingredientsList(props.apiResults[0].extendedIngredients)}
            </div>
            
            <div className="flex absolute bottom-0 w-405 justify-end mb-4">
                <button onClick={props.toggleInfoView} className="tracking-wider mr-2 flex justify-center items-center rounded-full bg-whiteSmoke text-gunmetal font-outfit text-bold hover:shadow-mid foucs:shadow-in w-32 h-12">
                  VIEW LESS
                </button>
            </div>
          </div>
        </div>
      );
    }
    //if result from api exists render image. This code can only be reached if previous if statement is not true
    if (props.apiResults) {
      //console.log(props.apiResults)
      return (
        <div className="flex justify-center">
          <div className="w-405 h-540 rounded-large relative shadow-xl">
            <img src={"https://img.spoonacular.com/recipes/" + props.apiResults[0].id + "-636x393." + props.apiResults[0].imageType} className="object-cover w-full h-full rounded-large"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = noimage;
              }} />
            <div className="absolute inset-x-0 bottom-0 bg-cerulean bg-opacity-50 backdrop-blur-sm rounded-b-large w-405 h-130">
              <div className='mt-2 ml-2'>
                <p className="text-whiteSmoke font-outfit text-2xl font-medium">{props.apiResults[0].title}</p>
              </div>
              <div className='mb-4 absolute inset-x-0 bottom-0 flex space-x-4 items-center justify-between'>
                <div className='flex space-x-4 items-center'>
                  <div className='mt-2 ml-2 flex text-whiteSmoke'>
                    <img src={clock_icon} className="" />
                  </div>
                  <div className='text-whiteSmoke font-outfit text-2xl font-thin'>
                    {props.apiResults[0].readyInMinutes} min
                  </div>
                </div>
                <div className='items-center flex justify-end'>
                  <button onClick={props.toggleInfoView} className="tracking-wider mr-2 flex justify-center items-center rounded-full bg-whiteSmoke text-gunmetal font-outfit text-bold hover:shadow-mid foucs:shadow-in w-32 h-12">
                    VIEW MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const menuRender = () => {
    return(
      <div className="fixed top-0 right-0 h-screen w-72 bg-cerulean">
        <div className="flex justify-center mt-6">
          <button className="tracking-wider mr-2 flex justify-center rounded-full bg-whiteSmoke text-bold hover:shadow-mid foucs:shadow-in w-36 h-14">
            <div className="place-content-center text-gunmetal text-lg font-outfit">
              LOG IN
            </div>
          </button>
        </div>
        <div className="ml-6 tracking-wider text-whiteSmoke text-xl font-outfit text-semiBold">
          <div>
            <button className="mt-10 hover:underline ">
              Latest meal plan
            </button>
          </div>
          <div>
            <button onClick={props.navigateToPlanList} className="mt-10 hover:underline">
              Saved meal plans
            </button>
          </div>
          <div>
            <button className="mt-10 hover:underline ">
              Filters
            </button>
          </div>
          <div>
            <button className="mt-10 hover:underline">
              Account settings
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderHomePage = () => {
    if (props.apiResultsState === "ready") {
      return (
        <div className="bg-page min-h-screen w-full fixed top-0 right-0 bottom-0 left-0">
          {menuRender()}
          <div className="flex justify-center w-444 h-102 mt-8 mb-16">
            <img src={logo} />
          </div>
          {conditionalRender()}
          <div className="flex space-x-20 justify-center mt-8">
            <button onClick={props.getRandomReceipt} className="flex rounded-full shadow-xl hover:shadow-mid foucs:shadow-in">
              <img src={dislike_btn} />
            </button>
            <button onClick={props.sendLike} className="flex rounded-full shadow-xl hover:shadow-mid foucs:shadow-in">
              <img src={like_btn} />
            </button>
          </div>
        </div>
      )
    }
    else if (props.apiResultsState === "loading") {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
        </div>
      )
    }
    else {
      return (
        <div>Not ready</div>
      )
    }
  }

  return (
    <div>
      {renderHomePage()}
    </div>
  );
};

export default HomePageView;
