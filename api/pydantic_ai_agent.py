from typing import Dict, Optional
from pydantic import BaseModel
from pydantic_ai import Agent, RunContext
from pydantic_ai.models.openai import OpenAIModel
from crawler_tool import get_sitemap_urls, crawl_sequential
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path='.env')

class CrawlerRequest(BaseModel):
    url: str

class CrawlerResponse(BaseModel):
    success: bool
    message: str
    content: Dict[str, str]

model = OpenAIModel('gpt-4o', api_key=os.getenv('OPENAI_API_KEY'))

crawling_agent = Agent(  
    model=model,
    deps_type=CrawlerRequest,
    result_type=CrawlerResponse,
    system_prompt=(
        'You are a documentation crawler agent. Your task is to:\n'
        '1. Analyze the provided URL and extract its sitemap\n'
        '2. Crawl all relevant pages and convert them to markdown\n'
        '3. Return a structured response with the crawled content\n'
        'Handle errors gracefully and provide informative messages.'
    ),
)

@crawling_agent.tool()
async def process_website(ctx: RunContext[CrawlerRequest]) -> CrawlerResponse:
    try:
        # Get sitemap URLs
        urls = await get_sitemap_urls(ctx.deps.url)
        
        if not urls:
            return CrawlerResponse(
                success=False,
                message=f'No URLs found in sitemap for {ctx.deps.url}',
                content={}
            )

        # Crawl the URLs
        content = await crawl_sequential(urls)
        
        return CrawlerResponse(
            success=True,
            message=f'Successfully crawled {len(urls)} pages from {ctx.deps.url}',
            content=content
        )

    except Exception as e:
        return CrawlerResponse(
            success=False,
            message=f'Error processing website: {str(e)}',
            content={}
        )

