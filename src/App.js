import Testsuit from "./Pages/Testsuit/Testsuit";
import Testcase from "./Pages/Testcase/Testcase";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ValidationTag from "./Pages/ValidationTag/ValidationTag";
import { DataBaseContextProvider } from "./Contexts/DatabaseContext.js";
import TreePage from "./Pages/TreePage/TreePage.js";
import HomePage from "./Pages/Welcome/HomePage.js";
import BasePage from "./Pages/Base";
import SearchPage from "./Pages/SearchPage/SearchPage";
import ConnectedPage from "./Pages/ConnectedPage/ConnectedPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import FOFPage from "./Pages/404Page/FOFPage";

function App() {
  return (
    <DataBaseContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/old/" element={<BasePage />}>
            <Route path="testsuits" element={<Testsuit />} />
            <Route path="testcases" element={<Testcase />} />
            <Route path="validtags" element={<ValidationTag />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/tree" element={<TreePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/connected" element={<ConnectedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<FOFPage />} />
        </Routes>
      </BrowserRouter>
    </DataBaseContextProvider>
  );
}

export default App;
