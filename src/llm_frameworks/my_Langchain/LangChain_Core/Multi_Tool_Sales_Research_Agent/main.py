from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage,HumanMessage,ToolMessage
from ...config import load_env
from ...display import panel
from .tools import get_company_info,calculate_deal_value

load_env()


client = ChatOpenAI(model="gpt-4o-mini",temperature=0.0)
toolkit = [get_company_info,calculate_deal_value]
bind_llm_with_tools = client.bind_tools(toolkit)


sys_msg = SystemMessage(content='''
You are a B2B sales research assistant.

To answer a deal value question, follow this order:
1. Call get_company_info to look up the company's size.
2. Then call calculate_deal_value using the size from step 1.

Never assume or guess a company's size from your own knowledge.
The size must always come from get_company_info.

''')

def product_support(query):
    # history IS the conversation. We keep appending to it and re-invoking.
    history = [sys_msg, HumanMessage(content=query)]
    response = bind_llm_with_tools.invoke(history)
    history.append(response)
    
    tool_by_names = {tool.name: tool for tool in toolkit}
    while response.tool_calls:
        for tool_call in response.tool_calls:
            tool = tool_by_names[tool_call["name"]]
            tool_invocation = tool.invoke(tool_call["args"])
            history.append(ToolMessage(content=str(tool_invocation), tool_call_id=tool_call["id"]))
        response = bind_llm_with_tools.invoke(history)
        history.append(response)
    return response.content


query = "What is the estimated deal value for Microsoft on the Enterprise tier?"
response = product_support(query)

panel(query,"Human","red")
panel(response,"Assitant","green")
