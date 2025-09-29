// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// // Parol qoidalari
// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// // Barcha userlarni olish (pagination bilan)
// router.get("/users", async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const totalUsers = await User.countDocuments();
//     const users = await User.find()
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       success: true,
//       totalUsers,
//       totalPages: Math.ceil(totalUsers / limit),
//       currentPage: page,
//       users,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Xatolik", error });
//   }
// });

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { login, email, password } = req.body;

//     // user mavjudligini tekshirish
//     const existingUser = await User.findOne({ $or: [{ login }, { email }] });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Bunday login yoki email allaqachon mavjud" });
//     }

//     // Parol validatsiyasi
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Parol kamida 8 ta belgidan iborat bo'lishi, katta-kichik harf, raqam va maxsus belgi o'z ichiga olishi kerak!",
//       });
//     }

//     // parolni hash qilish
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ login, email, password: hashedPassword });
//     await newUser.save();

//     if (req.io) req.io.emit("newUser", newUser);

//     res.status(201).json({ success: true, user: newUser });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Xatolik", error });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { login, password } = req.body;

//     const user = await User.findOne({ login });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User topilmadi" });
//     }

//     // parolni solishtirish
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Parol noto'g'ri" });
//     }

//     res.status(200).json({ success: true, message: "Login muvaffaqiyatli", user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Xatolik", error });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Parol qoidalari
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ✅ Helper: faqat xavfsiz user obyektini qaytarish
const getSafeUser = (user) => ({
  id: user._id.toString(),
  login: user.login,
  email: user.email,
  role: user.role || "user",   // 🔥 qo'shildi
  createdAt: user.createdAt,
});

// ✅ Barcha userlarni olish (pagination bilan)
router.get("/users", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      users: users.map(getSafeUser), // faqat safe user qaytariladi
    });
  } catch (error) {
    console.error("Users route error:", error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { login, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ login }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Bunday login yoki email allaqachon mavjud" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Parol kamida 8 ta belgidan iborat bo'lishi, katta-kichik harf, raqam va maxsus belgi o'z ichiga olishi kerak!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ login, email, password: hashedPassword, role: "user" }); // 🔥 default role
    await newUser.save();

    res.status(201).json({ success: true, user: getSafeUser(newUser) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xatolik", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) return res.status(404).json({ success: false, message: "User topilmadi" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Parol noto'g'ri" });

    res.status(200).json({ success: true, message: "Login muvaffaqiyatli", user: getSafeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xatolik", error });
  }
});

// Profilni yangilash
router.put("/update-profile/:id", async (req, res) => {
  try {
    const { login, email } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });

    const existingUser = await User.findOne({
      $or: [{ login }, { email }],
      _id: { $ne: req.params.id },
    });
    if (existingUser) return res.status(400).json({ success: false, message: "Bunday login yoki email allaqachon mavjud" });

    if (login) user.login = login;
    if (email) user.email = email;

    await user.save();
    res.json({ success: true, message: "Profil yangilandi", user: getSafeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xatolik", error });
  }
});

// Parolni o'zgartirish
router.put("/change-password/:id", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Eski parol noto'g'ri" });

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Yangi parol kamida 8 ta belgidan iborat bo'lishi, katta-kichik harf, raqam va maxsus belgi o'z ichiga olishi kerak!",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: "Parol muvaffaqiyatli yangilandi" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xatolik", error });
  }
});

module.exports = router;
