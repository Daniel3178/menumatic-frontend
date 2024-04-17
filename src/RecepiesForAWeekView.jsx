import React from 'react';

const dummyData = [
  {dish:"lorem ipsum aaaaa I LOVE BIG CHUNGUS ", priceLevel: "$"},
  {dish:"lorem ipsum", priceLevel: "$"},
  {dish:"lorem ipsum", priceLevel: "$$$"},
  {dish:"lorem ipsum", priceLevel: "$"},
  {dish:"lorem ipsum", priceLevel: "$"},
  {dish:"lorem ipsum", priceLevel: "$"},
  {dish:"lorem ipsum", priceLevel: "$"}
];


// These are lists which are made to be horisontal through CSS. Find template of this?
const RecepieForADay = (props) => {

    return (
        <tr class="interrow-padding" >
            <td>Day {props.dayOfTheWeek}</td>
            <td>{props.dish}</td>
            <td>{props.priceLevel}</td>
            <td><input type="number" id={props.dayOfTheWeek} name="quantity" min="1" defaultValue="1"></input></td>
        </tr>
    )
}

// Will necessitate that `props.RecepiesForWeekData` will be provided. 
// CSS on the list into more fancy
const RecepiesForWeek = (props) => {
  return (
    <div>
      <ul className="category-menu">
        <li>Kateogri 1 att göra till horisonetll lista</li>
        <li>Kategori 2</li>
        <li>Kategori 3</li>
      </ul>
      <table style={{width:"100%"}}>
          <tr>
            <th style={{width:"30%"}}></th> <th style={{width:"50%"}}></th> <th style={{width:"20%"}}></th> <th ></th>
          </tr>
          <RecepieForADay dayOfTheWeek="1" dish={props.RecepiesForWeekData[0].dish} priceLevel={props.RecepiesForWeekData[0].priceLevel}></RecepieForADay>
          <RecepieForADay dayOfTheWeek="2" dish={props.RecepiesForWeekData[1].dish} priceLevel={props.RecepiesForWeekData[1].priceLevel}></RecepieForADay>
          <RecepieForADay dayOfTheWeek="3" dish={props.RecepiesForWeekData[2].dish} priceLevel={props.RecepiesForWeekData[2].priceLevel}></RecepieForADay>
          <RecepieForADay dayOfTheWeek="4" dish={props.RecepiesForWeekData[3].dish} priceLevel={props.RecepiesForWeekData[3].priceLevel}></RecepieForADay>
          <RecepieForADay dayOfTheWeek="5" dish={props.RecepiesForWeekData[4].dish} priceLevel={props.RecepiesForWeekData[4].priceLevel}></RecepieForADay>
          <RecepieForADay dayOfTheWeek="6" dish={props.RecepiesForWeekData[5].dish} priceLevel={props.RecepiesForWeekData[5].priceLevel}></RecepieForADay>
          <RecepieForADay dayOfTheWeek="7" dish={props.RecepiesForWeekData[6].dish} priceLevel={props.RecepiesForWeekData[6].priceLevel}></RecepieForADay>
          <tr className="interrow-padding">
            <td>Default portions</td>
            <td></td>
            <td></td>
            <td><input type="number" id="defaultPortions" name="quantity" min="1" defaultValue="1" max="100"></input></td>
          </tr>
      </table>

      <input type="submit" value="✔ Shopping list"></input>

    </div>
  )
}

export default RecepiesForWeek;

export function App(props) {
  return (
    <div className='App'>
      <RecepiesForWeek RecepiesForWeekData={dummyData}></RecepiesForWeek>
    </div>
  );
}

// Log to console
console.log('Hello console')
