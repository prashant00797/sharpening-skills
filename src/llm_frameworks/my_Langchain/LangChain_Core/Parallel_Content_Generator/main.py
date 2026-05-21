from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableParallel
from langchain_core.output_parsers import StrOutputParser
from ...config import load_env
from ...display import columns
load_env()


llm = ChatOpenAI(model="gpt-4o-mini",temperature=0.5)
parser  = StrOutputParser()


def make_chain(system_msg,human_msg):
    prompt = ChatPromptTemplate.from_messages([
        ('system',system_msg),('human',human_msg)
    ])

    return prompt | llm | parser


runnable_parrale = RunnableParallel(
    tweet=make_chain('You are a content writer for twitter.','Generate a tweet on product :{product} in 280 chars'),
    linkedin=make_chain('You are a content writer for LinkedIn.','Generate a linkedIn post on product :{product}'),
    email_sub=make_chain('You are a helpful assistant for writing email subjects.','Generate an email subject on product :{product}')
    )


response = runnable_parrale.invoke({"product":"An AI-powered resume builder that helps freshers land their first job"})

columns([
    (response["tweet"], "Tweet", "cyan"),
    (response["linkedin"], "LinkedIn", "blue"),
    (response["email_sub"], "Email Subject", "green"),
])