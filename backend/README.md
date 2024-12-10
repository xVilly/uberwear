# Dokumentacja backendu
## 1. Instalacja i pierwsze uruchomienie
## 1.1 Instalacja bazy danych
- pobranie xamppa [(Link)](https://www.apachefriends.org/pl/index.html) 
- uruchomienie modułów **apache** i **mysql**  
- zaimportowanie [naszej bazy SQL](https://github.com/Bosok-maker/GigaProjekt) do phpmyadmina (*http://localhost/phpmyadmin*) i nazwanie jej: **ubrania**
## 1.2 Instalacja backendu
- wymagany python (*najlepiej 3.12+*) oraz moduł **venv**
- wykonanie po kolei poleceń w ścieżce docelowej:
```shell
git clone https://github.com/xVilly/uberwear.git
cd uberwear
cd backend
python -m venv venv
venv/Scripts/Activate
pip install fastapi[standard] sqlalchemy pymysql python-jose pyjwt passlib bcrypt
```
- utworzenie pliku o nazwie **.env** w folderze backend
- uzupełnienie konfiguracji w pliku env:
```env
APP_NAME = "UberWear"
DATABASE_URL = "mysql+pymysql://root@localhost/ubrania"
AUTH_SECRET = "123456789"
TOKEN_EXPIRATION_MINUTES = 90
```
- uruchomienie aplikacji
```shell
python -m fastapi dev main.py
```