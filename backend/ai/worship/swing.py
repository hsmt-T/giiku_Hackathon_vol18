from mediapipe.python.solutions.pose import PoseLandmark
from ai.utils import get_point
from collections import deque

class SwingDetector:
    def __init__(self):
        self.x_history = deque(maxlen=12)
        self.cooldown = 0

        self.AMPLITUDE_THRESHOLD = 0.25  # ← 横の振り幅（大きめ）
        self.COOLDOWN_FRAMES = 25

    def update(self, landmarks):
        if self.cooldown > 0:
            self.cooldown -= 1
            return False

        wrist = get_point(landmarks, PoseLandmark.RIGHT_WRIST)
        x = wrist[0]

        self.x_history.append(x)

        if len(self.x_history) < self.x_history.maxlen:
            return False

        amplitude = max(self.x_history) - min(self.x_history)

        if amplitude > self.AMPLITUDE_THRESHOLD:
            self.cooldown = self.COOLDOWN_FRAMES
            self.x_history.clear()
            return True

        return False
