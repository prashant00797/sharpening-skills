'''
Q11.  Summarization Trigger Check
Context: When a conversation gets too long, you summarize the old messages into one short message to free up token budget. You need a function that detects when it is time to do that.

Write a function should_summarize(messages, threshold=10) that returns True if the number of messages exceeds threshold.
Example:

should_summarize([m1, m2, ..., m12], threshold=10)  # True  (12 > 10)
should_summarize([m1, m2, ..., m8],  threshold=10)  # False (8 <= 10)
'''

def should_summarize(messages:list, threshold:int=10)->bool:
    return len(messages) > threshold


messages = [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there"},
    {"role": "user", "content": "How are you?"},
    {"role": "assistant", "content": "I'm good"},
    {"role": "user", "content": "What is AI?"},
    {"role": "assistant", "content": "AI is artificial intelligence"},
    {"role": "user", "content": "Give me an example"},
    {"role": "assistant", "content": "ChatGPT is an example"},
    {"role": "user", "content": "Cool, thanks"},
    {"role": "assistant", "content": "You're welcome"},
]


res = should_summarize(messages)

print(res)