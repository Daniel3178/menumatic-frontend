import React, { useEffect, useState } from 'react';
import FilterPageView from './filterPageView';
import { useDispatch, useSelector } from 'react-redux';
import { getApiResults, searchBySpoonacularApiAsync } from '../store/spoonacularAPISlice';
import {} from './filterPageSlice';
import { addToReocemmendationList } from '../recommendation_page/recommendationPageSlice';
import { useNavigate } from 'react-router-dom';
import { objects } from '../assets/constObjects';

const FilterPagePresenter = () => {

  const navigate = useNavigate()

  const handleApplyFilter = (includeTags, excludeTags) => {
    // TODO: send data to api slice
    console.log("Filter button pressed")
    console.log("include Tags: " + includeTags.toString());
    console.log("exclude Tags: " + excludeTags.toString());
    navigate("/homepage-test")
  }

  const handleCancel = () => {
    console.log("Cancel button pressed")
    navigate("/homepage-test")
  }

  return (
    <FilterPageView
    applyFilter={handleApplyFilter}
    cancel={handleCancel}
    />
  );
}

export default FilterPagePresenter;
