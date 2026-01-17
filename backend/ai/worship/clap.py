from mediapipe.python.solutions.pose import PoseLandmark
from ai.utils import get_point, distance
import time

class ClapDetector:
    def __init__(
        self,
        distance_threshold=0.12,  # ← 広げる
        hold_frames=2,            # ← 減らす
        cooldown=0.8,             # ← 連打防止
    ):
        self.distance_threshold = distance_threshold
        self.hold_frames = hold_frames
        self.cooldown = cooldown

        self.counter = 0
        self.last_clap_time = 0

    def update(self, landmarks):
        left = get_point(landmarks, PoseLandmark.LEFT_WRIST)
        right = get_point(landmarks, PoseLandmark.RIGHT_WRIST)

        d = distance(left, right)
        # print(f"clap distance: {d:.3f}")

        if d < self.distance_threshold:
            self.counter += 1
        else:
            self.counter = 0

        if self.counter >= self.hold_frames:
            now = time.time()
            if now - self.last_clap_time > self.cooldown:
                self.last_clap_time = now
                self.counter = 0
                return True

        return False
