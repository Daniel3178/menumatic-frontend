import React from "react";
import "./RecepiesForAWeekViewCSS.css";
import { useNavigate } from "react-router-dom";
const RecommendationPageView = (props) => {
  //renderList
  const navigate = useNavigate();
  const renderList = () => {
    return props.listOfMeals.map((mealDataForTheDay, mealIndex) => {
      return (
        <RecepieForADay
          dayOfTheWeek={mealIndex + 1}
          dish={mealDataForTheDay.result.title}
          priceLevel={pricePerServingToApproximatePriceLevel(
            mealDataForTheDay.result.pricePerServing
          )}
        ></RecepieForADay>
      );
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <table style={{ width: "100%" }}>
        {/* <tr className="bg-[#48abe0] h-14">
                    <th className="text-left pl-8">Billig</th> 
                    <th className="text-left">Rekommenderas</th> 
                    <th className="text-left">Dyr</th> 
                    <th className="text-left">Snabb</th>
                </tr> */}
        <tr className="bg-red-400 h-10">
          <th className="text-left pl-8">Day</th>
          <th className="text-left">Dish</th>
          <th className="text-left">Price level</th>
          <th className="text-left">Portions</th>
        </tr>
        {renderList()}
        <tr>
          <td className="pl-8">Default portions</td>
          <td></td>
          <td></td>
          <td>
            <input
              type="number"
              id="defaultPortions"
              name="quantity"
              min="1"
              defaultValue="1"
              max="100"
            ></input>
          </td>
        </tr>
      </table>
      <button
        className="w-[160px] h-[50px] text-[14px] bg-green-400 rounded self-center"
        onClick={() => {
          navigate("/shoplist-test");
        }}
        role="button"
      >
        Show Shopping List
      </button>
    </div>
  );
};

function pricePerServingToApproximatePriceLevel(instancePricePerServing) {
  if (instancePricePerServing < 100) {
    return "$";
  } else if (instancePricePerServing < 1000) {
    return "$$";
  } else {
    return "$$$";
  }
}

const RecepieForADay = (props) => {
  return (
    <tr>
      <td className="pl-8">Day {props.dayOfTheWeek}</td>
      <td>{props.dish}</td>
      <td>{props.priceLevel}</td>
      <td>
        <input
          type="number"
          id={props.dayOfTheWeek}
          name="quantity"
          min="1"
          defaultValue="1"
        ></input>
      </td>
    </tr>
  );
};

export default RecommendationPageView;
