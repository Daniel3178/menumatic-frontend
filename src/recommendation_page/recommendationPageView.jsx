import React from 'react'

const RecommendationPageView = (props) => {

    const renderList = () =>{
        console.log("RENDERING LIST")
        console.log(props.listOfMeals)  //Tar emot recommendationlist, alltså array av likeade meals.
        return (props.listOfMeals.map((meal) => {   //Loopar igenom listan av meals, där meals är det nuvarande elementet som inspekteras i array:en. 
            console.log(meal)   //printar ut den meal som nuvarande inspekterades i loop. {portions: 1, result: {...}} där {...} består av alla data om meal.
            console.log(meal.result.title)  //Printar ut namn av current meal i loop.
            return (    //Och för varje element i listOfMeals, så skapar vi en header av dess namn.. osv.. Här kan vi göra mycket
                <div>  
                <table style={{ width: "100%" }}>
                <tr>
                    <th style={{ width: "30%" }}>Day of the Week</th>
                    <th style={{ width: "5%" }}>Dish</th>
                    <th style={{ width: "20%" }}>Price Level</th>
                    <th style={{ width: "20%"}}>Portions</th>
                </tr>

                    </table>
                    <tr>
                    <td>{meal.result.title}</td>
                    <td>{dayOfTheWeek="Monday"}</td>
                    <img className="w-[50px] h-[50px] border border-black" src={meal.result.image} alt="food" />

                    </tr>
                </div>
            )
        }) ) 
    }

  return (  //returnerar till hemsidan
    <section>
        {renderList()}
    </section>
  )
}

export default RecommendationPageView