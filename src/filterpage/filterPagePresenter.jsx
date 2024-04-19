import React, { useEffect, useState } from "react";
import FilterPageView from "./filterPageView";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiResults,
  searchBySpoonacularApiAsync,
} from "../store/spoonacularAPISlice";
import {} from "./filterPageSlice";
import { addToReocemmendationList } from "../recommendation_page/recommendationPageSlice";
import { saveBoundel1, saveBoundel2 } from "./filterPageSlice";
import { useNavigate } from "react-router-dom";
import { objects } from "../assets/constObjects";

const FilterPagePresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleApplyFilter = (includeTags, excludeTags) => {
    dispatch(saveBoundel1(includeTags));
    dispatch(saveBoundel2(excludeTags));
    navigate("/");
  };

  const handleCancel = () => {
    console.log("Cancel button pressed");
    navigate("/");
  };

  return (
    <FilterPageView applyFilter={handleApplyFilter} cancel={handleCancel} />
  );
};

export default FilterPagePresenter;
