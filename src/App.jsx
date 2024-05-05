import Home from "./Home";
import Cube from "./components/Cube";
import SignUp from "./SignUp";
import Contact from "./Contact";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Model from "./components/Model";
import { useState } from "react";
import Intro from "./intro";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route path="/cube" element={<Cube />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/model" element={<Model />} />
        <Route path="/About" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
