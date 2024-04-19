import React from 'react';
import FilterPageView from './filterPageView';
import { useDispatch} from 'react-redux';
import { saveIncludeTags, saveExcludeTags } from "./filterPageSlice";
import { useNavigate } from 'react-router-dom';

const FilterPagePresenter = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleApplyFilter = (includeTags, excludeTags) => {
    dispatch(saveIncludeTags(includeTags))
    dispatch(saveExcludeTags(excludeTags))
    navigate("/")
  }

  const handleCancel = () => {
    navigate("/")
  }

  return (
    <FilterPageView
    applyFilter={handleApplyFilter}
    cancel={handleCancel}
    />
  );
}

export default FilterPagePresenter;
