const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    login: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // createdAt va updatedAt avtomatik qo‘shiladi
);

module.exports = mongoose.model("User", UserSchema);
