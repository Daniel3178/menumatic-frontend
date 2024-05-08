import React from "react";
import { listenerMiddleware } from "../store/store";
import { generateShoplist } from "../shoplist/shoplistSlice";
import { removeItem, restoreItem } from "../shoplist/shoplistSlice";
import { saveTags, saveTagsByServer } from "../menu/filterPageSlice";
import { setSelectedListId } from "../listOfStoredPlansRelated/plan_list/planListSlice";
import { sortLikedDishes } from "../recommendation_page/recommendationPageSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setData } from "../shoplist/shoplistSlice";
import { loadLocalData } from "../recommendation_page/recommendationPageSlice";
const LocalStorage = () => {
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

  const getLocalSelectedListId = () => {
    return JSON.parse(localStorage.getItem("selected-list-id")) || "";
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
    actionCreator: saveTagsByServer,
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
      const allItems = listenerApi.getState().shoplist.allItems;
      const removedItems = listenerApi.getState().shoplist.removedItems;
      localStorage.setItem("shoplist", JSON.stringify(allItems));
      localStorage.setItem("removed-items", JSON.stringify(removedItems));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: removeItem,
    effect: async (action, listenerApi) => {
      const removedItems = listenerApi.getState().shoplist.removedItems;
      localStorage.setItem("removed-items", JSON.stringify(removedItems));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: restoreItem,
    effect: async (action, listenerApi) => {
      const allItems = listenerApi.getState().shoplist.allItems;
      const removedItems = listenerApi.getState().shoplist.removedItems;
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

  listenerMiddleware.startListening({
    actionCreator: setSelectedListId,
    effect: async (action, listenerApi) => {
      localStorage.setItem("selected-list-id", JSON.stringify(action.payload));
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLocalData = async () => {
      const excludeTags = getExcludeTags();
      const includeTags = getIncludeTags();
      const mealsInPlan = getMealsInPlan();
      const shoplist = getLocalShoplist();
      const removedItems = getLocalRemovedItems();
      const selectedListId = getLocalSelectedListId();
      const affordableDishes = getLocalAffordableDishes();
      const popularDishes = getLocalPopularDishes();
      const quickDishes = getLocalQuickDishes();
      dispatch(saveTags({ excludeTags, includeTags, mealsInPlan }));
      dispatch(setData({ allItems: shoplist, removedItems: removedItems }));
      dispatch(setSelectedListId(selectedListId));
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
