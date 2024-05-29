import React, { useState, useEffect } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

const confirmETLProcess = () => {
  return Swal.fire({
    title: "Perform ETL Process?",
    text: "Do you want to start the ETL process?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#FF4820",
    cancelButtonColor: "#003285",
    confirmButtonText: "Yes, start it!",
    cancelButtonText: "No, cancel!",
  });
};

const Login = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://20.2.249.58:5000/login",
        loginData
      );
      const { message, username } = response.data;
      if (response.status === 200) {
        setIsLogin(true);
        toast.success(message);
        toast.info("Here the measure table is Sales Table.");
        const result = await confirmETLProcess();
        if (result.isConfirmed) {
          navigate("/loading");
          setTimeout(() => {
            navigate("/model");
          }, 7000);
        } else {
          navigate("/model");
        }
      }
    } catch (error) {
      console.error("Login Error", error.response.data.error);
      toast.error(error.response.data.error);
    }
    setLoginData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="h-screen flex items-center bg-radial-gradient">
      <div
        className={
          isLogin ? "w-full h-2/5 flex justify-center" : "form-container"
        }
      >
        {isLogin ? (
          navigate("/model")
        ) : (
          <>
            <h2>Login</h2>
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

              <button id="login-btn">Login in</button>
            </form>
            <NavLink to="/signup">
              <p className="text-white">Create an account?</p>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

// const Login = ({ isLogin, setIsLogin }) => {
//   console.log("Before Loging", isLogin);
//   const navigate = useNavigate();
//   const [loginData, setLoginData] = useState({
//     username: "",
//     password: "",
//   });

//   function handleLogin(e) {
//     const { name, value } = e.target;
//     setLoginData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   async function handleLoginSubmit(e) {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/login",
//         loginData
//       );
//       const { message, username } = response.data;
//       if (response.status === 200) {
//         setIsLogin(true);
//         toast.success(message);
//         toast.info("Here the measure table is Sales Table.");
//         console.log("After loging first time ", isLogin);
//       }
//     } catch (error) {
//       console.error("Login Error", error.response.data.error);
//       toast.error(error.response.data.error);
//     }
//     setLoginData({
//       username: "",
//       password: "",
//     });
//   }

//   return (
//     <>
//       <div className=" h-screen flex items-center  bg-radial-gradient ">
//         <div
//           className={
//             isLogin ? " w-full h-2/5 flex justify-center " : "form-container"
//           }
//         >
//           {isLogin ? (
//             navigate("/model")
//           ) : (
//             <>
//               <h2>Login</h2>
//               <form onSubmit={handleLoginSubmit}>
//                 <label htmlFor="username">Username:</label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={loginData.username}
//                   onChange={handleLogin}
//                   required
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={loginData.password}
//                   onChange={handleLogin}
//                   required
//                 />

//                 <button id="login-btn">Login in</button>
//               </form>
//               <NavLink to="/signup">
//                 <p className="text-white">Create an account?</p>
//               </NavLink>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default Login;
