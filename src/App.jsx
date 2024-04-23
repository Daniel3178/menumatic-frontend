import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePagePresenter from "./homepage/homePagePresenter";
import FilterPagePresenter from "./filterpage/filterPagePresenter";
import DanielTestPresenter from "./test/danielTestPresenter";
import CreatePDFForm from "./pdf/pdfgen_component";
import RecommendationPagePresenter from "./recommendation_page/recommendationPagePresenter";
import ShoplistPagePresenter from "./shoplist/shoplistPagePresenter";
import SignUpPagePresenter from "./signUp_page/signUpPagePresenter";
import SignInPagePresenter from "./signIn_page/signInPagePresenter";
import RecipeDetailsPagePresenter from "./recepie_details_page/recipeDetailsPagePresenter";
// `path` contains the path for a current page. `element` contains the page to which the current page's redirect operations will lead.
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pdf-test" element={<CreatePDFForm />} />
        <Route path="/daniel-test" element={<DanielTestPresenter />} />
        <Route
          path="/recommendation"
          element={<RecommendationPagePresenter />}
        />
        <Route path="/" element={<HomePagePresenter />} />
        <Route path="/filterpage-test" element={<FilterPagePresenter />} />
        <Route path="/shoplist-test" element={<ShoplistPagePresenter />} />
        <Route path="/signup" element={<SignUpPagePresenter />} />
        <Route path="/signIn" element={<SignInPagePresenter />} />
        <Route path="/recipeDetails" element={<RecipeDetailsPagePresenter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
