from fastapi import HTTPException
from data import apiData
from schema import UserFull,UserBasic
users  = apiData["users"]
print(users)
def get_user_info_service(user_id:int,include_health_data:bool):
    for user in users:
        if user["id"]==user_id:
            if include_health_data:
                return UserFull(**user)
            else:
                return UserBasic(**user)
    
    raise HTTPException(status_code=404,detail="ID not found")
    