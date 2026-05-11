from fastapi import APIRouter, HTTPException
from app.schema import EmployeeData, MedicalRecordCreate, MedicalRecordRead, MedicalRecordUpdate, UserRegister,UserOut,BlogPost,Status
from app.service import register_user_service,add_blog_post_service,get_blog_post_service,add_employee_details_service,get_medical_record_serivce,add_medical_record_service,update_medical_record_serivce
router = APIRouter(tags=["pydantic"])

@router.post("/register",response_model=UserOut)
def register_user(userData:UserRegister):
    return register_user_service(userData)

@router.post("/post",response_model=BlogPost)
def add_blog_post(post:BlogPost):
    return add_blog_post_service(post)


@router.get("/post",response_model=list[BlogPost])
def get_blog_post(status:Status):
    blog_post = get_blog_post_service(status)

    if blog_post == "No Records Found":
        raise HTTPException(status_code=404,detail="No blog post found with the selected category")
    else:
        return blog_post
    

# method 2
# @router.get("/post",response_model=list[BlogPost])
# def get_blog_post(status:Status | None = None):
#     return get_blog_post_service(status)



@router.post("/employee-details")
def add_employee_details(emp_detials:EmployeeData):
    return add_employee_details_service(emp_detials)



@router.get("/medical-record")
def get_medical_record():
    return get_medical_record_serivce()

@router.post("/medical-record/{data}",response_model=MedicalRecordCreate)
def add_medical_record(record:MedicalRecordCreate):
    return add_medical_record_service(record)


@router.patch("/medical-record/{id}",response_model=MedicalRecordRead | None)
def update_medical_record(id:int,record:MedicalRecordUpdate):
    service_response = update_medical_record_serivce(id,record)
    if not service_response:
        raise HTTPException(status_code=404,detail="ID not found")
    return service_response
