from sqlalchemy import Column, Integer, String, Enum, Date
from utils.database import Base

class Admin(Base):
    __tablename__ = "admin"

    admin_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    role = Column(String(50))
    user_ID = Column(Integer, foreign_key=True, index=True, unique=True)