from sqlalchemy import Column, Integer, String, Enum, Date
from utils.database import Base


class Address(Base):
    __tablename__ = "address"

    address_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    street = Column(String(128))
    city = Column(String(50))
    postcode = Column(String(6))