import React from "react";

const RecommendationPageView = (props) => {

    const renderList = () =>{
        console.log("RENDERING LIST");
        const dayOfTheWeek = ["Monday", "Tuesday"];
        const priceLevel = ["$$", "$$$$"];
        const portions = [1, 2, 3];
        console.log(props.listOfMeals); //Tar emot recommendationlist, alltså array av likeade meals.
        return props.listOfMeals.map((meal, i) => {
            //Loopar igenom listan av meals, där meals är det nuvarande elementet som inspekteras i array:en.
            console.log(meal); //printar ut den meal som nuvarande inspekterades i loop. {portions: 1, result: {...}} där {...} består av alla data om meal.
            console.log(meal.result.title); //Printar ut namn av current meal i loop.
            return (
              //Och för varje element i listOfMeals, så skapar vi en header av dess namn.. osv.. Här kan vi göra mycket
              <div className="w-[1280px] border border-black flex flex-row">
                <div className="border border-black w-[320px] text-center">
                  {dayOfTheWeek[i]}
                </div>
                <div className="border border-black w-[320px] text-center">
                  {meal.result.title}
                </div>
                <div className="border border-black w-[320px] text-center">
                  {priceLevel[i]}{" "}
                </div>
                <div className="border border-black w-[320px] text-center">
                  {portions[i]}
                </div>
              </div>
            );
          });
    }



  const renderInfo = () => {
    return (
      <div className="w-full justify-center items-center flex flex-col">
        <div>
        {renderList()}
        </div>
        <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={props.goToShoplist}>Go to Shoplist</button>
      </div>
    );
    
  };

  return (
    //returnerar till hemsidan
    <section>
      <table style={{ width: "100%" }}>
        <tr>
          <th style={{ width: "30%" }}>Day of the Week</th>
          <th style={{ width: "5%" }}>Dish</th>
          <th style={{ width: "20%" }}>Price Level</th>
          <th style={{ width: "20%" }}>Portions</th>
        </tr>
      </table>
      {renderInfo()}
    </section>
  );
};

export default RecommendationPageView;
