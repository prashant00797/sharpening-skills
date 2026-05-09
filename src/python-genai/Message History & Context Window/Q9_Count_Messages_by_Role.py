'''
Q9.  Count Messages by Role
Context: During debugging, you want to see the breakdown of a conversation — how many user messages, how many assistant messages, how many tool messages.

Write a function count_by_role(messages) that returns a dict where keys are role names and values are the count of messages with that role.
Example Input:

messages = [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."},
    {"role": "user", "content": "..."},
    {"role": "tool", "content": "..."},
]

Expected Output:

{"user": 2, "assistant": 1, "tool": 1}
'''

def count_by_role(messages):
    count_msg = {}
    for msg in messages:
        role = msg["role"]
        count_msg[role] = count_msg.get(role,0) +1
    return count_msg

messages = [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."},
    {"role": "user", "content": "..."},
    {"role": "tool", "content": "..."},
]

res = count_by_role(messages)
print(res)