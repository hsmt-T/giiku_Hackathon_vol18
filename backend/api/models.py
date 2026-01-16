# api/models.py
from sqlalchemy import Column, Integer, String
from .db import Base

class Omikuji(Base):
    __tablename__ = "omikuji"

    id = Column(Integer, primary_key=True, index=True)
    result = Column(String, nullable=False)
