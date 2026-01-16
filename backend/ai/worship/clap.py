# ai/worship/clap.py
from mediapipe.python.solutions.pose import PoseLandmark
from ai.utils import get_point, distance

class ClapDetector:
    def __init__(self,
                distance_threshold=0.05,
                hold_frames=5):
        """
        distance_threshold : 手と手の距離（正規化）
        hold_frames        : 何フレーム連続で近いか
        """
        self.distance_threshold = distance_threshold
        self.hold_frames = hold_frames
        self.counter = 0
        self.clapped = False

    def update(self, landmarks):
        """
        毎フレーム呼ぶ
        landmarks : results.pose_landmarks
        戻り値: True（拍手成立） / False
        """

        left = get_point(landmarks, PoseLandmark.LEFT_WRIST)
        right = get_point(landmarks, PoseLandmark.RIGHT_WRIST)

        d = distance(left, right)

        # デバッグ用（最初は超おすすめ）
        # print(f"clap distance: {d:.3f}")

        if d < self.distance_threshold:
            self.counter += 1
        else:
            self.counter = 0
            self.clapped = False

        if self.counter >= self.hold_frames and not self.clapped:
            self.clapped = True
            return True

        return False
