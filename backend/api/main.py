# api/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import engine
from .models import Base
from .routers import motion

app = FastAPI()

# CORS（React から叩くため必須）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# 👇 ここが超重要
app.include_router(motion.router, prefix="/motion")