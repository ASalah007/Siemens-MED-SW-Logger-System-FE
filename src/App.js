import Testsuit from "./Pages/Testsuit/Testsuit";
import Testcase from "./Pages/Testcase/Testcase";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ValidationTag from "./Pages/ValidationTag/ValidationTag";
import Welcome from "./Pages/Welcome/Welcome";
import { DataBaseContextProvider } from "./Contexts/DatabaseContext.js";
import TreePage from "./Pages/TreePage/TreePage.js";
import HomePage from "./Pages/Welcome/HomePage.js";
import BasePage from "./Pages/Base";

function App() {
  return (
    <DataBaseContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasePage />}>
            <Route index element={<HomePage />} />
            <Route path="/testsuits" element={<Testsuit />} />
            <Route path="/testcases" element={<Testcase />} />
            <Route path="/validtags" element={<ValidationTag />} />
            <Route path="/tree" element={<TreePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataBaseContextProvider>
  );
}

export default App;
