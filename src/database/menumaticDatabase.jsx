import React from "react";
import { listenerMiddleware } from "../store/store";
import { setSelectedListId } from "../listOfStoredPlansRelated/plan_list/planListSlice";
import { useDispatch } from "react-redux";
import {
  fetchUserRecepiesByListId,
  saveFoodPrefToMenumaticDb,
} from "../store/menumaticServerAPISlice";
import { saveTags } from "../menu/filterPageSlice";
import { flushSpoonacularResults, searchComplexBySpoonacularApiAsync,setResultsState } from "../store/spoonacularAPISlice";
const MenumaticDatabase = () => {
  //TODO: DEPRICATED
  listenerMiddleware.startListening({
    actionCreator: setSelectedListId,
    effect: async (action, listenerApi) => {},
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
        listenerApi.dispatch(setResultsState("loading"));
        listenerApi.dispatch(flushSpoonacularResults());
        listenerApi.dispatch(
            searchComplexBySpoonacularApiAsync({
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
