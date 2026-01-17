from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..db import SessionLocal
from ..models import Omikuji

router = APIRouter(prefix="/omikuji", tags=["omikuji"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/random")
def get_random_omikuji(db: Session = Depends(get_db)):
    row = db.query(Omikuji).order_by(func.random()).first()
    if not row:
        raise HTTPException(status_code=404, detail="No omikuji found")
    return {"id": row.id, "name": row.name}


@router.get("/count")
def count_omikuji(db: Session = Depends(get_db)):
    c = db.query(Omikuji).count()
    return {"count": c}