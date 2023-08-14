import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataBaseContextProvider } from "./Contexts/DatabaseContext.js";
import TreePage from "./Pages/TreePage/TreePage.js";
import HomePage from "./Pages/Welcome/HomePage.js";
import SearchPage from "./Pages/SearchPage/SearchPage";
import ConnectedPage from "./Pages/ConnectedPage/ConnectedPage";

const BasePage = React.lazy(() => import("./Pages/Base"));
const LoginPage = React.lazy(() => import("./Pages/LoginPage/LoginPage"));
const SignupPage = React.lazy(() => import("./Pages/SignupPage/SignupPage"));
const FOFPage = React.lazy(() => import("./Pages/404Page/FOFPage"));
const Testsuit = React.lazy(() => import("./Pages/Testsuit/Testsuit"));
const Testcase = React.lazy(() => import("./Pages/Testcase/Testcase"));
const ValidationTag = React.lazy(() =>
  import("./Pages/ValidationTag/ValidationTag")
);

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
