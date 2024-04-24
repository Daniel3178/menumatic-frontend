import React from "react";
import "./RecepiesForAWeekViewCSS.css";
import { useNavigate } from "react-router-dom";
import DishListComponent from "./dishListComponent";
const RecommendationPageView = (props) => {
  const navBar = () => {
    return (
      <div className=" flex pb-4 ">
        <button
          className="border w-40 h-10 text-[18px] mx-4 bg-slate-500"
          onClick={() => props.setSelectTab("Popular")}
        >
          Popular
        </button>
        <button
          className="border w-40 h-10 text-[18px] mx-4 bg-slate-500"
          onClick={() => props.setSelectTab("Quick")}
        >
          Quick
        </button>
        <button
          className="border w-40 h-10 text-[18px] mx-4 bg-slate-500"
          onClick={() => props.setSelectTab("Affordable")}
        >
          Affordable
        </button>
      </div>
    );
  };

  switch (props.selectedTab) {
    case "Popular": {
      return (
        <div>
          <div className="flex">
            {navBar()}
            <h1 className="py-2 bg-green-400 h-10 w-40 text-center">Popular</h1>
          </div>
          <DishListComponent
            listOfMeals={props.popularDishes}
            updateCount={props.updateCount}
            goToShoplist={props.goToShoplist}
          />
        </div>
      );
    }
    case "Quick": {
      return (
        <div>
          <div className="flex">
            {navBar()}
            <h1 className="py-2 bg-green-400 h-10 w-40 text-center">Quick</h1>
          </div>
          <DishListComponent
            listOfMeals={props.quickDishes}
            updateCount={props.updateCount}
            goToShoplist={props.goToShoplist}

          />
        </div>
      );
    }
    case "Affordable": {
      return (
        <div>
          <div className="flex">
            {navBar()}
            <h1 className="py-2 bg-green-400 h-10 w-40 text-center">
              Affordable
            </h1>
          </div>
          <DishListComponent
            listOfMeals={props.affordableDishes}
            updateCount={props.updateCount}
            goToShoplist={props.goToShoplist}

          />
        </div>
      );
    }
  }
};

export default RecommendationPageView;
