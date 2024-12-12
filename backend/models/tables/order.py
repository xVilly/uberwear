from sqlalchemy import Column, Double, Integer, String, Enum, Date
from utils.database import Base

class Order(Base):
    __tablename__ = "order"

    order_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    order_date = Column(Date)
    status = Column(Enum('Pending', 'Shipped', 'Delivered', 'Canceled'))
    courier_ID = Column(Integer, index=True)
    payment_ID = Column(Integer, index=True)
    address_ID = Column(Integer, index=True)
    client_ID = Column(Integer, index=True)