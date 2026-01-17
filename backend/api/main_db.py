from fastapi import FastAPI
from .db import engine, SessionLocal
from .models import Base, Omikuji

app = FastAPI()

# DBテーブル作成
Base.metadata.create_all(bind=engine)

def seed_omikuji():
    db = SessionLocal()
    try:
        if db.query(Omikuji).count() > 0:
            return
        
        names = ["大吉","中吉","小吉","吉","末吉","凶","大凶"]
        for name in names:
            db.add(Omikuji(name=name))
        db.commit()
    finally:
        db.close()

# 起動時に1回だけ実行
seed_omikuji()

@app.get("/")
def root():
    return {"status": "db-only ok"}
