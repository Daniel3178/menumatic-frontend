import { Route, Routes, BrowserRouter } from "react-router-dom";
import DanielTestPresenter from "./test/danielTestPresenter";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/daniel-test" element={<DanielTestPresenter/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
