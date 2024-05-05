// import React, { useState } from "react";
// import "./login.css";
// import { NavLink, useNavigate } from "react-router-dom";
// import Nav from "./Nav";
// import axios from "axios";

// const Login = ({ isLogin, setIsLogin }) => {
//   const [name, setName] = useState("");
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
//       const { success, message, username } = response.data;
//       if (success) {
//         // setIsLogin(true);
//         console.log("Login Successful");
//       } else {
//         // console.log(username);
//         console.log(isLogin);
//         console.log(message);
//         setIsLogin(true);
//         console.log(isLogin);
//         console.log(username);
//         setName(username);
//       }
//     } catch (error) {
//       setIsLogin(false);
//       console.error("Login Error", error.response);
//     }
//     setLoginData({
//       username: "",
//       password: "",
//     });
//     // console.log(isLogin);
//   }
//   // console.log(name);

//   return (
//     <>
//       <Nav name={name} isLogin={isLogin} />
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
//               <NavLink to="/signup">Create an account </NavLink>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default Login;

import React, { useState } from "react";

function Login() {
  const [name, setName] = useState("");
  const handleData = () => {
    setName("hello");
  };
  return (
    <div>
      <button data-testid="btn1" onClick={handleData}>
        Update
      </button>
      <p>{name}</p>
    </div>
  );
}

export default Login;
