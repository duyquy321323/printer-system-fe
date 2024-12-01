// import React from "react";
// import "./Login.css";
// import illustrator from './../../assets/image/Illustration.png';
// const Login = () => {
//   return (
//     <div className="login-container">
//       {/* Left Section */}
//       <div className="login-left">
//         <img
//           src="illustrator"
//           alt="Illustration"
//           className="illustration-image"
//         />
//       </div>

//       {/* Right Section */}
//       <div className="login-right">
//         <div className="login-form">
//           <h2>Chào mừng đã đến với dịch vụ in ấn</h2>
//           <h3>HCMUT_SPSS</h3>
//           <form>
//             <div className="input-group">
//               <label>Email</label>
//               <input type="email" placeholder="johndadev" />
//             </div>
//             <div className="input-group">
//               <label>Password</label>
//               <input type="password" placeholder="***********" />
//             </div>
//             <button type="submit" className="login-button">
//               LOG IN
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeBackDrop, loginAction, openBackDrop } from "../../redux/action";
import api from "../api";
import illustrator from './../../assets/image/Illustration.png';
import "./Login.css";
import { Backdrop, CircularProgress } from "@mui/material";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const open = useSelector(state => state.backdropAction);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      dispatch(openBackDrop());
      const response = await api.post(`account/login?email=${email}&password=${password}`);
      dispatch(loginAction(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("expiryTime", response.data.expiryTime);
      navigate("cnpm/src/components/homepage");
    }catch(e){
      console.error(e);
    }
    dispatch(closeBackDrop());
  };

  return (
    <div className="login-container">
      {/* Phần bên trái */}
      <div className="login-left">
        <div className="illustration">
          <img
            src={illustrator}
            alt="Illustration"
            className="illustration-image"
          />
        </div>
      </div>
<Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Phần bên phải */}
      <div className="login-right">
        <div className="login-form">
          <h2>Chào mừng đã đến với dịch vụ in ấn</h2>
          <h3>HCMUT_SPSS</h3>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="text"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
