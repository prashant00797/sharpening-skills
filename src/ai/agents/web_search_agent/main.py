from fastapi import FastAPI

from agents.web_search_agent.graph import user_web_search
from agents.web_search_agent.schema import AgentState


app = FastAPI(title="Web search ReAct Agent",description="A web search agent",version="0.1")

# Route

@app.post("/user-query")
def user_search_request(request:AgentState):
    return user_web_search(request)