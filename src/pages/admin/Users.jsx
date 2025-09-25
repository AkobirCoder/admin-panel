import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNumber = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/auth/users?page=${pageNumber}&limit=10`
      );

      if (res.data.success) {
        setUsers(res.data.users || []);
        setTotalPages(res.data.totalPages || 1);
        setPage(res.data.currentPage || 1);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Xatolik:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers(1);

    const socket = io("http://localhost:7000");
    socket.on("newUser", () => {
      fetchUsers(1);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Admin Panel - Foydalanuvchilar</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Foydalanuvchilar</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">#</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Login</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr
                  key={user._id}
                  className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition`}
                >
                  <td className="px-6 py-4 text-sm">{(page - 1) * 10 + i + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium">{user.login}</td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-6 text-center text-gray-500 italic">
                  Hozircha foydalanuvchi yo'q
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => fetchUsers(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-indigo-600 text-white rounded disabled:bg-gray-400"
        >
          Oldingi
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => fetchUsers(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-indigo-600 text-white rounded disabled:bg-gray-400"
        >
          Keyingi
        </button>
      </div>
    </div>
  );
}
