
from typing import Union

from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer

from utils.config import cfg
from fastapi.middleware.cors import CORSMiddleware

from routers import account_router
from fastapi.openapi.utils import get_openapi


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
)

@app.get("/")
def read_root():
    return {"app_name": cfg().APP_NAME}

app.include_router(account_router.router, tags=["Account"])
