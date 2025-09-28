import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
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
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:7000/api/auth/update-profile/${user.id}`, { login, email });
      setMessage(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (error) {
      setMessage(error.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:7000/api/auth/change-password/${user.id}`, { oldPassword, newPassword });
      setMessage(res.data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  if (!user) return null;

  return (
    <div>
      <Helmet>
        <title>
          Bilim.ac - Profil
        </title>
      </Helmet>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl mb-4">Profilim</h1>
        {message && <p className="mb-4 text-yellow-700">{message}</p>}

        <form onSubmit={handleUpdateProfile} className="mb-6">
          <h2 className="text-xl mb-2">Profilni yangilash</h2>
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} className="mb-2 p-2 border rounded w-full" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2 p-2 border rounded w-full" required />
          <button type="submit" className="bg-indigo-600 text-white p-2 rounded">Yangilash</button>
        </form>

        <form onSubmit={handleChangePassword}>
          <h2 className="text-xl mb-2">Parolni o‘zgartirish</h2>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="mb-2 p-2 border rounded w-full" placeholder="Eski parol" required />
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mb-2 p-2 border rounded w-full" placeholder="Yangi parol" required />
          <button type="submit" className="bg-green-600 text-white p-2 rounded">O‘zgartirish</button>
        </form>

        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white p-2 rounded">Chiqish</button>
      </div>
    </div>
  );
}
