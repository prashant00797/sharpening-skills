from datetime import datetime,timezone
from uuid import uuid4

from fastapi import HTTPException
from app.data import apiData
from app.schema import UserFull,UserBasic
users  = apiData["users"]
def get_user_info_service(user_id:int,include_health_data:bool):
    for user in users:
        if user["id"]==user_id:
            if include_health_data:
                return UserFull(**user)
            else:
                return UserBasic(**user)
    
    raise HTTPException(status_code=404,detail="ID not found")

# # # # # # # # # # # 

def add_products_service(productDetails):
    productDetails_dict = productDetails.model_dump()
    response = {
        "id":str(uuid4()),
        **productDetails_dict,
        "created_at":datetime.now(timezone.utc).isoformat()
    }

    return response