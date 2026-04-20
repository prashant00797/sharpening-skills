import os
from dotenv import load_dotenv
from langchain_classic.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from tavily import TavilyClient
from langgraph.graph import END, START, StateGraph
from RAG.basic_rag_with_file_upload.backend.rag_engine import user_query
from .schema import AgentState, EvaluateSearchResult, RefinedUserQuery


# intialisation
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__),".env"))
llm_openai = ChatOpenAI(model="gpt-5-nano",temperature=0)
llm_openai_strcutured_query = llm_openai.with_structured_output(RefinedUserQuery)
llm_openai_structured_evaluator =llm_openai.with_structured_output(EvaluateSearchResult)
tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))



def query_analyser(state:AgentState):
    user_query = state.original_query
    prompt = ChatPromptTemplate([('system','You are a web search query optimizer assistant. Optimize the following web search query:{user_query}'),('human','{user_query}')])
    chain = prompt | llm_openai_strcutured_query
    result = chain.invoke({"user_query":user_query})
    return {"refined_query":result.refined_query,"query_type":result.query_type} # type: ignore

def searcher(state:AgentState):
    refined_query = state.refined_query
    search = tavily_client.search(query=refined_query) # type: ignore
    return {"search_results":state.search_results + [search],"search_queries_used": state.search_queries_used + [refined_query],"iteration":state.iteration + 1} # type: ignore

def evaluator(state:AgentState):
    query = state.refined_query
    query_type = state.query_type
    tavily_search_results = state.search_results
    prompt = ChatPromptTemplate([('system','''
    You are a smart web search evaluator. You have been given
    the search results:{tavily_search_results}
    "If not satisfied with the current query:{query}, please provide a DIFFERENT search query that explores a new angle not covered by the current results.
''')])
    chain = prompt|llm_openai_structured_evaluator
    result = chain.invoke({"tavily_search_results":tavily_search_results,"query_type":query_type,"query":query})
    print(result)    
    return {"is_sufficient":result.is_sufficient,"refined_query":result.refined_query} # type: ignore

def synthesizer(state:AgentState):
    print("synthesizer")

def tracer(state:AgentState):
    print("tracer")

def should_continue(state):
    if state.is_sufficient or state.iteration >= state.max_iterations:
        return "goto_synthesizer"
    else:
        return "goto_searcher"

def create_graph(schema):
    graph = StateGraph(schema)
    graph.add_node("query_analyser",query_analyser)
    graph.add_node("searcher",searcher)
    graph.add_node("evaluator",evaluator)
    graph.add_node("synthesizer",synthesizer)
    graph.add_node("tracer",tracer)
    graph.add_edge(START,"query_analyser")
    graph.add_edge("query_analyser","searcher")
    graph.add_edge("searcher","evaluator")
    graph.add_conditional_edges("evaluator",should_continue,{
        "goto_synthesizer":"synthesizer",
        "goto_searcher":"searcher"
    })
    graph.add_edge("synthesizer","tracer")
    graph.add_edge("tracer",END)
    return graph.compile()


GRAPH = create_graph(AgentState)
# print(GRAPH.get_graph().draw_mermaid())

def user_web_search(state:AgentState):
    user_query = state.original_query
    result = GRAPH.invoke(AgentState(original_query=user_query))
    return result
