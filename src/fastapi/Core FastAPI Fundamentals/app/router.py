from fastapi import APIRouter
from schema import UserBasic, UserFull
from service import get_user_info_service

router = APIRouter()
@router.get("/users/{user_id}",response_model= UserBasic | UserFull)
def get_user_info_route(user_id:int,include_health_data: bool=False):
    return get_user_info_service(user_id,include_health_data)