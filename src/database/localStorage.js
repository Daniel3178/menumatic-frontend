import { listenerMiddleware } from "../store/store";
import { generateShoplist } from "../shoplist/shoplistSlice";
import { removeItem, restoreItem } from "../shoplist/shoplistSlice";
import { saveTags } from "../menu/filterPageSlice";
import { sortLikedDishes } from "../recommendation_page/recommendationPageSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setData } from "../shoplist/shoplistSlice";
import { setSelectedTab } from "../recommendation_page/recommendationPageSlice";
import { loadLocalData } from "../recommendation_page/recommendationPageSlice";
const getExcludeTags = () => {
  return JSON.parse(localStorage.getItem("exclude-tags")) || [];
};
const getIncludeTags = () => {
  return JSON.parse(localStorage.getItem("include-tags")) || [];
};
const getMealsInPlan = () => {
  return JSON.parse(localStorage.getItem("meals-in-plan")) || 7;
};

const getLocalShoplist = () => {
  return JSON.parse(localStorage.getItem("shoplist")) || [];
};

const getLocalRemovedItems = () => {
  return JSON.parse(localStorage.getItem("removed-items")) || [];
};

const getLocalSelectedTab = () => {
  return JSON.parse(localStorage.getItem("selected-tab")) || "Popular";
};

const getLocalAffordableDishes = () => {
  return JSON.parse(localStorage.getItem("affordable-dishes")) || [];
};
const getLocalPopularDishes = () => {
  return JSON.parse(localStorage.getItem("popular-dishes")) || [];
};
const getLocalQuickDishes = () => {
  return JSON.parse(localStorage.getItem("quick-dishes")) || [];
};

export const fetchLocalFoodPref = () => {
  const excludeTags = getExcludeTags();
  const includeTags = getIncludeTags();
  const mealsInPlan = getMealsInPlan();
  return { excludeTags, includeTags, mealsInPlan };
};

const LocalStorage = () => {
  listenerMiddleware.startListening({
    actionCreator: saveTags,
    effect: async (action, listenerApi) => {
      const { excludeTags, includeTags, mealsInPlan } = action.payload;
      localStorage.setItem("include-tags", JSON.stringify(includeTags));
      localStorage.setItem("exclude-tags", JSON.stringify(excludeTags));
      localStorage.setItem("meals-in-plan", JSON.stringify(mealsInPlan));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: generateShoplist,
    effect: async (action, listenerApi) => {
      console.log("Listening to generatedShoplist action");
      const allItems = listenerApi.getState().shoplist.generalShoplist.allItems;
      const removedItems =
        listenerApi.getState().shoplist.generalShoplist.removedItems;
      localStorage.setItem("shoplist", JSON.stringify(allItems));
      localStorage.setItem("removed-items", JSON.stringify(removedItems));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setSelectedTab,
    effect: async (action, listenerApi) => {
      const selectedTab = action.payload;
      localStorage.setItem("selected-tab", JSON.stringify(selectedTab));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: removeItem,
    effect: async (action, listenerApi) => {
      const allItems = listenerApi.getState().shoplist.generalShoplist.allItems;
      const removedItems =
        listenerApi.getState().shoplist.generalShoplist.removedItems;
      localStorage.setItem("shoplist", JSON.stringify(allItems));
      localStorage.setItem("removed-items", JSON.stringify(removedItems));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: restoreItem,
    effect: async (action, listenerApi) => {
      const allItems = listenerApi.getState().shoplist.generalShoplist.allItems;
      const removedItems =
        listenerApi.getState().shoplist.generalShoplist.removedItems;
      localStorage.setItem("shoplist", JSON.stringify(allItems));
      localStorage.setItem("removed-items", JSON.stringify(removedItems));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: sortLikedDishes,
    effect: async (action, listenerApi) => {
      const affordableDishes =
        listenerApi.getState().recommendation.affordableDishesList.dishes;
      const popularDishes =
        listenerApi.getState().recommendation.popularDishesList.dishes;
      const quickDishesList =
        listenerApi.getState().recommendation.quickDishesList.dishes;

      localStorage.setItem(
        "affordable-dishes",
        JSON.stringify(affordableDishes)
      );
      localStorage.setItem("popular-dishes", JSON.stringify(popularDishes));
      localStorage.setItem("quick-dishes", JSON.stringify(quickDishesList));
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLocalData = async () => {
      const shoplist = getLocalShoplist();
      const removedItems = getLocalRemovedItems();
      const affordableDishes = getLocalAffordableDishes();
      const popularDishes = getLocalPopularDishes();
      const quickDishes = getLocalQuickDishes();
      const selectedTab = getLocalSelectedTab();
      dispatch(setData({ allItems: shoplist, removedItems: removedItems }));
      dispatch(setSelectedTab(selectedTab));
      dispatch(
        loadLocalData({
          affordable: affordableDishes,
          popular: popularDishes,
          quick: quickDishes,
        })
      );
    };
    fetchLocalData();
  }, []);
};

export default LocalStorage;
