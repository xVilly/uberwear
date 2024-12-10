from sqlalchemy import Column, Integer, String, Enum, Date
from utils.database import Base

class Admin(Base):
    __tablename__ = "admin"

    Admin_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Role = Column(String(50))
    User_ID = Column(Integer, foreign_key=True, index=True, unique=True)