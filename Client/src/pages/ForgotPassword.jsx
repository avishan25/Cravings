import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stage, setStage] = useState("1");

  const sendOTP = async () => {
    try {
      const payload = { email };

      const result = await axios.post(
        "http://localhost:4500/api/auth/send-otp",
        payload,
        { withCredentials: true },
      );
      toast.success(result.data.message)
      setStage("2");
    } catch (error) {
      toast.error(error.response?.data?.message ||"Internal Server Error")
      console.log(error)
    }
  };

  const verifyOTP = async () => {
    try {
      const payload = { email, OTP };
      const result = await axios.post(
        "http://localhost:4500/api/auth/verify-otp",
        payload,
        { withCredentials: true },
      );
      toast.success(result.data.message);

      setStage("3");
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };

  const resetPassword = async () => {
    try {
      const payload = { email, password };

      const result = await axios.post(
        "http://localhost:4500/api/auth/reset-password",
        payload,
        { withCredentials: true },
      );
      toast.success(result.data.message);
      setStage("1");
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <div className="w-full bg-bgColor flex justify-center min-h-screen items-center">
      <div className="bg-white max-h-fit px-4 py-3 rounded-lg shadow gap-5">
        <h1 className="text-primaryColor font-bold text-2xl text-center my-5">
          Forgot Password
        </h1>
        {stage === "1" && (
          <div className="flex flex-col w-full min-w-md gap-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-borderColor rounded-lg px-4 py-3 outline-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="w-full text-white px-4 py-3 bg-primaryColor cursor-pointer rounded-lg "
              onClick={sendOTP}
            >
              Send OTP
            </button>
          </div>
        )}

        {stage === "2" && (
          <div className="flex flex-col w-full min-w-md gap-5">
            <input
              type="text"
              placeholder="Enter OTP"
              className="border border-borderColor rounded-lg px-4 py-3 outline-0"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
            />

            <button
              className="w-full text-white px-4 py-3 bg-primaryColor cursor-pointer rounded-lg "
              onClick={verifyOTP}
            >
              Verify OTP
            </button>
          </div>
        )}
        {stage === "3" && (
          <div className="flex flex-col w-full min-w-md gap-5">
            <div className="w-full min-w-md gap-5">
              <input
                type="text"
                placeholder="Enter new Password"
                className="border border-borderColor rounded-lg px-4 py-3 w-full outline-0"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Confirm new Password"
                className="border border-borderColor rounded-lg px-4 py-3 w-full outline-0"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full text-white px-4 py-3 bg-primaryColor cursor-pointer rounded-lg "
              onClick={resetPassword}
            >
              Change Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
