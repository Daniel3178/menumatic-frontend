import React from "react";
import "./RecepiesForAWeekViewCSS.css";
import { useNavigate } from "react-router-dom";
import DishListComponent from "./dishListComponent";

const RecommendationPageView = (props) => {
  const navBar = () => {
    return (
      <div className="flex pb-4 justify-center items-center">
        <button
          className={`m-1 p-1 w-40 h-12 border border-green-500 rounded-md bg-green-500 text-white font-semibold ${
            props.selectedTab === "Popular" ? "bg-green-500 h-14 font-bold" : "bg-slate-500"
          }`}
          onClick={() => props.setSelectTab("Popular")}
        >
          Popular
        </button>
        <button
          className={`m-1 p-1 w-40 h-12 border border-green-500 rounded-md bg-green-500 text-white font-semibold ${
            props.selectedTab === "Quick" ? "bg-green-500 h-14 font-bold" : "bg-slate-500"
          }`}
          onClick={() => props.setSelectTab("Quick")}
        >
          Quick
        </button>
        <button
          className={`m-1 p-1 w-40 h-12 border border-green-500 rounded-md bg-green-500 text-white font-semibold ${
            props.selectedTab === "Affordable" ? "bg-green-500 h-14 font-bold" : "bg-slate-500"
          }`}
          onClick={() => props.setSelectTab("Affordable")}
        >
          Affordable
        </button>
      </div>
    );
  };

  switch (props.selectedTab) {
    case "Popular": {
      // console.log("Popular dishes", props.selectedTab)
      return (
        <div>
          <div className="flex justify-center items-center">
            {navBar()}
          </div>
          <DishListComponent
            listOfMeals={props.popularDishes}
            updateCount={props.updateCount}
            goToShoplist={props.goToShoplist}
            selectedTab={props.selectedTab}
          />
        </div>
      );
    }
    case "Quick": {
      // console.log("Quick dishes", props.selectedTab)

      return (
        <div>
          <div className="flex justify-center items-center">
            {navBar()}
          </div>
          <DishListComponent
            listOfMeals={props.quickDishes}
            updateCount={props.updateCount}
            goToShoplist={props.goToShoplist}
            selectedTab={props.selectedTab}
          />
        </div>
      );
    }
    case "Affordable": {
      // console.log("Affordable dishes", props.selectedTab)

      return (
        <div>
          <div className="flex justify-center items-center">
            {navBar()}
          </div>
          <DishListComponent
            listOfMeals={props.affordableDishes}
            updateCount={props.updateCount}
            goToShoplist={props.goToShoplist}
            selectedTab={props.selectedTab}
          />
        </div>
      );
    }
  }
};

export default RecommendationPageView;
