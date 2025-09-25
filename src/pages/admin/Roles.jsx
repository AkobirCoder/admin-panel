import React, { useState } from "react";
import { Helmet } from "react-helmet";

export default function Roles() {
  const [roles, setRoles] = useState(["Admin", "Moderator", "User"]);
  const [newRole, setNewRole] = useState("");

  const addRole = () => {
    if (newRole.trim() && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
      setNewRole("");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin Panel - Rollar</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Rollar</h1>

      {/* Rol qo'shish */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Yangi rol nomi"
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={addRole}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Qo'shish
        </button>
      </div>

      {/* Rollar ro'yxati */}
      <ul className="bg-white shadow rounded divide-y">
        {roles.map((role, idx) => (
          <li key={idx} className="px-4 py-2 flex justify-between items-center">
            <span>{role}</span>
            <button
              onClick={() => setRoles(roles.filter((r) => r !== role))}
              className="text-red-600 hover:underline"
            >
              O'chirish
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
