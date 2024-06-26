import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listenerMiddleware } from "../store/store";
import { signInCurrentUser } from "../menu/userAccountSlice";
import { popFirstRecipe } from "../store/spoonacularAPISlice";
import { incrementLikesCounter } from "../homepage/homePageSlice";
import { saveTags, saveTagsByServer } from "../menu/filterPageSlice";
import { setSelectedList, deleteList } from "../store/menumaticServerAPISlice";
import {
  searchBySpoonacularApiBulkAsync,
  searchComplexBySpoonacularApiAsync,
} from "./spoonacularServerThunks";
import {
  removeItem,
  restoreItem,
  generateShoplist,
  setData,
  flushData,
} from "../shoplist/shoplistSlice";
import {
  loadLocalData,
  setSelectedTab,
  sortLikedDishes,
} from "../recommendation_page/recommendationPageSlice";
import {
  fetchUserFoodPref,
  fetchUserShopinglist,
  fetchExcludedIngredients,
  saveFoodPrefToMenumaticDb,
  deleteMealPlan,
} from "./menumaticServerThunks";
import {
  getLocalShoplist,
  getLocalRemovedItems,
  getLocalSelectedTab,
  getLocalAffordableDishes,
  getLocalPopularDishes,
  getLocalQuickDishes,
  flushLocalDishInfo,
} from "./localStorage";

const MenumaticListeners = () => {
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
      // dispatch(setSelectedTab(selectedTab));
      dispatch(
        loadLocalData({
          affordable: affordableDishes,
          popular: popularDishes,
          quick: quickDishes,
          selectedTab: selectedTab,
        })
      );
    };
    fetchLocalData();
  }, []);

  listenerMiddleware.startListening({
    actionCreator: signInCurrentUser,
    effect: async (action, listenerApi) => {
      const userId = action.payload.userId;
      await listenerApi.dispatch(fetchUserShopinglist(userId));
      await listenerApi.dispatch(fetchUserFoodPref(userId));
      listenerApi.dispatch(
        searchComplexBySpoonacularApiAsync({
          intolerances:
            listenerApi.getState().filterPage?.apiPrefs?.excludeTags
              ?.paramsArray || [],
          diet:
            listenerApi.getState().filterPage?.apiPrefs?.includeTags
              ?.paramsArray || [],
        })
      );
    },
  });

  listenerMiddleware.startListening({
    actionCreator: deleteList,
    effect: async (action, listenerApi) => {
      try {
        const userId = listenerApi.getState().userAccount?.userId;
        if (userId) {
          listenerApi.dispatch(
            deleteMealPlan({
              userId: userId,
              mealPlanId: action.payload.listId,
            })
          );
        }
      } catch (e) {
        alert("Error in deleting list, server is down");
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: popFirstRecipe,
    effect: async (action, listenerApi) => {
      const complexSearchResult =
        listenerApi.getState().spoonacularApi.complexSearchPromise?.data || [];
      if (complexSearchResult.length == 6) {
        listenerApi.dispatch(
          searchComplexBySpoonacularApiAsync({
            intolerances:
              listenerApi.getState().filterPage?.apiPrefs?.excludeTags
                ?.paramsArray || [],
            diet:
              listenerApi.getState().filterPage?.apiPrefs?.includeTags
                ?.paramsArray || [],
          })
        );
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: incrementLikesCounter,
    effect: async (action, listenerApi) => {
      const counter = listenerApi.getState().homePage?.likesCounter || 1;
      if (counter == 2) {
        flushLocalDishInfo();
        listenerApi.dispatch(flushData());
      }

      const complexSearchResult =
        listenerApi.getState().spoonacularApi.complexSearchPromise?.data || [];
      if (complexSearchResult.length == 8) {
        listenerApi.dispatch(
          searchComplexBySpoonacularApiAsync({
            intolerances:
              listenerApi.getState().menu.filterPage?.apiPrefs?.excludeTags
                ?.paramsArray || [],
            diet:
              listenerApi.getState().menu.filterPage?.apiPrefs?.includeTags
                ?.paramsArray || [],
          })
        );
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setSelectedList,
    effect: async (action, listenerApi) => {
      const { id } = action.payload;
      localStorage.setItem("selected-list-id", JSON.stringify(id));
      const allUserList =
        listenerApi.getState().menumaticServerApi.userAllListPromise?.data ||
        [];
      const selectedList = allUserList.find((list) => list.id === id);
      const allIds = selectedList.recipes.map((recipe) => {
        return { id: recipe.id, portions: recipe.portions };
      });
      // ** IMPORTANT NOTE / WISDOM ** SOLVING RACE CONDITION
      // Since searchBySpoonacularApiBulkAsync is an async function, it will
      // take some time to fetch the data from the server. Therefore, we need to
      // await the function to finish before we can dispatch the next action.
      await listenerApi.dispatch(searchBySpoonacularApiBulkAsync(allIds));
      listenerApi.dispatch(fetchExcludedIngredients(id));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: saveTags,
    effect: async (action, listenerApi) => {
      const userId = listenerApi.getState().userAccount?.userId;
      try {
        if (userId) {
          listenerApi.dispatch(
            saveFoodPrefToMenumaticDb({ userId: userId, data: action.payload })
          );
        }
        listenerApi.dispatch(
          searchComplexBySpoonacularApiAsync({
            intolerances: action.payload.excludeTags,
            diet: action.payload.includeTags,
            saveOptOverwrite: true,
          })
        );
      } catch (e) {
        alert("Error in saving food pref to menumatic db, server is down");
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: saveTagsByServer,
    effect: async (action, listenerApi) => {
      try {
        listenerApi.dispatch(
          searchComplexBySpoonacularApiAsync({
            intolerances: action.payload.excludeTags,
            diet: action.payload.includeTags,
            saveOptOverwrite: true,
          })
        );
      } catch (e) {
        alert("Error in saving food pref to menumatic db, server is down");
      }
    },
  });

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
      const allItems =
        listenerApi.getState().shoplist?.generalShoplist?.allItems || [];
      const removedItems =
        listenerApi.getState().shoplist?.generalShoplist?.removedItems || [];
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
      const allItems =
        listenerApi.getState().shoplist?.generalShoplist?.allItems || [];
      const removedItems =
        listenerApi.getState().shoplist?.generalShoplist?.removedItems || [];
      localStorage.setItem("shoplist", JSON.stringify(allItems));
      localStorage.setItem("removed-items", JSON.stringify(removedItems));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: restoreItem,
    effect: async (action, listenerApi) => {
      const allItems =
        listenerApi.getState().shoplist?.generalShoplist?.allItems || [];
      const removedItems =
        listenerApi.getState().shoplist?.generalShoplist?.removedItems || [];
      localStorage.setItem("shoplist", JSON.stringify(allItems));
      localStorage.setItem("removed-items", JSON.stringify(removedItems));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: sortLikedDishes,
    effect: async (action, listenerApi) => {
      const affordableDishes =
        listenerApi.getState().recommendation?.affordableDishesList?.dishes ||
        [];
      const popularDishes =
        listenerApi.getState().recommendation?.popularDishesList?.dishes || [];
      const quickDishesList =
        listenerApi.getState().recommendation?.quickDishesList?.dishes || [];

      localStorage.setItem(
        "affordable-dishes",
        JSON.stringify(affordableDishes)
      );
      localStorage.setItem("popular-dishes", JSON.stringify(popularDishes));
      localStorage.setItem("quick-dishes", JSON.stringify(quickDishesList));
    },
  });
};

export default MenumaticListeners;
