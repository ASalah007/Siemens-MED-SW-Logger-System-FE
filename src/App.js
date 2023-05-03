import "./App.css";
import Navbar from "./Components/Navbar/Navbar.js";

// import pages
import Testsuit from "./Pages/Testsuit/Testsuit";
import Testcase from "./Pages/Testcase/Testcase";

//import components
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ValidationTag from "./Pages/ValidationTag/ValidationTag";
import ValidationPoints from "./Pages/ValidationPoints/ValidationPoints";

function App() {
  return (
    <>
      <Navbar />
      <br />
      <BrowserRouter>
        <Routes>
          <Route path="/testsuits" element={<Testsuit />} />
          <Route path="/testcases" element={<Testcase />} />
          <Route path="/validtags" element={<ValidationTag />} />
          <Route path="/validpoints" element={<ValidationPoints />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
