import React, { useEffect, useState } from 'react';
import FilterPageView from './filterPageView';
import { useDispatch, useSelector } from 'react-redux';
import { getApiResults, searchBySpoonacularApiAsync } from '../store/spoonacularAPISlice';
import {} from './filterPageSlice';
import { addToReocemmendationList } from '../recommendation_page/recommendationPageSlice';
import { useNavigate } from 'react-router-dom';
import { objects } from '../assets/constObjects';

const FilterPagePresenter = () => {

  return (
    <FilterPageView

    />
  );
}

export default FilterPagePresenter;
