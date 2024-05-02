require("dotenv").config();
// const router = express.Router();
const connectDB = require("./server/config/db");
const User = require("./server/models/User");
const bcrypt = require("bcrypt");
const cors = require("cors");
const methodOverride = require("method-override");

const express = require("express");

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ credentials: true, origin: true }));
connectDB();

app.post("/create-post", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    console.log(password, name, email, phone);
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
      console.log("user created successfully");
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

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
