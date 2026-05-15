"use client";

import { useEffect, useState } from "react";

import AuthBox from "@/components/AuthBox";
import UploadBox from "@/components/UploadBox";

export default function Home() {

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {

      setIsAuthenticated(true);
    }

  }, []);

  return (

    <main className="min-h-screen bg-black text-white flex flex-col items-center py-20">

      <h1 className="text-7xl font-bold mb-6">

        TruthLens <span className="text-blue-500">AI</span>

      </h1>

      <p className="text-gray-400 text-xl mb-12 text-center max-w-4xl">

        Detect manipulated media using deep learning,
        computer vision, heatmap analysis,
        and AI-powered forensic intelligence.

      </p>

      {!isAuthenticated ? (

        <>
          <AuthBox />

          <div className="mt-10 bg-[#08142c] border border-red-900 p-10 rounded-3xl text-center w-[700px]">

            <h2 className="text-5xl font-bold text-red-400 mb-5">

              Authentication Required

            </h2>

            <p className="text-gray-400 text-xl">

              Please login to access AI media analysis.

            </p>

          </div>
        </>

      ) : (

        <div className="mt-10">

          <UploadBox />

        </div>
      )}

    </main>
  );
}