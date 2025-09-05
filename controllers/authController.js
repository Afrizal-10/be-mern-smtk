const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {expiresIn: "30d"}
  );
};

const registerUser = async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const exists = await User.findOne({email});
    if (exists) return res.status(400).json({message: "Email sudah terdaftar"});

    const user = await User.create({name, email, password});
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user), // ⬅️ kirim user, bukan user._id
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user), // ⬅️ kirim user
      });
    } else {
      res.status(401).json({message: "Email atau password salah"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {registerUser, loginUser};
