from datetime import datetime
import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from models.tables.payment import Payment
from models.tables.product_order import ProductOrder
from models.tables.user import User
from utils.auth import get_current_active_client
from models.tables.client import Client
from models.tables.order import Order
from utils.database import get_db
from models.tables.product import Product
from sqlalchemy.orm import Session

from utils.logic import choose_courier

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
        products_ordered = db.query(ProductOrder).filter(ProductOrder.order_ID == order_dict['order_ID']).all()
        products_list = []
        for product_ordered in products_ordered:
            product = db.query(Product).filter(Product.product_ID == product_ordered.product_ID).first()
            products_list.append({
                'product': product.__dict__.copy(),
                'ordered_amount': product_ordered.product_amount
            })
        order_dict['products'] = products_list

    return orders_list


class ProductInput(BaseModel):
    id: int
    count: int

class OrderInput(BaseModel):
    products: list[ProductInput]
    payment_method: str

# Utworzenie zamówienia - wymagany zalogowany client
@router.post("/orders")
def make_order(input: OrderInput, db: Session = Depends(get_db), current_client: Client = Depends(get_current_active_client)):
    ordered_products = []

    for product in input.products:
        db_product = db.query(Product).filter(Product.product_ID == product.id).first()
        if not db_product:
            raise HTTPException(status_code=404, detail=f"Product {product.id} not found")
        
        if db_product.amount < product.count:
            raise HTTPException(status_code=400, detail=f"Not enough {db_product.name} in stock")
        
        ordered_products.append({
            'product': db_product.__dict__.copy(),
            'count': product.count
        })

    # Wybranie kuriera do dostawy
    courier = choose_courier(db)
    if not courier:
        raise HTTPException(status_code=400, detail="No courier available")
    
    # Utworzenie płatności
    new_payment = Payment(
        price = sum([product['product']['price'] * product['count'] for product in ordered_products]),
        status = "Awaits",
        payment_method = input.payment_method
    )

    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)

    # Utworzenie zamówienia
    new_order = Order(
        order_date=datetime.now(),
        client_ID=current_client.client_ID,
        status="Pending",
        courier_ID=courier.courier_ID,
        payment_ID=new_payment.payment_ID,
        address_ID=current_client.address_ID
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return {
        "message": "Order created successfully - awaiting payment",
        "created_order_id": new_order.order_ID,
        "payment": {
            "id": new_payment.payment_ID,
            "status": new_payment.status,
            "method": new_payment.payment_method
        },
        "ordered_products": ordered_products,
    }