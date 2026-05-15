import cv2

def predict_deepfake(image_path):

    image = cv2.imread(image_path)

    if image is None:
        return "LOW QUALITY IMAGE", 50

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    blur_score = cv2.Laplacian(
        gray,
        cv2.CV_64F
    ).var()

    brightness = gray.mean()

    edges = cv2.Canny(
        gray,
        50,
        150
    )

    edge_score = edges.mean()

    if blur_score < 40:

        prediction = "LOW QUALITY IMAGE"

        confidence = 55

    elif (
        blur_score > 50
        and brightness > 30
        and edge_score > 15
    ):

        prediction = "LIKELY REAL"

        confidence = 92

    else:

        prediction = "POTENTIALLY MANIPULATED"

        confidence = 74

    return prediction, confidence