import React from 'react';
import HomePageView from './homePageView';
import { useDispatch, useSelector } from 'react-redux';
import { getApiResults, searchBySpoonacularApiAsync } from '../store/spoonacularAPISlice';
import { incrementLikesCounter, getLikesCounter } from './homePageSlice';
const HomePagePresenter = () => {
    const dispatch = useDispatch();
    const apiResult = useSelector(getApiResults)
    const likesCounter = useSelector(getLikesCounter)

    const handleGetRandomReceipt = () => {
        console.log("Button Clicked");
        dispatch(searchBySpoonacularApiAsync());
    }
    const handleLike = () => {
        dispatch(incrementLikesCounter());
        dispatch(searchBySpoonacularApiAsync());
    }
  return (
    <HomePageView
    apiResults = {apiResult}
    getRandomReceipt = {handleGetRandomReceipt}
    sendLike = {handleLike}
    
    />
  )
}

export default HomePagePresenter