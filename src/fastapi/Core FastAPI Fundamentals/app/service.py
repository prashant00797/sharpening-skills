from datetime import datetime,timezone
from uuid import uuid4

from fastapi import HTTPException
from app.data import apiData,usersApiData,all_orders,documents
from app.schema import UpdateUser, UserFull,UserBasic

# static dummy data
users  = apiData["users"]
update_users_data = usersApiData["users"]

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

# # # # # # # # # # # 

def update_user_service(id:int,userData:UpdateUser)->dict | None:
    for user in update_users_data:
       print(user)
       if(user["id"]==id):
           updates = userData.model_dump(exclude_unset=True) # type: ignore
           user.update(updates)
           return user
       
    
    return None

# # # # # # # # # # #   

def pagination_service(limit:int,skip:int)->dict:
    total = len(all_orders)
    data = all_orders[skip: skip +limit ]
    return {
        "total":total,
        "limit":limit,
        "skip":skip,
        "data":data
    }
# # # # # # # # # # # 

def delete_document_service(id):
    for doc in documents:
        if(doc["id"]==id):
            if(doc["is_deleted"]==True):
                return "already_deleted"
            else:
                doc["is_deleted"] = True
                return "success"
        
    
    return "not_found"
        