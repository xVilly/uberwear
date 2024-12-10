from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from utils.config import cfg
from utils.database import get_db
from models.tables.user import User, UserType
from utils.auth import (
    authenticate_user, create_access_token, get_current_active_user, get_current_active_admin, get_password_hash
)
from pydantic import BaseModel

router = APIRouter()

class UserCreate(BaseModel):
    email: str
    password: str
    name: str
    surname: str
    phone: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    new_user = User(
        email=user.email,
        password=hashed_password,
        name=user.name,
        surname=user.surname,
        user_type=UserType.Client,
        phone=user.phone,
        created_at=datetime.now(),
        status="Active",
        last_login=datetime.now()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    access_token_expires = timedelta(minutes=int(cfg().TOKEN_EXPIRATION_MINUTES))
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/user/me")
def test(user: User = Depends(get_current_active_user)):
    return {"message": f"You are logged in as a client {user.email}"}