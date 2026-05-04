'''Q1.  Build a Prompt

Context: You are building a customer support bot. Before calling the LLM, you need to describe who the user is and what they asked.

Write a function build_prompt(user_name, query) that returns the string:

"You are helping {user_name}. Their question is: {query}"

Example Input:

build_prompt("Prashant", "What is RAG?")

Expected Output:

"You are helping Prashant. Their question is: What is RAG?"
'''


def build_prompt(user_name:str,query:str)->str:
    return f"You are helping {user_name}. Their Question is {query}"

res = build_prompt("Prashant","What is Rag")
print(res)