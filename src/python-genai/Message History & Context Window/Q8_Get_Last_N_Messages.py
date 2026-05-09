'''
Q8.  Get Last N Messages
Context: A simple but common pattern — instead of the full history, pass only the last N messages to the LLM to keep things fast and cheap.

Write a function get_last_n_messages(messages, n) that returns the last n messages.
Example Input:

get_last_n_messages([m1, m2, m3, m4, m5], 3)

Expected Output:

[m3, m4, m5]
'''


def get_last_n_messages(messages:list,n:int):
    return messages[-n:]


res = get_last_n_messages(messages=["m1", "m2", "m3", "m4", "m5"],n=3)
print(res)