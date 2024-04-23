import React from 'react';
import FilterPageView from './filterPageView';
import { useDispatch, useSelector} from 'react-redux';
import { saveIncludeTags, saveExcludeTags } from "./filterPageSlice";
import { useNavigate } from 'react-router-dom';

import { getExcludeTags, getIncludeTags } from "../filterpage/filterPageSlice";

const FilterPagePresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedExcludeTags = useSelector(getExcludeTags)
  const storedIncludeTags = useSelector(getIncludeTags)

  const handleApplyFilter = (includeTags, excludeTags) => {
    dispatch(saveIncludeTags(includeTags))
    dispatch(saveExcludeTags(excludeTags))
    navigate("/")
  }

  const handleCancel = () => {
    navigate("/")
  }

  return (
    <FilterPageView applyFilter={handleApplyFilter} cancel={handleCancel} 
    storedExcludeTags={storedExcludeTags}
    storedIncludeTags={storedIncludeTags}
    />
  );
};

export default FilterPagePresenter;
