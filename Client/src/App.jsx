import React from "react";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
const App = () => {
  useGetCurrentUser();
  useGetCity()
  const{userData} =useSelector(state=>state.user)
  console.log(userData)
  return (
    <>
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!userData ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
        />
      </Routes>
    </>
  );
};

export default App;
