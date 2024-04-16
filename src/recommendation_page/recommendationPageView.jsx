import React from 'react'

const RecommendationPageView = (props) => {

    const renderList = () =>{
        props.listOfMeals.map((meal) => {
            return (
                <div>
                    <h1>{meal.title}</h1>
                    <img src = {meal.image} alt = "food"/>
                </div>
            )
        })  
    }

  return (
    <div>
{renderList()}

    </div>
  )
}

export default RecommendationPageView