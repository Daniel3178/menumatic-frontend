import React from 'react'
import { listenerMiddleware } from '../store/store'
import {setSelectedListId} from '../listOfStoredPlansRelated/plan_list/planListSlice'
import { useDispatch } from 'react-redux'
import { fetchUserRecepiesByListId, saveFoodPrefToMenumaticDb } from '../store/menumaticServerAPISlice'
import { saveTags } from '../menu/filterPageSlice'
const MenumaticDatabase = () => {

//TODO: DEPRICATED    
listenerMiddleware.startListening({
    actionCreator: setSelectedListId,
    effect: async (action, listenerApi) => {
    }
});

listenerMiddleware.startListening({
    actionCreator: saveTags,
    effect: async (action, listenerApi) => {
        ////console.log("Listenere middleware is called", action.payload)
        const userId = listenerApi.getState().userAccount.userId;
        try{
            listenerApi.dispatch(saveFoodPrefToMenumaticDb({userId: userId, data: action.payload}));
        }
        catch(e){
            alert("Error in saving food pref to menumatic db, server is down")
        }
}});

}

export default MenumaticDatabase