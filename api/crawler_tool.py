import asyncio
from typing import Dict, List
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
import requests
from lxml import etree

async def get_sitemap_urls(base_url: str) -> list[str]:
    # Ensure we have a valid, complete sitemap URL
    sitemap_url = base_url + '/sitemap.xml'
    
    response = requests.get(sitemap_url)
    response.raise_for_status()  # raises an error if the request failed

    # Parse XML from response.content
    root = etree.fromstring(response.content)

    # Find all <loc> elements in the XML
    # Note: Sitemaps are usually <urlset> elements with children <url>, <loc>, etc.
    #       or <sitemapindex> for sitemap indexes.
    loc_elements = root.findall(".//{*}loc")

    urls = [loc.text.strip() for loc in loc_elements if loc is not None and loc.text]

    return urls


async def crawl_sequential(urls: List[str]):
    browser_config = BrowserConfig(
        headless=True,
        # For better performance in Docker or low-memory environments:
        extra_args=["--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox"],
    )

    crawl_config = CrawlerRunConfig(
        markdown_generator=DefaultMarkdownGenerator()
    )

    # Create the crawler (opens the browser)
    crawler = AsyncWebCrawler(config=browser_config)
    await crawler.start()

    try:
        session_id = "session1"  # Reuse the same session across all URLs
        results: Dict[str, str] = {}
        for url in urls:
            result = await crawler.arun(
                url=url,
                config=crawl_config,
                session_id=session_id
            )

            if result.success:
                results[url] = result.markdown_v2.raw_markdown
            else:
                results[url] = 'Failed to crawl'
    finally:
        # After all URLs are done, close the crawler (and the browser)
        await crawler.close()

    return results