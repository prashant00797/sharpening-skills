from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from .schema import SentimentSchema
from ...display import panel
from ...config import load_env
load_env()

client = ChatOpenAI(model="gpt-4o-fake",temperature=0.0).with_fallbacks([ChatOpenAI(model="gpt-4o-mini",temperature=0.0)])
client_structured = client.with_structured_output(SentimentSchema)
sys_pmt='''
 You are a sentiment analysis assistant for a product review platform. 
 Given a product review, classify its sentiment as 'positive', 'negative', or 'neutral'
 and write a concise one-line summary of the review.
'''
prompt = ChatPromptTemplate([('system',sys_pmt),('human','{input}')])


def sentiment_summary(input:str):
    chain = prompt | client_structured 
    result = chain.invoke({"input":input})
    return result.model_dump()



user_input = "This product is absolutely terrible. Broke on day one and customer support was useless."
response = sentiment_summary(user_input)

panel(user_input,"Human","red")
panel(response,"Assitant","green")