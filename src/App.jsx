import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/Navbars";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Graffiti from "./components/graffiti/Graffiti";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graffiti" element={<Graffiti />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
