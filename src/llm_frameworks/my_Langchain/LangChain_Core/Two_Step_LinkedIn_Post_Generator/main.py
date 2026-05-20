from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda
from rich.console import Console
from rich.panel import Panel
from rich.rule import Rule
from ...config import load_env
load_env()

console = Console()

# client
llm = ChatOpenAI(model="gpt-4o-mini",temperature=0.7)

# initial prompt
user_prompt = ChatPromptTemplate.from_messages([
    ('system', 'You are a creative content writer specializing in LinkedIn posts. Write engaging, first-person posts that tell a story and spark conversation.'),
    ('human', 'Generate a LinkedIn post on topic: {topic}')
])

# prompt to refine post
refine_prompt = ChatPromptTemplate.from_messages([('system','''
    You are a professional Editor specializing in
    LinkedIn post.
    Take the generated linkedIn post and make it professional tone
    Ensure that it includes
    - Proper catchy Headings
    - engaging content
    - Hash Tags
    Keep the content length engaging so that the user doesn't loose
    focus while reading it
'''),('human','{result}')])

# string parser
parser = StrOutputParser()

# runnable to inspect intermediate output
def inspect(output):
    console.print(Rule("[bold yellow]Chain 1 — Raw Draft[/]", style="yellow"))
    console.print(Panel(output, border_style="yellow"))
    return output  # pass it through unchanged

inspect_func = RunnableLambda(inspect)

# runnable function
def convert_dict(output):
    return {"result":output}

runnable_func = RunnableLambda(convert_dict)


# chain
intial_chain = user_prompt | llm | parser | inspect_func | runnable_func | refine_prompt | llm | parser

response = intial_chain.invoke({"topic":"The rise of AI agents in 2025"})

console.print(Rule("[bold blue]Chain 2 — Refined Post[/]", style="blue"))
console.print(Panel(response, title="[bold blue]Final LinkedIn Post[/]", border_style="blue"))
