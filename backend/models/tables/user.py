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

    User_ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Name = Column(String(40))
    Surname = Column(String(40))
    Email = Column(String(255), unique=True, index=True)
    Password = Column(String(255))
    User_type = Column(Enum(UserType.Admin, UserType.Courier, UserType.Client))
    Phone = Column(String(12))
    Created_at = Column(Date())
    Status = Column(Enum(UserStatus.Active, UserStatus.Inactive))
    Last_login = Column(Date())