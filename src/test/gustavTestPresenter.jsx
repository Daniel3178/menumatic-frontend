import React, { useEffect } from "react";
import GustavTestView from "./gustavTestView";
import { useDispatch } from "react-redux";

import { searchBySpoonacularApiBulkAsync } from "../integration/spoonacularServerThunks";

const GustavTestPresenter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchBySpoonacularApiBulkAsync([4715538, 716429]));
    // console.log(getApiResults)
  }, []);

  return <GustavTestView />;
};

export default GustavTestPresenter;
