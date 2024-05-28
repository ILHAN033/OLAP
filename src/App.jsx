import Home from "./Home";
import Cube from "./components/Cube";
import SignUp from "./SignUp";
import Contact from "./Contact";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Model from "./components/Model";
import { useState } from "react";
import Intro from "./Intro";
import Nav from "./Nav";
import Loading from "./components/Loading";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Nav isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route
          index
          element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route
          path="/login"
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route path="cube" element={<Cube />} />
        <Route path="loading" element={<Loading />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="contact" element={<Contact />} />
        <Route path="model" element={<Model isLogin={isLogin} />} />
        <Route path="about" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
