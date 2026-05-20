🏢 Real-World Context: A content marketing SaaS tool (like Buffer) needs to generate a LinkedIn post from a topic, then immediately improve it for professional tone in a second step. Both steps use an LLM.
🔨 Your Task: Build a two-step chain: Step 1 generates a raw post from the topic. Step 2 refines it for professional tone. Chain the two steps using RunnableLambda to convert the string output of step 1 into the dict input that step 2 needs.
📥 Input: A dict: {'topic': 'The rise of AI agents in 2025'}
✅ Expected Behaviour: A refined professional LinkedIn post string