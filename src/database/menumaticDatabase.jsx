import React from "react";
import { listenerMiddleware } from "../store/store";
import {
  fetchUserFoodPref,
  fetchUserShopinglist,
  fetchExcludedIngredients,
  saveFoodPrefToMenumaticDb,
  setSelectedList,
} from "../store/menumaticServerAPISlice";
import { saveTags, saveTagsByServer } from "../menu/filterPageSlice";
import {
  searchBySpoonacularApiBulkAsync,
  searchComplexBySpoonacularApiAsync,
} from "../store/spoonacularAPISlice";
import { deleteMealPlan, deleteList } from "../store/menumaticServerAPISlice";
import { popFirstRecipe } from "../store/spoonacularAPISlice";
import { incrementLikesCounter } from "../homepage/homePageSlice";
import { signInCurrentUser } from "../signUp_page/userAccountSlice";

const MenumaticDatabase = () => {
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
        alert("Error in deleting list, server is down");
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
};

export default MenumaticDatabase;
