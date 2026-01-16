# ai/worship/bow.py
from mediapipe.python.solutions.pose import PoseLandmark
from ai.utils import get_point

class BowDetector:
    def __init__(self):
        self.bow_frames = 0
        self.BOW_THRESHOLD = 0.05   # 鼻と肩のY差
        self.REQUIRED_FRAMES = 5    # 何フレーム続いたら成立

    def update(self, landmarks):
        nose = get_point(landmarks, PoseLandmark.NOSE)
        left_shoulder = get_point(landmarks, PoseLandmark.LEFT_SHOULDER)
        right_shoulder = get_point(landmarks, PoseLandmark.RIGHT_SHOULDER)

        shoulder_y = (left_shoulder[1] + right_shoulder[1]) / 2

        # nose.y の方が大きい = 下にある
        if nose[1] > shoulder_y + self.BOW_THRESHOLD:
            self.bow_frames += 1
        else:
            self.bow_frames = 0

        if self.bow_frames >= self.REQUIRED_FRAMES:
            self.bow_frames = 0
            return True

        return False
