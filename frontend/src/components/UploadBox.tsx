"use client";

import { useState } from "react";
import API from "@/services/api";

export default function UploadBox() {

  const [file, setFile] =
    useState<File | null>(null);

  const [result, setResult] =
    useState<any>(null);

  const handleUpload = async () => {

    if (!file) {

      alert("Please select a file");

      return;
    }

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

      alert("Upload Successful!");

    } catch (error) {

      console.error(error);

      alert("Upload Failed");
    }
  };

  return (

    <div className="bg-[#08142c] p-10 rounded-3xl border border-blue-900 w-[900px] shadow-2xl">

      {/* Upload Section */}
      <div className="flex flex-col items-center">

        <input
          type="file"
          onChange={(e) => {

            if (e.target.files) {

              setFile(
                e.target.files[0]
              );
            }
          }}
          className="mb-6 text-white"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl text-white font-bold text-xl shadow-lg"
        >
          Upload Media
        </button>

      </div>

      {/* Result Section */}
      {result && (

        <div className="mt-10 bg-[#0b1528] border border-blue-900 rounded-3xl p-8 shadow-2xl">

          {/* Prediction */}
          <h2
            className={`text-5xl font-bold text-center mb-8 ${
              result.prediction ===
              "LIKELY REAL"

                ? "text-green-400"

                : result.prediction ===
                  "LOW QUALITY IMAGE"

                ? "text-yellow-400"

                : "text-orange-400"
            }`}
          >

            Prediction:
            {" "}
            {result.prediction}

          </h2>

          {/* Confidence */}
          <div className="mb-8">

            <div className="flex justify-between mb-3">

              <span className="text-gray-300 text-xl">
                AI Confidence
              </span>

              <span className="text-white text-xl font-bold">
                {result.confidence}%
              </span>

            </div>

            <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden">

              <div
                className={`h-6 rounded-full transition-all duration-700 ${
                  result.prediction ===
                  "LIKELY REAL"

                    ? "bg-green-500"

                    : result.prediction ===
                      "LOW QUALITY IMAGE"

                    ? "bg-yellow-500"

                    : "bg-orange-500"
                }`}
                style={{
                  width:
                    `${result.confidence}%`,
                }}
              />

            </div>

          </div>

          {/* Stats */}
          <div className="text-center space-y-4 mb-8">

            <p className="text-gray-300 text-2xl">

              Faces Detected:
              {" "}

              <span className="text-white font-bold">

                {result.faces_detected}

              </span>

            </p>

            <p className="text-gray-300 text-2xl">

              Blur Score:
              {" "}

              <span className="text-white font-bold">

                {result.blur_score}

              </span>

            </p>

          </div>

          {/* Analyzed Image */}
          <div className="flex justify-center">

            <img
              src={result.image_url}
              alt="Analyzed"
              className="rounded-3xl border border-gray-700 shadow-2xl max-w-full"
            />

          </div>

        </div>
      )}

    </div>
  );
}