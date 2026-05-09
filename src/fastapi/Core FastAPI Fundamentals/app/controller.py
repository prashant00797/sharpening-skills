from fastapi import APIRouter, HTTPException, Query, Response
from app.schema import AddProduct, UpdateUser, UserBasic, UserFull
from app.service import add_products_service, delete_document_service, get_user_info_service, pagination_service, update_user_service

router = APIRouter(tags=["Core FastAPI Fundamentals"])

@router.get("/users/{user_id}",response_model= UserBasic | UserFull)
def get_user_info_route(user_id:int,include_health_data: bool=False):
    return get_user_info_service(user_id,include_health_data)


@router.post("/products",status_code=201)
def add_products(product_details:AddProduct):
    return add_products_service(product_details)


@router.patch("/users/{user_id}")
def update_user(user_id:int,userData:UpdateUser):
    updated_data = update_user_service(user_id,userData)
    if updated_data == None:
        raise HTTPException(status_code=404,detail="ID not found")
    else:
        return updated_data


@router.get("/orders")
def pagination(limit:int=Query(description="setting limit with respect of the total orders",ge=1,lt=100,default=10),skip:int=Query(description="To skip a chunk orders",default=0,ge=0)):
    return pagination_service(limit,skip)


@router.delete("/documents/{doc_id}")
def delete_document(doc_id:int):
    status =  delete_document_service(doc_id)
    if status == "not_found":
        raise HTTPException(status_code=400,detail="Document already deleted")
    elif status == "already_deleted":
        raise HTTPException(status_code=404,detail="Document not found")
    elif status=="success":
        return Response(status_code=204)
    else:
        raise HTTPException(status_code=500,detail="Something went wrong")