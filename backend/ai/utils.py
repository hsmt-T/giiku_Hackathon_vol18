#utils.py
from mediapipe.python.solutions.pose import PoseLandmark

def get_point(landmarks, landmark: PoseLandmark):
    lm = landmarks.landmark[landmark]
    return lm.x, lm.y, lm.z

def distance(p1, p2):
    return ((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2) ** 0.5
