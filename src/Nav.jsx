import "./nav.css";
import logo from "./assets/nav1.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  function handleLogOut() {
    setIsLogin(false);
    console.log("First Time loging out", isLogin);
    navigate("/");
  }

  return (
    <>
      <div className="bg-radial-gradient olap_navbar">
        <div className="olap_navbar-links">
          <div className="olap_navbar-links_logo">
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="olap_navbar-links_component">
            <p>
              <NavLink to="/">Home</NavLink>
            </p>
            <p>
              <NavLink to="/about">About Us</NavLink>
            </p>
            <p>
              <NavLink to="/contact">Contact Us</NavLink>
            </p>
          </div>
        </div>
        <div className="olap_navbar-sign">
          {isLogin ? (
            <div
              className=" h-20 px-1 mr-4 flex justify-center items-center text-white cursor-pointer"
              onClick={handleLogOut}
            >
              Logout
            </div>
          ) : (
            <NavLink to="/login">
              <p>Login</p>
            </NavLink>
          )}
        </div>

        <button
          type="button"
          className="bg-orange-600 text-white text-xl px-2 py-2 rounded-full"
        >
          <NavLink to="/signup">Sign Up</NavLink>
        </button>
      </div>
    </>
  );
};

export default Nav;
