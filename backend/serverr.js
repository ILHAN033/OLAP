const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./db/dbConnectionn");
const cors = require("cors");
const User = require("./db/userr");

connectDB();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// parsing

app.use(express.json());

// middleware
app.use(cors());

//register
app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log(req.body);
    const user = new User({ email, username, password });
    await user.save();
    res.status(201).json({ message: "Registeration Successful" });
  } catch (error) {
    res.status(500).json({ message: "Registeration Failed" });
  }
});

// login
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res
//         .status(401)
//         .json({ error: "Invalid username or email or password" });
//     }
//     if (user.password !== password) {
//       return res
//         .status(401)
//         .json({ error: "Invalid username or email or password" });
//     }
//     res
//       .status(200)
//       .json({ message: "Login Successful", username: req.user.username });
//   } catch (error) {
//     res.status(500).json({ message: "Login Failed" });
//   }
// });

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res
      .status(200)
      .json({ message: "Login Successful", username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});
