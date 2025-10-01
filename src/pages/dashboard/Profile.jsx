import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { FaTelegram, FaInstagram, FaGithub, FaLinkedin, FaEyeSlash, FaEye } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);

  // vaqtinchalik state (o‘zgarishlar shu yerda turadi)
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    age: "",
    bio: "",
    location: "",
    phone: "",
    birthDate: "",
    skills: "",
    telegram: "",
    instagram: "",
    github: "",
    linkedin: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) navigate("/login");
    else {
      if (!savedUser.id && savedUser._id) savedUser.id = savedUser._id;
      setUser(savedUser);

      // inputlarni user ma’lumotlari bilan to‘ldiramiz
      setFormData({
        login: savedUser.login || "",
        email: savedUser.email || "",
        age: savedUser.age || "",
        bio: savedUser.bio || "",
        location: savedUser.location || "",
        phone: savedUser.phone || "",
        birthDate: savedUser.birthDate || "",
        skills: savedUser.skills || "",
        telegram: savedUser.telegram || "",
        instagram: savedUser.instagram || "",
        github: savedUser.github || "",
        linkedin: savedUser.linkedin || "",
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // inputlar uchun umumiy handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // saqlash tugmasi bosilganda
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      for (let key in formData) {
        fd.append(key, formData[key]);
      }
      if (profileImage) {
        fd.append("profileImage", profileImage);
      }

      const res = await axios.put(
        `http://localhost:7000/api/auth/update-profile/${user.id}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setPreviewImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:7000/api/auth/change-password/${user.id}`,
        { oldPassword, newPassword }
      );
      setMessage(res.data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  if (!user) return null;

  const avatarUrl = previewImage
    ? previewImage
    : user.profileImage || `https://ui-avatars.com/api/?name=${user.login}&background=6366F1&color=fff&size=128&bold=true`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Helmet>
        <title>Bilim.ac - Profil</title>
      </Helmet>

      <div className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profilim</h1>

        {message && (
          <p className="mb-6 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-sm">
            {message}
          </p>
        )}

        <div className="bg-white shadow-xl rounded-2xl p-6 flex gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center w-1/3 border-r pr-6">
            <img
              src={avatarUrl}
              alt="Profil rasmi"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
            <label className="mt-3 cursor-pointer text-indigo-600 hover:underline text-sm">
              Rasmni yuklash
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfileImage(file);
                  if (file) {
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
            <p className="mt-3 text-center text-gray-600 italic text-sm">
              "{formData.bio || "Bio qo'shilmagan"}"
            </p>

            {/* Social links */}
            <div className="flex gap-4 mt-4">
              {formData.telegram && (
                <a href={formData.telegram} target="_blank" rel="noreferrer">
                  <FaTelegram className="text-blue-500 text-xl" />
                </a>
              )}
              {formData.instagram && (
                <a href={formData.instagram} target="_blank" rel="noreferrer">
                  <FaInstagram className="text-pink-500 text-xl" />
                </a>
              )}
              {formData.github && (
                <a href={formData.github} target="_blank" rel="noreferrer">
                  <FaGithub className="text-gray-800 text-xl" />
                </a>
              )}
              {formData.linkedin && (
                <a href={formData.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin className="text-blue-700 text-xl" />
                </a>
              )}
            </div>
          </div>

          {/* Forms */}
          <div className="flex-1">
            <form className="space-y-3" onSubmit={handleSaveProfile}>
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Profil ma’lumotlari
              </h2>

              {[
                { name: "login", placeholder: "Login" },
                { name: "email", placeholder: "Email", type: "email" },
                { name: "age", placeholder: "Yosh", type: "number" },
                { name: "location", placeholder: "Manzil" },
                { name: "phone", placeholder: "Telefon raqami" },
                { name: "birthDate", placeholder: "Tug‘ilgan sana", type: "date" },
                { name: "skills", placeholder: "Ko‘nikmalar (React, Node.js...)" },
                { name: "bio", placeholder: "O'zingiz haqingizda" },
                { name: "telegram", placeholder: "Telegram link" },
                { name: "instagram", placeholder: "Instagram link" },
                { name: "github", placeholder: "GitHub link" },
                { name: "linkedin", placeholder: "LinkedIn link" },
              ].map((field, i) => (
                <input
                  key={i}
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
                />
              ))}

              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition text-sm"
              >
                Saqlash
              </button>
            </form>

            {/* Password change */}
            <form onSubmit={handleChangePassword} className="space-y-3 mt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Parolni o'zgartirish
              </h2>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Eski parol"
                  className="w-full p-2 border rounded-md focus:ring focus:ring-green-200 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Yangi parol"
                  className="w-full p-2 border rounded-md focus:ring focus:ring-green-200 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                onClick={() => setShowPassword(!showPassword)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
              >
                O'zgartirish
              </button>
            </form>

            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm"
            >
              Chiqish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
