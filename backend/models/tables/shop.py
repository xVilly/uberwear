from sqlalchemy import Column, Integer, String, Enum, Date
from utils.database import Base

class Shop(Base):
    __tablename__ = "shop"

    shop_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(60))
    phone = Column(String(255))
    address_ID = Column(Integer, index=True)