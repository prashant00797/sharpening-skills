from html import parser
from typing import Literal
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda,RunnableBranch
from pydantic import BaseModel

from ...config import load_env
from ...display import panel

load_env()



class Ticket(BaseModel):
    ticket_type:Literal["billing","techincal","general"]

llm = ChatOpenAI(model="gpt-4o-mini",temperature=0.0)

llm_structured = llm.with_structured_output(Ticket)

str_parser = StrOutputParser()


# def convert_dict(input):
#     return {"result":input}

# runnable = RunnableLambda(convert_dict)

def make_chain(system_msg):
    user_prompt = ChatPromptTemplate([('system',system_msg),('human','{query}')])
    return user_prompt | llm | str_parser

billing_chain = make_chain(
    "You are a billing specialist. Help users with payment and invoice issues politely."
)

technical_chain = make_chain(
    "You are a technical support engineer. Help users debug technical problems clearly."
)

general_chain = make_chain(
    "You are a customer support assistant. Answer general questions professionally."
)


branch = RunnableBranch(
    (
        lambda x: x["ticket_type"] == "billing", # type: ignore
        billing_chain
    ),
    (
        lambda x: x["ticket_type"] == "technical", # type: ignore
        technical_chain
    ),
    general_chain
)

def support_sytem(query:str):
    query_type = llm_structured.invoke(query)
    result = branch.invoke({
        "ticket_type":query_type.ticket_type, # type: ignore
        "query":query
    })

    return result


res = support_sytem("My payment failed but money was deducted from my account")

panel(res, "Support Response", "green")
