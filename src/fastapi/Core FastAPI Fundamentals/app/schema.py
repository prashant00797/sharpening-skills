from typing import List

from pydantic import BaseModel


class UserBasic(BaseModel):
    id:int 
    name:str
    email:str

class UserFull(BaseModel):
    id:int
    name:str
    email:str
    blood_group:str
    allergies:List[str]
