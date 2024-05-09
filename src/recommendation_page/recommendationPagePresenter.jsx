import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedTab,
  updateCount,
  getSelectedTab,
} from "./recommendationPageSlice";
import RecommendationPageView from "./recommendationPageView";
import { useNavigate } from "react-router-dom";
import { generateShoplist } from "../shoplist/shoplistSlice";

const RecommendationPagePresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name: selectedTabName, dishes: selectedTabDishes } =
    useSelector(getSelectedTab);

  const handleUpdateCount = (props) => {
    dispatch(
      updateCount({ id: props.id, portions: props.portions, list: props.list })
    );
  };

  /**
   * Handles request to go to shoplist page
   * By Daniel
   */
  const handleGoToShoplist = () => {
    dispatch(generateShoplist(selectedTabDishes));
    navigate("/shoplist-test", { state: "/recommendation" });
  };

  const handleSelectTab = (tab) => {
    dispatch(setSelectedTab(tab));
  };

  return (
    <RecommendationPageView
      goToShoplist={handleGoToShoplist}
      updateCount={handleUpdateCount}
      setSelectTab={handleSelectTab}
      currentDishes={selectedTabDishes}
      currentTabName={selectedTabName}
    />
  );
};

export default RecommendationPagePresenter;
