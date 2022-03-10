import { Route, BrowserRouter, Routes } from "react-router-dom";
import { GobalStyled } from "./themes/global";
import Error404 from "./pages/404";
// Components
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* error 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
      <GobalStyled/>
    </>
  );
}

export default App;
