from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pydantic_ai_agent import crawling_agent, CrawlerRequest, CrawlerResponse

app = FastAPI(
    title="Documentation Crawler API",
    description="API for crawling and processing documentation websites",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    chat_message: str  # This will contain the URL to crawl

@app.post("/", response_model=CrawlerResponse)
async def get_ai_response(request: ChatRequest):
    try:
        # Create crawler request from chat message (URL)
        crawler_request = CrawlerRequest(url=request.chat_message)
        
        # Run the crawler agent
        result = await crawling_agent.run(crawler_request)
        return result
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process request: {str(e)}"
        )