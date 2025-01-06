from sqlalchemy import Column, Integer, String, Enum, Date
from utils.database import Base

class Courier(Base):
    __tablename__ = "courier"

    courier_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_ID = Column(Integer, index=True)
    delivery_transport = Column(Enum('Car', 'Bike'))
    license_plate = Column(String(10))