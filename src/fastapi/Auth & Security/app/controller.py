from fastapi import APIRouter,Depends
from fastapi.security import OAuth2PasswordRequestForm
from app import service
from app import utils
from app import schema


auth_router = APIRouter()
user_router = APIRouter()


@auth_router.post("/login")
def user_login(form:OAuth2PasswordRequestForm=Depends()):
    return service.login(form)


@user_router.get("/me",response_model=schema.UserDetails)
def get_user(user=Depends(utils.get_current_user)):
    return service.get_user(user)