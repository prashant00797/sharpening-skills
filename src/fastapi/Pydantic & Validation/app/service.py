from datetime import datetime, timezone
from uuid import uuid4

from fastapi import HTTPException

from app.schema import BlogPost, EmployeeData, MedicalRecordCreate, MedicalRecordRead, UserOut
from app.data import mock_posts,mock_medical_records

def register_user_service(userData):
    user_data = userData.model_dump()
    user_data = {
        "id":uuid4(),
        **user_data,
        "created_at":datetime.now(timezone.utc).isoformat()

    }
    return UserOut(**user_data)

def add_blog_post_service(post):
    post_dict = post.model_dump()
    return BlogPost(**post_dict)

def get_blog_post_service(status):
    result = []
    for post in mock_posts:
        if post["status"] == status:
            result.append(BlogPost(**post))

    if not result:
        return "No Records Found"
    else:
        return result
    

# method 2
# def get_blog_post_service(status):
#     result = []
#     for post in mock_posts:
#          if not status or post["status"] == status:
#             result.append(BlogPost(**post))
    
#     return result


def add_employee_details_service(emp_details):
    emp_details_dict = emp_details.model_dump()
    return EmployeeData(**emp_details_dict)


def get_medical_record_serivce():
   return [MedicalRecordRead(**record) for record in mock_medical_records]

def add_medical_record_service(record):
    record = record.model_dump()
    return MedicalRecordCreate(**record)


def update_medical_record_serivce(id,record):
    for ext_record in mock_medical_records:
        if ext_record["id"] == id:
            updates = record.model_dump(exclude_unset=True)
            ext_record.update(updates)
            return MedicalRecordRead(**ext_record)
        
    return None