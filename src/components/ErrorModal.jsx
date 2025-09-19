// src/components/ErrorModal.jsx
import React from "react";

export default function ErrorModal({ message, onClose, onRetry }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Xatolik yuz berdi!
        </h3>
        <p className="text-sm text-gray-600 mb-5">{message}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onRetry}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Qayta urinib ko'ring
          </button>
        </div>
      </div>
    </div>
  );
}
