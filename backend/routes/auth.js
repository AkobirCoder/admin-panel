const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 📌 Register (foydalanuvchi qo‘shish)
router.post('/register', async (req, res) => {
  try {
    const { login, password } = req.body;

    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Bu login oldin ro‘yxatdan o‘tgan" });
    }

    const newUser = new User({ login, password });
    await newUser.save();

    res.status(201).json({ 
      success: true, 
      message: "User muvaffaqiyatli qo‘shildi", 
      user: newUser 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xatolik yuz berdi", error });
  }
});

// 📌 Login (tizimga kirish)
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if (!user) {
      return res.status(404).json({ success: false, message: "User topilmadi" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Parol noto‘g‘ri" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Login muvaffaqiyatli", 
      user 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xatolik yuz berdi", error });
  }
});


module.exports = router;
