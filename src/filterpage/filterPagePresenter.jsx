import React from 'react';
import FilterPageView from './filterPageView';
import { useDispatch} from 'react-redux';
import { useSelector} from 'react-redux';
import { saveIncludeTags, saveExcludeTags, saveTags } from "../menu/filterPageSlice";
import { useNavigate } from 'react-router-dom';

import { getExcludeTags, getIncludeTags } from "../menu/filterPageSlice";
const FilterPagePresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedExcludeTags = useSelector(getExcludeTags)
  const storedIncludeTags = useSelector(getIncludeTags)

  const handleApplyFilter = (includeTags, excludeTags) => {
    // dispatch(saveIncludeTags(includeTags))
    // dispatch(saveExcludeTags(excludeTags))
    dispatch(saveTags({includeTags: includeTags, excludeTags: excludeTags}))
    navigate("/")
  }

  const handleCancel = () => {
    navigate("/")
  }

  return (
    <FilterPageView 
    applyFilter={handleApplyFilter} cancel={handleCancel} 
    storedExcludeTags={storedExcludeTags}
    storedIncludeTags={storedIncludeTags}/>
  );
};

export default FilterPagePresenter;
