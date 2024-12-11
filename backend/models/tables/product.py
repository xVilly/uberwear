from sqlalchemy import Column, Double, Integer, String, Enum, Date
from utils.database import Base

class Product(Base):
    __tablename__ = "product"

    product_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255))
    price = Column(Double)
    category = Column(String(50))
    shop_ID = Column(Integer, index=True)