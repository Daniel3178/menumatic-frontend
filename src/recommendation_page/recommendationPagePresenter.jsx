import React from 'react'
import { useSelector } from 'react-redux';
import { getRecommendationList, updateCount } from './recommendationPageSlice';
import RecommendationPageView from './recommendationPageView';
import { useNavigate } from 'react-router-dom';

//TODO: Update count is not used
const RecommendationPagePresenter = () => {
    const navigate = useNavigate();
    const recommendationList = useSelector(getRecommendationList);


const handleGoToShoplist = ()=>{
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
