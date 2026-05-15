"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [username, setUsername] =
    useState<string | null>(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      const decoded: any = jwtDecode(token);

      setUsername(decoded.sub);
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.reload();
  };

  return (
    <div className="w-full max-w-7xl flex items-center justify-between mb-12">

      <div>

        <h1 className="text-2xl font-black">
          TruthLens
          <span className="text-blue-500"> AI</span>
        </h1>

      </div>

      <div className="flex items-center gap-4">

        {
          username && (
            <p className="text-gray-300">
              Welcome,{" "}
              <span className="text-blue-400 font-semibold">
                {username}
              </span>
            </p>
          )
        }

        {
          username && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl font-semibold"
            >
              Logout
            </button>
          )
        }

      </div>
    </div>
  );
}