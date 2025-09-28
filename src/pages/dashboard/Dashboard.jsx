import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/dashboard/profile");
  };

  if (!user) return null;

  return (
    <div>
      <Helmet>
        <title>
          Bilim.ac - Dashboard
        </title>
      </Helmet>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl mb-4">Dashboard</h1>
        <p>Xush kelibsiz, {user.login}!</p>
        <div className="mt-4 flex gap-4">
          <button onClick={goToProfile} className="bg-green-500 text-white p-2 rounded">Profilim</button>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Chiqish</button>
        </div>
      </div>
    </div>
    
  );
}
