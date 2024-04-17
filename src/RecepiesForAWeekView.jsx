import React from 'react'

// These are lists which are made to be horisontal through CSS. Find template of this?
const RecepieForADay = (props) => {

    return (
        <ul class="recepie-for-a-day">
            <li>Day {props.dayOfTheWeek}</li>
            <li>{props.dish}</li>
            <li>{props.priceLevel}</li>
            <li><input type="number" id={props.dayOfTheWeek} name="quantity" min="1" value="1"></input></li>
        </ul>
    )
}

// Will necessitate that `props.RecepiesForWeekData` will be provided. 
// CSS on the list into more fancy
const RecepiesForWeek = (props) => {
  return (
    <ul>
        <li><RecepieForADay dayOfTheWeek="1" dish={props.RecepiesForWeekData[0].dish} priceLevel={props.RecepiesForWeekData[0].priceLevel}></RecepieForADay></li>
        <li><RecepieForADay dayOfTheWeek="2" dish={props.RecepiesForWeekData[1].dish} priceLevel={props.RecepiesForWeekData[1].priceLevel}></RecepieForADay></li>
        <li><RecepieForADay dayOfTheWeek="3" dish={props.RecepiesForWeekData[2].dish} priceLevel={props.RecepiesForWeekData[2].priceLevel}></RecepieForADay></li>
        <li><RecepieForADay dayOfTheWeek="4" dish={props.RecepiesForWeekData[3].dish} priceLevel={props.RecepiesForWeekData[3].priceLevel}></RecepieForADay></li>
        <li><RecepieForADay dayOfTheWeek="5" dish={props.RecepiesForWeekData[4].dish} priceLevel={props.RecepiesForWeekData[4].priceLevel}></RecepieForADay></li>
        <li><RecepieForADay dayOfTheWeek="6" dish={props.RecepiesForWeekData[5].dish} priceLevel={props.RecepiesForWeekData[5].priceLevel}></RecepieForADay></li>
        <li><RecepieForADay dayOfTheWeek="7" dish={props.RecepiesForWeekData[6].dish} priceLevel={props.RecepiesForWeekData[6].priceLevel}></RecepieForADay></li>
    </ul>
  )
}

export default RecepiesForWeek