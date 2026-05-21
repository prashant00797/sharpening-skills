from pydantic import BaseModel


class UserLogin(BaseModel):
    username:str
    password:str

class UserDetails(BaseModel):
    id:str
    username:str