const asynchandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv').config();

//@desc register a user
//@route POST /api/user/register
//@access public
const register = asynchandler(async (req, res) => {
  const { username, email, password,role } = req.body;
  console.log(username, email, password);
  if (!username || !email || !password||!role) {
    res.status(400);
    throw new Error('ALL fields are mandatory');
  }
  console.log("user re")
  const userAvailable = await User.findOne({ email });
  console.log(userAvailable);
  if (userAvailable) {
    res.status(400);
    throw new Error('user already registered');
  }
  const Hashedpassword = await bcrypt.hash(password, 10);
  console.log(Hashedpassword);
  const user = await User.create({
    username,
    email,
    password: Hashedpassword,
    role,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data is not valid');
  }
  res.json({ message: 'register the user' });
});

//@desc login a user
//@route POST /api/user/login
//@access public
const login = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(password)
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const user = await User.findOne({ email });
  
  console.log(user)
  
  if (user && (await bcrypt.compare(password, user.password))) {
    
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('email or password is not valid');
  }
});

//@desc current user
//@route POST /api/user/current
//@access private
// const currentUser = asynchandler(async (req, res) => {
//   res.json(req.user);
// });

module.exports = { register, login };
