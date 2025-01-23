import os
from dotenv import load_dotenv

load_dotenv()

config = None

class Config:
    def __init__(self):
        self.APP_NAME = os.getenv('APP_NAME')
        self.DATABASE_URL = os.getenv('DATABASE_URL')
        self.AUTH_SECRET = os.getenv('AUTH_SECRET')
        self.TOKEN_EXPIRATION_MINUTES = os.getenv('TOKEN_EXPIRATION_MINUTES')
        self.API_ROOT_PATH = os.getenv('API_ROOT_PATH')

def cfg():
    global config
    if config is None:
        config = Config()
    return config