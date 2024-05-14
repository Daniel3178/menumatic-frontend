const getExcludeTags = () => {
  return JSON.parse(localStorage.getItem("exclude-tags")) || [];
};

const getIncludeTags = () => {
  return JSON.parse(localStorage.getItem("include-tags")) || [];
};

const getMealsInPlan = () => {
  return JSON.parse(localStorage.getItem("meals-in-plan")) || 7;
};

const getLocalShoplist = () => {
  return JSON.parse(localStorage.getItem("shoplist")) || [];
};

const getLocalRemovedItems = () => {
  return JSON.parse(localStorage.getItem("removed-items")) || [];
};

const getLocalSelectedTab = () => {
  return JSON.parse(localStorage.getItem("selected-tab")) || "Popular";
};

const getLocalAffordableDishes = () => {
  return JSON.parse(localStorage.getItem("affordable-dishes")) || [];
};

const getLocalPopularDishes = () => {
  return JSON.parse(localStorage.getItem("popular-dishes")) || [];
};

const getLocalQuickDishes = () => {
  return JSON.parse(localStorage.getItem("quick-dishes")) || [];
};

const fetchLocalFoodPref = () => {
  const excludeTags = getExcludeTags();
  const includeTags = getIncludeTags();
  const mealsInPlan = getMealsInPlan();
  return { excludeTags, includeTags, mealsInPlan };
};

const flushLocalDishInfo = () =>{
  localStorage.removeItem("removed-items");
  localStorage.removeItem("shoplist");
  localStorage.removeItem("affordable-dishes");
  localStorage.removeItem("popular-dishes");
  localStorage.removeItem("quick-dishes");
  localStorage.removeItem("selected-tab");
}

export {
  getExcludeTags,
  getIncludeTags,
  getMealsInPlan,
  getLocalShoplist,
  getLocalRemovedItems,
  getLocalSelectedTab,
  getLocalAffordableDishes,
  getLocalPopularDishes,
  getLocalQuickDishes,
  fetchLocalFoodPref,
  flushLocalDishInfo,
};
