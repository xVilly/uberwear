from sqlalchemy import Column, Integer, String, Enum, Date
from utils.database import Base

class Client(Base):
    __tablename__ = "client"

    client_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    address_ID = Column(Integer, index=True)
    user_ID = Column(Integer, index=True)
    loyalty_points = Column(Integer, default=0)