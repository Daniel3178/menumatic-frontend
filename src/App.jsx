import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePagePresenter from "./homepage/homePagePresenter"
import FilterPagePresenter from "./filterpage/filterPagePresenter"
import DanielTestPresenter from "./test/danielTestPresenter";
import CreatePDFForm from "./pdf/pdfgen_component"
import RecommendationPagePresenter from "./recommendation_page/recommendationPagePresenter";
import ShoplistPagePresenter from "./shoplist/shoplistPagePresenter"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pdf-test" element={<CreatePDFForm />} />
        <Route path="/daniel-test" element={<DanielTestPresenter/>}/>
        <Route path="/recommendation" element={<RecommendationPagePresenter/>}/>
        <Route path="/" element={<HomePagePresenter/>}/>
        <Route path="/filterpage-test" element={<FilterPagePresenter/>}/>
        <Route path="/shoplist-test" element={<ShoplistPagePresenter/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
