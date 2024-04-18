import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRecommendationList, updateCount, addToReocemmendationList  } from './recommendationPageSlice';
import RecommendationPageView from './recommendationPageView';
import { generateShoplist } from '../shoplist/shoplistSlice';
import { useNavigate } from 'react-router-dom';

const RecommendationPagePresenter = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recommendationList = useSelector(getRecommendationList);


const handleGoToShoplist = ()=>{
  dispatch(generateShoplist(recommendationList));
  navigate("/shoplist-test");
}
  return (
    <RecommendationPageView
    listOfMeals = {recommendationList}
    goToShoplist={handleGoToShoplist}
    />
  )
}

export default RecommendationPagePresenter