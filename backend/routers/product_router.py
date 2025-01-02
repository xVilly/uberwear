from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from models.tables.address import Address
from models.tables.product import Product
from models.tables.shop import Shop
from utils.auth import get_current_active_admin
from utils.database import get_db


# Utworzenie instancji routera API
router = APIRouter()


class ProductCreate(BaseModel):
    name: str
    price: float
    category: str
    amount: Optional[int] = 0

# Pobieranie listy produktów z bazy
@router.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

# Pobieranie produktu po ID
@router.get("/product/{product_id}")
def get_product(product_id: int, expand_shop: Optional[bool] = False, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_ID == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_dict = product.__dict__.copy()
    if expand_shop:
        shop = db.query(Shop).filter(Shop.shop_ID == product.shop_ID).first()
        if shop:
            product_dict['shop'] = shop.__dict__.copy()
    
    return product_dict

# Dodanie nowego produktu do bazy
@router.post("/shop/{shop_id}/product", dependencies=[Depends(get_current_active_admin)])
def add_product(shop_id: int, form: ProductCreate, db: Session = Depends(get_db)):
    db_shop = db.query(Shop).filter(Shop.shop_ID == shop_id).first()
    if not db_shop:
        raise HTTPException(status_code=404, detail="Shop not found")

    db_product = db.query(Product).filter(Product.name == form.name).first()
    if db_product:
        raise HTTPException(status_code=400, detail="Product with that name already exists")
    
    new_product = Product(
        name=form.name,
        amount=form.amount if form.amount else 0,
        price=form.price,
        category=form.category,
        shop_ID=shop_id,
    )
    
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
    return {
        "message": "Product created successfully",
        "created_product_id": new_product.product_ID
    }

# Aktualizacja produktu
@router.put("/product/{product_id}", dependencies=[Depends(get_current_active_admin)])
def update_product(product_id: int, form: ProductCreate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.product_ID == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db_product.name = form.name
    db_product.price = form.price
    db_product.category = form.category
    
    if form.amount:
        db_product.amount = form.amount
    
    db.commit()
    db.refresh(db_product)
    
    return {
        "message": "Product updated successfully",
        "updated_product_id": db_product.product_ID
    }

# Usunięcie produktu
@router.delete("/product/{product_id}", dependencies=[Depends(get_current_active_admin)])
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.product_ID == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    
    return {
        "message": "Product deleted successfully",
        "deleted_product_id": product_id
    }