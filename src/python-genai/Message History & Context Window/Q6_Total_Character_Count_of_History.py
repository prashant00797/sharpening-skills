'''
Q6.  Total Character Count of History
Context: Before trimming the conversation history to fit the context window, you need to measure its current size. Use total character count as a proxy for token count.

Write a function get_total_chars(messages) that returns the total character count across all "content" fields in the list.
Example Input:

messages = [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"},
]
get_total_chars(messages)

Expected Output:

14   # "Hello" = 5 chars, "Hi there!" = 9 chars
'''

def get_total_chars(messages:list)->int:
    count = 0
    for value in messages:
        count += len(value.get("content","")) #or len(value["content"])
    return count


messages = [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"},
]

res = get_total_chars(messages)
print(res)