from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from models.tables.client import Client
from models.tables.order import Order
from utils.database import get_db
from models.tables.product import Product
from sqlalchemy.orm import Session

# Utworzenie instancji routera API
router = APIRouter()

# Pobieranie listy zamówień z bazy dla danego klienta
@router.get("/client/{client_id}/orders")
def get_orders_by_client(client_id: int, db: Session = Depends(get_db)):
    db_client = db.query(Client).filter(Client.client_ID == client_id).first()
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    orders = db.query(Order).filter(Order.client_ID == client_id).all()
    orders_list = [orders.__dict__.copy() for order in orders]

    for order_dict in orders_list:
        products_ordered = 1

    return orders_list
