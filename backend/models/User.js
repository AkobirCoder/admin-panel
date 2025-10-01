const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    login: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    age: { type: Number },
    bio: { type: String },
    location: { type: String },
    profileImage: { type: String, default: null },
    phone: { type: String, default: "" },
    birthDate: { type: Date, default: null },
    skills: { type: String, default: "" }, // oddiy string, xohlasa array qilsa ham bo‘ladi
    telegram: { type: String, default: "" },
    instagram: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.set("versionKey", false);

module.exports = mongoose.model("User", userSchema);


// keyin boyagi rasmni yuklashda uploadsga yuklanib ketmoqda shuni uploadsga yuklamasadan qilishni iloji bormi chunki loyiha hajmi og'irlashib ketmoqda