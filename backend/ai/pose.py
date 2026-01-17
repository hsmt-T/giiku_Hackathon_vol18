# ai/pose.py
import mediapipe as mp

mp_pose = mp.solutions.pose

# API全体で1つ使い回す
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=1,
    enable_segmentation=False,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5,
)
