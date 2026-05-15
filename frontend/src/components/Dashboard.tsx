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
        "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setResult(response.data);

    } catch (error) {

      console.error(error);

      alert("Upload Failed");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#07152d] to-[#0f172a] text-white px-6 py-16 flex flex-col items-center">

      {/* HERO */}

      <div className="text-center mb-16">

        <h1 className="text-7xl md:text-8xl font-black tracking-tight">

          TruthLens{" "}

          <span className="text-blue-500">

            AI

          </span>

        </h1>

        <p className="text-gray-400 text-xl mt-6 max-w-3xl">

          AI-powered deepfake detection platform
          using computer vision, forensic analysis,
          OpenCV face detection, and intelligent
          media verification.

        </p>

      </div>

      {/* UPLOAD CARD */}

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

      {/* RESULT SECTION */}

      {result && (

        <div className="mt-16 w-full max-w-7xl">

          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] p-12">

            {/* GLOW EFFECTS */}

            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full"></div>

            <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-purple-500/10 blur-[100px] rounded-full"></div>

            <div className="relative z-10">

              {/* PREDICTION */}

              <div className="flex items-center justify-center gap-5 mb-12">

                <div
                  className={`w-6 h-6 rounded-full animate-pulse ${
                    result.prediction ===
                    "LIKELY REAL"
                      ? "bg-green-400"
                      : "bg-orange-400"
                  }`}
                ></div>

                <h1
                  className={`text-6xl md:text-7xl font-black tracking-tight text-center ${
                    result.prediction ===
                    "LIKELY REAL"
                      ? "text-green-400"
                      : "text-orange-400"
                  }`}
                >

                  Prediction:{" "}

                  {result.prediction}

                </h1>

              </div>

              {/* CONTENT */}

              <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* LEFT SIDE */}

                <div>

                  {/* CONFIDENCE */}

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
                          result.prediction ===
                          "LIKELY REAL"
                            ? "bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
                            : "bg-gradient-to-r from-orange-400 via-red-500 to-orange-600"
                        }`}
                        style={{
                          width: `${result.confidence}%`,
                        }}
                      ></div>

                    </div>

                  </div>

                  {/* METRICS */}

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

                        {result.blur_score}

                      </h2>

                    </div>

                  </div>

                  {/* STATUS */}

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

                {/* RIGHT SIDE IMAGE */}

                <div className="flex justify-center">

                  <div className="relative">

                    <div
                      className={`absolute inset-0 blur-3xl rounded-[40px] ${
                        result.prediction ===
                        "LIKELY REAL"
                          ? "bg-green-500/20"
                          : "bg-orange-500/20"
                      }`}
                    ></div>

                    <img
                      src={result.image_url}
                      alt="Analyzed Result"
                      onError={(e) => {

                        console.log(
                          "IMAGE FAILED:",
                          result.image_url
                        );

                        e.currentTarget.src =
                          "https://placehold.co/600x400/png?text=Image+Not+Found";
                      }}
                      className="relative rounded-[35px] border border-white/10 shadow-2xl w-full max-w-[500px] object-cover"
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