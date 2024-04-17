import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendationList, updateCount, addToReocemmendationList  } from './recommendationPageSlice';
import RecommendationPageView from './recommendationPageView';

const RecommendationPagePresenter = () => {

    const dispatch = useDispatch();
    const recommendationList = useSelector(getRecommendationList);

const handleRequst = ()=>{
  console.log("Hello world")
}
  return (
    <RecommendationPageView
    listOfMeals = {recommendationList}
    myatr={handleRequst}
    />
  )
}

export default RecommendationPagePresenter