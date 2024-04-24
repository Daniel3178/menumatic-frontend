import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendationList,setSelectedTab, updateCount, sortLikedDishes, getSelectedTab,getAffordableDishesList,
   getPopularDishesList, getQuickDishesList } from './recommendationPageSlice';
import RecommendationPageView from './recommendationPageView';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

//TODO: Update count is not used
const RecommendationPagePresenter = () => {
  const navigate = useNavigate();
  const recommendationList = useSelector(getRecommendationList);
  const dispatch = useDispatch();
  const selectedTab = useSelector(getSelectedTab);
  
  const handleUpdateCount = (props) => {
  dispatch(updateCount({id: props.id, portions: props.portions, list: props.list}));
  }

  const affordableDishesList = useSelector(getAffordableDishesList);
  const popularDishesList = useSelector(getPopularDishesList);
  const quickDishesList = useSelector(getQuickDishesList);

  /**
   * Handles request to go to shoplist page
   * By Daniel
   */
  const handleGoToShoplist = () => {
    navigate("/shoplist-test");
  };

  const handleSelectTab = (tab) => {
    dispatch(setSelectedTab(tab));
  };
  // useEffect(() => {
  //   dispatch(sortLikedDishes());
  // });
  return (
    <RecommendationPageView
      affordableDishes = {affordableDishesList}
      popularDishes = {popularDishesList}
      quickDishes = {quickDishesList}
      goToShoplist={handleGoToShoplist}
      updateCount={handleUpdateCount}
      setSelectTab={handleSelectTab}
      selectedTab={selectedTab}
    />
  );
};

export default RecommendationPagePresenter;
