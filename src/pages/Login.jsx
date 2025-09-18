// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const [login, setLogin] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:7000/api/auth/login", {
//         login,
//         password,
//       });

//       if (res.data.success) {
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         navigate("/dashboard");
//       } else {
//         setError(res.data.message || "Login yoki parol xato!");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Serverga ulanishda xato!");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Tizimga kirish
//         </h2>
//         {error && (
//           <p className="text-red-500 text-center text-sm mb-4">{error}</p>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Login
//             </label>
//             <input
//               type="text"
//               value={login}
//               onChange={(e) => setLogin(e.target.value)}
//               required
//               className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Parol
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Kirish
//           </button>
//         </form>

//         <p className="text-sm text-gray-600 text-center mt-4">
//           Akkountingiz yo‘qmi?{" "}
//           <Link
//             to="/register"
//             className="text-indigo-600 hover:underline font-medium"
//           >
//             Ro‘yxatdan o‘ting
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const [login, setLogin] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:7000/api/auth/login", {
//         login,
//         password,
//       });

//       if (res.data.success) {
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         navigate("/dashboard");
//       } else {
//         setError(res.data.message || "Login yoki parol xato!");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Serverga ulanishda xato!");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Chap tomon – Rasm */}
//       <div className="hidden md:flex w-1/2 bg-indigo-600 items-center justify-center">
//         <img
//           src="/login.jpg"
//           alt="Login Illustration"
//           className="w-full h-full object-cover"
//         />

//       </div>

//       {/* O'ng tomon – Login form */}
//       <div className="flex w-full md:w-1/2 items-center justify-center p-8">
//         <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//             Tizimga kirish
//           </h2>
//           {error && (
//             <p className="text-red-500 text-center text-sm mb-4">{error}</p>
//           )}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Login
//               </label>
//               <input
//                 type="text"
//                 value={login}
//                 onChange={(e) => setLogin(e.target.value)}
//                 required
//                 className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm 
//                            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
//                            outline-none transition sm:text-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Parol
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm 
//                            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
//                            outline-none transition sm:text-sm"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
//             >
//               Kirish
//             </button>
//           </form>

//           <p className="text-sm text-gray-600 text-center mt-4">
//             Akkountingiz yo‘qmi?{" "}
//             <Link
//               to="/register"
//               className="text-indigo-600 hover:underline font-medium"
//             >
//               Ro‘yxatdan o‘ting
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:7000/api/auth/login", {
        login,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Login yoki parol xato!");
      }
    } catch (err) {
      console.error(err);
      setError("Serverga ulanishda xato!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Chap tomon – Rasm */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src="/login.jpg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* O'ng tomon – Login form shaffof fon bilan */}
      <div className="flex w-full md:w-1/2 items-center justify-center relative">
        {/* Orqa fon rasm */}
        <img
          src="/login.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Shaffof overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

        {/* Form oyna */}
        <div className="relative w-full max-w-md bg-white/30 backdrop-blur-xl shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Tizimga kirish
          </h2>
          {error && (
            <p className="text-red-400 text-center text-sm mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white">
                Login
              </label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 rounded-lg shadow-sm 
                           bg-white/20 text-white placeholder-gray-300
                           focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                           outline-none transition sm:text-sm"
                placeholder="Login kiriting"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Parol
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 rounded-lg shadow-sm 
                           bg-white/20 text-white placeholder-gray-300
                           focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                           outline-none transition sm:text-sm"
                placeholder="Parol kiriting"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600/80 hover:bg-indigo-700/90 text-white py-2 rounded-lg transition font-medium"
            >
              Kirish
            </button>
          </form>

          <p className="text-sm text-gray-200 text-center mt-4">
            Akkountingiz yo‘qmi?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Ro‘yxatdan o‘ting
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
