# ai/worship/bow.py
from mediapipe.python.solutions.pose import PoseLandmark
from ai.utils import get_point

class BowDetector:
    def __init__(self):
        self.prev_nose_y = None
        self.BOW_MOVE_THRESHOLD = 0.02  # 鼻が前フレームから下に動いた量
        self.detected = False

    def update(self, landmarks):
        nose = get_point(landmarks, PoseLandmark.NOSE)
        left_shoulder = get_point(landmarks, PoseLandmark.LEFT_SHOULDER)
        right_shoulder = get_point(landmarks, PoseLandmark.RIGHT_SHOULDER)
        shoulder_y = (left_shoulder[1] + right_shoulder[1]) / 2

        if self.prev_nose_y is None:
            self.prev_nose_y = nose[1]
            return False

        nose_move = nose[1] - self.prev_nose_y  # 下方向に動いた量

        if nose_move > self.BOW_MOVE_THRESHOLD:
            self.detected = True
        else:
            self.detected = False

        self.prev_nose_y = nose[1]
        return self.detected
