import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// REGISTER
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = await User.create({ username, email, password });

    return res.status(201).json({ message: "User registered successfully" });
  } 
  catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check password
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

export { register, login };
