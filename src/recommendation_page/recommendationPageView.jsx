import React from "react";
import "./RecepiesForAWeekViewCSS.css";
import { useNavigate } from "react-router-dom";
import DishListComponent from "./dishListComponent";
import { logo } from "../assets";

const RecommendationPageView = (props) => {


  // Individual button for navbar
  const NavButton = ({ selectedTab, tabName, onClick }) => (

    <button
      className={`
    mr-1 p-1 h-10 lg:h-16 w-20 lg:w-32  rounded-large bg-cerulean text-sm lg:text-lg font-outfit text-whiteSmoke shadow-xl hover:shadow-mid
    transition-all duration-500
    ${selectedTab === tabName ? "bg-yellowGreen" : ""} 
  `}
      onClick={() => onClick(tabName)}
    >
      {tabName.toUpperCase()}
    </button>
  );

  // navigation bar with buttons for each recommendation category
  const navBar = () => {
    return (
      <div className="pb-4 items-center w-full">
        <NavButton
          selectedTab={props.selectedTab}
          tabName="Popular"
          onClick={props.setSelectTab}
        />
        <NavButton
          selectedTab={props.selectedTab}
          tabName="Quick"
          onClick={props.setSelectTab}
        />
        <NavButton
          selectedTab={props.selectedTab}
          tabName="Cheap"
          onClick={props.setSelectTab}
        />
      </div>
    );
  };

  const renderRecommendationTable = (listOfMeals) => (
    <div className="h-screen w-screen top-0 right-0 bottom-0 left-0">
        <div className="justify-center items-center pl-10">
          {navBar()}
        </div>
        <div className="w-screen justify-center items-center pl-10 pr-10 lg:pr-80">
          <DishListComponent
            listOfMeals={listOfMeals}
            updateCount={props.updateCount}
            goToShoplist={props.goToShoplist}
            selectedTab={props.selectedTab}
          />
        </div>
    </div>
  );

  // Switch statement to determine which recommendation table to render based on selected tab
  switch (props.selectedTab) {
    case "Popular": {
      // console.log("Popular dishes", props.selectedTab)
      return renderRecommendationTable(props.popularDishes);
    }
    case "Quick": {
      // console.log("Quick dishes", props.selectedTab)
      return renderRecommendationTable(props.quickDishes);
    }
    case "Cheap": {
      // console.log("Affordable dishes", props.selectedTab)
      return renderRecommendationTable(props.affordableDishes);
    }
  }

};

export default RecommendationPageView;
