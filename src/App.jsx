import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePagePresenter from "./homepage/homePagePresenter";
import FilterPagePresenter from "./filterpage/filterPagePresenter";
import DanielTestPresenter from "./test/danielTestPresenter";
import GustavTestPresenter from "./test/gustavTestPresenter";
import CreatePDFForm from "./pdf/pdfgen_component";
import RecommendationPagePresenter from "./recommendation_page/recommendationPagePresenter";
import ShoplistPagePresenter from "./shoplist/shoplistPagePresenter";
// The elements related to stored plans
import PlanListPresenter from "./listOfStoredPlansRelated/plan_list/planListPresenter";
import PlanPresenter from "./listOfStoredPlansRelated/plan_content/planPresenter";
import SignUpPagePresenter from "./signUp_page/signUpPagePresenter";
import SignInPagePresenter from "./signIn_page/signInPagePresenter";
import RecipeDetailsPagePresenter from "./recepie_details_page/recipeDetailsPagePresenter";
import MenuPresenter from "./menu/menuPresenter";
// `path` contains the path for a current page. `element` contains the page to which the current page's redirect operations will lead.
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-row">
        <div className="z-50">
        <MenuPresenter />
        </div>
        <div className="right-74">
          <Routes>
            <Route path="/pdf-test" element={<CreatePDFForm />} />
            <Route path="/daniel-test" element={<DanielTestPresenter />} />
            <Route path="/gustav-test" element={<GustavTestPresenter />} />
            <Route
              path="/recommendation"
              element={<RecommendationPagePresenter />}
            />
            <Route path="/" element={<HomePagePresenter />} />
            <Route path="/filterpage-test" element={<FilterPagePresenter />} />
            <Route path="/shoplist-test" element={<ShoplistPagePresenter />} />
            <Route path="/plan_list" element={<PlanListPresenter />} />
            <Route path="/plan" element={<PlanPresenter />} />
            <Route path="/signup" element={<SignUpPagePresenter />} />
            <Route path="/signIn" element={<SignInPagePresenter />} />
            <Route
              path="/recipeDetails"
              element={<RecipeDetailsPagePresenter />}
            />
            <Route path="/jonathan-test" element={<MenuPresenter />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
