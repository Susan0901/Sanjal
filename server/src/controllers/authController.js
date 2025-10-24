import bcrypt from "bcryptjs";
import { createToken } from "../utils/createToken.js";
import { User } from "../models/userModel.js";

export const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log(isPasswordMatch);

    if (!isPasswordMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    await createToken(res, existingUser, rememberMe);

    return res.status(200).json({
      message: "Logged in",
    });
  } catch (error) {
    console.log(`Failed to login: ${error}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered",
      user: user,
    });
  } catch (error) {
    console.log(`Failed to register: ${error}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
