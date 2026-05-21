from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda
from ...config import load_env
from ...display import panel, rule
load_env()

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
    rule("Chain 1 — Raw Draft", "yellow")
    panel(output, style="yellow")
    return output  # pass it through unchanged

inspect_func = RunnableLambda(inspect)

# runnable function
def convert_dict(output):
    return {"result":output}

runnable_func = RunnableLambda(convert_dict)


# chain
intial_chain = user_prompt | llm | parser | inspect_func | runnable_func | refine_prompt | llm | parser

response = intial_chain.invoke({"topic":"The rise of AI agents in 2025"})

rule("Chain 2 — Refined Post", "blue")
panel(response, "Final LinkedIn Post", "blue")
