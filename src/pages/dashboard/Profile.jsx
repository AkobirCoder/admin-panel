import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "@dr.pogodin/react-helmet";
import { FaTelegram, FaInstagram, FaGithub, FaLinkedin, FaEyeSlash, FaEye } from "react-icons/fa";
import { ThemeContext } from "../../components/ThemeContext";

export default function Profile({ user: propUser, setUser }) {
  const [user, setLocalUser] = useState(null);
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) navigate("/login");
    else {
      if (!savedUser.id && savedUser._id) savedUser.id = savedUser._id;
      setLocalUser(savedUser);
      setUser(savedUser); // App.jsx dagi user holatini yangilash
      setFormData({
        login: savedUser.login || "",
        email: savedUser.email || "",
        age: savedUser.age || "",
        bio: savedUser.bio || "",
        location: savedUser.location || "",
        phone: savedUser.phone || "",
        birthDate: savedUser.birthDate ? savedUser.birthDate.slice(0, 10) : "",
        skills: savedUser.skills || "",
        telegram: savedUser.telegram || "",
        instagram: savedUser.instagram || "",
        github: savedUser.github || "",
        linkedin: savedUser.linkedin || "",
      });
    }
  }, [navigate, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      setLocalUser(res.data.user);
      setUser(res.data.user);
      setPreviewImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Yangi parol va tasdiqlash paroli mos emas");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:7000/api/auth/change-password/${user.id}`,
        { oldPassword, newPassword }
      );

      setMessage(res.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
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
          <div className="flex flex-col flex-0.5 items-center w-1/3 border-r pr-6">
            <img
              src={avatarUrl}
              alt="Profil rasmi"
              className="w-28 h-28 rounded-full object-cover"
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

            <form onSubmit={handleChangePassword} className="space-y-3 mt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-5">
                Parolni o'zgartirish
              </h2>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Eski parol"
                  className="w-72 p-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none text-sm"
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
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none text-sm"
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
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Yangi parolni tasdiqlang"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
              >
                O'zgartirish
              </button>
            </form>
          </div>

          <div className="flex-1">
            <form className="space-y-3" onSubmit={handleSaveProfile}>
              <h2 className="text-xl font-semibold text-gray-700 mb-5">
                Profil ma'lumotlari
              </h2>
              {[
                { name: "login", label: "Login" },
                { name: "email", label: "Email", type: "email" },
                { name: "age", label: "Yosh", type: "number" },
                { name: "location", label: "Manzil" },
                { name: "phone", label: "Telefon raqami" },
                { name: "birthDate", label: "Tug'ilgan sana", type: "date" },
                { name: "skills", label: "Ko'nikmalar" },
                { name: "bio", label: "Bio" },
                { name: "telegram", label: "Telegram link" },
                { name: "instagram", label: "Instagram link" },
                { name: "github", label: "GitHub link" },
                { name: "linkedin", label: "LinkedIn link" },
              ].map((field, i) => (
                <div key={i} className="flex items-center gap-4">
                  <label className="w-32 text-sm font-medium text-gray-600">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                    className="flex-1 p-2 border rounded-md focus:ring-1 focus:ring-indigo-400 outline-none text-sm"
                  />
                </div>
              ))}
              <div className="flex justify-center items-center gap-10">
                <button
                  type="submit"
                  className="mt-4 bg-indigo-600 text-white px-10 py-2 rounded-md hover:bg-indigo-700 transition text-sm"
                >
                  Saqlash
                </button>
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-500 text-white px-10 py-2 rounded-md hover:bg-red-600 transition text-sm"
                >
                  Chiqish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}