import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import spoonacularAPISlice from "./spoonacularAPISlice";

export const listenerMiddleware = createListenerMiddleware();
export const store = configureStore({
    reducer: {
        spoonacularApi: spoonacularAPISlice,
        // user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})