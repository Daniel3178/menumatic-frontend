import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRecommendationList, updateCount, addToReocemmendationList  } from './recommendationPageSlice';
import RecommendationPageView from './recommendationPageView';
import { generateShoplist } from '../shoplist/shoplistSlice';

const RecommendationPagePresenter = () => {

    const dispatch = useDispatch();
    const recommendationList = useSelector(getRecommendationList);
    useEffect(()=>{
      dispatch(generateShoplist(recommendationList))
    },[])

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