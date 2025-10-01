  const express = require("express");
  const router = express.Router();
  const bcrypt = require("bcryptjs");
  const User = require("../models/User");
  const multer = require("multer");
  const path = require("path");

  // Parol qoidalari
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Multer config
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  });
  const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

  // Safe user object
  const getSafeUser = (user) => ({
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    role: user.role || "user",
    age: user.age ?? null,
    bio: user.bio || "",
    location: user.location || "",
    phone: user.phone || "",
    birthDate: user.birthDate || null,
    skills: user.skills || "",
    telegram: user.telegram || "",
    instagram: user.instagram || "",
    github: user.github || "",
    linkedin: user.linkedin || "",
    profileImage: user.profileImage ? `http://localhost:7000/uploads/${user.profileImage}` : null,
    createdAt: user.createdAt,
  });

  // GET users (pagination)
  router.get("/users", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const totalUsers = await User.countDocuments();
      const users = await User.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

      res.json({
        success: true,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        users: users.map(getSafeUser),
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
      if (existingUser) return res.status(400).json({ success: false, message: "Bunday login yoki email allaqachon mavjud" });

      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          success: false,
          message: "Parol kamida 8 ta belgidan iborat, katta/kichik harf, raqam va maxsus belgi bo'lishi kerak",
        });
      }

      const hashed = await bcrypt.hash(password, 10);
      const newUser = new User({ login, email, password: hashed, role: "user" });
      await newUser.save();

      res.status(201).json({ success: true, user: getSafeUser(newUser) });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ success: false, message: "Xatolik", error: error.message || error });
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
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Xatolik", error: error.message || error });
    }
  });

  // Update profile (multer qabul qiladi — form-data)
  router.put("/update-profile/:id", upload.single("profileImage"), async (req, res) => {
    try {
      const { login, email, age, bio, location, phone, birthDate, skills, telegram, instagram, github, linkedin } = req.body;
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });

      // duplicate tekshir (login/email)
      const or = [];
      if (login) or.push({ login });
      if (email) or.push({ email });
      if (or.length > 0) {
        const exist = await User.findOne({ $or: or, _id: { $ne: req.params.id } });
        if (exist) return res.status(400).json({ success: false, message: "Bunday login yoki email allaqachon mavjud" });
      }

      // maydonlarni yangilash
      if (login) user.login = login;
      if (email) user.email = email;
      if (age !== undefined) user.age = age;
      if (bio !== undefined) user.bio = bio;
      if (location !== undefined) user.location = location;

      if (phone !== undefined) user.phone = phone;
      if (birthDate !== undefined) user.birthDate = birthDate;
      if (skills !== undefined) user.skills = skills;
      if (telegram !== undefined) user.telegram = telegram;
      if (instagram !== undefined) user.instagram = instagram;
      if (github !== undefined) user.github = github;
      if (linkedin !== undefined) user.linkedin = linkedin;

      if (req.file) {
        user.profileImage = req.file.filename;
      }

      await user.save();
      res.json({ success: true, message: "Profil yangilandi", user: getSafeUser(user) });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ success: false, message: "Server xatosi", error: error.message || error });
    }
  });

  // Change password
  router.put("/change-password/:id", async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ success: false, message: "Eski parol noto'g'ri" });

      if (!passwordRegex.test(newPassword)) return res.status(400).json({ success: false, message: "Yangi parol qoidalarga mos emas" });

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.json({ success: true, message: "Parol muvaffaqiyatli yangilandi" });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({ success: false, message: "Xatolik", error: error.message || error });
    }
  });

  module.exports = router;
