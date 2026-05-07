from fastapi import FastAPI
from app.controller import custom_router
app = FastAPI(title="Core FastAPI Fundamentals",version="1.0")

app.include_router(custom_router,prefix="/api")