import React from "react";
import "./RecepiesForAWeekViewCSS.css";
import { useNavigate } from "react-router-dom";
import DishListComponent from "./dishListComponent";
import { logo } from "../assets";

const RecommendationPageView = (props) => {


  // Individual button for navbar
  const NavButton = ({ selectedTab, tabName, onClick }) => (
    <button
      className={`mr-1 p-1 w-[200px] h-[80px] rounded-large bg-cerulean font-medium text-lg font-outfit text-whiteSmoke shadow-xl ${selectedTab === tabName ? "bg-yellowGreen h-14" : "bg-cerulean"
        }`}
      onClick={() => onClick(tabName)}
    >
      {tabName.toUpperCase()}
    </button>
  );

  // navigation bar with buttons for each recommendation category
  const navBar = () => {
    return (
      <div className="flex pb-4 justify-start items-center w-full">
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
          tabName="Affordable"
          onClick={props.setSelectTab}
        />
      </div>
    );
  };

  const renderRecommendationTable = (listOfMeals) => (
    <div className="bg-smokeWhite min-h-screen w-full top-0 right-0 bottom-0 left-0 flex justify-center">
      <div className="w-[840px] mr-10 ml-10">
        <div className="flex justify-center w-444 h-102 mt-8 mb-16">
          <img src={logo} />
        </div>
        <div className="flex justify-center items-center">
          {navBar()}
        </div>
        <div className="flex justify-center items-center ">
          <DishListComponent
            listOfMeals={listOfMeals}
            updateCount={props.updateCount}
            goToShoplist={props.goToShoplist}
            selectedTab={props.selectedTab}
          />
        </div>
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
    case "Affordable": {
      // console.log("Affordable dishes", props.selectedTab)
      return renderRecommendationTable(props.affordableDishes);
    }
  }

};

export default RecommendationPageView;
