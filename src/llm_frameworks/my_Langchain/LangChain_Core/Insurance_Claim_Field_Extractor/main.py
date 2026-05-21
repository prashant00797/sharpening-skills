from typing import Literal
from langchain_openai import ChatOpenAI
from pydantic import BaseModel
from ...config import load_env
from ...display import panel, rule

load_env()


class ClaimsSchema(BaseModel):
    claimant_name:str 
    claim_amount:float 
    incident_date:str 
    claim_type:Literal['medical','accident','property']

llm = ChatOpenAI(model="gpt-4o-mini",temperature=0.0)
llm_structured = llm.with_structured_output(ClaimsSchema)

response = llm_structured.invoke("John Doe filed a medical claim of Rs 45000 on 15th March 2025 for hospitalization.")

rule("Assistant")
panel(response, "Claim (object)", "green")
panel(response.model_dump(), "Claim (dict)", "blue")  # type: ignore