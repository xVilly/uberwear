from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from models.tables.address import Address
from models.tables.admin import Admin
from models.tables.client import Client
from utils.config import cfg
from utils.database import get_db
from models.tables.user import User, UserType
from utils.auth import (
    authenticate_user, create_access_token, get_admin, get_current_active_user, get_current_active_admin, get_password_hash
)
from pydantic import BaseModel

# Utworzenie instancji routera API
router = APIRouter()

# Klasa modelu danych dla endpointu /register - to co wpisujemy w formularzu
class UserCreate(BaseModel):
    # User Fields
    email: str
    password: str
    name: str
    surname: str
    phone: str
    
    # Address Fields
    street: str
    city: str
    postcode: str
    district: Optional[str] = "None"
    

class UserUpdate(BaseModel):
    name: Optional[str] = None
    surname: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    password: Optional[str] = None

# Klasa modelu danych dla endpointu /login - to co wpisujemy w formularzu
class UserLogin(BaseModel):
    email: str
    password: str

class AdminCreate(BaseModel):
    email: str
    role: str

# Endpoint /register - odpowiada za rejestracje użytkownika, w polach zapytania podajemy pola klasy UserCreate
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

    new_address = Address(
        street=user.street,
        city=user.city,
        postcode=user.postcode,
        district=user.district
        
    )
    # Add new address to database
    db.add(new_address)
    db.commit()
    db.refresh(new_address)

     # Add new user to database
    db.add(new_user)
    db.commit() # Save database changes
    db.refresh(new_user)

    new_client = Client(
        user_ID=new_user.user_ID,
        address_ID=new_address.address_ID
    )
    # Add new client to database
    db.add(new_client)
    db.commit()
    db.refresh(new_client)

    return {
        "message": "Client user created successfully",
        "created_user_id": new_user.user_ID,
        "address_id": new_address.address_ID,
        "client_id": new_client.client_ID
    }

# Endpoint /login - odpowiada za logowanie użytkownika, w polach zapytania podajemy pola klasy UserLogin
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

@router.post("/user/admin")
def create_admin(form: AdminCreate, current_user: User = Depends(get_current_active_admin), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == form.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail=f"User with specified email {form.email} not found")
    db_admin = db.query(Admin).filter(Admin.user_ID == db_user.user_ID).first()
    if db_admin:
        raise HTTPException(status_code=400, detail=f"Admin already exists for {form.email}")
    new_admin = Admin(
        role=form.role,
        user_ID=db_user.user_ID
    )
    # Add new admin to database
    db.add(new_admin)

    # Update user type to Admin
    db_user.user_type = UserType.Admin

    db.commit() # Save database changes
    db.refresh(new_admin) # Refresh the object to get the new ID
    return {
        "message": "Admin created successfully",
        "created_admin_id": new_admin.admin_ID,
        "user_id": new_admin.user_ID
    }

# Endpoint /user/me - zwraca informacje o zalogowanym użytkowniku
@router.get("/user/me")
def current_user(db: Session = Depends(get_db), user: User = Depends(get_current_active_user)):
    return_data = {
        "message": f"You are logged in as a client {user.email}",
        "user": {
            "email": user.email,
            "name": user.name,
            "surname": user.surname,
            "phone": user.phone,
            "user_type": user.user_type,
            "status": user.status,
            "created_at": user.created_at,
            "last_login": user.last_login,
        }
    }
    if user.user_type == UserType.Admin:
        return_data["admin"] = get_admin(db, user.user_ID)
    return return_data


# Update profile information if field is not None
@router.patch("/user/me")
def update_user(form: UserUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_active_user)):
    if form.name:
        user.name = form.name
    if form.surname:
        user.surname = form.surname
    if form.email:
        user.email = form.email
    if form.phone:
        user.phone = form.phone
    if form.password:
        user.password = get_password_hash(form.password)
    db.commit()
    db.refresh(user)
    return {
        "message": "User updated successfully",
        "updated_user_id": user.user_ID
    }