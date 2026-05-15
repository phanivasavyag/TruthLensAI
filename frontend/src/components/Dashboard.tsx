"use client";

import { useState } from "react";
import API from "@/services/api";

export default function Dashboard() {

  const [file, setFile] =
    useState<File | null>(null);

  const [result, setResult] =
    useState<any>(null);

  const handleUpload = async () => {

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {

      const response = await API.post(
        "/analyze",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);

      alert("Upload Failed");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#07152d] to-[#0f172a] text-white px-6 py-16 flex flex-col items-center">

      <div className="text-center mb-14">

        <h1 className="text-7xl font-black tracking-tight">

          TruthLens <span className="text-blue-500">AI</span>

        </h1>

        <p className="text-gray-400 text-xl mt-5 max-w-3xl">

          AI-powered deepfake detection platform using
          computer vision, forensic analysis, and
          advanced image intelligence.

        </p>

      </div>

      <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-10 w-full max-w-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)]">

        <div className="flex flex-col items-center gap-8">

          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files
                  ? e.target.files[0]
                  : null
              )
            }
            className="text-lg text-gray-300"
          />

          <button
            onClick={handleUpload}
            className="px-14 py-5 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.5)]"
          >

            Upload Media

          </button>

        </div>

      </div>

      {result && (

        <div className="mt-14 w-full max-w-7xl">

          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] p-12">

            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500/10 blur-[120px] rounded-full"></div>

            <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-blue-500/10 blur-[100px] rounded-full"></div>

            <div className="relative z-10">

              <div className="flex items-center justify-center gap-5 mb-12">

                <div className={`w-6 h-6 rounded-full animate-pulse ${
                  result.prediction === "LIKELY REAL"
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}></div>

                <h1 className={`text-7xl font-black tracking-tight drop-shadow-2xl ${
                  result.prediction === "LIKELY REAL"
                    ? "text-green-400"
                    : "text-red-400"
                }`}>

                  {result.prediction}

                </h1>

              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center">

                <div>

                  <div className="mb-10">

                    <div className="flex justify-between mb-4">

                      <span className="text-2xl text-gray-300 font-semibold">

                        AI Confidence

                      </span>

                      <span className="text-3xl font-black text-white">

                        {result.confidence}%

                      </span>

                    </div>

                    <div className="w-full h-6 bg-gray-700 rounded-full overflow-hidden">

                      <div
                        className={`h-full rounded-full shadow-[0_0_30px_rgba(255,255,255,0.5)] ${
                          result.prediction === "LIKELY REAL"
                            ? "bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
                            : "bg-gradient-to-r from-red-400 via-pink-500 to-red-600"
                        }`}
                        style={{
                          width: `${result.confidence}%`,
                        }}
                      ></div>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-6">

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

                      <p className="text-gray-400 text-lg">

                        Faces Detected

                      </p>

                      <h2 className="text-5xl font-black text-white mt-3">

                        {result.faces_detected}

                      </h2>

                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

                      <p className="text-gray-400 text-lg">

                        Blur Score

                      </p>

                      <h2 className="text-5xl font-black text-white mt-3">

                        {Math.round(result.blur_score)}

                      </h2>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-8">

                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 text-green-300 text-lg">

                      ✓ Texture Analysis

                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 text-blue-300 text-lg">

                      ✓ Face Detection

                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5 text-purple-300 text-lg">

                      ✓ Pixel Integrity

                    </div>

                    <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-5 text-pink-300 text-lg">

                      ✓ AI Scan Complete

                    </div>

                  </div>

                </div>

                <div className="flex justify-center">

                  <div className="relative">

                    <div className={`absolute inset-0 blur-3xl rounded-[40px] ${
                      result.prediction === "LIKELY REAL"
                        ? "bg-green-500/20"
                        : "bg-red-500/20"
                    }`}></div>

                    <img
  src={`https://truthlens-backend-kk4z.onrender.com/${result.image}`}
  alt="Analyzed"
  className="relative rounded-[35px] border border-white/10 shadow-2xl w-full max-w-[500px]"
/>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}