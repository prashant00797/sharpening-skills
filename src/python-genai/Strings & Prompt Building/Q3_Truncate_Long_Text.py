'''
Q3.  Truncate Long Text
Context: You are inserting a retrieved document chunk into a prompt. The chunk is too long and needs to be clipped. Add "..." at the end to show it was cut.

Write a function truncate_text(text, max_chars) that returns text clipped to max_chars. If the text is already within the limit, return it unchanged.
Example Input:

truncate_text("Retrieval Augmented Generation is a technique", 20)

Expected Output:

"Retrieval Augmented..."
'''

def truncate_text(text:str,max_chars:int)->str:
    if(len(text) > max_chars):
        return f"{str(text[0:max_chars])}..."
    return text

res = truncate_text("Retrieval Augmented Generation is a technique", 20)
res = truncate_text("Retrieval Augmented Generation is a technique", 20)
print(res)