from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableParallel
from langchain_core.output_parsers import StrOutputParser
from rich.console import Console
from rich.panel import Panel
from rich.columns import Columns

from ...config import load_env
load_env()

console = Console()



llm = ChatOpenAI(model="gpt-4o-mini",temperature=0.5)
parser  = StrOutputParser()




prompt_tweet = ChatPromptTemplate.from_messages([('system','You are a content writer for twitter.'),('human','Generate a tweet on topic :{topic} in 280 chars')])
prompt_linkedin_post = ChatPromptTemplate.from_messages([('system','You are a content writer for LinkedIn.'),('human','Generate a linkedIn post on topic :{topic}')])
prompt_email_sub = ChatPromptTemplate.from_messages([('system','You are a helpful assistant for writing email subjects.'),('human','Generate an email subject on topic :{topic}')])

chain_tweet = prompt_tweet | llm | parser
chain_linkedIn = prompt_linkedin_post | llm | parser
chain_email_sub = prompt_email_sub | llm | parser

runnable = RunnableParallel(tweet=chain_tweet,linkedIn=chain_linkedIn,email_sub=chain_email_sub)

response = runnable.invoke({"topic":"An AI-powered resume builder that helps freshers land their first job"})

panels = [
    Panel(response["tweet"], title="[bold cyan]Tweet[/]", border_style="cyan"),
    Panel(response["linkedIn"], title="[bold blue]LinkedIn[/]", border_style="blue"),
    Panel(response["email_sub"], title="[bold green]Email Subject[/]", border_style="green"),
]
console.print(Columns(panels, equal=True))