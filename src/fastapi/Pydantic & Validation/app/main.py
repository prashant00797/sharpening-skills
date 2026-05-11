from fastapi import FastAPI
from app.controller import router

app = FastAPI(title="Pydantic & Validation",version="0.1")


app.include_router(router,prefix="/api")
