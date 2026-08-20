import { use } from "react";
import User from "../models/user.model.js";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "Invalid access" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User does not Exists" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("getCurrentUser Eror", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
