import express from "express"
import {
  googleRegister,
  googleLogin,
  register,
  login,
  logout,
  sendOTP,
  verifyOTP,
  resetPassword
} from "../controllers/auth.controller.js";
const authRouter = express.Router();


authRouter.post("/register", register);
authRouter.post("/register/google-auth", googleRegister);
authRouter.post("/login/google-auth", googleLogin);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/send-otp", sendOTP);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);



export default authRouter;