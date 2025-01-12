from datetime import datetime
import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from models.tables.address import Address
from models.tables.courier import Courier
from models.tables.payment import Payment
from models.tables.product_order import ProductOrder
from models.tables.shop import Shop
from models.tables.user import User, UserType
from utils.auth import get_current_active_admin, get_current_active_client, get_current_active_user
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
def get_orders_by_client(client_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    db_client = db.query(Client).filter(Client.client_ID == client_id).first()
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    if current_user.user_type != "admin" and db_client.user_ID != current_user.user_ID:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    orders = db.query(Order).filter(Order.client_ID == client_id).all()

    return_list = []

    for order in orders:
        products_ordered = db.query(ProductOrder).filter(ProductOrder.order_ID == order.order_ID).all()
        order_payment = db.query(Payment).filter(Payment.payment_ID == order.payment_ID).first()
        order_courier = db.query(Courier).filter(Courier.courier_ID == order.courier_ID).first()
        courier_user = db.query(User).filter(User.user_ID == order_courier.user_ID).first()
        order_address = db.query(Address).filter(Address.address_ID == order.address_ID).first()
        products_list = []
        for product_ordered in products_ordered:
            product = db.query(Product).filter(Product.product_ID == product_ordered.product_ID).first()
            shop = db.query(Shop).filter(Shop.shop_ID == product.shop_ID).first()
            products_list.append({
                'product': {
                    'id': product.product_ID,
                    'name': product.name,
                    'price': product.price,
                    'shop': {
                        'id': shop.shop_ID,
                        'name': shop.name
                    }
                },
                'ordered_amount': product_ordered.amount
            })
        return_list.append({
            'id': order.order_ID,
            'date': order.order_date,
            'status': order.status,
            'payment': {
                'id': order_payment.payment_ID,
                'status': order_payment.status,
                'method': order_payment.payment_method
            },
            'address': {
                'street': order_address.street,
                'city': order_address.city,
                'postcode': order_address.postcode
            },
            'courier': {
                'id': order_courier.courier_ID,
                'name': courier_user.name,
                'surname': courier_user.surname,
                'delivery_transport': order_courier.delivery_transport,
                'license_plate': order_courier.license_plate
            },
            'products': products_list,
        })

    return return_list

@router.get("/courier/{courier_id}/orders")
def get_orders_by_courier(courier_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    db_courier = db.query(Courier).filter(Courier.courier_ID == courier_id).first()
    if not db_courier:
        raise HTTPException(status_code=404, detail="Courier not found")
    
    if current_user.user_type != UserType.Admin and db_courier.user_ID != current_user.user_ID:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    orders = db.query(Order).filter(Order.courier_ID == courier_id).all()

    return_list = []

    for order in orders:
        products_ordered = db.query(ProductOrder).filter(ProductOrder.order_ID == order.order_ID).all()
        order_client = db.query(Client).filter(Client.client_ID == order.client_ID).first()
        client_user = db.query(User).filter(User.user_ID == order_client.user_ID).first()
        order_payment = db.query(Payment).filter(Payment.payment_ID == order.payment_ID).first()
        order_courier = db.query(Courier).filter(Courier.courier_ID == order.courier_ID).first()
        order_address = db.query(Address).filter(Address.address_ID == order.address_ID).first()
        products_list = []
        for product_ordered in products_ordered:
            product = db.query(Product).filter(Product.product_ID == product_ordered.product_ID).first()
            shop = db.query(Shop).filter(Shop.shop_ID == product.shop_ID).first()
            products_list.append({
                'product': {
                    'id': product.product_ID,
                    'name': product.name,
                    'price': product.price,
                    'shop': {
                        'id': shop.shop_ID,
                        'name': shop.name
                    }
                },
                'ordered_amount': product_ordered.amount
            })
        return_list.append({
            'id': order.order_ID,
            'date': order.order_date,
            'status': order.status,
            'client': {
                'id': order_client.client_ID,
                'name': client_user.name,
                'surname': client_user.surname
            },
            'payment': {
                'id': order_payment.payment_ID,
                'status': order_payment.status,
                'method': order_payment.payment_method
            },
            'address': {
                'street': order_address.street,
                'city': order_address.city,
                'postcode': order_address.postcode
            },
            'products': products_list,
        })

    return return_list


@router.get("/orders")
def get_all_orders(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_admin)):
    orders = db.query(Order).all()

    return_list = []

    for order in orders:
        products_ordered = db.query(ProductOrder).filter(ProductOrder.order_ID == order.order_ID).all()
        order_client = db.query(Client).filter(Client.client_ID == order.client_ID).first()
        client_user = db.query(User).filter(User.user_ID == order_client.user_ID).first()
        order_payment = db.query(Payment).filter(Payment.payment_ID == order.payment_ID).first()
        order_courier = db.query(Courier).filter(Courier.courier_ID == order.courier_ID).first()
        courier_user = db.query(User).filter(User.user_ID == order_courier.user_ID).first()
        order_address = db.query(Address).filter(Address.address_ID == order.address_ID).first()
        products_list = []
        for product_ordered in products_ordered:
            product = db.query(Product).filter(Product.product_ID == product_ordered.product_ID).first()
            shop = db.query(Shop).filter(Shop.shop_ID == product.shop_ID).first()
            products_list.append({
                'product': {
                    'id': product.product_ID,
                    'name': product.name,
                    'price': product.price,
                    'shop': {
                        'id': shop.shop_ID,
                        'name': shop.name
                    }
                },
                'ordered_amount': product_ordered.amount
            })
        return_list.append({
            'id': order.order_ID,
            'date': order.order_date,
            'status': order.status,
            'client': {
                'id': order_client.client_ID,
                'name': client_user.name,
                'surname': client_user.surname
            },
            'payment': {
                'id': order_payment.payment_ID,
                'status': order_payment.status,
                'method': order_payment.payment_method
            },
            'address': {
                'street': order_address.street,
                'city': order_address.city,
                'postcode': order_address.postcode
            },
            'courier': {
                'id': order_courier.courier_ID,
                'name': courier_user.name,
                'surname': courier_user.surname,
                'delivery_transport': order_courier.delivery_transport,
                'license_plate': order_courier.license_plate
            },
            'products': products_list,
        })

    return return_list

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

    for product in ordered_products:
        new_product_order = ProductOrder(
            order_ID=new_order.order_ID,
            product_ID=product['product']['product_ID'],
            amount=product['count']
        )
        db.add(new_product_order)
        db.commit()

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

@router.put("/orders/{order_id}/pay")
def pay_order(order_id: int, db: Session = Depends(get_db), current_client: Client = Depends(get_current_active_client)):
    db_order = db.query(Order).filter(Order.order_ID == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if db_order.status != "Pending":
        raise HTTPException(status_code=400, detail="Order already paid")
    
    db_payment = db.query(Payment).filter(Payment.payment_ID == db_order.payment_ID).first()
    db_payment.status = "Done"
    db.commit()

    db_order.status = "Shipped"
    db.commit()

    return {
        "message": "Order paid successfully",
        "order": {
            "id": db_order.order_ID,
            "status": db_order.status
        }
    }

@router.put("/orders/{order_id}/cancel")
def cancel_order(order_id: int, 
                 db: Session = Depends(get_db), 
                 current_client: Client = Depends(get_current_active_client),
                 current_user: User = Depends(get_current_active_user)):
    db_order = db.query(Order).filter(Order.order_ID == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if current_user.user_type != "admin" and db_order.client_ID != current_client.client_ID:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    if db_order.status == "Canceled":
        raise HTTPException(status_code=400, detail="Order already canceled")
    
    if db_order.status != "Pending":
        raise HTTPException(status_code=400, detail="Order already paid and cannot be cancelled")
    
    db_payment = db.query(Payment).filter(Payment.payment_ID == db_order.payment_ID).first()
    db_payment.status = "Canceled"
    db.commit()

    db_order.status = "Canceled"
    db.commit()

    return {
        "message": "Order canceled successfully",
        "order": {
            "id": db_order.order_ID,
            "status": db_order.status
        }
    }

@router.delete("/orders/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_admin)):
    db_order = db.query(Order).filter(Order.order_ID == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    db_payment = db.query(Payment).filter(Payment.payment_ID == db_order.payment_ID).first()
    db.query(ProductOrder).filter(ProductOrder.order_ID == order_id).delete()
    db.delete(db_payment)
    db.delete(db_order)
    db.commit()

    return {
        "message": "Order deleted successfully",
        "order_id": order_id
    }