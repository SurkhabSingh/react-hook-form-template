const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const cors = require("cors");


router.post("/create-post", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.body);

    try {
      const user = await User.create({
        name,
        phone,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User Created", user });
      console.log("use created successfully");
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit-user", async (req, res) => {});

module.exports = router;
