import cv2

def predict_deepfake(image_path):

    # Read image
    image = cv2.imread(image_path)

    # Convert to grayscale
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    # Blur detection
    blur_score = cv2.Laplacian(
        gray,
        cv2.CV_64F
    ).var()

    # Brightness score
    brightness = gray.mean()

    # Edge detection
    edges = cv2.Canny(
        gray,
        50,
        150
    )

    edge_score = edges.mean()

    # FINAL PRACTICAL AI LOGIC

    # Very blurry / unclear image
    if blur_score < 40:

        prediction = "LOW QUALITY IMAGE"

        confidence = 55

    # Clear and natural image
    elif (
        blur_score > 50
        and brightness > 30
        and edge_score > 15
    ):

        prediction = "LIKELY REAL"

        confidence = min(
            98,
            int(blur_score / 8)
        )

        if confidence < 85:
            confidence = 85

    # Suspicious / edited looking image
    else:

        prediction = "POTENTIALLY MANIPULATED"

        confidence = 74

    return prediction, confidence