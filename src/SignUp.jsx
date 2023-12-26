import React, { useState } from "react";
import "./login.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

const Signup = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleRegister(e) {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        registerData
      );
      console.log(response.data);
    } catch (error) {
      console.log("Register Error", error);
    }
    setRegisterData({
      username: "",
      email: "",
      password: "",
    });
  }

  return (
    <>
      <Nav />
      <div className=" h-screen flex items-center bg-radial-gradient ">
        <div className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleRegisterSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerData.email}
              onChange={handleRegister}
            />
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={registerData.username}
              onChange={handleRegister}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={registerData.password}
              onChange={handleRegister}
            />

            <button> Sign Up</button>
          </form>

          {/* <p onClick={handleToggle} className="toggle-btn">
           
          </p> */}
          <NavLink to="/login">Already have an account?</NavLink>
        </div>
      </div>
    </>
  );
};
export default Signup;
