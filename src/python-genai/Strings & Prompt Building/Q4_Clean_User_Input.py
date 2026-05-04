'''
Q4.  Clean User Input
Context: Users type into a chat UI and sometimes add extra spaces or hit enter multiple times. Before sending their message to the LLM, clean it up.

Write a function clean_input(text) that strips leading/trailing whitespace and collapses multiple spaces between words into one.
Example Input:

clean_input("  what   is   RAG?  ")

Expected Output:

"what is RAG?"
'''

def clean_input(text:str)->str:
    clean_str = text.strip("").split()
    return " ".join(clean_str)

res = clean_input("  what   is   RAG?  ")
print(res)