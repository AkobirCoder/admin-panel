// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Parollar mos emas!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Ro'yxatdan o'tishda xato!");
        return;
      }

      // muvaffaqiyatli ro'yxatdan o'tgach Login sahifasiga yo'naltirish
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Server bilan aloqa qilishda xatolik!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow w-96"
        autoComplete="off"
      >
        <h2 className="text-xl font-bold mb-4">Ro'yxatdan o'tish</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Login"
          className="w-full p-2 border rounded mb-3"
          autoComplete="off"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded mb-3"
          autoComplete="off"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Parol"
          type="password"
          className="w-full p-2 border rounded mb-3"
          autoComplete="new-password"
        />
        <input
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Parolni tasdiqlash"
          type="password"
          className="w-full p-2 border rounded mb-4"
          autoComplete="new-password"
        />

        <button className="w-full py-2 bg-green-600 text-white rounded">
          Ro'yxatdan o'tish
        </button>

        <p className="mt-4 text-sm text-center">
          Akkountingiz bormi?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Kirish
          </span>
        </p>
      </form>
    </div>
  );
}
