import "./nav.css";
import logo from "./assets/nav1.png";
import { NavLink } from "react-router-dom";

const Nav = ({ name, isLogin }) => {
  console.log(isLogin);
  return (
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
            <a href="/About">About Us</a>
          </p>
          <p>
            <NavLink to="/contact">Contact Us</NavLink>
          </p>
        </div>
      </div>
      <div className="olap_navbar-sign">
        <NavLink to="/login">
          {isLogin ? (
            <div className=" h-20 px-1 rounded-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 mr-4 flex justify-center items-center text-white">
              {name}
            </div>
          ) : (
            <p>Login in</p>
          )}

          {/* <p>{isLogin ? `${name.charAt(0)}` : "Login in"}</p> */}
        </NavLink>
        <button type="button">
          <NavLink to="/signup">Sign Up</NavLink>
        </button>
      </div>
      <div className="olap_navbar-menu"></div>
    </div>
  );
};

export default Nav;
