from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage,HumanMessage,ToolMessage
from ...config import load_env
from ...display import panel
from .tool_kit import get_product

load_env()


client = ChatOpenAI(model="gpt-4o-mini",temperature=0.0)
toolkit = [get_product]
bind_llm_with_tools = client.bind_tools(toolkit)


sys_msg = SystemMessage(content='''
You are an e-commerce support agent.
        Tools usage
            1. Get product
            Call this whenver
                - its product_name or price or stock refer to tools
        For any other case politely ask for further information


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


query = "What is most simlar to google pixel 8 give me that?"
response = product_support(query)

panel(query,"Human","red")
panel(response,"Assitant","green")
