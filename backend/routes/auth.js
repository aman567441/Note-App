const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { validationResult, body } = require("express-validator");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const jwt_secret = "amdhhydu78dndm"; // Define the JWT secret outside the route handlers

// Create a user using localhost://5000/api/auth/createuser
router.post("/createuser", [
  body("name", "Enter a valid name ").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password should be at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ success: false, errors: result.array() });
  }

  try {
    // Check whether user email exists or not
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success: false, error: "Sorry, this email ID already exists" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, jwt_secret);

    res.json({ success: true, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Authenticate user using localhost://5000/api/auth/login
router.post("/login", [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
], async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ success: false, errors: result.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, jwt_secret);
    res.json({ success: true, authtoken, name: user.name });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get logged in user data using localhost://5000/api/auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
