from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True)

    password = Column(String)

    analyses = relationship("Analysis", back_populates="owner")


class Analysis(Base):

    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String)

    prediction = Column(String)

    confidence = Column(Float)

    faces_detected = Column(Integer)

    blur_score = Column(Float)

    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="analyses")