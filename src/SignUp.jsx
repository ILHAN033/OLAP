import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
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
    if (!registerData.email || !/\S+@\S+\.\S+/.test(registerData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const response = await axios.post(
        "https://20.2.249.58:5000/register",
        registerData
      );
      navigate("/login");
      console.log(response.data);
      toast.success("Registeration Successful");
    } catch (error) {
      console.log("Register Error", error);
      toast.error(error.response.data.error);
    }
    setRegisterData({
      username: "",
      email: "",
      password: "",
    });
  }

  return (
    <>
      <div className=" h-screen flex items-center bg-radial-gradient">
        <div className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleRegisterSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="px-2 py-2"
              value={registerData.email}
              onChange={handleRegister}
            />
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              className="px-2 py-2"
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

            <button className="text-white"> Sign Up</button>
          </form>

          <NavLink to="/login">
            <p className="text-white">Already have an account?</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default Signup;
