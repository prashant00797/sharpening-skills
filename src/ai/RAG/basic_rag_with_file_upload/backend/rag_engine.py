import os
import time
from dotenv import load_dotenv
from fastapi import UploadFile
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate

from .schema import LLM_Response


# Load environment variables from .env file
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

# Initialize 
llm_openai = ChatOpenAI(model="gpt-5-nano",temperature=0)
parser = StrOutputParser()
embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")
llm_with_structured_output = llm_openai.with_structured_output(LLM_Response)



async def file_handling(file: UploadFile):
    if(os.path.exists(f"./uploads/{file.filename}")):
        # print("i went here file exists")
        return {"message": f"File {file.filename} already exists"}
    else:
        # print("i went here first time")
        contents = await file.read()  # read bytes into memory
        with open(f"./uploads/{file.filename}", "wb") as f:
            f.write(contents)  # NOW saves to disk
    return chunking_splitting(str(file.filename))

def chunking_splitting(file_name: str):
    # chunking the document into smaller pieces and creating embeddings
    loader = PyPDFLoader(f"./uploads/{file_name}")
    docs = loader.load()
    for doc in docs:
        doc.metadata["document_id"] = file_name
        doc.metadata["id"] = f"{file_name}.{docs.index(doc)}"
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=200)
    doc_chunks = splitter.split_documents(docs)

    return rag_vector_store(doc_chunks,file_name)

def rag_vector_store(doc_chunks, file_name):
    if(not os.path.exists("../db")):
        os.mkdir("../db")
        vector_store = Chroma.from_documents(documents=doc_chunks, embedding=embedding_model, persist_directory="../db")
    else:
        vector_store = Chroma(persist_directory="../db", embedding_function=embedding_model)
        vector_store.add_documents(doc_chunks)
  
    return {"message": f"File {file_name} uploaded and processed successfully"}

def user_query(query: str):
    # query the vector store and get the relevant chunks
    vector_store = Chroma(persist_directory="../db", embedding_function=embedding_model)
    # relevant_chunks = vector_store.similarity_search(query, k=3) -> direct search
    
    # using retriever and MMR search
    retriever = vector_store.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 3, "fetch_k": 10}
)
    relevant_chunks = retriever.invoke(query)
    context = "\n\n".join([doc.page_content for doc in relevant_chunks])
    source = "\n\n".join([f"Document: {doc.metadata['document_id']}, page_no: {doc.metadata['page'] + 1}" for doc in relevant_chunks])
    
    prompt = ChatPromptTemplate.from_messages([
        ("system",'''
        You are an AI assistant designed to answer user questions strictly based on the provided context.

Rules:
1. Use ONLY the information present in the given context to answer the question.
2. If the answer is not present in the context, say:
   "I could not find the answer in the provided documents."
3. Do NOT make up information or use prior knowledge.
4. Keep answers clear, concise, and directly relevant to the question.
5. If multiple pieces of context are relevant, combine them logically.
6. If the question is ambiguous, ask for clarification instead of guessing.
7. Keep a proper bullet from list so that the response could be send to frontend and rendered properly.
8. Maintain a helpful and professional tone.

Context:
{context}

Question:
{query}

Answer:
'''),
        ("human","{query}")
    ])
    chain = prompt | llm_with_structured_output
    response = chain.invoke({"context": context, "query": query})
    print(type(response))
    # test = llm_with_structured_output.invoke(query)
    return {
        "query": query,
        "result": response.result,
        "bullets": response.bullets,
        "source": source
    }

########################################################################
# test chain
test_chain = llm_openai | parser
# test query
def test_llm_engine(query: str):
    # query = test_chain.invoke(query)
    # return query
     for chunk in llm_openai.stream(query):
        if chunk.content:
            yield chunk.content
            time.sleep(0.05)
        # print(str(chunk.content), end="", flush=True)
#########################################################################

