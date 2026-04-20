from fastapi import FastAPI
from fastapi import UploadFile, File
from fastapi.responses import StreamingResponse
from .schema import Message
from .rag_engine import file_handling, test_llm_engine, user_query
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(title="Basic_rag_app",description="rag app to upload files like pdf or txt and answer based on that",version="1.0")

# Intialize cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],)

# Initialize the vector store -> Chroma


####################################################################
# test endpoint to check if the llm  is working
@app.post("/test")
async def test(query: Message):
    return StreamingResponse(test_llm_engine(query.message), media_type="text/plain")
##################################################################



@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    return await file_handling(file)

@app.post("/user-query")
async def read_query(query: Message):
    return user_query(query.message)