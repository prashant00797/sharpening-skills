from fastapi import FastAPI
from app.controller import auth_router,user_router

app = FastAPI(title="Auth & Security",version="0.1")

app.include_router(auth_router,tags=["Auth"],prefix="/auth")
app.include_router(user_router,tags=["User"],prefix="/users")

@app.get("/health",tags=["Health"])
def health():
    return{"status":"ok"}