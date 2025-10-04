import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import AdminPanel from "./pages/AdminPanel";

// Protected Route helper
const PrivateRoute = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  return savedUser ? children : <Navigate to="/login" />;
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard va Profile himoyalangan */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard user={user} setUser={setUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <Profile user={user} setUser={setUser} />
            </PrivateRoute>
          }
        />

        {/* Admin sahifasi */}
        <Route path="/admin" element={<AdminPanel />} />

        {/* Agar path topilmasa, landing page ga yo'naltirish */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

