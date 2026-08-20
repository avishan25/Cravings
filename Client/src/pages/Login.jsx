import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase.js";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoginSchema from "../validator/LoginValidator.jsx";
import Logo from "../assets/CravingsLogo.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {};
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      

      
      
      const googleEmail = result.user.email;

      setEmail(googleEmail);

      const payload = {
        email: googleEmail,
      };
 
      const res = await axios.post(
        "http://localhost:4500/api/auth/login/google-auth",
        payload,
        { withCredentials: true },
      );
      dispatch(setUserData(res.data.data));
     
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data.message || "Invalid Input");
      console.log(err);
    }
  };
  return (
    <div className="bg-bgColor  backdrop-blur-3xl w-full flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 border-[1px] border-borderColor flex flex-col gap-2">
        {/* LOGO */}
        <div className="flex items-center justify-center ">
          <img src={Logo} className="h-20" alt="" />
          <h1 className="font-bold text-primaryColor text-3xl text-center ">
            2 YUM{" "}
          </h1>
        </div>

        <div className="flex flex-col max-w-screen">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className="bg-white w-full border rounded-lg focus:outline-none focus:border-primaryColor px-3 py-2 border-borderColor"
          />
          {fieldErrors.email && (
            <span className="text-red-500 my-1 px-1">{fieldErrors.email}</span>
          )}
        </div>

        <div className="flex flex-col max-w-screen ">
          <label htmlFor="Password">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="bg-white w-full border rounded-lg focus:outline-none focus:border-primaryColor px-3 py-2 border-borderColor"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-3 cursor-pointer"
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>
          {fieldErrors.password && (
            <span className="text-red-500 my-1 px-1">
              {fieldErrors.password}
            </span>
          )}

          <p
            className="text-primaryColor text-end my-1 cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password ?
          </p>
        </div>

        <button
          className="bg-primaryColor px-3 py-2 text-white  w-full border rounded-lg focus:outline-none cursor-pointer hover:bg-hoverColor"
          onClick={handleLogin}
        >
          Login
        </button>

        <div
          className="flex items-center justify-center border border-borderColor w-full gap-2 my-2 py-1 rounded-lg cursor-pointer hover:bg-gray-300"
          onClick={() => handleGoogleAuth()}
        >
          <FcGoogle size={30} />
          Sign In with Google
        </div>

        <div onClick={() => navigate("/register")} className="text-center">
          Don't Have an account?{" "}
          <span className="text-primaryColor cursor-pointer">Register</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
