from typing import Literal, Optional
from pydantic import BaseModel

class EvaluateSearchResult(BaseModel):
    is_sufficient:bool
    refined_query:Optional[str]=""

class RefinedUserQuery(BaseModel):
    refined_query: Optional[str]=""            # what agent actually searches
    query_type: Optional[Literal["factual","research","comparison","news"]]=None              # factual / research / comparison / news

class AgentState(BaseModel):
    original_query: str           # what user typed
    refined_query: Optional[str]=""            # what agent actually searches
    query_type: Optional[Literal["factual","research","comparison","news"]]=None              # factual / research / comparison / news
    search_results: Optional[list]=[]       # accumulated results from ALL searches
    search_queries_used: Optional[list]=[]     # every query tried (for trace)
    iteration: Optional[int]=0                # how many times we've searched
    max_iterations: Optional[int]=10           # guard — stop at 10
    is_sufficient: Optional[bool]=False           # evaluator's verdict
    final_answer: Optional[str]=""             # synthesizer output
    sources: Optional[list]=[]                 # URLs with titles
    trace: Optional[list]=[]                   # full log of everything