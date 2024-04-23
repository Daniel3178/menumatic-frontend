import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import spoonacularAPISlice from "./spoonacularAPISlice";
import recommendationSlice from "../recommendation_page/recommendationPageSlice";
import homePageSlice from "../homepage/homePageSlice";
import shoplistSlice from "../shoplist/shoplistSlice";
import filterPageSlice from "../filterpage/filterPageSlice";
import userAccountSlice from "../signUp_page/userAccountSlice";
import planListSlice from "../listOfStoredPlansRelated/plan_list/planListSlice";
import planSlice from "../listOfStoredPlansRelated/plan_content/planSlice";
import menumaticServerAPISlice from "./menumaticServerAPISlice";
export const listenerMiddleware = createListenerMiddleware();
export const store = configureStore({
  reducer: {
    spoonacularApi: spoonacularAPISlice,
    homePage: homePageSlice,
    shoplist: shoplistSlice,
    recommendation: recommendationSlice,
    filterPage: filterPageSlice,
    userAccount: userAccountSlice,
    planList: planListSlice,
    menumaticServerApi: menumaticServerAPISlice,
    plan: planSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
