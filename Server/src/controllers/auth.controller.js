import User from "../models/user.model.js";
import genToken from "../utils/token.js";
import {
  loginSchema,
  registerSchema,
  googleRegisterSchema,
} from "../validators/authValidator.js";
import bcrypt from "bcrypt";
import sendOTPMail from "../utils/mail.js";

export const register = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ message: "Validation failed" });
    }

    const { fullName, email, phone, password } = result.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    const hashedpswd = await bcrypt.hash(password, 10);

    let user = {
      fullName,
      email,
      phone,
      password: hashedpswd,
    };

    user = await User.create(user);

    const token = genToken(user._id);

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    const data = {
      fullName,
      email,
      phone,
    };
    res
      .status(201)
      .json({ message: "User Registered Successfully !", data: data });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid Input Data" });
    }
    const { email, password } = result.data;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User Does not Exists" });
    }

    const isValidPswd = await bcrypt.compare(password, user.password);

    if (!isValidPswd) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "User Logged in Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "User logged out successfully!" });
  } catch (error) {
    return res.status(500).json({message:"Internal Server Error"})
  }
};

export const googleRegister = async (req, res) => {
  try {
    const result = googleRegisterSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ message: "Invalid Input data" });
    }
    const { fullName, email, phone, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    let user = {
      fullName,
      email,
      phone,
      role,
    };
    user = await User.create(user);
    const token = genToken(user._id);

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "Registration Successfull!", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    const result = {
      email,
      fullName: user.fullName,
    };

    return res.status(200).json({ message: "Login Successfull!", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOTPMail(email, OTP);

    user.resetOTP = await bcrypt.hash(OTP, 10);
    user.OTPexpire = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();
    res.status(200).json({ message: "OTP sent successfully !" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });

  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, OTP } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    if (!user.resetOTP || !user.OTPexpire || user.OTPexpire < Date.now()) {
      return res.status(400).json({ message: "OTP Expired" });
    }

    const isVerified = await bcrypt.compare(String(OTP), user.resetOTP);

    if (!isVerified) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    
   
    user.isOTPVerified = true;
    await user.save();

    return res.status(200).json({ message: "OTP Verified Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }
    if (!user.OTPexpire || user.OTPexpire < Date.now() || !user.isOTPVerified) {
      return res.status(401).json({ message: "OTP is not verified" });
    }
    user.resetOTP="";
    user.OTPexpire=""
    user.isOTPVerified=false
    const hashedPswd = await bcrypt.hash(password, 10);
    user.password = hashedPswd;
    await user.save();
    user.isOTPVerified = false;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
