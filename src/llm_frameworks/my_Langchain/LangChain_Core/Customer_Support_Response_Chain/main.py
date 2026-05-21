from ...config import load_env
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from ...display import panel
load_env()

llm = ChatOpenAI(model="gpt-4o-mini",temperature=0.0)
prompt = ChatPromptTemplate([
    ("system", 
     "You are an e-commerce customer support agent.\n"
     "Your job is to assist users with orders, returns, refunds, and general support.\n\n"
     
     "Rules:\n"
     "- Be polite, calm, and helpful\n"
     "- Keep answers short (2–4 lines)\n"
     "- Do NOT give deep technical troubleshooting\n"
     "- Focus on support actions (refund, replacement, order help)\n"
     "- If needed, ask for order ID or suggest contacting support\n"
    ),
    ("user", "{question}")
])
str_parser = StrOutputParser()


def customer_support_assistant(question:dict):
    chain = prompt | llm | str_parser
    res = chain.invoke(question)
    return(res)


query = input("Please Enter your Query...")
response = customer_support_assistant({"question":query})
panel(query, "User Query", "yellow")
panel(response, "Assistant Response", "green")