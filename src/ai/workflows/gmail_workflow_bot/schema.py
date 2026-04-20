from typing import Literal, Optional
from pydantic import BaseModel, Field

class EmailDraftRequest(BaseModel):
    message:str=Field(description="The user query to draft the email")


class Email(BaseModel):
    message:str=Field(description="The user query to draft the email")
    draft_mail:Optional[str]=Field(description="The email draft created by LLM.",default="")
    approval:Optional[Literal["yes","no","pending"]]=Field(description="The human feedback whether they liked the email draft or not.",default="pending")
    feedback:Optional[str]=Field(description="The feedback why the user didn't liked the drafted mail.",default="")

class Review(BaseModel):
    id:str=Field(description="The thread id of the current user in the converstation")
    approval:Optional[Literal["yes","no","pending"]]=Field(description="The human feedback whether they liked the email draft or not.",default="pending")
    feedback:Optional[str]=Field(description="The feedback why the user didn't liked the drafted mail.",default="")