import React from 'react'

const DanielTestView = (props) => {
  console.log(props.apiResults);

  const conditialRender = () => {
    if (props.apiResults) {
        return (
            <div>
                <h1>{props.apiResults.recipes[0].title}</h1>
                <img src = {props.apiResults.recipes[0].image} alt = "food"/>
            </div>
        )
    }
  }

  return (
    <div>
        <button onClick = {props.getRandomReceipt}>Call API</button>
        {conditialRender()}
    </div>
  )
}

export default DanielTestView