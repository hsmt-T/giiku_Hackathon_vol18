from fastapi import APIRouter, UploadFile, File
import cv2
import numpy as np
import time

from ai.pose import pose
from ai.worship.clap import ClapDetector
from ai.worship.bow import BowDetector
from ai.worship.swing import SwingDetector
from ai.worship.throw import ThrowDetector

router = APIRouter()

clap_detector = ClapDetector()
bow_detector = BowDetector()
swing_detector = SwingDetector()
throw_detector = ThrowDetector()

EMPTY_RESULT = {
    "clap": False,
    "bow": False,
    "swing": False,
    "throw": False,
}

@router.post("/frame")
async def receive_frame(image: UploadFile = File(...)):
    contents = await image.read()

    np_img = np.frombuffer(contents, np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # 🔥 サイズ縮小
    frame = cv2.resize(frame, (640, 360))

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb)

    if results.pose_landmarks is None:
        return EMPTY_RESULT

    landmarks = results.pose_landmarks

    clap = clap_detector.update(landmarks)
    bow = bow_detector.update(landmarks)

    if bow:
        swing = False
        throw = False
    else:
        swing = swing_detector.update(landmarks)
        throw = throw_detector.update(landmarks)

    return {
        "clap": clap,
        "bow": bow,
        "swing": swing,
        "throw": throw,
    }
