from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.schema import AddProduct, UserBasic, UserFull
from app.service import add_products_service, get_user_info_service

custom_router = APIRouter(tags=["Core FastAPI Fundamentals"])

@custom_router.get("/users/{user_id}",response_model= UserBasic | UserFull)
def get_user_info_route(user_id:int,include_health_data: bool=False):
    return get_user_info_service(user_id,include_health_data)


@custom_router.post("/products",status_code=201)
def add_products(product_details:AddProduct):
    return add_products_service(product_details)