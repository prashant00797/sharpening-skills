'''
Q12.  Get Last User-Assistant Exchange
Context: In a multi-turn conversation, you often need to inspect the most recent exchange — the last user message and the last assistant reply — for evaluation or logging.

Write a function get_last_exchange(messages) that returns a tuple (last_user_message, last_assistant_message). Each is the full message dict. Return None for a slot if that role is not found.
Expected Output Structure:

({"role": "user", ...}, {"role": "assistant", ...})
'''

def get_last_exchange(messages:list)->tuple:
    user_message=[None]
    assistant_message=[None]
    for msg in messages:
        if msg["role"] == "user":
            user_message.append(msg)
        elif msg["role"] == "assistant":
            assistant_message.append(msg)
    
    final_user_message = user_message[-1]
    final_assistant_message = assistant_message[-1]

    return (final_user_message,final_assistant_message)

messages = [
    {"role": "assistant", "content": "Hello"},
    {"role": "tool", "content": "Hi there"},
    {"role": "user", "content": "How are you?"},
    {"role": "user", "content": "some tool result"},
    {"role": "tool", "content": "another tool result"},
]

res = get_last_exchange(messages)
print(res)