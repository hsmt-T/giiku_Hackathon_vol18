#pose.py
import cv2
import mediapipe as mp

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

from ai.worship.clap import ClapDetector

pose = mp_pose.Pose()

cap = cv2.VideoCapture(0)
clap_detector = ClapDetector()

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
        # 👇 拍手判定
        if clap_detector.update(results.pose_landmarks):
            print("👏 拍手した！")

            # 画面にも表示
            cv2.putText(
                frame,
                "CLAP!",
                (50, 80),
                cv2.FONT_HERSHEY_SIMPLEX,
                2,
                (0, 0, 255),
                4
            )

    cv2.imshow("Pose Debug", frame)

    if cv2.waitKey(1) & 0xFF == 27:  # ESCで終了
        break

cap.release()
cv2.destroyAllWindows()
