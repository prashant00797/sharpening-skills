import jwt
from jwt.exceptions import PyJWTError,ExpiredSignatureError
from fastapi import Depends, HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash
from datetime import date, datetime, timedelta, timezone


USERS = {
    "prashant": {
        "id": "u001",
        "username": "prashant",
        "hashed_pwd": "$argon2id$v=19$m=65536,t=3,p=4$jhe7aHeU4jEVDc22b757hQ$S7NYh/XhRYn6uMnppnfp9bsoW7hsFXm0VgGYrM+XdTI"
    }
}
EXPIRY_ACCESS_TOKEN =30
EXPIRTY_REFRESH_TOKEN=7
SECRET_KEY="79f8a02313dc230613c544dcac350e5faf447be2ec28af9fb4a2b83b0e64f20d"

password_hash = PasswordHash.recommended()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def decode_JWT(token:str):
    return jwt.decode(token,key=SECRET_KEY,algorithms=["HS256"])


def verify_password(password,hashpassword):
    return password_hash.verify(password,hashpassword)


def create_token(data):
    expiry_time_access = datetime.now(timezone.utc) + timedelta(minutes=EXPIRY_ACCESS_TOKEN)
    expiry_time_refresh = datetime.now(timezone.utc) + timedelta(days=EXPIRTY_REFRESH_TOKEN)
    payload_access = {
        **data,
        "exp":expiry_time_access
    }
    payload_refresh = {
        **data,
        "exp":expiry_time_refresh
    }
    access_token = jwt.encode(payload_access,key=SECRET_KEY,algorithm="HS256")
    refresh_token = jwt.encode(payload_refresh,key=SECRET_KEY,algorithm="HS256")

    return {"access_token":access_token,"refresh_token":refresh_token}


def get_current_user(token:str=Depends(oauth2_scheme)):
    try:
        
        payload = decode_JWT(token)
        
        return payload["sub"]
    
    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Token Expired")
    
    except PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="You are not Authorized. Please Login")