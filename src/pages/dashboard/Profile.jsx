import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) navigate("/login");
    else {
      if (!savedUser.id && savedUser._id) savedUser.id = savedUser._id;
      setUser(savedUser);
      setLogin(savedUser.login);
      setEmail(savedUser.email);
      setAge(savedUser.age || "");
      setBio(savedUser.bio || "");
      setLocation(savedUser.location || "");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("login", login);
      formData.append("email", email);
      formData.append("age", age);
      formData.append("bio", bio);
      formData.append("location", location);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await axios.put(
        `http://localhost:7000/api/auth/update-profile/${user.id}`,
        formData,
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
    : user.profileImage
    ? `http://localhost:7000${user.profileImage}`
    : `https://ui-avatars.com/api/?name=${user.login}&background=6366F1&color=fff&size=128&bold=true`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Helmet>
        <title>Bilim.ac - Profil</title>
      </Helmet>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Profilim</h1>

        {message && (
          <p className="mb-6 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-sm">
            {message}
          </p>
        )}

        <div className="bg-white shadow-xl rounded-2xl p-8 flex gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center w-1/3 border-r pr-6">
            <img
              src={avatarUrl}
              alt="Profil rasmi"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
            <label className="mt-4 cursor-pointer text-indigo-600 hover:underline text-sm">
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
            <p className="mt-4 text-center text-gray-600 italic text-sm">
              "{bio || "Bio qo'shilmagan"}"
            </p>
          </div>

          {/* Formalar */}
          <div className="flex-1">
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Profil ma’lumotlarini yangilash
              </h2>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Login"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-200"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-200"
                required
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Yosh"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-200"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Manzil"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-200"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="O'zingiz haqingizda qisqacha yozing..."
                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-200 h-24"
              ></textarea>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition w-full"
              >
                Yangilash
              </button>
            </form>

            {/* Parolni o'zgartirish */}
            <form onSubmit={handleChangePassword} className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Parolni o'zgartirish
              </h2>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Eski parol"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-200"
                required
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Yangi parol"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-200"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full"
              >
                O'zgartirish
              </button>
            </form>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Chiqish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
