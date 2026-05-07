from typing import List, Optional
from pydantic import BaseModel, Field


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

class AddProduct(BaseModel):
    product_name:str = Field(...,description="Product Name")
    price:float=Field(...,gt=0,description="Price of the product")
    category:str=Field(...,description="Category of the product")
    description:Optional[str]=Field(description="Product description",default="")
