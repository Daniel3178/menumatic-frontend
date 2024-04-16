import { Route, Routes, BrowserRouter } from "react-router-dom";
import DanielTestPresenter from "./test/danielTestPresenter";
import CreatePDFForm from "./pdfgen"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div><h1>Hello World</h1></div>} />
        <Route path="/daniel-test" element={<DanielTestPresenter />} />
        <Route path="/pdf-test" element={<CreatePDFForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
