import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataBaseContextProvider } from "./Contexts/DatabaseContext.js";
import TreePage from "./Pages/TreePage/TreePage.js";
import HomePage from "./Pages/Welcome/HomePage.js";
import SearchPage from "./Pages/SearchPage/SearchPage";
import ConnectedPage from "./Pages/ConnectedPage/ConnectedPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import Testsuit from "./Pages/Testsuit/Testsuit";

import BasePage from "./Pages/Base";
import LoginPage from "./Pages/LoginPage/LoginPage.js";
import SignupPage from "./Pages/SignupPage/SignupPage.js";
import FOFPage from "./Pages/404Page/FOFPage.js";
import Testcase from "./Pages/Testcase/Testcase.js";
import ValidationTag from "./Pages/ValidationTag/ValidationTag.js";
import AuthPagesBase from "./Pages/AuthPagesBase/AuthPagesBase.js";
import DocPage from "./Pages/DocPage/DocPage.js";

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
          <Route path="/" element={<AuthPagesBase />}>
            <Route index element={<HomePage />} />
            <Route path="/tree" element={<TreePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/connected" element={<ConnectedPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/doc" element={<DocPage />} />
          <Route path="*" element={<FOFPage />} />
        </Routes>
      </BrowserRouter>
    </DataBaseContextProvider>
  );
}

export default App;
