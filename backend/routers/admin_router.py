from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from models.tables.client import Client
from models.tables.user import User
from utils.auth import get_current_active_admin
from utils.database import get_db


router = APIRouter()

# Endpoint /admin/clients - zwraca informacje o wszystkich klientach
@router.get("/admin/clients")
def get_clients(
    start_index: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db), 
    user: User = Depends(get_current_active_admin)):
    client_users = db.query(User).filter(User.user_type == "Client").offset(start_index).limit(limit).all()

    clients_data = []

    for user in client_users:
        user.client = db.query(Client).filter(Client.user_ID == user.user_ID).first()
        clients_data.append(user.__dict__)
    
    return_data = []

    for client_data in clients_data:
        client = {
            "client_ID": client_data['client'].client_ID,
            "user_ID": client_data['user_ID'],
            "name": client_data['name'],
            "surname": client_data['surname'],
            "email": client_data['email'],
            "phone": client_data['phone'],
            "created_at": client_data['created_at'],
            "status": client_data['status'],
            "last_login": client_data['last_login'],
            "loyalty_points": client_data['client'].loyalty_points
        }

        return_data.append(client)
    
    return return_data