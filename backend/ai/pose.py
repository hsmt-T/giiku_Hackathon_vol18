# import cv2
# import numpy as np
# import mediapipe as mp

# class PoseDetector:
#     def __init__(self):
#         self.mp_pose = mp.solutions.pose
#         self.pose = self.mp_pose.Pose()

#     def detect(self, image):
#         results = self.pose.process(image)
#         if not results.pose_landmarks:
#             return None

#         landmarks = results.pose_landmarks.landmark
#         return {
#             "nose": landmarks[self.mp_pose.PoseLandmark.NOSE],
#             "left_shoulder": landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER],
#             "right_shoulder": landmarks[self.mp_pose.PoseLandmark.RIGHT_SHOULDER],
#             "left_wrist": landmarks[self.mp_pose.PoseLandmark.LEFT_WRIST],
#             "right_wrist": landmarks[self.mp_pose.PoseLandmark.RIGHT_WRIST],
#         }

import cv2
import mediapipe as mp

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

pose = mp_pose.Pose()

cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # BGR → RGB
    image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = pose.process(image_rgb)

    if results.pose_landmarks:
        # 全身の点＋線を描画
        mp_drawing.draw_landmarks(
            frame,                         # 描画先（BGRのままでOK）
            results.pose_landmarks,        # ランドマーク
            mp_pose.POSE_CONNECTIONS,      # 骨格の接続情報
            mp_drawing.DrawingSpec(
                color=(0, 255, 0),
                thickness=2,
                circle_radius=2
            ),
            mp_drawing.DrawingSpec(
                color=(255, 0, 0),
                thickness=2
            )
        )

    cv2.imshow("Pose Debug", frame)

    if cv2.waitKey(1) & 0xFF == 27:  # ESCで終了
        break

cap.release()
cv2.destroyAllWindows()
