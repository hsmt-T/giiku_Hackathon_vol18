# api/routers/motion.py
from fastapi import APIRouter, UploadFile, File
import cv2
import numpy as np

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

def get_landmarks(image_bytes: bytes):
    np_img = np.frombuffer(image_bytes, np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    frame = cv2.resize(frame, (640, 360))
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb)
    return results.pose_landmarks

def result(detected: bool):
    return {"detected": detected}

# 👏 拍手
@router.post("/clap")
async def detect_clap(image: UploadFile = File(...)):
    landmarks = get_landmarks(await image.read())
    detected = landmarks is not None and clap_detector.update(landmarks)
    return result(detected)

# 🙇 お辞儀
@router.post("/bow")
async def detect_bow(image: UploadFile = File(...)):
    landmarks = get_landmarks(await image.read())
    detected = landmarks is not None and bow_detector.update(landmarks)
    return result(detected)

# 🔄 腕振り
@router.post("/swing")
async def detect_swing(image: UploadFile = File(...)):
    landmarks = get_landmarks(await image.read())
    detected = landmarks is not None and swing_detector.update(landmarks)
    return result(detected)

# 💴 投げる
@router.post("/throw")
async def detect_throw(image: UploadFile = File(...)):
    landmarks = get_landmarks(await image.read())
    detected = landmarks is not None and throw_detector.update(landmarks)
    return result(detected)
