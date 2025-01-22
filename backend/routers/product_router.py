from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import and_
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

@router.get("/shop/{shop_id}/category/{category}/colors")
def get_category_colors(shop_id: int, category: str, db: Session = Depends(get_db)):
    shop = db.query(Shop).filter(Shop.shop_ID == shop_id).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    products = db.query(Product).filter(and_(Product.shop_ID == shop_id, Product.category == category)).all()
    colors = set([product.color for product in products])

    colors_expanded = []
    for color in colors:
        # parse product image from color
        product = db.query(Product).filter(and_(Product.category == category, Product.color == color)).first()
        if product:
            colors_expanded.append({
                "color": color,
                "product": product.name,
                "image": product.image
            })
        else:
            colors_expanded.append({
                "color": color,
                "product": '',
                "image": None
            })

    return colors_expanded

@router.get("/shop/{shop_id}/category/{category}/colors/{color}")
def get_color_products(shop_id: int, category: str, color: str, db: Session = Depends(get_db)):
    shop = db.query(Shop).filter(Shop.shop_ID == shop_id).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    products = db.query(Product).filter(and_(Product.shop_ID == shop_id, Product.category == category, Product.color == color)).all()
    return products

@router.get("/shop/{shop_id}/products")
def get_shop_products(shop_id: int, db: Session = Depends(get_db)):
    shop = db.query(Shop).filter(Shop.shop_ID == shop_id).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    products = db.query(Product).filter(Product.shop_ID == shop_id).all()
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

@router.get("/shop/{shop_id}/categories")
def get_shop_categories(shop_id: int, db: Session = Depends(get_db)):
    shop = db.query(Shop).filter(Shop.shop_ID == shop_id).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    products = db.query(Product).filter(Product.shop_ID == shop_id).all()
    categories = set([product.category for product in products])

    categories_expanded = []
    for category in categories:
        # parse black color product image from category
        product = db.query(Product).filter(and_(Product.category == category, Product.color == 'Czarny')).first()
        if product:
            categories_expanded.append({
                "name": category,
                "image": product.image
            })
        else:
            product = db.query(Product).filter(Product.category == category).first()
            if product:
                categories_expanded.append({
                    "name": category,
                    "image": product.image
                })
            else:
                categories_expanded.append({
                    "name": category,
                    "image": None
                })

    
    return {
        "shop_id": shop_id,
        "categories": categories_expanded
    }