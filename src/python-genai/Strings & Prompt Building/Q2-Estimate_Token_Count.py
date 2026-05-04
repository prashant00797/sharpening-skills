'''Context: LLM APIs charge per token and have a token limit. A common real-world approximation used by engineers when you do not have a tokenizer: 1 token is approximately 4 characters.

Write a function estimate_tokens(text) that returns an estimated integer token count.
Example Input:

estimate_tokens("Hello from the chatbot")  # 22 chars

Expected Output:

5   # 22 // 4 = 5

'''

from math import floor


def estimate_tokens(text:str)->float:
    len_of_text = len(text)
    return floor(len_of_text/4) #shorthand len_of_text // 4. double //

res = estimate_tokens("Hello from the chatbot")
print(res)