import React, { useState } from "react";
import "./login.css";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";

const Login = ({ isLogin, setIsLogin }) => {
  const [name, setName] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  function handleLogin(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        loginData
      );
      const { success, message, username } = response.data;
      if (success) {
        // setIsLogin(true);
        console.log("Login Successful");
      } else {
        // console.log(username);
        // console.log(isLogin);
        console.log(message);
        setIsLogin(true);
        console.log(isLogin);
        console.log(username);
        setName(username);
      }
    } catch (error) {
      setIsLogin(false);
      console.error("Login Error", error.response);
    }
    setLoginData({
      username: "",
      password: "",
    });
    // console.log(isLogin);
  }
  // console.log(name);

  return (
    <>
      <Nav name={name} isLogin={isLogin} />
      <div className=" h-screen flex items-center bg-radial-gradient ">
        <div
          className={
            isLogin ? " w-full h-2/5 flex justify-center " : "form-container"
          }
        >
          {isLogin ? (
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center w-1/6 h-28">
              <NavLink to="/model">Lets Start</NavLink>
            </button>
          ) : (
            <>
              <h2>Login </h2>
              <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleLogin}
                  required
                />

                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLogin}
                  required
                />

                <button>Login in</button>
              </form>
              <NavLink to="/signup">Create an account </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Login;
