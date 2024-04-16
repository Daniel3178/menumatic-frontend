import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import spoonacularAPISlice from "./spoonacularAPISlice";
import homePageSlice from "../homepage/homePageSlice";

export const listenerMiddleware = createListenerMiddleware();
export const store = configureStore({
    reducer: {
        spoonacularApi: spoonacularAPISlice,
        homePage: homePageSlice,
        // user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})