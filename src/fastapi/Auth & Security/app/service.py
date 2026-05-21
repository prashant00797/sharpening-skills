from fastapi.security import OAuth2PasswordRequestForm
from fastapi import HTTPException,status
from app.utils import USERS, create_token, verify_password


def login(form:OAuth2PasswordRequestForm):
    user = USERS.get(form.username)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="no username found")
    
    if not verify_password(password=form.password,hashpassword=user.get("hashed_pwd","")):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Incorrect password")
    
    token_pair = create_token({
        "sub":form.username
    })

    return {"access_token":token_pair["access_token"],"refresh_token":token_pair["refresh_token"],"token_type":"bearer"}



def get_user(user:str):
    user_details = USERS.get(user,"")
    if not user_details:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user_details