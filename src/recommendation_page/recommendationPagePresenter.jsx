import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendationList, updateCount } from './recommendationPageSlice';
import RecommendationPageView from './recommendationPageView';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

//TODO: Update count is not used
const RecommendationPagePresenter = () => {
  const navigate = useNavigate();
  const recommendationList = useSelector(getRecommendationList);
  const dispatch = useDispatch();
  
  const handleUpdateCount = (props) => {
  dispatch(updateCount({id: props.id, portions: props.portions}));
  }

  /**
   * Handles request to go to shoplist page
   * By Daniel
   */
  const handleGoToShoplist = () => {
    navigate("/shoplist-test");
  };

  return (
    <RecommendationPageView
      listOfMeals={recommendationList}
      goToShoplist={handleGoToShoplist}
      updateCount={handleUpdateCount}
    />
  );
};

export default RecommendationPagePresenter;
