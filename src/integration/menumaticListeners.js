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

  listenerMiddleware.startListening({
    actionCreator: signInCurrentUser,
    effect: async (action, listenerApi) => {
      const userId = action.payload.userId;
      await listenerApi.dispatch(fetchUserShopinglist(userId));
      await listenerApi.dispatch(fetchUserFoodPref(userId));
      listenerApi.dispatch(
        searchComplexBySpoonacularApiAsync({
          intolerances:
            listenerApi.getState().filterPage.apiPrefs.excludeTags.paramsArray,
          diet: listenerApi.getState().filterPage.apiPrefs.includeTags
            .paramsArray,
        })
      );
    },
  });

  listenerMiddleware.startListening({
    actionCreator: deleteList,
    effect: async (action, listenerApi) => {
      try {
        const userId = listenerApi.getState().userAccount.userId;
        if (userId) {
          listenerApi.dispatch(
            deleteMealPlan({
              userId: userId,
              mealPlanId: action.payload.listId,
            })
          );
        }
      } catch (e) {
        return (
          <div class="h-screen w-screen flex flex-col items-center justify-center bg-smokeWhite lg:mr-72 max-w-lg mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-32 h-32 text-gunmetal mb-10 stroke-cerulean stroke-[1.75]"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
            <h1 class="text-5xl font-extrabold text-gunmetal mb-4">
              Error in deleting list. Server is down.
            </h1>
            <p class="text-lg text-gunmetal">
              We're sorry for the inconvenience. Please try checking back later.
            </p>
          </div>
        );
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: popFirstRecipe,
    effect: async (action, listenerApi) => {
      const complexSearchResult =
        listenerApi.getState().spoonacularApi.complexSearchPromise.data;
      if (complexSearchResult.length < 6) {
        listenerApi.dispatch(
          searchComplexBySpoonacularApiAsync({
            intolerances:
              listenerApi.getState().filterPage.apiPrefs.excludeTags
                .paramsArray,
            diet: listenerApi.getState().filterPage.apiPrefs.includeTags
              .paramsArray,
          })
        );
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: incrementLikesCounter,
    effect: async (action, listenerApi) => {
      const complexSearchResult =
        listenerApi.getState().spoonacularApi.complexSearchPromise.data;
      if (complexSearchResult.length < 6 && complexSearchResult.length > 3) {
        listenerApi.dispatch(
          searchComplexBySpoonacularApiAsync({
            intolerances:
              listenerApi.getState().menu.filterPage.apiPrefs.excludeTags
                .paramsArray,
            diet: listenerApi.getState().menu.filterPage.apiPrefs.includeTags
              .paramsArray,
          })
        );
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setSelectedList,
    effect: async (action, listenerApi) => {
      const { id } = action.payload;
      const allUserList =
        listenerApi.getState().menumaticServerApi.userAllListPromise.data;
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
      const userId = listenerApi.getState().userAccount.userId;
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
        return (
          <div class="h-screen w-screen flex flex-col items-center justify-center bg-smokeWhite lg:mr-72 max-w-lg mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-32 h-32 text-gunmetal mb-10 stroke-cerulean stroke-[1.75]"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
            <h1 class="text-5xl font-extrabold text-gunmetal mb-4">
              Error in saving food preferences to Menumatic DB. Server is down.
            </h1>
            <p class="text-lg text-gunmetal">
              We're sorry for the inconvenience. Please try checking back later.
            </p>
          </div>
        );
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
        return (
          <div class="h-screen w-screen flex flex-col items-center justify-center bg-smokeWhite lg:mr-72 max-w-lg mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-32 h-32 text-gunmetal mb-10 stroke-cerulean stroke-[1.75]"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
            <h1 class="text-5xl font-extrabold text-gunmetal mb-4">
              Error in saving food preferences to Menumatic DB. Server is down.
            </h1>
            <p class="text-lg text-gunmetal">
              We're sorry for the inconvenience. Please try checking back later.
            </p>
          </div>
        );
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
};

export default MenumaticListeners;
