// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // Register (foydalanuvchi qo'shish)
// router.post('/register', async (req, res) => {
//   try {
//     const { login, email, password } = req.body;

//     // Login yoki email bo'yicha tekshirish
//     const existingUser = await User.findOne({ $or: [{ login }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Bunday login yoki email allaqachon ro'yxatdan o'tgan" 
//       });
//     }

//     // Yangi user yaratish
//     const newUser = new User({ login, email, password });
//     await newUser.save();

//     res.status(201).json({ 
//       success: true, 
//       message: "User muvaffaqiyatli qo'shildi", 
//       user: newUser 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Xatolik yuz berdi", error });
//   }
// });

// // Login (tizimga kirish)
// router.post('/login', async (req, res) => {
//   try {
//     const { login, password } = req.body;

//     // Login bo'yicha qidirish
//     const user = await User.findOne({ login });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User topilmadi" });
//     }

//     // Parolni tekshirish
//     if (user.password !== password) {
//       return res.status(401).json({ success: false, message: "Parol noto'g'ri" });
//     }

//     res.status(200).json({ 
//       success: true, 
//       message: "Login muvaffaqiyatli", 
//       user 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Xatolik yuz berdi", error });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🔹 Barcha userlarni olish (pagination bilan)
router.get("/users", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;   // hozirgi sahifa
    const limit = parseInt(req.query.limit) || 10; // nechta chiqishi kerak
    const skip = (page - 1) * limit;

    // foydalanuvchilarni oxiridan boshlab olish
    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .sort({ createdAt: -1 }) // eng oxirgi user 1-qator bo‘lib kelsin
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xatolik", error });
  }
});

// 🔹 Register
router.post("/register", async (req, res) => {
  try {
    const { login, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ login }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Bunday login yoki email allaqachon mavjud" });
    }

    const newUser = new User({ login, email, password });
    await newUser.save();

    // 🔥 Admin panelga yangi userni yuborish (real-time)
    req.io.emit("newUser", newUser);

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xatolik", error });
  }
});

// 🔹 Login
router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if (!user) {
      return res.status(404).json({ success: false, message: "User topilmadi" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Parol noto'g'ri" });
    }

    res.status(200).json({ success: true, message: "Login muvaffaqiyatli", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xatolik", error });
  }
});

module.exports = router;
