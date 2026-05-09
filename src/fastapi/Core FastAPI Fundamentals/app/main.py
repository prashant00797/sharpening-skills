from fastapi import FastAPI
from app.controller import router
app = FastAPI(title="Core FastAPI Fundamentals",version="1.0")

app.include_router(router,prefix="/api")