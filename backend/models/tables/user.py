from sqlalchemy import Column, Integer, String, Enum, Date
from utils.database import Base

class UserType(Enum):
    Admin = 'Admin'
    Courier = 'Courier'
    Client = 'Client'

class UserStatus(Enum):
    Active = 'Active'
    Inactive = 'Inactive'

class User(Base):
    __tablename__ = "user"

    user_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(40))
    surname = Column(String(40))
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    user_type = Column(Enum(UserType.Admin, UserType.Courier, UserType.Client))
    phone = Column(String(12))
    created_at = Column(Date())
    status = Column(Enum(UserStatus.Active, UserStatus.Inactive))
    last_login = Column(Date())