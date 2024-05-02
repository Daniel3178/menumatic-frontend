import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
   setSelectedTab, updateCount, getSelectedTab, getAffordableDishesList,
  getPopularDishesList, getQuickDishesList
} from './recommendationPageSlice';
import RecommendationPageView from './recommendationPageView';
import { useNavigate } from 'react-router-dom';

const RecommendationPagePresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedTab = useSelector(getSelectedTab);

  const handleUpdateCount = (props) => {
    dispatch(updateCount({ id: props.id, portions: props.portions, list: props.list }));
  }

  const affordableDishesList = useSelector(getAffordableDishesList);
  const popularDishesList = useSelector(getPopularDishesList);
  const quickDishesList = useSelector(getQuickDishesList);

  /**
   * Handles request to go to shoplist page
   * By Daniel
   */
  const handleGoToShoplist = () => {
    navigate("/shoplist-test", { state: "/recommendation" });
  };

  const handleSelectTab = (tab) => {
    dispatch(setSelectedTab(tab));
  };

  console.log(affordableDishesList);
  return (
    <RecommendationPageView
      affordableDishes={affordableDishesList}
      popularDishes={popularDishesList}
      quickDishes={quickDishesList}
      goToShoplist={handleGoToShoplist}
      updateCount={handleUpdateCount}
      setSelectTab={handleSelectTab}
      selectedTab={selectedTab}
    />
  );
};

export default RecommendationPagePresenter;
