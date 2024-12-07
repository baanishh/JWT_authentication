const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/userModel"); // Adjust the path to your user model

// Register Controller
exports.registerController = async (req, res) => {
  console.log("inside register");
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    // Check if the user already exists
    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(406).json("User already registered");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new user
    const newUsers = new users({
        firstName,
        lastName,
      email,
      password: hashedPassword, // Store the hashed password
      phoneNumber
    });

    // Save the new user
    await newUsers.save();

    // Send response
    return res.status(200).json(newUsers);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login Controller
exports.loginController = async (req, res) => {
  console.log("inside login");
  const { email, password } = req.body;

  try {
    // Find user by email
    const existing = await users.findOne({ email });
    if (!existing) {
      return res.status(404).json("Invalid email or password");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, existing.password);
    if (!isPasswordMatch) {
      return res.status(404).json("Invalid email or password");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: existing._id },
      process.env.JWTPASSWORD, // Secret key from environment variables
      { expiresIn: "1h" } // Token expiration time
    );

    // Send user details and token
    return res.status(200).json({ user: existing, token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


//Get All users details
exports.getAllUser=async(req,res)=>{
    console.log("get all users");
    try {
        const getAllUsers=await users.find()
        res.status(200).json(getAllUsers)
    } catch (error) {
        res.status(401).json(error)
    }
}