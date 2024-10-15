import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/Navbars";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Graffiti from "./components/graffiti/Graffiti";
import Register from "./components/Register/Register";
import Profile from "./components/profile/Profile";
import Upload from "./components/upload/Upload";
import Prova from "./components/prova";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graffiti" element={<Graffiti />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/prova" element={<Prova />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
