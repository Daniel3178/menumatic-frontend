import React from 'react'
import { listenerMiddleware } from '../store/store'
import {setSelectedListId} from '../listOfStoredPlansRelated/plan_list/planListSlice'
import { useDispatch } from 'react-redux'
import { fetchUserRecepiesByListId } from '../store/menumaticServerAPISlice'
const MenumaticDatabase = () => {

listenerMiddleware.startListening({
    actionCreator: setSelectedListId,
    effect: async (action, listenerApi) => {
        // console.log(action.payload)
        //TODO: uncomment when server is ready
    //    await listenerApi.dispatch(fetchUserRecepiesByListId(action.payload))
    }
})



}

export default MenumaticDatabase