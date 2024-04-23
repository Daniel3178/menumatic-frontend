import React, { useEffect, useState } from "react";
import GustavTestView from "./gustavTestView";
import { useDispatch, useSelector } from "react-redux";
import { getExcludeTags, getIncludeTags } from "../filterpage/filterPageSlice";

import {
    getApiResults,
  searchBySpoonacularApiBulkAsync,
  searchBySpoonacularApiAsync
} from "../store/spoonacularAPISlice";

const GustavTestPresenter = () => {
  
    const dispatch = useDispatch();
    

    
  useEffect(() => {
        
        dispatch(searchBySpoonacularApiBulkAsync([4715538,716429]));
        console.log(getApiResults)
  }, []);

  return (
    <GustavTestView
      
    />
  );
};

export default GustavTestPresenter;
