from sqlalchemy import Column, Double, Integer, String, Enum, Date
from utils.database import Base

class Payment(Base):
    __tablename__ = "payment"

    payment_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    price = Column(Integer)
    status = Column(Enum('Done', 'Awaits', 'Canceled'))
    payment_method = Column(String(100))