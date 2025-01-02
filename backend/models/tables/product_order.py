from sqlalchemy import Column, Double, Integer, String, Enum, Date
from utils.database import Base

class ProductOrder(Base):
    __tablename__ = "product_order"

    product_ID = Column(Integer, primary_key=True, index=True)
    order_ID = Column(Integer, primary_key=True, index=True)
    product_amount = Column(Integer)
