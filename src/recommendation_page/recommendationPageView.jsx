import React from 'react'

const RecommendationPageView = (props) => {

    const renderList = () =>{
        console.log("RENDERING LIST")
        console.log(props.listOfMeals)
        return (props.listOfMeals.map((meal) => {
            console.log(meal)
            console.log(meal.result.title)
            return (
                <div>
                    <h1>{meal.result.title}</h1>
                    <img src={meal.result.image} alt="food" className="rounded-lg" />
                </div>
            )
        }) ) 
    }

  return (
    <section>
        {renderList()}
    </section>
  )
}

export default RecommendationPageView