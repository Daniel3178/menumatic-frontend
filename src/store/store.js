import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import spoonacularAPISlice from "./spoonacularAPISlice";
import recommendationSlice from "./recommendationPageSlice";
export const listenerMiddleware = createListenerMiddleware();
export const store = configureStore({
    reducer: {
        spoonacularApi: spoonacularAPISlice,
        // user: userReducer,
        recommendation: recommendationSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})