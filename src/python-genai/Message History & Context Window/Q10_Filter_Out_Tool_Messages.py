'''
Q10.  Filter Out Tool Messages
Context: Some simplified LLM API calls do not accept messages where role is "tool". Before sending the history, strip those out.
Write a function filter_out_tool_messages(messages) that returns only messages where role is "user" or "assistant".
Example Input:

messages = [
    {"role": "user", "content": "Search for me"},
    {"role": "tool", "content": "search result here"},
    {"role": "assistant", "content": "Here is what I found"},
]

Expected Output:

[
    {"role": "user", "content": "Search for me"},
    {"role": "assistant", "content": "Here is what I found"},
]
'''

def filter_out_tool_messages(messages:list)->list:
    result = []
    for msg in messages:
        if msg["role"] == "tool":
            continue
        else:
            result.append(msg)
    return result

messages = [
    {"role": "user", "content": "Search for me"},
    {"role": "tool", "content": "search result here"},
    {"role": "assistant", "content": "Here is what I found"},
]

res = filter_out_tool_messages(messages)
print(res)