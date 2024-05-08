import React from "react";
import { listenerMiddleware } from "../store/store";
import { setSelectedListId } from "../listOfStoredPlansRelated/plan_list/planListSlice";
import { useDispatch } from "react-redux";
import {
  saveFoodPrefToMenumaticDb,
} from "../store/menumaticServerAPISlice";
import { saveTags, saveTagsByServer } from "../menu/filterPageSlice";
import { flushSpoonacularResults, searchComplexBySpoonacularApiAsync,searchComplexBySpoonacularApiAsyncFoodPref,setResultsState } from "../store/spoonacularAPISlice";
const MenumaticDatabase = () => {

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
            searchComplexBySpoonacularApiAsyncFoodPref({
              intolerances: action.payload.excludeTags,
              diet: action.payload.includeTags,
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
            searchComplexBySpoonacularApiAsyncFoodPref({
              intolerances: action.payload.excludeTags,
              diet: action.payload.includeTags,
            })
          );
      } catch (e) {
        alert("Error in saving food pref to menumatic db, server is down");
      }
    },
  });
};

export default MenumaticDatabase;
