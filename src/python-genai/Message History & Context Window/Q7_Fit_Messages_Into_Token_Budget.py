'''
Context: 
In real LLM apps, the system prompt takes up part of the token budget and the rest goes to conversation history.
When history is too long, drop the oldest messages first — always preserve the most recent context.

Write a function fit_context(messages, max_tokens=4000, system_tokens=200). 
It should return as many recent messages as can fit in (max_tokens - system_tokens) tokens. Oldest messages are dropped first.
 Use: 1 token = 4 characters.

Key Hint:
Iterate messages in reverse (newest first), accumulate token count, stop when budget is exhausted. Return result in original (chronological) order.

INPUT:
messages = [
    {"role": "user", "content": "Hello there"},                     # 11 chars → 2 tokens
    {"role": "assistant", "content": "Hi, how can I help you?"},    # 23 chars → 5 tokens
    {"role": "user", "content": "Explain Retrieval Augmented Generation"},  # 38 chars → 9 tokens
    {"role": "assistant", "content": "RAG combines retrieval with generation for better answers"},  # 57 chars → 14 tokens
]

fit_context(messages, max_tokens=25, system_tokens=5)

Expected Output:

[
    {
        "role": "assistant",
        "content": "RAG combines retrieval with generation for better answers"
    }
]

'''

def fit_context(messages,max_tokens,system_tokens):
    max_context_window = max_tokens-system_tokens
    content_len = 0
    res = []
    for value in reversed(messages):
        if (len(value["content"])//4) + content_len < max_context_window:
            res.append(value)
            content_len+=len(value["content"]) //4
        else:
            return list(reversed(res))



messages = [
    {"role": "user", "content": "Hello there"},                     # 11 chars → 2 tokens
    {"role": "assistant", "content": "Hi, how can I help you?"},    # 23 chars → 5 tokens
    {"role": "user", "content": "Explain Retrieval Augmented Generation"},  # 38 chars → 9 tokens
    {"role": "assistant", "content": "RAG combines retrieval with generation for better answers"},  # 57 chars → 14 tokens
]

res = fit_context(messages,max_tokens=30,system_tokens=5)
print(res)
