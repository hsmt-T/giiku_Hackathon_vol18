# ai/worship/throw.py
from mediapipe.python.solutions.pose import PoseLandmark
from ai.utils import get_point
from collections import deque

class ThrowDetector:
    def __init__(self):
        self.y_history = deque(maxlen=10)
        self.cooldown = 0

        self.AMPLITUDE_THRESHOLD = 0.35  # ← 振り幅
        self.COOLDOWN_FRAMES = 20

    def update(self, landmarks):
        if self.cooldown > 0:
            self.cooldown -= 1
            return False

        wrist = get_point(landmarks, PoseLandmark.RIGHT_WRIST)
        y = wrist[1]

        self.y_history.append(y)

        # まだデータ不足
        if len(self.y_history) < self.y_history.maxlen:
            return False

        amplitude = max(self.y_history) - min(self.y_history)

        if amplitude > self.AMPLITUDE_THRESHOLD:
            self.cooldown = self.COOLDOWN_FRAMES
            self.y_history.clear()
            return True

        return False
