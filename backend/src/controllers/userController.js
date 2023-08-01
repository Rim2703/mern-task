const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const nodemailer = require('nodemailer');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'khanrimsha976@gmail.com',
    pass: 'rxcsmfljxsmnjpbt',
  },
});

// Register a new user with email and SMS OTP verification
const registerApi = async (req, res) => {
  try {
    const { name, email, phone, dob, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP to the provided email using Nodemailer
    await transporter.sendMail({
      from: 'khanrimsha976@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for account verification is: ${otp}`,
    });

    const profileImage = req.file ? req.file.path : '';

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user 
    const newUser = new User({
      name,
      email,
      phone,
      dob,
      profileImage,
      password: hashedPassword,
      otp,
    });
    await newUser.save()

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' })
  }
}


// User login
const loginApi = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("not match")
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'secret-key')

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}


//  check if email exists
const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp)
    // Send OTP to the provided email using Nodemailer
    await transporter.sendMail({
      from: 'khanrimsha976@gmail.com',
      to: email,
      subject: 'OTP Verification for Reset Password',
      text: `Your OTP for password change is: ${otp}`,
    });

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Change password api
const ChangePassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    const user = await User.findOne({ otp });

    if (!user) {
      return res.status(404).json({ error: 'User not found or invalid OTP' });
    }
    // Generate a new hash for the new password and update the user's password in the database
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};


const getUser = async (req, res) => {
  try {
    let data = await User.find()
    return res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: 'failed to fetch' })
  }
}


module.exports = { registerApi, loginApi, getUser, ChangePassword, checkEmailExists }