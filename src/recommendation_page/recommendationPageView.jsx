import React from "react";
import DishListComponent from "./dishListComponent";
import { logo } from "../assets";

const RecommendationPageView = (props) => {
  // Individual button for navbar
  const NavButton = ({ selectedTab, tabName, onClick }) => (
    <button
      className={`
    mr-1 p-1 h-10 lg:h-16 w-20 lg:w-32 rounded-large bg-cerulean text-sm lg:text-lg font-outfit text-whiteSmoke shadow-xl hover:shadow-mid
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
          selectedTab={props.currentTabName}
          tabName="Popular"
          onClick={props.setSelectTab}
        />
        <NavButton
          selectedTab={props.currentTabName}
          tabName="Quick"
          onClick={props.setSelectTab}
        />
        <NavButton
          selectedTab={props.currentTabName}
          tabName="Cheap"
          onClick={props.setSelectTab}
        />
      </div>
    );
  };

  const renderRecommendationTable = (listOfMeals) => (
    <div className="pt-32 flex justify-center h-screen w-screen top-0 right-0 bottom-0 left-0">
      <div>
        <div className="items-center pl-4">{navBar()}</div>
        <div className="w-screen max-w-[1440px] pl-4 lg:pl-8 pr-4 lg:pr-80">
          <DishListComponent
            listOfMeals={listOfMeals}
            updateCount={props.updateCount}
            goToShoplist={props.goToShoplist}
            selectedTab={props.currentTabName}
          />
        </div>
      </div>
    </div>
  );

  return renderRecommendationTable(props.currentDishes);
};

export default RecommendationPageView;
