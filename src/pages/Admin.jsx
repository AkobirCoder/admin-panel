import { useAuth } from "../App";

export default function Admin() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-yellow-100">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p className="mt-2">Salom, {user.username} (Admin)!</p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">📊 Statistika</div>
        <div className="bg-white p-4 rounded shadow">👥 Foydalanuvchilar</div>
        <div className="bg-white p-4 rounded shadow">⚙️ Sozlamalar</div>
        <div className="bg-white p-4 rounded shadow">🔐 Xavfsizlik</div>
      </div>
    </div>
  );
}
