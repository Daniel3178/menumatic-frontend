import React from 'react'
import { listenerMiddleware } from '../store/store'
import {setSelectedListId} from '../listOfStoredPlansRelated/plan_list/planListSlice'
import { useDispatch } from 'react-redux'
import { fetchUserRecepiesByListId, saveFoodPrefToMenumaticDb } from '../store/menumaticServerAPISlice'
import { saveTags } from '../filterpage/filterPageSlice'
import { save } from 'pdfkit'
const MenumaticDatabase = () => {

listenerMiddleware.startListening({
    actionCreator: setSelectedListId,
    effect: async (action, listenerApi) => {
        // console.log(action.payload)
        //TODO: uncomment when server is ready
    //    await listenerApi.dispatch(fetchUserRecepiesByListId(action.payload))
    }
});

listenerMiddleware.startListening({
    actionCreator: saveTags,
    effect: async (action, listenerApi) => {
        console.log(action.payload)
        const userId = listenerApi.getState().userAccount.userId;
        try{
            listenerApi.dispatch(saveFoodPrefToMenumaticDb({userId: userId, data:action.payload}));
        }
        catch(e){
            alert("Error in saving food pref to menumatic db, server is down")
        }
}});

}

export default MenumaticDatabase