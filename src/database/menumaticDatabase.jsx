import React from "react";
import { listenerMiddleware } from "../store/store";
import {
  saveFoodPrefToMenumaticDb,setSelectedList
} from "../store/menumaticServerAPISlice";
import { saveTags, saveTagsByServer } from "../menu/filterPageSlice";
import { flushSpoonacularResults, searchBySpoonacularApiBulkAsync ,searchComplexBySpoonacularApiAsync,setResultsState } from "../store/spoonacularAPISlice";
const MenumaticDatabase = () => {


listenerMiddleware.startListening({
  actionCreator: setSelectedList,
  effect: async(action, listenerApi) => {
    const allUserList = listenerApi.getState().menumaticServerApi.userAllListPromise.data;
    const selectedList = allUserList.find((list) => list.id === action.payload.id);
    const allIds = selectedList.recipes.map((recipe) => {
      return { id: recipe.id, portions: recipe.portions };
    });
    listenerApi.dispatch(searchBySpoonacularApiBulkAsync(allIds))
  }
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
        console.log("Complex search is called by listener")
        listenerApi.dispatch(
            searchComplexBySpoonacularApiAsync({
              intolerances: action.payload.excludeTags,
              diet: action.payload.includeTags,
              saveOptOverwrite: true
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
        console.log("Complex search is called by listener")
        listenerApi.dispatch(
            searchComplexBySpoonacularApiAsync({
              intolerances: action.payload.excludeTags,
              diet: action.payload.includeTags,
              saveOptOverwrite: true
            })
          );
      } catch (e) {
        alert("Error in saving food pref to menumatic db, server is down");
      }
    },
  });
};

export default MenumaticDatabase;
