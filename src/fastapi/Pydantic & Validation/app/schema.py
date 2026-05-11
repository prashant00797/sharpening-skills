import re
from enum import Enum
from typing import Optional
from uuid import UUID
from datetime import date, datetime
from pydantic import BaseModel, EmailStr, Field, computed_field, field_validator, model_validator


class UserRegister(BaseModel):
    full_name:str
    email:EmailStr
    password:str=Field(max_length=8)
    confirm_password:str

    @field_validator("password")
    @classmethod
    def check_password(cls,v:str)->str:
        if not re.search(r"^(?=.*[A-Z])(?=.*\d).{8,}$",v):
            raise ValueError("Password must be of 8 characters, including 1 uppercase and 1 digit")
        return v


    @model_validator(mode="after")
    def validate_password(self):
        if self.password.lower() != self.confirm_password.lower():
            raise ValueError("Password dont match")
        return self

class UserOut(BaseModel):
    id:UUID
    full_name:str
    email:EmailStr
    created_at:datetime



class Status(str,Enum):
    draft = "draft",
    published = "published",
    archived = "archived"

class BlogPost(BaseModel):
    title:str=Field(max_length=100)
    content:str=Field(max_length=1000)
    tags:list[str]=Field(max_length=5)
    status:Status

    @field_validator("tags")
    @classmethod
    def check_tags_length(cls,tags:list[str])->list[str]:
        for tag in tags:
            print(tag)
            if len(tag) > 5:
                raise ValueError("Tag length cannot be greater than 5 chars")
        return tags
    

class EmployeeData(BaseModel):
    employee_id:str
    joining_date:date

    @field_validator("employee_id")
    @classmethod
    def employee_id_validation(cls,id):
        if not re.match(r"EMP-\d{4}",id):
            raise ValueError("Please enter the employee id as EMP-(4digits)")
        return id
        
    @field_validator("joining_date")
    @classmethod
    def validate_date(cls,jd):
        if jd > date.today():
            raise ValueError("Date can't be of future")

        return jd

    @computed_field
    @property
    def get_numeric_value_from_empid(self)->int:
        numeric_val = self.employee_id.split("-")[-1]
        return int(numeric_val)
    

class MedicalRecordBase(BaseModel):
    patient_id:str
    diagnosis:str
    notes:Optional[str] = None

class MedicalRecordCreate(MedicalRecordBase):
    pass

class MedicalRecordUpdate(MedicalRecordBase):
    patient_id:Optional[str] = None
    diagnosis:Optional[str] = None
    notes:Optional[str] = None

class MedicalRecordRead(MedicalRecordBase):
    id:int 
    created_at:date
    updated_at:date
    doctor_name:str