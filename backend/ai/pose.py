#pose.py
import cv2
import mediapipe as mp
from ai.worship.bow import BowDetector
from ai.worship.throw import ThrowDetector
from ai.worship.clap import ClapDetector

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils



pose = mp_pose.Pose()

cap = cv2.VideoCapture(0)
bow_detector = BowDetector()
clap_detector = ClapDetector()
throw_detector = ThrowDetector()

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
        if bow_detector.update(results.pose_landmarks):
            print("🙇 お辞儀した！")

        # cv2.rectangle(frame, (30, 160), (500, 260), (255, 0, 0), -1)
            cv2.putText(
                frame,
                "BOW!",
                (60, 240),
                cv2.FONT_HERSHEY_SIMPLEX,
                2,
                (255, 255, 255),
                4
            )
        if throw_detector.update(results.pose_landmarks):
            print("🎯 腕を振った！")

            
            cv2.putText(
                frame,
                "THROW!",
                (60, 360),
                cv2.FONT_HERSHEY_SIMPLEX,
                2,
                (255, 255, 255),
                4
            )

    cv2.imshow("Pose Debug", frame)

    if cv2.waitKey(1) & 0xFF == 27:  # ESCで終了
        break

cap.release()
cv2.destroyAllWindows()
