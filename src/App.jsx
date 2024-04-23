import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePagePresenter from "./homepage/homePagePresenter";
import FilterPagePresenter from "./filterpage/filterPagePresenter";
import DanielTestPresenter from "./test/danielTestPresenter";
import CreatePDFForm from "./pdf/pdfgen_component";
import RecommendationPagePresenter from "./recommendation_page/recommendationPagePresenter";
import ShoplistPagePresenter from "./shoplist/shoplistPagePresenter";
// The elements related to stored plans
import PlanListPresenter from "./listOfStoredPlansRelated/plan_list/planListPresenter";
import PlanPresenter from "./listOfStoredPlansRelated/plan_content/planPresenter";
import PlanShoplistPagePresenter from "./listOfStoredPlansRelated/plan_shoplist/planShoplistPagePresenter";

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

        <Route path="/plan_list" element={<PlanListPresenter/>} />
        <Route path="/plan" element={<PlanPresenter/>}/>
        <Route path="/plan/shoplist" element={<PlanShoplistPagePresenter/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
