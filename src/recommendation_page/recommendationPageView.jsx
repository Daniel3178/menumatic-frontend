import React from 'react'

const RecommendationPageView = (props) => {

    const renderList = () =>{
        console.log("RENDERING LIST")
        const dayOfTheWeek = ["monday", "tuesday"];
        console.log(props.listOfMeals)  //Tar emot recommendationlist, alltså array av likeade meals.
        return (props.listOfMeals.map((meal, i) => {   //Loopar igenom listan av meals, där meals är det nuvarande elementet som inspekteras i array:en. 
            console.log(meal)   //printar ut den meal som nuvarande inspekterades i loop. {portions: 1, result: {...}} där {...} består av alla data om meal.
            console.log(meal.result.title)  //Printar ut namn av current meal i loop.
            return (    //Och för varje element i listOfMeals, så skapar vi en header av dess namn.. osv.. Här kan vi göra mycket
                <div>  
                <table style={{ width: "100%" }}>
                <tr>
                    <th style={{ width: "30%" }}>{dayOfTheWeek[i]}</th>
                    <th style={{ width: "30%" }} className='text-[11px]'>{meal.result.title}</th>
                    <th style={{ width: "20%" }}>Price Level</th>
                    <th style={{ width: "20%"}}>Portions</th>
                </tr>
        
            
                    </table>
                </div>
            )
        }) ) 
    }

  return (  //returnerar till hemsidan
    <section>
                        <table style={{ width: "100%" }}>
                <tr>
                    <th style={{ width: "30%" }}>Day of the Week</th>
                    <th style={{ width: "5%" }}>Dish</th>
                    <th style={{ width: "20%" }}>Price Level</th>
                    <th style={{ width: "20%"}}>Portions</th>
                </tr>
        
            
                    </table>
        {renderList()}
    </section>
  )
}

export default RecommendationPageView