import React from "react";

export default function Home({ loggedIn }) {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[600px] text-center">
        <h1 className="text-3xl font-bold mb-4">🌐 Sayt haqida</h1>
        <p className="text-gray-700 leading-relaxed">
          Bu sayt foydalanuvchilarga login va ro'yxatdan o'tish imkoniyatlarini taqdim etadi.
          Tizimga kirganingizdan so'ng, siz qo‘shimcha xizmatlardan foydalanishingiz mumkin.
        </p>

        {loggedIn && (
          <p className="mt-6 text-green-600 font-semibold">
            ✅ Siz tizimga kirdingiz!
          </p>
        )}
      </div>
    </div>
  );
}
