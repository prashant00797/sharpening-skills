from fastapi import FastAPI
from .gbot import create_email_draft, review_email_draft
from .schema import Email, EmailDraftRequest, Review

# intitialise server
app = FastAPI(title="EMAIL BOT",description="email bot for creating draft",version="1.0")

# user-request
@app.post("/user-mail-request")
def user_mail_request(request:EmailDraftRequest):
    state = Email(message=request.message)
    return create_email_draft(state)

@app.post("/review-draft")
def user_feedback_request(state:Review):
    return review_email_draft(state)