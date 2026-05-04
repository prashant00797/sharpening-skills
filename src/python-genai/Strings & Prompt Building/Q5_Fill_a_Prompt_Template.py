'''
Q5.  Fill a Prompt Template
Context: You have a reusable prompt template with placeholders like {role} and {task}. You need to fill in those placeholders with actual values at runtime. This is exactly how prompt templates work in LangChain.

Write a function fill_template(template, variables) where template is a string with {key} placeholders and variables is a dict. Replace each {key} with the corresponding value.
Example Input:
template = "You are a {role}. Help the user with {task}."
variables = {"role": "doctor", "task": "symptoms analysis"}
fill_template(template, variables)

Expected Output:

"You are a doctor. Help the user with symptoms analysis."
'''

def fill_template(template:str, variables:dict[str,str]):
    for key,value in variables.items():
        template = template.replace("{"+key+"}",value)
    return template




template = "You are a {role}. Help the user with {task}."
variables = {"role": "doctor", "task": "symptoms analysis"}
res = fill_template(template,variables)
print(res)