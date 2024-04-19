import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import spoonacularAPISlice from "./spoonacularAPISlice";
import recommendationSlice from "../recommendation_page/recommendationPageSlice";
import homePageSlice from "../homepage/homePageSlice";
import shoplistSlice from "../shoplist/shoplistSlice";
import filterPageSlice from "../filterpage/filterPageSlice";

export const listenerMiddleware = createListenerMiddleware();
export const store = configureStore({
    reducer: {
        spoonacularApi: spoonacularAPISlice,
        homePage: homePageSlice,
        shoplist: shoplistSlice,
        recommendation: recommendationSlice,
        filterPage: filterPageSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})