import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePagePresenter from "./homepage/homePagePresenter";
import RecommendationPagePresenter from "./recommendation_page/recommendationPagePresenter";
import ShoplistPagePresenter from "./shoplist/shoplistPagePresenter";
import PlanListPresenter from "./listOfStoredPlansRelated/plan_list/planListPresenter";
import PlanPresenter from "./listOfStoredPlansRelated/plan_content/planPresenter";
import RecipeDetailsPagePresenter from "./recepie_details_page/recipeDetailsPagePresenter";
import MenuPresenter from "./menu/menuPresenter";
import { logo, logoSmall } from "./assets";
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex justify-center">
        <div className="z-50">
          <MenuPresenter />
        </div>
        <div className="hidden lg:block absolute place-content-center w-444 h-102 mt-8 mb-8 pr-72">
          <a href="/">
            <img src={logo} />
          </a>
        </div>
        <div className="lg:hidden absolute place-content-start w-444 h-102 mt-8 mb-8">
          <a href="/">
            <img src={logoSmall} />
          </a>
        </div>
        <div className="">
          <Routes>
            <Route
              path="/recommendation"
              element={<RecommendationPagePresenter />}
            />
            <Route path="/" element={<HomePagePresenter />} />
            <Route path="/shoplist-test" element={<ShoplistPagePresenter />} />
            <Route path="/plan_list" element={<PlanListPresenter />} />
            <Route path="/plan" element={<PlanPresenter />} />
            <Route
              path="/recipeDetails"
              element={<RecipeDetailsPagePresenter />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
