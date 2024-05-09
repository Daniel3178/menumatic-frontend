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

  const handleGoToShoplist = () => {
    dispatch(generateShoplist(selectedTabDishes));
    navigate("/shoplist-test", { state: "/recommendation" });
  };

  const handleSelectTab = (tab) => {
    dispatch(setSelectedTab(tab));
  };

  return (
    <RecommendationPageView
      currentTabName={selectedTabName}
      currentDishes={selectedTabDishes}
      setSelectTab={handleSelectTab}
      updateCount={handleUpdateCount}
      goToShoplist={handleGoToShoplist}
    />
  );
};

export default RecommendationPagePresenter;
