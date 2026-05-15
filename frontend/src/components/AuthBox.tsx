"use client";

import { useState } from "react";
import API from "@/services/api";

export default function AuthBox() {

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async () => {

    try {

      const endpoint = isLogin
        ? "/login"
        : "/signup";

      const response = await API.post(
        endpoint,
        {
          email: email,
          password: password
        }
      );

      console.log(response.data);

      if (isLogin) {

        localStorage.setItem(
          "token",
          response.data.access_token
        );

        alert("Login Successful!");

      } else {

        alert("Signup Successful!");

        setIsLogin(true);
      }

    } catch (error) {

      console.error(error);

      alert("Authentication Failed");
    }
  };

  return (

    <div className="bg-[#08142c] p-10 rounded-3xl border border-blue-900 w-[500px]">

      <h1 className="text-5xl font-bold text-white text-center mb-8">

        {isLogin ? "Login" : "Create Account"}

      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full mb-5 p-4 rounded-xl bg-[#1a2942] text-white border border-gray-700"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="w-full mb-5 p-4 rounded-xl bg-[#1a2942] text-white border border-gray-700"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl text-white font-bold text-xl"
      >

        {isLogin ? "Login" : "Sign Up"}

      </button>

      <p className="text-center text-gray-400 mt-6">

        {isLogin
          ? "Don't have an account?"
          : "Already have an account?"}

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="text-blue-400 ml-2"
        >

          {isLogin ? "Sign Up" : "Login"}

        </button>

      </p>

    </div>
  );
}