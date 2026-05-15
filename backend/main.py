import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import shutil
import cv2

from deepfake_model import predict_deepfake
from auth import router as auth_router
os.makedirs("uploads", exist_ok=True)
app = FastAPI()

# Include Authentication Routes
app.include_router(auth_router)

# Static uploads folder
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load DNN Face Detector
net = cv2.dnn.readNetFromCaffe(
    "models/deploy.prototxt",
    "models/res10_300x300_ssd_iter_140000.caffemodel"
)

# Home Route
@app.get("/")
def home():

    return {
        "message": "TruthLens AI Backend Running"
    }

# Upload Route
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    # Save uploaded file
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Read image
    image = cv2.imread(file_path)

    # Image dimensions
    (h, w) = image.shape[:2]

    # Create blob
    blob = cv2.dnn.blobFromImage(
        cv2.resize(image, (300, 300)),
        1.0,
        (300, 300),
        (104.0, 177.0, 123.0)
    )

    # Detect faces
    net.setInput(blob)

    detections = net.forward()

    face_count = 0

    # Loop through detections
    for i in range(0, detections.shape[2]):

        confidence_score = detections[0, 0, i, 2]

        if confidence_score > 0.5:

            face_count += 1

            # Face box coordinates
            box = detections[0, 0, i, 3:7] * [
                w,
                h,
                w,
                h
            ]

            (startX, startY, endX, endY) = box.astype("int")

            # Draw rectangle
            cv2.rectangle(
                image,
                (startX, startY),
                (endX, endY),
                (0, 255, 0),
                2
            )

    # Save analyzed image
    analyzed_path = f"uploads/analyzed_{file.filename}"

    cv2.imwrite(
        analyzed_path,
        image
    )

    # Blur Detection
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    blur_score = cv2.Laplacian(
        gray,
        cv2.CV_64F
    ).var()

    # CNN Deepfake Prediction
    prediction, confidence = predict_deepfake(
        file_path
    )

    # API Response
    return {

        "filename": file.filename,

        "faces_detected": face_count,

        "prediction": prediction,

        "confidence": confidence,

        "blur_score": round(
            blur_score,
            2
        ),

        "image_url":
        f"http://127.0.0.1:8000/uploads/analyzed_{file.filename}"
    }