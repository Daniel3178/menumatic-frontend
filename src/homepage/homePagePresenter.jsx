import React from 'react';
import HomePageView from './homePageView';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiResults, searchBySpoonacularApiAsync } from '../store/spoonacularAPISlice';
import { incrementLikesCounter, getLikesCounter } from './homePageSlice';
import { addToReocemmendationList } from '../recommendation_page/recommendationPageSlice';
import { useNavigate } from 'react-router-dom';
const HomePagePresenter = () => {
    const dispatch = useDispatch();
    const apiResult = useSelector(getApiResults)
    const likesCounter = useSelector(getLikesCounter)
    const navigate = useNavigate()
    const handleGetRandomReceipt = () => {
        console.log("Button Clicked");
        dispatch(searchBySpoonacularApiAsync());
    }
    const handleLike = () => {
        dispatch(addToReocemmendationList(apiResult.recipes[0]))
        dispatch(incrementLikesCounter());
        dispatch(searchBySpoonacularApiAsync());
        if(likesCounter === 1){
          console.log("LIKE LIMIT REACHED")
          navigate("/recommendation")
        }
        console.log(likesCounter)
        
    }

    // useEffect(()=>{
    //   dispatch(searchBySpoonacularApiAsync());
    // },[])
  return (
    <HomePageView
    apiResults = {apiResult}
    getRandomReceipt = {handleGetRandomReceipt}
    sendLike = {handleLike}
    
    />
  )
}

export default HomePagePresenter